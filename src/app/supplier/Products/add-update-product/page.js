'use client'
import './page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
import Link from 'next/link';
import  { useState,useEffect } from "react";
import Goback from '../../../back.js'
import dynamic from 'next/dynamic';
 const QuillEditor = dynamic(() => import('../../../component/QuillEditor.js'), { ssr: false });



export default function Page() {

  const [userData, setUserData] = useState({
    productData: {
      productName: "",
      description: "",
      productVideo: "",
      commonAttributes: [],
      reasonForReturn:[],
      category: "",
      BrandName:"",
      amazoneProductUrl:""
    },
    variationsData: [
    
    ],
  });

  const [activeCategory, setActiveCategory] = useState(null);

  const [ModalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setconfirmationOpen] = useState(false);
  const [Compareprice, setCompareprice] = useState(false);
  const [showinput,setshowinput]=useState(true);
  const [showinput2,setshowinput2]=useState(false);

  const [changeurl, setchangeurl] = useState(false);
  const [addcategory, setAddCategory] = useState(false);
  const [subcategory, setsubcategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [Attributes,setAttributes]=useState(1)
  const [commonAttributes,setcommonAttributes]=useState(1)
  const [showDeliveryFeeInput, setShowDeliveryFeeInput] = useState(!userData.productData.isDeliveryFree);
  const [showReturnDaysInput, setShowReturnDaysInput] = useState(userData.productData.isReturnAvailable);
  const [productimages, setproductimages] = useState([]);

  const [images, setImages] = useState([]);

  const [isupdate, setisupdate] = useState(false);
  const [updateindex, setupdateindex] = useState(false);
  const [productupdate, setproductupdate] = useState(false);
  const [preimages, setpreimages] = useState([]);


  const [pricings, setPricings] = useState([
    { netPrice: 1290, stock: 250 },
    { netPrice: 1290, stock: 250 },
    { netPrice: 1290, stock: 250 },
  ]);

  const Attributesitems = Array.from({ length: Attributes }, (_, index) => `Item ${index + 1}`);
  console.log(userData)
  const refreshCategories = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  useEffect(() => {
    refreshCategories(); // Load categories on mount
    setShowDeliveryFeeInput(!userData.productData.isDeliveryFree);
    const pid = new URLSearchParams(window.location.search).get("pid");
    console.log(pid)
    if(pid){getproductdetails(pid)}
    
  }, []);
  
  const toggleCompareprice = () => {
  
    setCompareprice(!Compareprice);
  };

  const toggleAddCategory = (data) => {
   
    setsubcategory(data)
    setAddCategory(!addcategory);
  };


  const toggleconfirmation = () => {
  
    setconfirmationOpen(!confirmationOpen);
  };

  const toggleModal = (update=true) => {
  
    setModalOpen(!ModalOpen);
    if(update){
      setAttributes(1)
      addPriceSlabs()
    }
   
  };



  const handleImageUpload = (event) => {

    const myfiles = Array.from(event.target.files);
    setproductimages((prevImages) =>{
      setVariation((prev) => ({
        ...prev,
        productImages: [...prevImages, ...myfiles],
      }));
      return [...prevImages, ...myfiles];
      
      });

    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls]);

    
  };

  const removeImage = (index) => {

    setproductimages(productimages.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));

    setVariation((prev) => ({
      ...prev,
      productImages: productimages.filter((_, i) => i !== index),
    }));
  };

  const removepreImage = (index) => {

    

    setpreimages(preimages.filter((_, i) => i !== index))

    setVariation((prev) => ({
      ...prev,
      awsImages: preimages.filter((_, i) => i !== index),
     deleteImages:[...(prev.deleteImages || []), preimages.find((_, i) => i === index)],
    }));
  };



console.log(productimages,images)
  

  const addPricing = () => {
    setPricings([...pricings, { netPrice: 1290, stock: 250 }]);
  };

  const removePricing = (index) => {
    const updatedVariations = userData.variationsData.filter((_, i) => i !== index);
    setUserData({ ...userData, variationsData: updatedVariations });
  };


  // Add a new common attribute item
  const addCommonAttribute = () => {
    setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        commonAttributes: [
          ...prevState.productData.commonAttributes,
          { key: "", value: "", unit: "" }, // Empty object structure for attributes
        ],
      },
    }));
  };


    // Add a new reason item
    const addreason = () => {
      setUserData((prevState) => ({
        ...prevState,
        productData: {
          ...prevState.productData,
          reasonForReturn: [
            ...prevState.productData.reasonForReturn,
            "", 
          ],
        },
      }));
    };


  // Handle input change for common attributes
  const handleCommonAttributeChange = (index, field, value) => {
    setUserData((prevState) => {
      const updatedAttributes = [...prevState.productData.commonAttributes];
      updatedAttributes[index][field] = value; // Update specific field

      return {
        ...prevState,
        productData: {
          ...prevState.productData,
          commonAttributes: updatedAttributes,
        },
      };
    });
  };


    // Handle input change for reason
    const handlereasonChange = (index,value) => {
      setUserData((prevState) => {
        const updatedreason = [...prevState.productData.reasonForReturn];
        updatedreason[index] = value; // Update specific field
  
        return {
          ...prevState,
          productData: {
            ...prevState.productData,
            reasonForReturn: updatedreason,
          },
        };
      });
    };


  const handleProductDataChange = (field, value) => {
    setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        [field]: value,
      },
    }));
  };


  const [variation, setVariation] = useState({
    mrp: "",
    stock: "",
    lowStockThreshold: "",
    gst: "",
    repeatBuyerDiscount: "",
    priceSlabs: [],
    attributes: [],
    dimensions: { length: "", width: "", height: "" },
    weight:"",
    divertIndividualOrder: false,
      isReturnable: false,
          returnDays: 3,
          productImages:[]
  });

console.log(variation)


const defaultSlabs = [
  {
    type: "individual",
    min: "",
    max: "",
    discount: "",
    deliveryFee: ""
  },
  {
    type: "retailer",
    min: "",
    max: "",
    discount: "",
    deliveryFee: ""
  },
  {
    type: "wholesaler",
    min: "",
    max: "",
    discount: "",
    deliveryFee: ""
  },
];

// Function to handle adding the default price slabs
const addPriceSlabs = () => {
  setVariation({ ...variation, priceSlabs: defaultSlabs });
};

// Function to remove a specific price slab (current one clicked)
const removePriceSlab = (index) => {
   console.log()
  const updatedSlabs = variation.priceSlabs.filter((_, i) => i !== index);
  //setVariation({ ...variation, priceSlabs: updatedSlabs });

  setVariation({
    mrp: "",
    stock: "",
    gst: "",
    lowStockThreshold: "",
    repeatBuyerDiscount: "",
    priceSlabs: [],
    attributes: [],
    dimensions: { length: "", width: "", height: "" },
    weight:"",
    divertIndividualOrder: false,
    isReturnable: false,
        returnDays: 3,
        productImages:[]
  });
  setShowReturnDaysInput(false);
};


  // Handle input changes for variation details
  const handleVariationChange = (key, value) => {
    console.log(value)

    let processedValue;

    if (value === '') {
      processedValue = ''; // Allow empty input
    }
    else if (value < 0) {
      processedValue = 0; // Allow empty input
    }
    else if (value === true) {
      processedValue = true;  // Convert "true" string to boolean true
    } else if (value === false) {
      processedValue = false; // Convert "false" string to boolean false
    } else {
      processedValue = Number(value); // Keep as string if it's neither boolean nor numeric
    }
  
    setVariation((prev) => ({ ...prev, [key]: processedValue }));
    // setVariation((prev) => ({ ...prev, [key]: Number(value) }));
  };

   // Handle changes for nested dimensions
   const handleDimensionChange = (dimensionKey, value) => {
   
    setVariation((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [dimensionKey]: Number(value) },
    }));
  };

  // Handle changes for nested attributes inside variation
  const handleNestedChange = (parentKey, index, key, value) => {
   
    setVariation((prev) => {
      const updatedArray = [...prev[parentKey]];
      updatedArray[index][key] = value;
      return { ...prev, [parentKey]: updatedArray };
    });
  };

  // Add a new empty price slab entry
  // const addPriceSlab = () => {
  //   setVariation((prev) => ({
  //     ...prev,
  //     priceSlabs: [...prev.priceSlabs, { min: "", max: "", price: "", Discount: "" }],
  //   }));
  // };

  // Add a new empty attribute entry
  const addAttribute = () => {
    setVariation((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { key: "", value: "" }],
    }));
  };

  // Save the current variation to variationsData
  const saveVariation = (update=false) => {

    const filteredVariation = { ...variation };
    if (filteredVariation.returnDays === '' || filteredVariation.returnDays === 0) {
      delete filteredVariation.returnDays;
    }

    if (filteredVariation.repeatBuyerDiscount === '') {
      filteredVariation.repeatBuyerDiscount=0;
    }

  
    setUserData((prevState) => {
      let updatedVariations = [...prevState.variationsData];
  
      if (update) {
        // Replace the item at updateIndex
        updatedVariations[updateindex] = filteredVariation;
        setisupdate(false)
      } else {
        // Append a new variation
        updatedVariations.push(filteredVariation);
      }
  
      return {
        ...prevState,
        variationsData: updatedVariations,
      };
    });
    

    setVariation({
      mrp: "",
      stock: "",
      gst: "",
      lowStockThreshold: "",
      repeatBuyerDiscount: "",
      priceSlabs: [],
      attributes: [],
      dimensions: { length: "", width: "", height: "" },
      weight:"",
      divertIndividualOrder: false,
      isReturnable: false,
          returnDays: 3,
          productImages:[]
    });
  
    setproductimages([])
setImages([])
setpreimages([])

    // Close modal
    setModalOpen(!ModalOpen);
    setShowReturnDaysInput(false);
  };


  const handleSubmit = async () => {
   
   let userDatacopy =structuredClone(userData);

   try{

    userDatacopy.productData.category=document.querySelector('.active342').getAttribute('categoryid');

  }catch(er){
    alert('Select Category')
    return;
  }

  if(userDatacopy.variationsData.length===0){
    alert('Add Price')
    return;
  }

    async function convertImagesToBase64(productData) {
      const variations = productData.variationsData;
  
      const convertToBase64 = (file) => {
          return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
          });
      };
  
      for (const variation of variations) {
          const images = variation.productImages;
  
          for (let i = 0; i < images.length; i++) {
              const imageFile = images[i];
  
              if (imageFile instanceof File) { // Check if the item is a File object
                  try {
                      const base64String = await convertToBase64(imageFile);
                      images[i] =  base64String; // Replace the file with Base64
                  } catch (error) {
                      console.error('Error converting image to Base64:', error);
                  }
              }
          }
      }
  
      return productData;
  }
  
  // Example usage
  // Assuming 'uploadedProductData' is your JSON object with actual File objects in productImages
  convertImagesToBase64(userDatacopy).then((result) => {
      console.log('Converted Product Data:', result);
      postdata(result)
  });

  
  async function postdata(data) {
   
    try {
      document.querySelector('.loaderoverlay').style.display='flex';

      const token = localStorage.getItem('token');

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/create`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
  document.querySelector('.loaderoverlay').style.display='none';
        alert("Product added successfully!");
      window.location='/supplier/Products';

      } else {
        const errorData = await response.json();
        document.querySelector('.loaderoverlay').style.display='none';
        alert("Failed to add Product: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      document.querySelector('.loaderoverlay').style.display='none';
      alert("Something went wrong!");
    }
  }


  };
  

  /////////////////////// update pricing

  //const [updatevariation, setupdateVariation] = useState(null);

  const updatePricing = (index) => {
    let selectedVariations = userData.variationsData.filter((_, i) => i === index);
 
    selectedVariations=selectedVariations[0];
    console.log(selectedVariations)
    setVariation({...selectedVariations});
    let newState = selectedVariations.isReturnable;
    setShowReturnDaysInput(newState);

    setproductimages([...selectedVariations.productImages])
    const files = Array.from(selectedVariations.productImages);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
setImages([...imageUrls])

try{
  setpreimages([...selectedVariations.awsImages])
}catch(err){
  setpreimages([])
}


    setisupdate(true)
    setupdateindex(index)
    toggleModal(false);
    

  };
console.log(variation)



function getproductdetails(productId) {

    
  console.log(productId);
  
  const token = localStorage.getItem('token');

      document.querySelector('.loaderoverlay').style.display = 'flex';

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/foradmin/${productId}`, {
        method: 'GET',
         headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((errorData) => {
             
              throw new Error(errorData.error || 'Failed');
            });
          }
        })
        .then((data) => {
       

        // Modify variations dynamically
data.data.variations.forEach(variation => {
  variation.awsImages = [...variation.productImages];  // Copy productImages to awsImages
  variation.productImages = [];  // Clear productImages
  variation.deleteImages = []; 
});

console.log(data.data)

        const { variations, ...filteredData } = data.data;

        setUserData({productData: filteredData,
          variationsData: [...data.data.variations]})
      
          setproductupdate(true)
       // setisdata(true)
        document.querySelector('.loaderoverlay').style.display = 'none';
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display = 'none';
          console.log(err)
         
         
        });
  
    
  }




  function postnewVariation(newVariation=false) {
    let updatevariation =structuredClone(variation);


    async function convertImagesToBase64(productData) {
      const variations = [productData];
  
      const convertToBase64 = (file) => {
          return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
          });
      };
  
      for (const variation of variations) {
          const images = variation.productImages;
  
          for (let i = 0; i < images.length; i++) {
              const imageFile = images[i];
  
              if (imageFile instanceof File) { // Check if the item is a File object
                  try {
                      const base64String = await convertToBase64(imageFile);
                      images[i] =  base64String; // Replace the file with Base64
                  } catch (error) {
                      console.error('Error converting image to Base64:', error);
                  }
              }
          }
      }
  
      return productData;
  }
  
  // Example usage
  // Assuming 'uploadedProductData' is your JSON object with actual File objects in productImages
  convertImagesToBase64(updatevariation).then((result) => {
      console.log('Converted Product Data:', result);
      postdata(result)
  });

  
  async function postdata(data) {
   
    try {
      document.querySelector('.loaderoverlay').style.display='flex';

      const token = localStorage.getItem('token');
      let pid = new URLSearchParams(window.location.search).get("pid");

      let uploadurl= newVariation ? `${process.env.NEXT_PUBLIC_BASE_URL}/product/variation/${pid}` : `${process.env.NEXT_PUBLIC_BASE_URL}/product/updateVariation/${pid}/${data._id}`;

      const response = await fetch(uploadurl, {
        method: newVariation ? "POST" : "PUT",
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
  document.querySelector('.loaderoverlay').style.display='none';
        alert("Product Updated successfully!");
 //     window.location=`/supplier/Products/add-update-product?pid=${pid}`;
 window.location.reload();

      } else {
        const errorData = await response.json();
        document.querySelector('.loaderoverlay').style.display='none';
        alert("Failed to Update Product: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      document.querySelector('.loaderoverlay').style.display='none';
      alert("Something went wrong!");
    }
  }

  }



async function Updateproductdetails() {
  
  try {
    document.querySelector('.loaderoverlay').style.display='flex';

    const token = localStorage.getItem('token');
    
    let pid = new URLSearchParams(window.location.search).get("pid");


    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/updateproduct/${pid}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
      body: JSON.stringify(userData.productData),
    });

    if (response.ok) {
document.querySelector('.loaderoverlay').style.display='none';
      alert("Product Updated successfully!");


    } else {
      const errorData = await response.json();
      document.querySelector('.loaderoverlay').style.display='none';
      alert("Failed to Update Product: " + errorData.message);
    }
  } catch (error) {
    console.error("Error:", error);
    document.querySelector('.loaderoverlay').style.display='none';
    alert("Something went wrong!");
  }

}


  function deletevariation(vid) {

    
    const token = localStorage.getItem('token');
  
    let pid = new URLSearchParams(window.location.search).get("pid");

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/variation/${pid}/${vid}`, {
          method: 'DELETE',
           headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        }
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((errorData) => {
               
                throw new Error(errorData.error || 'Failed');
              });
            }
          })
          .then((data) => {
         
  
          alert(data.message)
          window.location.reload();
          })
          .catch((err) => {
            document.querySelector('.loaderoverlay').style.display = 'none';
            console.log(err)
           
           
          });
    
      
    }

// stop scrool when active input
  // useEffect(() => {
  //   const preventScroll = (event) => {
  //     if (document.activeElement.type === "number") {
  //       event.preventDefault();
  //     }
  //   };

  //   window.addEventListener("wheel", preventScroll, { passive: false });

  //   return () => {
  //     window.removeEventListener("wheel", preventScroll);
  //   };
  // }, []);



  function removeattribute(index) {
   
    let updatedattributes = variation.attributes.filter((_, i) => i !== index);

     setVariation({...variation,attributes:updatedattributes})

  }


  function removecommanattribute(index) {
   
    let updatedcommanattributes = userData.productData.commonAttributes.filter((_, i) => i !== index);
    
    setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        commonAttributes: updatedcommanattributes,
      },
    }));


  }


  function removereason(index) {
   
    let updatedreason = userData.productData.reasonForReturn.filter((_, i) => i !== index);
    console.log(index,updatedreason)
    setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        reasonForReturn: updatedreason,
      },
    }));


  }


  function remopriceslab(index) {
   
    if(variation.priceSlabs.length!==1){

      let updatedslab = variation.priceSlabs.filter((_, i) => i !== index);

     setVariation({...variation,priceSlabs:updatedslab})
    }else{
      alert('You need to add at least one price slab.')
    }
    

  }

  return (
    <div className="order-details">
      <div className="header">
        <button className="back-button">
        <Goback/>
        </button>
        <h2>Add/Update Product</h2>
     
      </div>

      <div className="add-product-container">
      <div className={productupdate ? 'basic-info2' : 'basic-info'}>
        <h2>Basic Information</h2>
        <div className="input-group">
          <label htmlFor="product-name">Enter Product Name *</label>
          <input id="product-name" type="text" placeholder="John Doe"    value={userData.productData.productName || ""}
          onChange={(e) => handleProductDataChange("productName", e.target.value)}/>
        </div>
        {/* <div className="input-group">
          <label htmlFor="brand-name">Enter Brand Name *</label>
          <input id="brand-name" type="text" placeholder="John Doe" value={userData.productData.BrandName || ""}
          onChange={(e) => handleProductDataChange("BrandName", e.target.value)}/>
        </div> */}
        <div className="input-group">
          <label htmlFor="description">Enter Description</label>
          {/* <textarea id="description" placeholder="Explain the product" value={userData.productData.description || ""}
          onChange={(e) => handleProductDataChange("description", e.target.value)}></textarea> */}
          
          <QuillEditor value={userData.productData.description || ""} onChange={(value) => handleProductDataChange("description", value)}  editorwidth={'200px'}/>
        </div>

        <div className="input-group">
          <label htmlFor="product-video">Enter Product Video (Optional)</label>
          <input id="product-video" type="text" placeholder="John Doe"    value={userData.productData.productVideo || ""}
          onChange={(e) => handleProductDataChange("productVideo", e.target.value)} />
        </div>

        {/* <div className="input-group">
          <label htmlFor="Product-url">Enter Amazon Product url</label>
          <input id="Product-url" type="text" placeholder="url"    value={userData.productData.amazoneProductUrl || ""}
          onChange={(e) => handleProductDataChange("amazoneProductUrl", e.target.value)} />
        </div> */}

        <label htmlFor="product-video" style={{marginRight:'10px'}}>Add Common Attributes</label>

        <i
        className="fas fa-plus-circle"
        style={{ color: "green", fontSize: "20px", cursor: "pointer" ,margin:'20px 0px'}}
        onClick={addCommonAttribute}
      ></i>

      {userData.productData.commonAttributes.map((item, index) => (
        <div className="quantity-range" key={index} style={{ margin: "20px 0px" }}>
          <div className="form-group">
          <div style={{display:'flex',justifyContent:'space-between'}}>

            <label className="form-label">Common Attributes</label>
            <i className="fas fa-times" style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
                  onClick={()=>{removecommanattribute(index)}}></i>
                  </div>
            <div className="range-container">
              <input
                type="text"
                className="form-input small-input"
                placeholder="Key"
                style={{ width: "100px" }}
                value={item.key}
                onChange={(e) => handleCommonAttributeChange(index, "key", e.target.value)}
              />

              <input
                type="text"
                className="form-input small-input"
                placeholder="Value"
                style={{ width: "100px" }}
                value={item.value}
                onChange={(e) => handleCommonAttributeChange(index, "value", e.target.value)}
              />

           
            </div>
          </div>
        </div>
      ))}

<br/>

<label htmlFor="product-video" style={{marginRight:'10px'}}>Add reasons for product return.</label>

<i
className="fas fa-plus-circle"
style={{ color: "green", fontSize: "20px", cursor: "pointer" ,margin:'20px 0px'}}
onClick={addreason}
></i>

{userData.productData.reasonForReturn && userData.productData.reasonForReturn.map((item, index) => (
<div className="quantity-range" key={index} style={{ margin: "20px 0px" }}>
  <div className="form-group">
  <div style={{display:'flex',justifyContent:'space-between'}}>

    <label className="form-label">Reason {index+1}</label>
    <i className="fas fa-times" style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
          onClick={()=>{removereason(index)}}></i>
          </div>
    <div className="range-container">
      <input
        type="text"
        className="form-input small-input"
        placeholder="Write Reason"
        style={{ width: "100px" }}
        value={item}
        onChange={(e) => handlereasonChange(index, e.target.value)}
      />


   
    </div>
  </div>
</div>
))}


       
      </div>
    {!productupdate &&  <div className="add-category-location" style={{height:'650px',overflowY:'auto'}}>
        <div className="add-category">
          <h2>Add/Create Category</h2>
         
          <div className="category-actions" style={{display:'flex',justifyContent:'space-between',marginBottom:'30px'}}>
        
        <button className="create-new" onClick={()=>toggleAddCategory(false)}>
         Create Category
         <i className="fas fa-plus"></i>
       </button>
       {changeurl && <button className="create-new"  onClick={()=>toggleAddCategory(true)}>
         Create Sub Category
         <i className="fas fa-plus"></i>
       </button>}
          </div>


          <div className="category-actions">
           
          <NestedDropdown342 categories={categories} changeurl={setchangeurl} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

       {addcategory && <Addcategory  subcategory={subcategory} toggleaddcategory={toggleAddCategory} refreshCategories={refreshCategories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>}

          </div>

        

        </div>

        {/* <div className="add-location">
          <h2>Add Location/s</h2>
          <div className="input-group">
            <label htmlFor="pincode">Enter PinCode</label>
            <input id="pincode" type="text" placeholder="000000" />
          </div>
          <div className="selected-locations">
            <span>201301 <img src="\icons\smcross.svg" alt="" /></span>
            <span>111011 <img src="\icons\smcross.svg" alt="" /></span>
            <span>301504 <img src="\icons\smcross.svg" alt="" /></span>
          </div>
        </div> */}


      </div>}
    </div>

    {/* <p style={{margin:'40px 0px',textAlign:'left'}}>Add Product Images</p>
    <div className="image-uploader" style={{marginBottom:'50px'}}>
 
      <div className="add-image">
        <input
          type="file"
          id="imageInput"
          multiple
          onChange={handleImageUpload}
          accept="image/*"
        />
        <label htmlFor="imageInput" className="add-image-label">
        <img src="\icons\upcross.svg" alt=""  width={'30px'}/>
          <p>Add Image</p>
        </label>
      </div>
      <div className="image-preview">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image} alt={`preview-${index}`} />
            <button
              className="remove-button"
              onClick={() => removeImage(index)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </div> */}

<div style={{width:'100%',display:'flex',justifyContent:'flex-start'}}>
  
    {productupdate &&  <button className="update-button" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'15px',margin:'30px 0px'}} onClick={()=>{Updateproductdetails()}}>Update</button>}

    </div>

    <div className="container" style={{marginTop:'50px'}}>
      <div className="pricing-section">
       {!userData.variationsData.length === 0 && <h2 className="section-title">Pricing</h2>}
        {userData.variationsData.map((pricing, index) => (
          <div key={index} className="pricing-item">
            <span>
              {index + 1}. Net Price:<><span style={{color:'#1389F0'}}> ₹{pricing.mrp}</span></> / Stock: <><span style={{color:'#1389F0'}}>{pricing.stock}</span></> Units
            </span>
            <div className="actions">

              <button className="edit-btn" onClick={() => updatePricing(index)}>
                <i className="fas fa-edit"></i>
              </button>

           { productupdate ? <button className="delete-btn" onClick={() => deletevariation(pricing._id)}>
                <i className="fas fa-trash-alt"></i>
              </button> :  <button className="delete-btn" onClick={() => removePricing(index)}>
                <i className="fas fa-trash-alt"></i>
              </button>}

            </div>
          </div>
        ))}

        <button className="add-btn" onClick={toggleModal}>
          Add Pricing <i className="fas fa-plus"></i>
        </button>
      </div>
      {/* <div className="others-section">
        <h2 className="section-title">Others</h2>

          
      <div className="input-group" style={{ width: "350px", display: "flex", justifyContent: "space-between", border: "1px solid black", alignItems: "center", padding: "5px", borderRadius: "5px" }}>
        <label>{showDeliveryFeeInput ? "Enter Delivery Fee" : "Free Delivery"}</label>

       
        {showDeliveryFeeInput && (
          <input
            type="number"
            placeholder="Enter Amount"
            className="input-group"
            style={{ width: "110px", marginBottom: "0px" }}
            value={userData.productData.deliveryFee || ""}
            onChange={(e) => handleProductDataChange("deliveryFee", e.target.value)}
          />
        )}


        <label className="switch">
          <input
            type="checkbox"
            className="deliveryen"
            checked={userData.productData.isDeliveryFree} // ✅ Ensures it appears ON initially
            onChange={() => {
              const newState = !userData.productData.isDeliveryFree;
              setShowDeliveryFeeInput(!newState); // ✅ Show input only when free delivery is OFF
              handleProductDataChange("isDeliveryFree", newState);
              if (newState) {
                handleProductDataChange("deliveryFee", null); // ✅ Reset fee if free delivery is selected
              }
            }}
          />
          <span className="slider round"></span>
        </label>
      </div>
    



        <div className="input-group">
          <label>Enter additional taxes if available</label>
          <input type="number" placeholder="500"  value={userData.productData.taxes || ""}
          onChange={(e) => handleProductDataChange("taxes", e.target.value)}/>
        </div>
      </div> */}
    </div>

    <div className="action-buttons">

    {  !productupdate && <><button className="cancel-button" onClick={()=>{location.reload();}}>Cancel</button>
        <button className="update-button" onClick={handleSubmit}>Add Product</button>
        </>}
      </div>


     
      
      {ModalOpen && (
        <div className="modal-overlay">
          <form className="form" style={{ height: "90vh", overflowY: "auto"}}  onSubmit={(e)=>{
                e.preventDefault();

                isupdate ? (productupdate?postnewVariation():saveVariation(true)) : saveVariation()
                
                
                }}>
            {/* MRP Input */}
            <div className="form-group">
              <label className="form-label">MRP</label>
              <input
                type="number"
                className="form-input"
                placeholder="Eg. 500/-"
                value={variation.mrp}
                onChange={(e) => handleVariationChange("mrp", e.target.value)}
                required
              />
            </div>

            {/* Stock Input */}
            <div className="form-group">
              <label className="form-label">Stock Keeping Unit</label>
              <input
                type="number"
                className="form-input"
                placeholder="Eg. 1000"
                value={variation.stock}
                onChange={(e) => handleVariationChange("stock", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">GST %</label>
              <input
                type="number"
                className="form-input"
                placeholder="Eg. 10%"
                value={variation.gst}
                required
                onChange={(e) => handleVariationChange("gst", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Low Stock Threshold</label>
              <input
                type="number"
                className="form-input"
                placeholder="Eg. 10"
                value={variation.lowStockThreshold}
                onChange={(e) => handleVariationChange("lowStockThreshold", e.target.value)}
                required
              />
            </div>



            {/* Repeat Buyer Discount */}
            <div className="form-group">
              <label className="form-label">Repeat Buyer Discount (Optional)</label>
              <input
                type="number"
                className="form-input"
                placeholder="Enter additional discount in (%)"
                value={variation.repeatBuyerDiscount}
                onChange={(e) => handleVariationChange("repeatBuyerDiscount", e.target.value)}
                
              />
            </div>


            <p style={{margin:'40px 0px',textAlign:'left'}}>Add Product Images</p>
    <div className="image-uploader" style={{marginBottom:'50px'}}>
 
      <div className="add-image">
        <input
          type="file"
          id="imageInput"
          multiple
          onChange={handleImageUpload}
          accept="image/*"
        />
        <label htmlFor="imageInput" className="add-image-label">
        <img src="\icons\upcross.svg" alt=""  width={'30px'}/>
          <p>Add Image</p>
        </label>
      </div>
      <div className="image-preview">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image} alt={`preview-${index}`} />
            <button
              className="remove-button"
              onClick={(e) => {
                e.preventDefault();
                removeImage(index)}}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}

{preimages.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image} alt={`preview-${index}`} />
            <button
              className="remove-button"
              onClick={(e) => {
                e.preventDefault();
                removepreImage(index)}}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
      
      

    </div>


            {/* Add Attributes */}
            <div style={{display:"flex",gap:'10px',alignItems:'center'}}>
            <strong className="form-label"  style={{fontSize:'18px',margin:'15px 0px',color:'#1389F0'}}>Add Attributes</strong>
            <i
              className="fas fa-plus-circle"
              style={{ color: "green", fontSize: "20px", cursor: "pointer" }}
              onClick={addAttribute}
            ></i>
</div>

            {variation.attributes.map((attr, index) => (
              <div className="quantity-range" key={index}>
                <div className="form-group">

                  <div style={{display:'flex',justifyContent:'space-between'}}>
                  <label className="form-label">Attributes</label>
                  <i className="fas fa-times" style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
                  onClick={()=>{removeattribute(index)}}></i>
                  </div>

                  <div className="range-container">
                    <input
                      type="text"
                      className="form-input small-input"
                      placeholder="Key"
                      style={{ width: "100px" }}
                      value={attr.key}
                      onChange={(e) => handleNestedChange("attributes", index, "key", e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      className="form-input small-input"
                      placeholder="Value"
                      style={{ width: "100px" }}
                      value={attr.value}
                      onChange={(e) => handleNestedChange("attributes", index, "value", e.target.value)}
                      required
                    />
                    
                  </div>
                </div>
              </div>
            ))}


            {/* Dimensions */}
            {/* <strong className="form-label"  style={{fontSize:'18px',margin:'15px 0px',color:'#1389F0'}}> Add Dimensions</strong>  */}

         <div className="quantity-range" style={{marginTop:'40px'}}>
          <div className="form-group">
            <strong className="form-label" style={{marginBottom:'15px'}}>Add Dimensions in centimeter</strong>
            <div className="range-container">

            <div style={{display:"flex",flexDirection:'column',gap:'10px',justifyContent:'center'}}> 
              <p>Length</p>
              
              <input
                type="number"
                className="form-input small-input"
                required
                placeholder=""
                style={{width:'100px'}}
                value={variation.dimensions.length||''}
                onChange={(e) => handleDimensionChange("length", e.target.value)}
              />
            
            </div>

            <div style={{display:"flex",flexDirection:'column',gap:'10px',justifyContent:'center'}}> 
            <p>Height</p>
              <input
                type="number"
                className="form-input small-input"
                placeholder=""
                required
                style={{width:'100px'}}
                value={variation.dimensions.height||''}
                onChange={(e) => handleDimensionChange("height", e.target.value)}
              />
                  
            </div>

<div style={{display:"flex",flexDirection:'column',gap:'10px',justifyContent:'center'}}> 
<p>Width</p>
               <input
                type="number"
                className="form-input small-input"
                placeholder=""
                required
                style={{width:'100px'}}
                value={variation.dimensions.width||''}
                onChange={(e) => handleDimensionChange("width", e.target.value)}
              />
                  
            </div>
            </div>
          </div>
          </div>


 {/* weight */}
          <div className="quantity-range">
          <div className="form-group">
            <strong className="form-label">Add weight in kg</strong>
            <div className="range-container">
            
               <input
                type="number"
                className="form-input small-input"
                placeholder="In kg"
                required
                value={variation.weight}
                onChange={(e) => handleVariationChange("weight", e.target.value)}
              />
            </div>
          </div>
          </div>


            {/* Add Price Slabs */}
            <strong className="form-label" style={{fontSize:'18px',margin:'15px 0px',color:'#1389F0'}}>Add Price Slabs</strong>
            
          
            {variation.priceSlabs.map((slab, index) => (
        <div className="quantity-range" key={index}>
          <div className="form-group">
          <div style={{display:'flex',justifyContent:'space-between'}}>

            <strong className="form-label" style={{ marginBottom: "10px" }}>
              Type: {slab.type==='individual'?'individual / retailer':(slab.type==='retailer'?'wholesaler':'wholesaler - Bulk Qty')}
            </strong>
            
            <i className="fas fa-times" style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
                  onClick={()=>{remopriceslab(index)}}></i>

                  </div>

            <label className="form-label">Enter Quantity Range</label>
            <div className="range-container">
              <input
                type="number"
                className="form-input small-input"
                placeholder="Lower Limit"
                style={{ width: "100px" }}
                value={slab.min||''}
                onChange={(e) => {
                  const updatedSlabs = [...variation.priceSlabs];
                  updatedSlabs[index].min = Number(e.target.value);
                  setVariation({ ...variation, priceSlabs: updatedSlabs });
                }}
                required
              />
              <span className="range-icon">
                <i className="fas fa-arrow-right"></i>
              </span>
              <input
                type="number"
                className="form-input small-input"
                placeholder="Upper Limit"
                style={{ width: "100px" }}
                value={slab.max||''}
                onChange={(e) => {
                  const updatedSlabs = [...variation.priceSlabs];
                  updatedSlabs[index].max = Number(e.target.value);
                  setVariation({ ...variation, priceSlabs: updatedSlabs });
                }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Enter Discount (%)</label>
            <input
              type="number"
              className="form-input"
              placeholder="Enter discount"
              value={slab.discount}
              onChange={(e) => {
                const updatedSlabs = [...variation.priceSlabs];
                updatedSlabs[index].discount = e.target.value !== ''? Number(e.target.value) : '';
                setVariation({ ...variation, priceSlabs: updatedSlabs });
              }}
              
            />
          </div>

          <div className="form-group">
            <label className="form-label">Enter Delivery Fee</label>
            <input
              type="number"
              className="form-input"
              placeholder="Delivery Fee"
              value={slab.deliveryFee}
              onChange={(e) => {
                const updatedSlabs = [...variation.priceSlabs];
                updatedSlabs[index].deliveryFee = e.target.value !== '' ? Number(e.target.value) : '';
                setVariation({ ...variation, priceSlabs: updatedSlabs });
              }}
              required
            />
          </div>

        </div>
      ))}


              {/* Enable Return with Max Days */}
              <div className="input-group" style={{ display: "flex", justifyContent: "space-between", border: "1px solid black", alignItems: "center", padding: "5px", borderRadius: "5px" }}>
        <label>Enable Return</label>
        {showReturnDaysInput && (
          <input
            type="number"
            placeholder="Enter Max Days"
            className="input-group"
            style={{ width: "70px", marginBottom: "0px" }}
            value={variation.returnDays}
            onChange={(e) => {
              console.log(e.target.value)
            //   if(Number(e.target.value)<1 || variation.returnDays === null){
            //     handleVariationChange("returnDays",'1')
            //   }else{
            //   handleVariationChange("returnDays", e.target.value)
            // }
            }}
            required
          />
        )}

{variation.isReturnable && <label>Days</label>}

        <label className="switch">
          <input
            type="checkbox"
            checked={variation.isReturnable}
            onChange={() => {
              const newState = !variation.isReturnable;
              setShowReturnDaysInput(newState);
              handleVariationChange("isReturnable", newState);
              // if (!newState) {
              //   handleVariationChange("returnDays", null); // Reset return days if return is disabled
              // }
            }}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {/* Divert Small Order */}
      <div className="input-group" style={{ display: "flex", justifyContent: "space-between", border: "1px solid black", alignItems: "center", padding: "5px", borderRadius: "5px" }}>
        <label>Divert Individual Order to Coslomart</label>
        <label className="switch">
          <input
            type="checkbox"
            checked={variation.divertIndividualOrder}
            onChange={() => handleVariationChange("divertIndividualOrder", !variation.divertIndividualOrder)}
          />
          <span className="slider round"></span>
        </label>
      </div>


            <div className="button-group">


            {isupdate === false && <button
          type="button"
          className="cancel-button"
          onClick={() => {
            // Remove current slab when cancel button is clicked
            if (variation.priceSlabs.length > 0) {
              removePriceSlab(variation.priceSlabs.length - 1);
            }

            setproductimages([])
setImages([])

            setModalOpen(!ModalOpen); // Close the modal
            
          }}
        >
          Cancel
        </button>}


             {isupdate ? <button type="submit" className="save-button">
                Update Price
              </button> : (productupdate ? <button type="submit" className="save-button" onClick={()=>{postnewVariation(true)}}>
                Save Price
              </button> :<button type="submit" className="save-button">
                Save Price
              </button>)}


            </div>
          </form>
        </div>
      )}



{confirmationOpen && (
        <div className="modal-overlay">
 
           <div className="confirmation-box">
      <div className="icon">
        {/* Replace the src below with the actual path to your image */}
        <img
          src="\icons\svggg.png"
          alt="Icon"
          className="icon-image"
        />
      </div>
      <p className="message">Are you sure ?</p>
      <div className="button-group">
        <button className="button no-button" onClick={toggleconfirmation}>No</button>
        <button className="button yes-button">Yes</button>
      </div>
    </div>
             </div>
      )}

      <>{Compareprice && (<Comparepriceother toggleCompareprice={toggleCompareprice}/>)}</>
{/* <Choosecategory  toggleChoosecategory={toggleCompareprice}/> */}
   
    </div>
  );
}



function Addcategory({ toggleaddcategory, refreshCategories ,subcategory,activeCategory, setActiveCategory}) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImages, setCategoryImages] = useState([]);
  const [categoryimages, setcategoryimages] = useState([]);

  console.log(categoryimages,categoryImages)
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setCategoryImages(files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setcategoryimages((prevImages) => [...prevImages, ...imageUrls]);

  };

  const removeImagec = (index) => {
    setCategoryImages(categoryImages.filter((_, i) => i !== index));
    setcategoryimages(categoryimages.filter((_, i) => i !== index));
  };


  const handleSubmit = async () => {
    if (!categoryName || categoryImages.length === 0) {
      alert("Please fill all fields and upload an image.");

      return;
    
    }
  
    const formData = new FormData();
    formData.append("name", categoryName);
    // formData.append("description", categoryDescription);
    formData.append("categoryImage", categoryImages[0]); // Only sending one file
  if(subcategory){
   let id = document.querySelector('.active342').getAttribute('categoryid');
   console.log(id)
    formData.append("parent", id);
  }
    // Append multiple images
  // categoryImages.forEach((image, index) => {
  //   formData.append("categoryImage", image); // Ensure your backend supports multiple images
  // });
  
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/create`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
        body: formData,
      });
  
      if (response.ok) {
        alert("Category added successfully!");
        setActiveCategory(null)
        toggleaddcategory();
        refreshCategories(); // Reload category list
      } else {
        const errorData = await response.json();
        alert("Failed to add category: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="addcategory">
        <div className="form" style={{ width: '600px' }}>
          <div className="form-group">
            <label className="form-label">Enter Category Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Eg. Fashion"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          
          {/* <div className="input-group">
          <label htmlFor="description">Enter Description</label>
          <textarea className='form-input' placeholder="Explain the category" value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)}></textarea>
        </div> */}

          <div className="image-uploader">

{categoryImages.length < 1 && <div className="add-image">
 <input
   type="file"
   id="categoryImageInput"
   onChange={handleImageUpload}
   accept="image/*"
 />
 <label htmlFor="categoryImageInput" className="add-image-label">
 <img src="\icons\upcross.svg" alt=""  width={'30px'}/>
   <p>Add Image</p>
 </label>
</div>}


<div className="image-preview" style={{width:'auto'}}>
 {categoryimages.map((image, index) => (
   <div className="image-container" key={index}>
     <img src={image} alt={`preview-${index}`} />
     <button
       className="remove-button"
       onClick={() => removeImagec(index)}
     >
       <i className="fas fa-times"></i>
     </button>
   </div>
 ))}
</div>
</div>



          <div className="button-group">
            <button className="cancel-button" onClick={toggleaddcategory}>
              Cancel
            </button>
            <button className="save-button" onClick={handleSubmit}>
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




function Comparepriceother({toggleCompareprice}) {

  return (
      <div className="modal-overlay">

      <div style={{width:'80vw',height:'80vh', backgroundColor:'white',padding:'15px',borderRadius:'10px',overflowY:'auto'}}>

      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'20px'}}>
          
            <i onClick={toggleCompareprice} style={{cursor:'pointer',fontSize:'20px'}} className="fa fa-times"></i>
          
          </div>
          
<p style={{fontSize:'22px',textAlign:'left'}}>Compare Product Price</p>

      <div style={{display:'flex',justifyContent:'space-between',margin:'20px 0px'}}>
<div  style={{backgroundColor:'rgb(233 233 233)',display:'flex',gap:'10px',padding:'10px',borderRadius:'10px'}}>
<i className="fas fa-search" style={{cursor:'pointer'}}></i>
<input type="text" placeholder='Search Item' style={{border:'none',outline:'none',backgroundColor:'rgb(233 233 233)',width:'300px'}}/>
</div>

</div>


<div className="compareContainer995">
      <p style={{marginBottom:'50px',fontSize:'22px',textAlign:'left'}}>Amazon Results</p>
      <div className="compareGrid995">

      <div className="cardContainer975">
      <div className="header975">
      <img src="\icons\amazon.svg" alt="Amazon Logo" className="logo975" />
        
      </div>
      <div className="imageContainer975">
        <img
          src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smar" // Replace with actual image URL
          alt="NanoCharge 5000mAh Battery Module"
          className="productImage975"
        />
      </div>
      <div className="details975">
        <p className="productTitle975">NanoCharge 5000mAh Battery Module</p>
        <p className="seller975">Seller Random</p>
      </div>
      <div className="price975">
        <span className="label975">Price</span>
        <span className="value975">₹240.00</span>
      </div>
    </div>

    <div className="cardContainer975">
      <div className="header975">
      <img src="\icons\amazon.svg" alt="Amazon Logo" className="logo975" />
        
      </div>
      <div className="imageContainer975">
        <img
          src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smar" // Replace with actual image URL
          alt="NanoCharge 5000mAh Battery Module"
          className="productImage975"
        />
      </div>
      <div className="details975">
        <p className="productTitle975">NanoCharge 5000mAh Battery Module</p>
        <p className="seller975">Seller Random</p>
      </div>
      <div className="price975">
        <span className="label975">Price</span>
        <span className="value975">₹323.00</span>
      </div>
    </div>

    <div className="cardContainer975">
      <div className="header975">
        <img src="\icons\amazon.svg" alt="Amazon Logo" className="logo975" />
        
      </div>
      <div className="imageContainer975">
        <img
          src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smar" // Replace with actual image URL
          alt="NanoCharge 5000mAh Battery Module"
          className="productImage975"
        />
      </div>
      <div className="details975">
        <p className="productTitle975">NanoCharge 5000mAh Battery Module</p>
        <p className="seller975">Seller Random</p>
      </div>
      <div className="price975">
        <span className="label975">Price</span>
        <span className="value975">₹348.00</span>
      </div>
    </div>

        
      </div>
    </div>


    
<div className="compareContainer995">
      <p style={{marginBottom:'50px',fontSize:'22px',textAlign:'left'}}>Flipkart Results</p>
      <div className="compareGrid995">

      <div className="cardContainer975">
      <div className="header975">
      <img src="\icons\flipkart.svg" alt="Amazon Logo" className="logo975" />
        
      </div>
      <div className="imageContainer975">
        <img
          src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smar" // Replace with actual image URL
          alt="NanoCharge 5000mAh Battery Module"
          className="productImage975"
        />
      </div>
      <div className="details975">
        <p className="productTitle975">NanoCharge 5000mAh Battery Module</p>
        <p className="seller975">Seller Random</p>
      </div>
      <div className="price975">
        <span className="label975">Price</span>
        <span className="value975">₹240.00</span>
      </div>
    </div>

    <div className="cardContainer975">
      <div className="header975">
        <img src="\icons\flipkart.svg" alt="Amazon Logo" className="logo975" />
        
      </div>
      <div className="imageContainer975">
        <img
          src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smar" // Replace with actual image URL
          alt="NanoCharge 5000mAh Battery Module"
          className="productImage975"
        />
      </div>
      <div className="details975">
        <p className="productTitle975">NanoCharge 5000mAh Battery Module</p>
        <p className="seller975">Seller Random</p>
      </div>
      <div className="price975">
        <span className="label975">Price</span>
        <span className="value975">₹323.00</span>
      </div>
    </div>

    <div className="cardContainer975">
      <div className="header975">
      <img src="\icons\flipkart.svg" alt="Amazon Logo" className="logo975" />
        
      </div>
      <div className="imageContainer975">
        <img
          src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smar" // Replace with actual image URL
          alt="NanoCharge 5000mAh Battery Module"
          className="productImage975"
        />
      </div>
      <div className="details975">
        <p className="productTitle975">NanoCharge 5000mAh Battery Module</p>
        <p className="seller975">Seller Random</p>
      </div>
      <div className="price975">
        <span className="label975">Price</span>
        <span className="value975">₹348.00</span>
      </div>
    </div>

        
      </div>
    </div>

      </div>

           </div>
    
  )
}



function Choosecategory({toggleChoosecategory}) {
  
  return (
    <div className="modal-overlay">

    <div style={{width:'80vw',height:'80vh', backgroundColor:'white',padding:'15px',borderRadius:'10px',overflowY:'auto'}}>

    <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'20px'}}>
        
          <i onClick={toggleChoosecategory} style={{cursor:'pointer',fontSize:'20px'}} className="fa fa-times"></i>
        
        </div>
        


<div className="compareContainer995">
    <p style={{marginBottom:'50px',fontSize:'22px',textAlign:'center'}}>Category Name</p>
    <div className="compareGrid995">

   //// add
      
    </div>
  </div>


  

    </div>

         </div>
  
)
}


const categories = [

  {
    name: 'Mobile',
    subcategories: [
      { name: 'Nokia' },
      { name: 'LG' },
    ],
  },
  {
    name: 'Earphone',
    subcategories: [
      {
        name: 'JBL',
        subcategories:[{ name: 'Wireless2' },
          { name: 'Wired2' },]
      },
      {
        name: 'Boat',
        subcategories: [
          { name: 'Wireless' },
          { name: 'Wired',
            subcategories:[{ name: 'Wireless2' },
              { name: 'Wired2' },]
           },
        ],
      },
    ],
  },
];

// Function to generate unique paths for each category
const generatePaths = (categories, parentPath = '') => {
  return categories.map((category, index) => {
    const path = `${parentPath}/${category.name}-${index}`;
    const updatedCategory = { ...category, path };

    if (category.subcategories) {
      updatedCategory.subcategories = generatePaths(category.subcategories, path);
    }

    return updatedCategory;
  });
};


const NestedDropdown342 = ({changeurl,categories,activeCategory, setActiveCategory}) => {
 
  const [openCategories, setOpenCategories] = useState([]);
//  const [activeCategory, setActiveCategory] = useState(null);



  const toggleCategory = (id) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  };

  const setActive = (id) => {
    setActiveCategory(id);
    changeurl(true)
  };

  const renderCategories = (categories, level = 0) => {
    return (
      <ul className={`category-list342 level-${level}`}>
        {categories.map((category) => {
          const hasChildren = category.children && category.children.length > 0;
          const isOpen = openCategories.includes(category.id);
          const isActive = activeCategory === category.id;

          return (
            <li key={category.id}>
              <div className={`category-item342 ${isActive ? "active342" : ""}`}  categoryid={category.id} >
                {hasChildren ? (
                  <button className="toggle-icon342" onClick={() => toggleCategory(category.id)}>
                    {isOpen ? <i className="fas fa-minus" style={{fontSize:'17px',color:'#9b9b9b'}}></i> : <i className="fas fa-plus" style={{fontSize:'17px',color:'#9b9b9b'}}></i>}
                  </button>
                ) : (
                  <span className="cross-icon342">
                    <i className="fas fa-plus" style={{ visibility: "hidden" ,fontSize:'17px',color:'#9b9b9b'}}></i>
                  </span>
                )}
                <span onClick={() => setActive(category.id)} className="category-name342">
                  {category.name}
                </span>
              </div>
              {hasChildren && isOpen && (
                <div className="subcategory-container342">
                  {renderCategories(category.children, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return <div className="dropdown-container342">{renderCategories(categories)}</div>;
};