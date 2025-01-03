
import './page.css'
import Link from 'next/link';

export default function Page() {
  
  return (
    <div>
<div>
<h3 style={{color:'#1389F0',marginTop:'0px',marginBottom:'40px'}}>Our Categories</h3>
</div>

<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>

{[...Array(10)].map((_, i) => (

 <Link href="/home/Categories/subCategories" key={i}>
 <div className="product-category-h" >

<div className="category-name-image-h">
<img src="\images\elc.jpg" alt=""/>
</div>

<div className="category-name-product-h">
<p>Mobile, Electronics & Supplies</p>
</div>

</div>
            </Link>
                 ))}

         
</div>


    </div>
  );
  }


  