

function IndianStates({value,handleOnChange}) {

  return (
    <div  className="form-tab">
      <select name="state" id="mystates" value={value} onChange={handleOnChange}>
        <option value="">Select State/UT</option>
        <option value="andhra-pradesh">Andhra Pradesh</option>
        <option value="arunachal-pradesh">Arunachal Pradesh</option>
        <option value="assam">Assam</option>
        <option value="bihar">Bihar</option>
        <option value="chhattisgarh">Chhattisgarh</option>
        <option value="goa">Goa</option>
        <option value="gujarat">Gujarat</option>
        <option value="haryana">Haryana</option>
        <option value="himachal-pradesh">Himachal Pradesh</option>
        <option value="jharkhand">Jharkhand</option>
        <option value="karnataka">Karnataka</option>
        <option value="kerala">Kerala</option>
        <option value="madhya-pradesh">Madhya Pradesh</option>
        <option value="maharashtra">Maharashtra</option>
        <option value="manipur">Manipur</option>
        <option value="meghalaya">Meghalaya</option>
        <option value="mizoram">Mizoram</option>
        <option value="nagaland">Nagaland</option>
        <option value="odisha">Odisha</option>
        <option value="punjab">Punjab</option>
        <option value="rajasthan">Rajasthan</option>
        <option value="sikkim">Sikkim</option>
        <option value="tamil-nadu">Tamil Nadu</option>
        <option value="telangana">Telangana</option>
        <option value="tripura">Tripura</option>
        <option value="uttar-pradesh">Uttar Pradesh</option>
        <option value="uttarakhand">Uttarakhand</option>
        <option value="west-bengal">West Bengal</option>
        <option value="andaman-nicobar">Andaman and Nicobar Islands</option>
        <option value="chandigarh">Chandigarh</option>
        <option value="dadra-nagar-haveli-daman-diu">
          Dadra and Nagar Haveli and Daman and Diu
        </option>
        <option value="delhi">Delhi</option>
        <option value="jammu-kashmir">Jammu and Kashmir</option>
        <option value="ladakh">Ladakh</option>
        <option value="lakshadweep">Lakshadweep</option>
        <option value="puducherry">Puducherry</option>
      </select>
    </div>
  );
}


export default IndianStates;