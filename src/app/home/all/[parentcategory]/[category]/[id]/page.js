import Allproducts from './allproductscontant.js'


export async function generateMetadata({ params }) {

  const {parentcategory,category, id } = await params;

  if (!id) {
    return {
      title: 'SubCategory Not Found',
      description: 'No subcategory ID provided.',
    };
  }

  try {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch subcategory');

    let data = await res.json();
    
     data = data.category;

    return {
      title: data?.title || 'coslomart',
      description: data?.description || 'coslomart' ,
      keywords: data?.keywords || 'coslomart',
       alternates: {
        canonical: `https://www.coslomart.com/home/all/${parentcategory}/${category}/${id}`,
      },
    };
  } catch (error) {
    return {
      title: 'Error Loading Subcategory',
      description: 'Could not load subcategory details.',
    };
  }
}


export default function Page() {


  return (
 <Allproducts />
  );
  }


  