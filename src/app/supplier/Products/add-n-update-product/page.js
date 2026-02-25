'use client'
import '../add-update-product/page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
import Link from 'next/link';
import { useState, useEffect } from "react";
import Goback from '../../../back.js'
import usePreventNumberInputScroll from '../../../component/usePreventNumberInputScroll.js';
import SelectedAttributeArray from '../../../component/selectedAttributeArray.js';
import AmenitiesSelector from '../../../component/AmenitiesSelector.js';
import getCategoryNestingLevel from '../../../component/getCategoryNestingLevel.js';
import PropertyLocationForm from '../../../component/PropertyLocationForm.js';
import PropertyListingForm from '../../../component/PropertyListingForm.js';

import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('../../../component/QuillEditor.js'), { ssr: false });



export default function Page() {

  const [userData, setUserData] = useState({
    productData: {
      productName: "",
      primaryAttribute: "",
      productType: "",
      description: "",
      productVideo: "",
      pdfFile: "",
      latitude: "",
      longitude: "",
      approvalType: "",
      khataType: "",
      images: [],
      commonAttributes: [],
      reasonForReturn: [],
      ammenties: [],
      category: "",
      tag: "",
      BrandName: "",
      amazoneProductUrl: "",
      canCall: true,
      canBook: true,
      priceRange: { minPrice: 0, maxPrice: 0 },
      moq: 0
    },
    variationsData: [

    ],
  });

  const [AllAttributes, setAllAttributes] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [ModalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setconfirmationOpen] = useState(false);
  const [Compareprice, setCompareprice] = useState(false);
  const [showinput, setshowinput] = useState(true);
  const [showinput2, setshowinput2] = useState(false);

  const [changeurl, setchangeurl] = useState(false);
  const [addcategory, setAddCategory] = useState(false);
  const [subcategory, setsubcategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [Attributes, setAttributes] = useState(1)
  const [commonAttributes, setcommonAttributes] = useState(1)
  const [showDeliveryFeeInput, setShowDeliveryFeeInput] = useState(!userData.productData.isDeliveryFree);
  const [showReturnDaysInput, setShowReturnDaysInput] = useState(userData.productData.isReturnAvailable);
  const [productimages, setproductimages] = useState([]);

  const [images, setImages] = useState([]);

  const [isupdate, setisupdate] = useState(false);
  const [updateindex, setupdateindex] = useState(false);
  const [productupdate, setproductupdate] = useState(false);
  const [preimages, setpreimages] = useState([]);
  const [tags, settags] = useState([]);
  const [selectedtag, setselectedtag] = useState('');
  const [selectedPricingIndex, setSelectedPricingIndex] = useState(null);
  const [primaryGroup, setPrimaryGroup] = useState('');
  const [showMap, setshowMap] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [LocationformData, setLocationFormData] = useState(null);
  const [propertyVideo, setPropertyVideo] = useState(null);
  const [propertyvariations, setpropertyvariations] = useState([{
    id: Date.now(),
    totalSqft: '',
    perSqftCost: '',
    totalCost: 0,
    bhkTypes: [],
    productImages: [],
  }]);



  const handleVideoUpload = (files) => {
    const fileArray = Array.from(files);
    if (fileArray.length > 0) {
      // Store the actual File object, not base64
      setPropertyVideo(fileArray[0]);
    }
  };

  const removeVideo = () => {
    setPropertyVideo(null);
  };


  const handleVideoSubmit = async (id) => {

    if (productupdate) { document.querySelector('.loaderoverlay').style.display = 'flex'; }


    const formData = new FormData();

    // Add property video with key name "propertvideo"
    if (propertyVideo) {
      formData.append('productVideo', propertyVideo);
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/updateproductvideo/${id}`, {
        method: 'PUT',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        if (productupdate) { document.querySelector('.loaderoverlay').style.display = 'none'; }
        // Handle success (show message, redirect, etc.)
      } else {
        if (productupdate) { document.querySelector('.loaderoverlay').style.display = 'none'; }
        console.error('Error:', response.statusText);
        // Handle error
      }
    } catch (error) {
      if (productupdate) { document.querySelector('.loaderoverlay').style.display = 'none'; }
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

  console.log(selectedPricingIndex)


  console.log(userData)


  function filterObjectsByProperty(array, propertyName, matchingNames, keep_or_remove) {
    return array.filter(obj => {
      const isMatch = matchingNames.includes(obj[propertyName]);
      return keep_or_remove === 1 ? isMatch : !isMatch;
    });
  }


  const refreshCategories = (productType) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        if (productType === 'property') {
          data = filterObjectsByProperty(data, "name", ["Real Estate"], 1);
        }

        if (productType === 'product') {
          data = filterObjectsByProperty(data, "name", ["Real Estate", "Services"], 0);
        }

        if (productType === 'service') {
          data = filterObjectsByProperty(data, "name", ["Services"], 1);
        }

        setCategories(data)
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };



  /// get tags


  const gettag = (productType) => {


    document.querySelector('.loaderoverlay').style.display = 'flex';

    const token = localStorage.getItem('token');


    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tag/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Failed. Please try again.');
          });
        }
      })
      .then((data) => {
        console.log(data)
        if (productType === 'property') {
          data = filterObjectsByProperty(data, "tagName", ["Plots", "Villa", "Apartments"], 1);
        }

        if (productType === 'product') {
          data = filterObjectsByProperty(data, "tagName", ["Plots", "Villa", "Apartments"], 0);
        }

        if (productType === 'service') {
          data = filterObjectsByProperty(data, "tagName", ["service"], 1);
        }

        settags([...data])
        document.querySelector('.loaderoverlay').style.display = 'none';


      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
      });
  };

  //////




  useEffect(() => {

    let productType = new URLSearchParams(window.location.search).get("ptype");
    refreshCategories(productType); // Load categories on mount
    const pid = new URLSearchParams(window.location.search).get("pid");
    handleProductDataChange("productType", productType)


    console.log(pid)
    if (pid) {
      getproductdetails(pid)
    } else {
      setshowMap(true)
    }

    fetchAttributes(productType)
    gettag(productType)



  }, []);


  const toggleAddCategory = (data) => {

    setsubcategory(data)
    setAddCategory(!addcategory);
  };


  const toggleconfirmation = () => {

    setconfirmationOpen(!confirmationOpen);
  };

  const toggleModal = (update = true) => {

    setModalOpen(!ModalOpen);
    if (update) {
      setAttributes(1)
      addPriceSlabs()
    }

  };



  const handleImageUpload = (event) => {

    const myfiles = Array.from(event.target.files);
    setproductimages((prevImages) => {
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


  const handleImagefilrtourlconvert = (file) => {

    if (!(file instanceof File)) {
      throw new Error("Input must be a File object");
    }
    return URL.createObjectURL(file);

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
      deleteImages: [...(prev.deleteImages || []), preimages.find((_, i) => i === index)],
    }));
  };



  console.log(productimages, images)





  // Add a new common attribute item
  const addCommonAttribute = () => {
    setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        commonAttributes: [
          ...prevState.productData.commonAttributes,
          { key: "", value: "" }, // Empty object structure for attributes
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
  const handlereasonChange = (index, value) => {
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
    console.log(field, value)
    setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        [field]: value,
      },
    }));
  };



  const handlePriceRangeChange = (field, value) => {
    setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        priceRange: {
          ...prevState.productData.priceRange,
          [field]: value
        },
      },
    }));
  }







  const handleSubmit = async () => {


    try {

      userData.productData.category = document.querySelector('.active342').getAttribute('categoryid');

    } catch (er) {
      alert('Select Category')
      return;
    }

    if (getCategoryNestingLevel(categories, userData.productData.category) !== 1) {
      alert(' Select a child category.')
      return;
    }

    if (userData.productData.productName === "") {
      alert('enter product name')
      return;
    }

    if (userData.productData.tag === "" || userData.productData.tag === null) {
      alert('select a tag')
      return;
    }



    let userDatacopy = structuredClone(userData);





    function cleanVariationData(variationsDataRemove, productDataRemove) {
      const keysToRemove = variationsDataRemove;
      const keysToRemoveproductData = productDataRemove;

      userDatacopy.variationsData = userDatacopy.variationsData.map(variation => {

        if (!variation?.duration?.value) {
          delete variation.duration
        }


        const cleaned = { ...variation };
        keysToRemove.forEach(key => delete cleaned[key]);
        return cleaned;
      });



      keysToRemoveproductData.forEach(key => delete userDatacopy.productData[key]);

    }



    if (userData.productData.productType === "product") {

      // Call the function
      cleanVariationData(["serviceName", "duration"], ["location", "ammenties", "khataType", "approvalType", "canCall", "canBook"]);

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
              images[i] = base64String; // Replace the file with Base64
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
    if (userData.productData.productType !== "property") {
      convertImagesToBase64(userDatacopy).then((result) => {
        console.log('Converted Product Data:', result);
        postdata(result)
      });
    } else {
      postdata(userDatacopy)
    }


    console.log(userDatacopy)

    async function postdata(data) {

      try {
        document.querySelector('.loaderoverlay').style.display = 'flex';

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
          let data = await response.json();
          await handleVideoSubmit(data.data._id)

          document.querySelector('.loaderoverlay').style.display = 'none';
          alert(`${userData.productData.productType} added successfully!`);
          window.location = '/supplier/Products';

        } else {
          const errorData = await response.json();
          document.querySelector('.loaderoverlay').style.display = 'none';
          alert("Failed to add Product: " + errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        document.querySelector('.loaderoverlay').style.display = 'none';
        alert("Something went wrong!");
      }
    }


  };







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


        data.data.awsImages = [...data.data.images];
        data.data.images = [];
        data.data.deleteImages = [];

        console.log(data.data, data.data.productType)


        const { variations, ...filteredData } = data.data;

        setUserData({
          productData: filteredData,
        })

        setproductupdate(true)

        setselectedtag(data.data?.tagName)

        document.querySelector('.loaderoverlay').style.display = 'none';
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)


      });


  }




  async function Updateproductdetails() {

    if (userData.productData.tag === "" || userData.productData.tag === null) {
      alert('select a tag')
      return;
    }


    let userDatacopy = structuredClone(userData);




    function cleanVariationData(productDataRemove) {

      const keysToRemoveproductData = productDataRemove;


      keysToRemoveproductData.forEach(key => delete userDatacopy.productData[key]);

    }




    if (userData.productData.productType === "product") {

      // Call the function
      cleanVariationData(["location", "ammenties", "khataType", "approvalType"]);

    }




    try {
      document.querySelector('.loaderoverlay').style.display = 'flex';

      const token = localStorage.getItem('token');

      let pid = new URLSearchParams(window.location.search).get("pid");


      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/updateproduct/${pid}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
        body: JSON.stringify(userDatacopy.productData),
      });

      if (response.ok) {
        document.querySelector('.loaderoverlay').style.display = 'none';
        alert(`${userData.productData.productType} Updated successfully!`);


      } else {
        const errorData = await response.json();
        document.querySelector('.loaderoverlay').style.display = 'none';
        alert("Failed to Update Product: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      document.querySelector('.loaderoverlay').style.display = 'none';
      alert("Something went wrong!");
    }

  }




  // stop scrool when active input
  usePreventNumberInputScroll()





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
    console.log(index, updatedreason)
    setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        reasonForReturn: updatedreason,
      },
    }));


  }




  const fetchAttributes = async (productType) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute`);
      let data = await res.json();
      console.log(data)

      if (productType === 'property') {
        data = filterObjectsByProperty(data, "GroupName", ["area", "appartment"], 1);
      }

      if (productType === 'product') {
        data = filterObjectsByProperty(data, "GroupName", ["area", "appartment"], 0);
      }

      // if(productType==='service'){
      //       data = filterObjectsByProperty(data, "GroupName", ["area","appartment"]);
      // }

      setAllAttributes(data);
    } catch (err) {
      console.error('Error fetching attributes:', err);
    }
  };





  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.replace("data:application/pdf;base64,", "");
        setUserData((prev) => ({
          ...prev,
          productData: {
            ...prev.productData,
            pdfFile: base64
          }
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const triggerFileInput = () => {
    document.getElementById("pdfUploadInput787").click();
  };

  console.log(userData.productData?.location?.coordinates[0])



  const handleproductimageUpload = (files) => {
    const fileArray = Array.from(files);

    // For images, read all files and collect results
    const promises = fileArray.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(results => {
      setUserData((prevState) => ({
        ...prevState,
        productData: {
          ...prevState.productData,
          images: [...userData.productData.images, ...results],
        },
      }));
    })

  };


  const removeproductImage = (imgIndex) => {


    setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        images: prevState.productData.images.filter((_, i) => i !== imgIndex),
      },
    }))

  };


  const removeproductawsImage = (imgIndex) => {

    setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        awsImages: prevState.productData.awsImages.filter((_, i) => i !== imgIndex),
        deleteImages: [...prevState.productData.deleteImages, prevState.productData.awsImages[imgIndex]]
      },
    }))
  };




  return (
    <div className="order-details">
      <div className="header">
        <button className="back-button">
          <Goback />
        </button>
        <h2>Add/Update {userData.productData.productType || ''}</h2>

      </div>

      <div className="add-product-container">
        <div className={productupdate ? 'basic-info2' : 'basic-info'}>
          <h2>Basic Information</h2>

          {/* /// select product type  */}

          {!productupdate && <div className="input-group">

            <select className="form-input" value={selectedtag || ""} style={{ width: '100%' }} onChange={(e) => {

              let id = e.target.children[e.target.selectedIndex].getAttribute('id');
              handleProductDataChange("tag", id)
              setselectedtag(e.target.value)
            }
            }>

              {userData.productData.productType !== 'property' ? <option value="">Select a Tag</option> : <option value="">Select Property Type</option>}
              {tags.map((data, index) => (
                <option value={data.tagName} id={data._id} key={index}>
                  {data.tagName}
                </option>
              ))}

            </select>

          </div>}

          {userData.productData.productType === 'property' && <PropertyListingForm listingType={selectedtag} propertyvariations={propertyvariations} setpropertyvariations={setpropertyvariations} productupdate={productupdate} />}


          <div className="input-group">
            <label htmlFor="product-name">Enter {userData.productData.productType} Name *</label>
            <input id="product-name" type="text" placeholder="" value={userData.productData.productName || ""}
              onChange={(e) => handleProductDataChange("productName", e.target.value)} />
          </div>
          {/* <div className="input-group">
          <label htmlFor="brand-name">Enter Brand Name *</label>
          <input id="brand-name" type="text" placeholder="John Doe" value={userData.productData.BrandName || ""}
          onChange={(e) => handleProductDataChange("BrandName", e.target.value)}/>
        </div> */}
          <div className="input-group">
            <label htmlFor="description">Enter {userData.productData.productType} Description</label>
            {/* <textarea id="description" placeholder="Explain the product" value={userData.productData.description || ""}
          onChange={(e) => handleProductDataChange("description", e.target.value)}></textarea> */}

            <QuillEditor value={userData.productData.description || ""} onChange={(value) => handleProductDataChange("description", value)} editorwidth={'200px'} />
          </div>



          <div className="input-group" style={{ marginBottom: '20px', marginTop: '20px' }}>
            <label>Price Range</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="number"
                placeholder="Min Price"
                value={userData.productData.priceRange?.minPrice}
                onChange={(e) => handlePriceRangeChange("minPrice", e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Price"
                value={userData.productData.priceRange?.maxPrice}
                onChange={(e) => handlePriceRangeChange("maxPrice", e.target.value)}
              />
            </div>
          </div>

          <div className="input-group" style={{ marginBottom: '20px', marginTop: '20px' }}>
            <label>Product Specifications</label>
            {userData.productData.commonAttributes?.map((spec, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Key"
                  value={spec.key}
                  onChange={(e) => handleCommonAttributeChange(index, "key", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) => handleCommonAttributeChange(index, "value", e.target.value)}
                />
                <button type="button" onClick={() => removecommanattribute(index)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px' }}>X</button>
              </div>
            ))}
            <button type="button" className='upload-btn-878' style={{ border: 'none' }} onClick={addCommonAttribute}>
              <i className="fas fa-plus"> </i> &nbsp; Add Specification
            </button>
          </div>

          <div className="input-group">
            <label htmlFor="MOQ">Enter MOQ</label>
            <input id="MOQ" type="number" placeholder="" value={userData.productData.moq || ""}
              onChange={(e) => handleProductDataChange("moq", e.target.value)} />
          </div>


          <div className="input-group">
            <label htmlFor="productVideo">{userData.productData.productType} Video Youtube Url</label>
            <input id="product-video" type="text" placeholder="" value={userData.productData?.productVideo || ""}
              onChange={(e) => handleProductDataChange("productVideo", e.target.value)} />
          </div>


          <div className="upload-container787" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div>
              <label className="upload-btn-878" style={{ backgroundColor: '#007bff' }}>
                <i className="fa fa-image"></i> Upload {userData.productData.productType} Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleproductimageUpload(e.target.files)}
                />
              </label>

              {(userData.productData?.images?.length > 0 ||
                userData.productData?.awsImages?.length > 0) && <div style={{ margin: '25px 0px' }}>
                  <div className="preview-container-878">
                    {userData.productData.images.map((img, imgIndex) => (
                      <div key={imgIndex} className="preview-item-878">
                        <img src={img} alt={`Property ${imgIndex + 1}`} />
                        <button
                          className="preview-remove-878"
                          onClick={() => removeproductImage(imgIndex)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    ))}

                    {userData.productData?.awsImages?.map((img, imgIndex) => (
                      <div key={imgIndex} className="preview-item-878">
                        <img src={img} alt={`Property ${imgIndex + 1}`} />
                        <button
                          className="preview-remove-878"
                          onClick={() => removeproductawsImage(imgIndex)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    ))}

                  </div>
                </div>}
            </div>

            <div className="video-upload-section-878">


              <label className="upload-btn-878" style={{ backgroundColor: '#007bff' }}>
                <i className="fa fa-video-camera"></i> Upload {userData.productData.productType} Video
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoUpload(e.target.files)}
                />
              </label>

              {(propertyVideo || (productupdate === true && userData.productData.productVideo)) && (
                <div className="preview-container-878" style={{ margin: '25px 0px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div className="preview-item-878" style={{ height: '150px', width: '150px' }}>
                    <video src={propertyVideo === null ? userData.productData.productVideo : URL.createObjectURL(propertyVideo)} controls />
                    {!productupdate && <button
                      className="preview-remove-878"
                      onClick={removeVideo}
                    >
                      <i className="fa fa-times"></i>
                    </button>}
                  </div>
                  {productupdate && propertyVideo !== null && <button style={{ padding: '5px 15px', backgroundColor: '#11a411', outline: 'none', color: 'white', borderRadius: '5px' }} onClick={() => (handleVideoSubmit(userData.productData._id))}>save video</button>}
                </div>
              )}
            </div>


            <div>
              <input
                id="pdfUploadInput787"
                type="file"
                accept="application/pdf"
                onChange={handlePDFUpload}
                style={{ display: "none" }}
              />
              {userData.productData.productType !== "service" && <button onClick={triggerFileInput} className="upload-btn787">
                <i className="fas fa-file-upload icon787"></i>{userData.productData.productType === "product" ? <>Upload Catalogue PDF</> : <>Upload Document PDF</>}
              </button>}
              {userData.productData.pdfFile && (
                <p className="upload-status787">PDF uploaded successfully</p>
              )}
            </div>


          </div>



          <br />

          {userData.productData.productType === "product" &&
            <>
              <label htmlFor="product-video" style={{ marginRight: '10px' }}>Add reasons for product return</label>

              <i
                className="fas fa-plus-circle"
                style={{ color: "green", fontSize: "20px", cursor: "pointer", margin: '20px 0px' }}
                onClick={addreason}
              ></i>

              {userData.productData.reasonForReturn && userData.productData.reasonForReturn.map((item, index) => (
                <div className="quantity-range" key={index} style={{ margin: "20px 0px" }}>
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                      <label className="form-label">Reason {index + 1}</label>
                      <i className="fas fa-times" style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
                        onClick={() => { removereason(index) }}></i>
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
            </>
          }





        </div>


        {!productupdate && <div className="add-category-location" style={{ height: '650px', overflowY: 'auto' }}>
          <div className="add-category">
            <h2>Available Categories</h2>

            {/* <div className="category-actions" style={{display:'flex',justifyContent:'space-between',marginBottom:'30px'}}>
        
        <button className="create-new" onClick={()=>toggleAddCategory(false)}>
         Create Category
         <i className="fas fa-plus"></i>
       </button>
       {changeurl && <button className="create-new"  onClick={()=>toggleAddCategory(true)}>
         Create Sub Category
         <i className="fas fa-plus"></i>
       </button>}
          </div> */}


            <div className="category-actions">

              <NestedDropdown342 categories={categories} changeurl={setchangeurl} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

              {addcategory && <Addcategory subcategory={subcategory} toggleaddcategory={toggleAddCategory} refreshCategories={refreshCategories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />}

            </div>



          </div>


        </div>}
      </div>





      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>

        {productupdate && <button className="update-button" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', margin: '40px 10px' }} onClick={() => { Updateproductdetails() }}>Update</button>}

      </div>


      <div className="action-buttons">

        {!productupdate && <><button className="cancel-button" onClick={() => { location.reload(); }}>Cancel</button>
          <button className="update-button" onClick={handleSubmit} style={{ textTransform: 'capitalize' }}>Add {userData.productData.productType}</button>
        </>}
      </div>

    </div >
  );
}



function Addcategory({ toggleaddcategory, refreshCategories, subcategory, activeCategory, setActiveCategory }) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImages, setCategoryImages] = useState([]);
  const [categoryimages, setcategoryimages] = useState([]);

  console.log(categoryimages, categoryImages)
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
    if (subcategory) {
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
                <img src="\icons\upcross.svg" alt="" width={'30px'} />
                <p>Add Image</p>
              </label>
            </div>}


            <div className="image-preview" style={{ width: 'auto' }}>
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


const NestedDropdown342 = ({ changeurl, categories, activeCategory, setActiveCategory }) => {

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
              <div className={`category-item342 ${isActive ? "active342" : ""}`} categoryid={category.id} >
                {hasChildren ? (
                  <button className="toggle-icon342" onClick={() => toggleCategory(category.id)}>
                    {isOpen ? <i className="fas fa-minus" style={{ fontSize: '17px', color: '#9b9b9b' }}></i> : <i className="fas fa-plus" style={{ fontSize: '17px', color: '#9b9b9b' }}></i>}
                  </button>
                ) : (
                  <span className="cross-icon342">
                    <i className="fas fa-plus" style={{ visibility: "hidden", fontSize: '17px', color: '#9b9b9b' }}></i>
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