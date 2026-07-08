import { draftMode } from 'next/headers';
import { getStrapiURL } from './strapi-url';
import qs from 'qs';

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path: string, urlParamsObject: Record<string, any> = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.STRAPI_API_TOKEN ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } : {}),
    },
    next: { revalidate: 3600 }, // Disable Next.js fetch caching so Strapi changes show up immediately
    ...options,
  };

  // Check draft mode
  let isDraftMode = false;
  try {
    const draft = await draftMode();
    isDraftMode = draft.isEnabled;
  } catch (e) {
    // Expected to throw if called outside of request context (e.g. build time static generation)
  }

  // Add Strapi 5 draft status parameter if draft mode is enabled
  if (isDraftMode) {
    urlParamsObject.status = 'draft';
  }

  // Intercept `populate: 'deep'` and translate it to Strapi 5 native nested populate based on the API path
  if (urlParamsObject.populate === 'deep') {
    if (path.startsWith('/navigation')) {
      urlParamsObject.populate = {
        items: {
          populate: {
            children: {
              populate: '*'
            }
          }
        },
      };
    } else if (path.startsWith('/footer')) {
      urlParamsObject.populate = {
        column1Links: { populate: '*' },
        column2Links: { populate: '*' },
        socialLinks: { populate: '*' },
      };
    } else {
      // Use array syntax for populate to deeply fetch dynamic zone components and their media
      urlParamsObject.populate = [
        'seoMeta',
        'contentBlocks',
        'contentBlocks.primaryButton',
        'contentBlocks.secondaryButton',
        'contentBlocks.cards',
        'contentBlocks.cards.image',
        'contentBlocks.stats',
        'contentBlocks.items',
        'contentBlocks.items.image',
        'contentBlocks.members',
        'contentBlocks.members.photo',
        'contentBlocks.image',
        'contentBlocks.background',
        'contentBlocks.backgroundImage',
        'contentBlocks.backgroundVideo'
      ];
    }
  }

  // Build request URL using `qs` for nested objects support
  const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

  // Trigger API call
  console.log(`[Strapi] Fetching: ${requestUrl}`);
  try {
    const response = await fetch(requestUrl, mergedOptions);

    let json: any = null;

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      console.warn(`[Strapi] ${response.status} ${response.statusText} for ${requestUrl} - This is expected if the locale doesn't exist yet.`);
      // Don't return null yet, let's see if we can try a fallback below
    } else {
      json = await response.json();
    }

    // i18n Fallback: If we requested a non-English locale (e.g., 'zh') but Strapi returned 404 or empty data,
    // automatically fallback and fetch the 'en' version so the page doesn't crash or show blank.
    const requestedLocale = urlParamsObject.locale;
    const isDataEmpty = !json?.data || (Array.isArray(json.data) && json.data.length === 0) || !response.ok;

    if (isDataEmpty && requestedLocale && requestedLocale !== 'en') {
      console.log(`[Strapi] No data found (or 404) for locale '${requestedLocale}' on ${path}. Falling back to 'en'.`);
      const fallbackParams = { ...urlParamsObject, locale: 'en' };
      const fallbackQs = qs.stringify(fallbackParams, { encodeValuesOnly: true });
      const fallbackUrl = `${getStrapiURL(`/api${path}${fallbackQs ? `?${fallbackQs}` : ''}`)}`;

      console.log(`[Strapi] Fetching Fallback: ${fallbackUrl}`);
      const fallbackResponse = await fetch(fallbackUrl, mergedOptions);
      if (fallbackResponse.ok) {
        json = await fallbackResponse.json();
      }
    }

    // If it's still completely broken after the fallback attempt, return null
    if (!json || !json.data) {
      return null;
    }

    // Normalize: Strapi v4 nests fields under data.attributes, v5 puts them flat on data.
    // We make sure data.attributes always exists (pointing to the flat fields)
    // so that consumers using `data?.data?.attributes?.X` still work.
    if (json?.data && !json.data.attributes) {
      // v5 flat format – create an `attributes` alias for backward compat
      const { id, documentId, createdAt, updatedAt, publishedAt, locale, localizations, ...attrs } = json.data;
      json.data.attributes = attrs;
    }

    return json;
  } catch (error) {
    console.error(`[Strapi] Network error for ${requestUrl}:`, error);
    return null;
  }
}
