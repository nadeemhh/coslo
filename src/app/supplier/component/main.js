import Mygloballoader from '../../Mygloballoader.js'

const MainContent = ( { children }) => (
    <div className="main-content" style={{backgroundColor:'white'}}>
     
      { children }
      <Mygloballoader/>
    </div>
  );

  export default MainContent;