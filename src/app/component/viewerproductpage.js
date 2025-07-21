'use client'
import './component-css/viewerproductpage.css';
    import PropertyLocationDisplay from '../component/PropertyLocationDisplay.js';


const Viewerproductpage = ({productType,productVideo,pdfFile,propertyData}) => {
console.log(propertyData)
     const getEmbedUrl343 = (url) => {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    const startTime = urlObj.searchParams.get("t") || "0s";
    const seconds = parseInt(startTime.replace("s", ""), 10);

    return `https://www.youtube.com/embed/${videoId}`;
  };



  return (
    <>
    
      {productVideo && <div className="card343">
      <h2 className="title343">Watch {productType} Video</h2>
      <div className="videoContainer343">
        <iframe
          className="iframe343"
          src={getEmbedUrl343(productVideo)}
          title="YouTube video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>}

     {propertyData && <div className="card343">

      <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
      <h2 className="title343">Property Location</h2>
      <a
  href={`https://www.google.com/maps?q=${propertyData.location.coordinates[1]},${propertyData.location.coordinates[0]}`}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#007BFF",
    fontSize: "16px",
    textDecoration: "none",
    marginBottom:'12px'
  }}
>
 <i className="fas fa-external-link-alt" style={{ marginLeft: "5px" }}></i>
</a>
</div>

      <div className="videoContainer343">
      
    <PropertyLocationDisplay propertyData={propertyData}/>
      </div>
    </div>}

      {pdfFile && <div className="card343">

<div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
      <h2 className="title343">Product Catalogue PDF</h2>
      <a
  href={pdfFile}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#007BFF",
    fontSize: "16px",
    textDecoration: "none",
    marginBottom:'12px'
  }}
>
 <i className="fas fa-external-link-alt" style={{ marginLeft: "5px" }}></i>
</a>
</div>

      <iframe
        src={pdfFile}
        title="PDF Viewer"
        width="100%"
        height="350px"
        style={{ border: 'none' }}
      ></iframe>
      
    </div>}
    </>
  );
};

export default Viewerproductpage;