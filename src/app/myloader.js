
function Myloader() {
  
    return(
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
    }}
  >
  <div id="myloader"></div>
  
  </div>
    );
  }

  export default Myloader


 // parent setup

//    const [showloader, setshowloader] = useState(false);
  
  
//   {showloader && (
//     <Myloader/>
//   )}