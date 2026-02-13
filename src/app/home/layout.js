import "./mylayout.css";
import NavBar from '../component/nav.js';
import Sidebar from '../component/sidebar.js';
import MainContent from '../component/main.js';
import Footer from '../component/footer.js';
import MobileFooter from '../component/mobile-footer.js';
import Mygloballoader from '../Mygloballoader.js'


export const metadata = {
  title: "Best eCommerce Platform for Properties, Products, and Services",
  description: "A unified eCommerce platform designed to buy, sell, and manage properties, products, and services seamlessly.",
  keywords: "property marketplace, service marketplace platform, product marketplace, best deals",
  icons: {
    icon: "/images/coslomartfavicon.jpg",
  }

};

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
                {children}
              </MainContent>
            </div>

            <Footer />
          </div>

          <MobileFooter />
        </>

        <Mygloballoader />

      </body>
    </html>
  );
}
