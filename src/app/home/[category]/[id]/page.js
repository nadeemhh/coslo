
import './page.css'
import Subcategory from './subcategory.js'


// Fix #1: Await params correctly
export async function generateMetadata({ params }) {
  const { id, category } = await params;

  if (!id || !category) {
    return {
      title: 'SubCategory Not Found',
      description: 'Missing ID or Category in URL.',
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
      title: `${data?.title || 'coslomart'} - ${decodeURIComponent(category)}`,
      description: data?.description || 'coslomart' ,
      keywords: data?.keywords || 'coslomart',
        alternates: {
        canonical: `https://www.coslomart.com/home/${encodeURIComponent(category)}/${id}`,
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
    <><Subcategory /></>
  );
  }


  