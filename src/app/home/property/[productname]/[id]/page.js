
import Productpagecontant from './productpagecontant.js'


export async function generateMetadata({ params }) {
  const { productname,id } = await params;

  
  if (!id) {
    return {
      title: 'Not Found',
      description: 'Missing ID in URL.',
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sitemap/product-details/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch subcategory');

    let data = await res.json();

     
    return {
       title: data.data.metatitle || 'coslomart',
      description: data.data.metadescription || 'coslomart' ,
      keywords:data.data.metakeywords||'coslomart',
        alternates: {
        canonical: `https://www.coslomart.com/home/property/${productname}/${id}`,
      },
    };
  } catch (error) {
    return {
      title: 'Error Loading product',
      description: 'Could not load details.',
    };
  }
}

export default function Page() {
  

  return (
   <Productpagecontant/>
  );
  }


  