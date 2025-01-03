
import './page.css'
import Link from 'next/link';
import Productcard from '../../../../component/productcard'

export default function Page() {
  
  return (
    <div>
<div>
<h3 style={{color:'#1389F0',marginTop:'0px',marginBottom:'40px'}}>Electronic Components</h3>
</div>

<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'10px'}}>

<Productcard/>
<Productcard/>
<Productcard/>
<Productcard/>
<Productcard/>
<Productcard/>
<Productcard/>

</div>


    </div>
  );
  }


  