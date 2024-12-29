
import { GlobalProvider } from './context/GlobalState';

import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <GlobalProvider>
    <html lang="en">
      <head>
      <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    rel="stylesheet"
  />
            </head>
      <body>
        {/* <h1>nav1</h1>  */}
        {children}

      </body>
    </html>
     </GlobalProvider>
  );
}
