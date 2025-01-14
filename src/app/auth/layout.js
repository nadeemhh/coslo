import Mygloballoader from '../Mygloballoader.js'

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <head>
      <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    rel="stylesheet"
  />
            </head>
      <body>
      { children }
      <Mygloballoader/>

      </body>
    </html>
  );
}


