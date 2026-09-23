export function getStrapiURL(path = '') {
  const baseUrl = (process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337').replace(/\/+$/, '');
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `${baseUrl}${cleanPath}`;
}
