import "./mylayout.css";
import NavBar from '../component/nav.js';
import Sidebar from '../component/sidebar.js';
import MainContent from '../component/main.js';
import Footer from '../component/footer.js';
import MobileFooter from '../component/mobile-footer.js';
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
       
        <>
    {/* Wrapper */}
    <div className="mycontainer">
      <NavBar />

      {/* Content Wrapper */}
      <div className="content-wrapper">
        <Sidebar />
        <MainContent>
        { children }
        </MainContent>
      </div>

      <Footer />
    </div>

    <MobileFooter />
  </>
       
<Mygloballoader/>
      </body>
    </html>
  );
}
