
import SubCategoriesPage from './maincategory.js'

// export const metadata = {
//   title: "Real Estate Properties in Bangalore | Coslomart",
//   description:
//     "Explore verified real estate properties in Bangalore on Coslomart. Buy plots, flats, villas, and more in top locations with trusted agents.",
//   keywords: [
//     "real estate properties in bangalore",
//     "buy Housing properties in bangalore",
//     "buy Apartments in bangalore",
//   ],
// };


export async function generateMetadata({ params }) {
  const { name } = await params;

  
  console.log('name => ',name)

  if(name === 'property'){

       return {
    title: 'Real Estate Properties in Bangalore | Coslomart',
    description:
      'Explore verified real estate properties in Bangalore on Coslomart. Buy plots, flats, villas, and more in top locations with trusted agents.',
    keywords: [
      'real estate properties in bangalore',
      'buy Housing properties in bangalore',
      'buy Apartments in bangalore',
    ], 
      alternates: {
        canonical: `https://www.coslomart.com/home/showcategories/property`,
      },
  };
  }

   if (name === 'product') {
    return {
      title: 'Explore B2B Product Categories | Coslomart',
      description:
        'Discover a wide range of B2B product categories on Coslomart. Connect with verified suppliers and grow your business with zero commission deals.',
      keywords: [
        'buy products online india',
        'top products in india',
        'online shopping india',
        'coslomart products',
      ],
          alternates: {
        canonical: `https://www.coslomart.com/home/showcategories/product`,
      },
    };
  }


    if (name === 'service') {
    return {
      title: 'Browse B2B Services Online | Coslomart',
      description:
        'Find top B2B services on Coslomart. Connect directly with verified service providers for your business needs — no middlemen, no commission.',
      keywords: [
        'home services in bangalore',
        'business services bangalore',
        'repair and maintenance services',
        'coslomart services',
      ],
        alternates: {
        canonical: `https://www.coslomart.com/home/showcategories/service`,
      },
    };
  }

   
  // Optional fallback metadata
  return {
    title: 'Coslomart - Your One-Stop Marketplace',
    description:
      'Discover properties, services, and products on Coslomart. Trusted by thousands across India.',
    keywords: ['coslomart', 'india marketplace', 'properties', 'services', 'products'],
  };

}



export default function Page() {
  

  return (
   <SubCategoriesPage/>
  );
  }


  