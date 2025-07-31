import Script from "next/script";
import { GlobalProvider } from './context/GlobalState';

import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <GlobalProvider>
    <html lang="en">
      <head>
        {/* ✅ Google Site Verification */}
          <meta name="google-site-verification" content="0rzl4g-6KHsJlXcNSRZAdUKDQdoB3Otyvt6pZPlQplE" />

         {/* Google Tag (gtag.js) */}
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-5WVFJ6PP67"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-5WVFJ6PP67');
              `,
            }}
          />


{/* schema.org */}

  <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
   "@context": "http://www.schema.org",
   "@type": "LocalBusiness",
   "name": "Coslomart",
   "url": "https://www.coslomart.com/",
   "image": "https://coslomart-bucket-prod.s3.ap-south-1.amazonaws.com/ProductImages/67337e18-78ac-4893-b425-c40a036317c4.jpeg",
   "description": "Coslomart is India’s largest B2B marketplace. Best B2B portal for top manufacturers, suppliers, buyers & dealers. Buy or sell with an amazing experience and grow your business globally.",
   "priceRange": "INR",
   "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "6"
   },
   "address": {
      "@type": "PostalAddress",
      "streetAddress": "H.No 254, MILLENNIUM VALLEY, 9th street, Hompalaghatta, Bangalore, Karnataka 562106",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "562106",
      "addressCountry": "IN"
   },
   "sameAs": [
      "https://www.instagram.com/coslomart/",
      "https://www.pinterest.com/coslomart/",
      "https://x.com/coslomart",
      "https://www.linkedin.com/company/coslomart/",
      "https://www.youtube.com/@Coslomart123"
   ]
}
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
             {

            "@context": "http://www.schema.org",

            "@type": "WebSite",

            "name": "Coslomart",

            "alternateName": "Coslomart – Hybrid E-commerce B2B, B2C, D2C platform",

            "url": "https://www.coslomart.com/"

        }
            `,
          }}
        />


      <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    rel="stylesheet"
  />

<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#1389F0" />
<link rel="apple-touch-icon" href="images/coslologo.png" />
<meta name="mobile-web-app-capable" content="yes" />

{/* other tags */}

<meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
<meta name="author" content="Coslomart" />
<meta name="publisher" content="Coslomart" />
<meta name="geo.region" content="IN-KA" />
<meta name="geo.placename" content="Bangalore" />
<meta name="geo.position" content="12.690780234999613, 77.70471139815018" />
<meta name="ICBM" content="12.690780234999613, 77.70471139815018" />
<meta name="Yahoobot" content="Index, Follow" />
<meta name="MSNbot" content="index, follow" />
<meta name="allow-search" content="yes" />

            </head>
      <body>
        {/* <h1>nav1</h1>  */}
        {children}

      </body>
    </html>
     </GlobalProvider>
  );
}
