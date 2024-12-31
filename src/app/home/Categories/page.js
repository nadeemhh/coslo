
import './page.css'
import Link from 'next/link';
import Productcategory from '../../component/Productcategory.js'

export default function Page() {
  
  return (
    <div>
<div>
<h3 style={{color:'#1389F0',marginTop:'0px',marginBottom:'40px'}}>Our Categories</h3>
</div>

<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>

 <Link href="/home/Categories/subCategories">
            <Productcategory/>
            </Link>

            <Link href="/home/Categories/subCategories">
            <Productcategory/>
            </Link>
            <Link href="/home/Categories/subCategories">
            <Productcategory/>
            </Link>
            <Link href="/home/Categories/subCategories">
            <Productcategory/>
            </Link>
            <Link href="/home/Categories/subCategories">
            <Productcategory/>
            </Link>
</div>


    </div>
  );
  }


  