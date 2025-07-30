
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
  };
  }

   if (name === 'product') {
    return {
      title: 'Top Products Available Across India | Coslomart',
      description:
        'Browse top-quality products on Coslomart available across India. Shop electronics, home essentials, and more with trusted sellers nationwide.',
      keywords: [
        'buy products online india',
        'top products in india',
        'online shopping india',
        'coslomart products',
      ],
    };
  }


    if (name === 'service') {
    return {
      title: 'Trusted Home & Business Services in Bangalore | Coslomart',
      description:
        'Find reliable services in Bangalore for home maintenance, repairs, and business needs. Verified professionals with quality assurance.',
      keywords: [
        'home services in bangalore',
        'business services bangalore',
        'repair and maintenance services',
        'coslomart services',
      ],
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


  