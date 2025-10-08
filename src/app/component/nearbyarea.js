'use client';
import { useEffect, useState } from 'react';

const Nearbyarea = ({selectedBengaluruPlace, setSelectedBengaluruPlace}) => {


       const [bengaluruPlaces, setbengaluruPlaces] = useState([
      "AECS Layout",
      "Adugodi",
      "Agram",
      "Akshayanagar",
      "Amruthahalli",
      "Anand Nagar",
      "Anekal",
      "Anjanapura",
      "Arakere",
      "Ashok Nagar",
      "Attibele",
      "Bagalur",
      "Banashankari",
      "Banashankari Stage 2",
      "Banashankari Stage 3",
      "Banashankari Stage 5",
      "Banashankari Stage 6",
      "Banaswadi",
      "Bannerghatta",
      "Bannerghatta Road",
      "Basavanagudi",
      "Basaveshwaranagar",
      "Begur",
      "Bellandur",
      "Benson Town",
      "Bharath Nagar",
      "Bidadi",
      "Bilekahalli",
      "Bommanahalli",
      "Bommasandra",
      "Brookefield",
      "BTM Layout",
      "CV Raman Nagar",
      "Chamarajpet",
      "Chandapura",
      "Chikkabanavara",
      "Chikkajala",
      "Cooke Town",
      "Cox Town",
      "Cunningham Road",
      "Dasarahalli",
      "Devanahalli",
      "Doddanekkundi",
      "Domlur",
      "Dommasandra",
      "Ejipura",
      "Electronic City",
      "Frazer Town",
      "Ganganagar",
      "Girinagar",
      "Gottigere",
      "HAL Layout",
      "HBR Layout",
      "Hebbal",
      "Hennur",
      "Hoodi",
      "Horamavu",
      "Hompalaghatta",
      "Hosa Road",
      "Hosakerehalli",
      "HRBR Layout",
      "HSR Layout",
      "Hulimavu",
      "Indiranagar",
      "ISRO Layout",
      "ITPL",
      "Jakkur",
      "Jalahalli",
      "Jayanagar",
      "Jigani",
      "JP Nagar",
      "Kadubeesanahalli",
      "Kadugodi",
      "Kaggadasapura",
      "Kalyan Nagar",
      "Kammanahalli",
      "Kanakapura Road",
      "Kasturi Nagar",
      "Kathriguppe",
      "Kengeri",
      "Kodihalli",
      "Kodigehalli",
      "Koramangala",
      "KR Market",
      "KR Puram",
      "Kudlu Gate",
      "Kumaraswamy Layout",
      "Lalbagh Road",
      "Lavelle Road",
      "Lingarajapuram",
      "Madiwala",
      "Magadi Road",
      "Mahadevapura",
      "Majestic",
      "Malleshpalya",
      "Malleshwaram",
      "Marathahalli",
      "Mathikere",
      "Mico Layout",
      "Millers Road",
      "Murugeshpalya",
      "Mysore Road",
      "Nagavara",
      "Nagarabhavi",
      "Nandi Hills",
      "Padmanabhanagar",
      "Peenya",
      "Race Course Road",
      "Rajajinagar",
      "Rajarajeshwari Nagar",
      "Ramamurthy Nagar",
      "Richmond Town",
      "RT Nagar",
      "Sadashivanagar",
      "Sahakar Nagar",
      "Sanjay Nagar",
      "Sarjapur",
      "Shanti Nagar",
      "Shivaji Nagar",
      "Singasandra",
      "Sunkadakatte",
      "Thanisandra",
      "Ulsoor",
      "Uttarahalli",
      "Varthur",
      "Vasanth Nagar",
      "Vidyaranyapura",
      "Vijayanagar",
      "Whitefield",
      "Wilson Garden",
      "Yelahanka",
      "Yeswanthpur",
      "Yeshwanthpur"
    ]);


      const handleBengaluruPlaceChange = (e) => {
    const selectedPlace = e.target.value;
    setSelectedBengaluruPlace(selectedPlace);
  };

  return (
           <select 
                className="form-input"   
                value={selectedBengaluruPlace}
                onChange={handleBengaluruPlaceChange}
              >
                <option value="">Area</option>
                {bengaluruPlaces.map((place, index) => (
                  <option key={index} value={place}>
                    {place}
                  </option>
                ))}
              </select>
  );
};

export default Nearbyarea;