'use client';

import { useEffect, useState } from 'react';
import './page.css';
import extractDate from '../../component/extdate.js'

const QuotationsTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
    const [modalData, setModalData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

   const fetchdata = () => {
 const token = localStorage.getItem('admintoken');

 document.querySelector('.loaderoverlay').style.display='flex';

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotation/getAllSellerQuotations?page=${page}&limit=25`, {
      method: 'GET',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => res.json())
      .then((data) => {

        try{

 if (data.data.length === 0) {
            setHasMore(false);
  
            if(page!==1){ setPage((prevPage) => prevPage - 1);}
            setData(data.data);
  
            console.log( hasMore,page)
          } else {
            console.log(data)
            setData(data.data);
          }
          }catch(er){
            setData(null)
        }

        document.querySelector('.loaderoverlay').style.display='none';

      })
      .catch((err) => {
        console.error('Fetch error:', err);
        document.querySelector('.loaderoverlay').style.display='none';

      });
   }

 useEffect(() => {
    fetchdata();
  }, [page]);


  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
   
  };
 
  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    setHasMore(true);
  };


    const openModal = (sellers) => {
    setModalData(sellers);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData([]);
  };


  return (
    <div className="container878">
      <h2 className="heading878">Quotations</h2>
        {data === null && <p className="heading878">There are currently no quotations available to display.</p>}
       {data && <>
       <div className='table-wrapper'>
      <table className="table878">
        <thead>
          <tr>
            <th className="th878">Date</th>
            <th className="th878">Buyer Name</th>
            <th className="th878">Phone</th>
            <th className="th878">Message</th>
            <th className="th878">Quantity</th>
            <th className="th878">Tag Name</th>
            <th className="th878">Tag Image</th>
            <th className="th878">Matched Sellers</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item._id}>
                  <td className="td878">{extractDate(item?.createdAt)|| 'N/A'}</td>
              <td className="td878">{item?.buyer?.name || 'N/A'}</td>
              <td className="td878">{item?.buyer?.phone || 'N/A'}</td>
              <td className="td878">{item?.message || 'N/A'}</td>
              <td className="td878">{item?.quantity ?? 'N/A'}</td>
              <td className="td878">{item?.tag?.tagName || 'N/A'}</td>
              <td className="td878">
                {item?.tag?.tagImage ? (
                  <img
                    src={item.tag.tagImage}
                    alt="Tag"
                    className="tagImage878"
                  />
                ) : (
                  'N/A'
                )}
              </td>
             <td className="td878">
                {item?.matchedSellers?.length > 0 ? (
                  <button
                    className="btn878"
                    onClick={() => openModal(item.matchedSellers)}
                  >
                    Check Details
                  </button>
                ) : (
                  'N/A'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>

       <div className="pagination">
       <span className="pre" onClick={prevPage} style={{ cursor: "pointer", opacity:  page === 0 ? 0.5 : 1 }}>
        <i className="fas fa-arrow-left"></i> Previous
      </span>

      <span className="page-number">Page {page}</span>

    { hasMore && <span className="next" onClick={nextPage} style={{ cursor: "pointer" }}>
        Next <i className="fas fa-arrow-right"></i>
      </span>}
      </div>
     </>}



    {/* Modal */}
      {isModalOpen && (
        <div className="modalOverlay878">
          <div className="modalContent878">
            <h3 className="modalTitle878">Seller Details</h3>
            <table className="modalTable878">
              <thead>
                <tr>
                  <th className="th878">Name</th>
                  <th className="th878">Phone</th>
                  <th className="th878">Email</th>
                </tr>
              </thead>
              <tbody>
                {modalData.map((match) => (
                  <tr key={match._id}>
                    <td className="td878">{match?.seller?.name || 'N/A'}</td>
                    <td className="td878">{match?.seller?.phone || 'N/A'}</td>
                    <td className="td878">{match?.seller?.email || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btnClose878" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default QuotationsTable;
