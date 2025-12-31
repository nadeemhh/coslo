
import Signup from './signup.js'
export const dynamic = 'force-dynamic';


export async function generateMetadata({ searchParams  }) {
 // In Next.js 15+, searchParams is a Promise
  const resolvedParams = await searchParams;
  const sellertype = resolvedParams?.sellertype;
  
  console.log('=>', sellertype);
     
  if(sellertype==='Property'){
    return {
       title: 'Coslomart Properties',
      description: 'Coslomart Properties Your trusted destination for Apartments, Plots, and Villas in Bangalore.' ,
      keywords:'Coslomart Properties',
    };
  }

       
  if(sellertype==='Product'){
    return {
       title: 'coslomart Store - Best Online Shopping',
      description: 'Shop the latest products at the best prices. Fast shipping and great discounts!' ,
      keywords:'coslomart',
    };
  }

  else{
     return {
       title: 'coslomart',
      description: 'coslomart' ,
      keywords:'coslomart',
    };
  }
    

}

export default function Page() {
  

  return (
   <Signup/>
  );
  }


  