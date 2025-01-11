
import './page.css'
import Link from 'next/link';
import Productcard from '../../component/productcard'

export default function Page() {
  
  return (
    <div>
<div>
<div style={{display:'flex',whiteSpace:'nowrap',marginBottom:'20px'}}>
        <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}}>
        <option value="">Filters</option>
        <option value="">By Location</option>
        <option value="">By Category</option>
      </select>
      </button>

      <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
      <i className="fas fa-sort" style={{marginRight:'10px'}}></i>
      
        
    <select name="" id="" style={{border:'none'}}>
      <option value="" >Sort</option>
    </select>
    </button>
      </div>
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


  