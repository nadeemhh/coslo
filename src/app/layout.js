import Script from "next/script";
import { GlobalProvider } from './context/GlobalState';

import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <GlobalProvider>
    <html lang="en">
      <head>
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

      <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    rel="stylesheet"
  />

<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#1389F0" />
<link rel="apple-touch-icon" href="images/coslologo.png" />
<meta name="mobile-web-app-capable" content="yes" />

            </head>
      <body>
        {/* <h1>nav1</h1>  */}
        {children}

      </body>
    </html>
     </GlobalProvider>
  );
}
