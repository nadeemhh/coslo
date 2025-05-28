
import Productenquiry from './productenquiry.js'


export const metadata = {
  title: "Product Enquiry & Get Quotation - Coslomart",
  description: "Submit your product enquiry and receive a customized quotation. Fast response and best pricing guaranteed!",
  keywords: "product enquiry, get quotation, custom quote, coslomart, b2b enquiry, wholesale enquiry",
  icons: {
    icon: "/images/coslomartfavicon.jpg",
  },
    alternates: {
      canonical: `https://www.coslomart.com/home/productenquiry`,
    },
};


export default function Products() {
  

  return (
   <Productenquiry/>
  );
  }


  