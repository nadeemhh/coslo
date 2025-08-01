export async function GET() {
  const baseUrl = 'https://www.coslomart.com';

  // ✅ Fixed static URLs to include
  const staticUrls = [
    '/',
    '/home',
    '/home/showcategories/property',
    '/home/showcategories/product',
    '/home/showcategories/service',
    '/home/Categories',
    '/home/productenquiry',
    '/auth/sup-manu/choose',
    '/home/createaccount',
    '/home/contactus',
    '/home/about-us',
    '/home/TERMS-OF-USE',
    '/home/PrivacyPolicy',
    '/home/ReturnPolicy',
    '/home/cookiepolicy',
    '/home/shippingpolicy',
  ];

  // ✅ Fetch dynamic URLs from your API
  let parentcategoryurls = [];
  let childcategoryurls = [];
  let prducturls = [];
   let propertyurls = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sitemap/urls`, {
      cache: 'no-store', // ensure fresh data
    });
    const data = await res.json();

    parentcategoryurls = data.parentCategoryUrls || [];
    childcategoryurls = data.childCategoryUrls || [];
    prducturls = data.productUrls || [];
    propertyurls = data.propertyUrls || [];

  } catch (error) {
    console.error('Error fetching sitemap data:', error);
  }

  // ✅ Combine all URLs
  const allUrls = [
    ...staticUrls.map(path => `${baseUrl}${path}`),
    ...parentcategoryurls,
    ...childcategoryurls,
    ...prducturls,
    ...propertyurls,
  ];

  // ✅ Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    url => `<url>
  <loc>${url}</loc>
</url>`
  )
  .join('\n')}
</urlset>`;

  // ✅ Return XML response
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
