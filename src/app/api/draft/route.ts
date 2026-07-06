import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') || 'en';
  const type = searchParams.get('type') || 'home';

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== (process.env.PREVIEW_SECRET || 'my-preview-secret')) {
    return new Response('Invalid token', { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode();
  draft.enable();

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  
  let redirectPath = `/${locale}`;
  
  if (type === 'home') {
    redirectPath = `/${locale}`;
  } else if (type === 'mission') {
    redirectPath = `/${locale}/mission`;
  } else if (type === 'labor') {
    redirectPath = `/${locale}/labor`;
  } else if (type === 'policy') {
    redirectPath = `/${locale}/policy`;
  } else if (type === 'investment') {
    redirectPath = `/${locale}/investment`;
  } else if (type === 'culture') {
    redirectPath = `/${locale}/culture`;
  } else if (type === 'contact') {
    redirectPath = `/${locale}/contact`;
  } else if (type === 'industrial') {
    redirectPath = `/${locale}/industrial`;
  } else if (slug && slug !== 'undefined') {
    redirectPath = `/${locale}/${type}/${slug}`;
  }

  // Redirect to the path
  redirect(redirectPath);
}
