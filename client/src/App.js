// import logo from './logo.svg';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import React, {useState, useEffect} from "react";
import Axios from 'axios';
import './App.css';


function App() {

const [item,setItem] = useState({pcd:"", borough:"", article4:""});
const [postCode, setPostCode] = useState("");
const [itemlist, setitemlist]= useState([]);
// const [modal, setModal] = useState(false);
// const [modaldata, setModaldata] = useState([]);
// const [updatedData, setUpdatedData] = useState([]);
// const [search, setSearch] = useState("");
// const [field, setField] = useState("");
// const [filteredData, setFiltered] = useState([]);

const [selectedNumber, setselectedNumber] = useState(null);
const nums = [
    { name: '1', code: '1' },
    { name: '2', code: '2' },
    { name: '3', code: '3' },
    { name: '4', code: '4' },
    { name: '5', code: '5' }
];

const [selectedlivingRoom, setSelectedlivingRoom] = useState(null);
const livingRoomOptions = [
    { name: 'yes', code: 'yes' },
    { name: 'No', code: 'No' },
];

const [selectedhouseType, setSelectedhouseType] = useState(null);
const housetypes = [
    { name: 'House', code: 'House' },
    { name: 'Bungalow', code: 'Bungalow' },
    { name: 'ghanta', code: 'ghanta' },
];

const [selectedKitchen, setSelectedKitchen] = useState(null);
const kitchenNumber = [
    { name: '1', code: '1' },
    { name: '2', code: '2' },
    { name: '3', code: '3' },
    { name: '4', code: '4' },
    { name: '5', code: '5' }
];

const [selectedStudioRooms, setselectedStudioRooms] = useState(null);
const StudioRoomsNumber = [
    { name: '1', code: '1' },
    { name: '2', code: '2' },
    { name: '3', code: '3' },
    { name: '4', code: '4' },
    { name: '5', code: '5' }
];

const [selectedEnsuite, setselectedEnsuite] = useState(null);
const EnsuiteNumber = [
    { name: '1', code: '1' },
    { name: '2', code: '2' },
    { name: '3', code: '3' },
    { name: '4', code: '4' },
    { name: '5', code: '5' }
];

const [selectedSingleRooms, setselectedSingleRooms] = useState(null);
const singleroomsNumber = [
    { name: '1', code: '1' },
    { name: '2', code: '2' },
    { name: '3', code: '3' },
    { name: '4', code: '4' },
    { name: '5', code: '5' }
];

const [selectedDoubleRooms, setselecteddoubleRooms] = useState(null);
const doubleroomsNumber = [
    { name: '1', code: '1' },
    { name: '2', code: '2' },
    { name: '3', code: '3' },
    { name: '4', code: '4' },
    { name: '5', code: '5' }
];

const [selectedBathroom, setselectedBathroom] = useState(null);
const bathroomNumber = [
    { name: '1', code: '1' },
    { name: '2', code: '2' },
    { name: '3', code: '3' },
    { name: '4', code: '4' },
    { name: '5', code: '5' }
];



const submitHnadler =(e)=>{
    e.preventDefault();
    Axios.get(`http://localhost:3001/read/${postCode}`).then((response)=>{
        console.log(response.data,"uiu");
        setItem(response.data);
      });
}

useEffect(()=>{
  getalldata();
},[]);

const getalldata=()=>{
  Axios.get("http://localhost:3001/readAll").then((response)=>{
    setitemlist(response.data);
  });
}

// const addtolist =(e)=>{
//   let name = e.target.name;
//   let value = e.target.value;
//   setItem({...item, [name]:value})
// }

// const submitData = ()=>{
//   Axios('http://localhost:3001/insert', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//     },
//     data: JSON.stringify(item),
//   })
//     .then(response => response.data)
//     .catch(error => {
//       throw error;
//     });
// };

// const deleteHandler =(id)=>{
//   Axios.delete(`http://localhost:3001/delete/${id}`).then((respone)=>{
//       console.log("done");
//       getalldata();
//   })
// };

// const modalHandler=(id)=>{
//   setModal(true);
//   Axios.get(`http://localhost:3001/read/${id}`).then((response)=>{
//     setModaldata(response.data);
//     console.log(response.data);
//   });  
// }

// const updateData=(e)=>{
//   e.preventDefault();
//   let name = e.target.name;
//   let value = e.target.value;
//   setUpdatedData({...updatedData, [name]:value})
// }

// const submitUpdatedData=(id)=>{
  
//   Axios(`http://localhost:3001/update/${id}`, {
//     method: 'PUT',
//     headers: {
//       'content-type': 'application/json',
//     },
//     data: JSON.stringify(updatedData),
//   })
//     .then(response => response.data)
//     .catch(error => {
//       throw error;
//     });
// }


// const handleFilter = (obkey, e)=>{
//   setSearch(e.target.value);
//   setField(obkey);
// }




// useEffect(() => {
//   setFiltered(
//     itemlist.filter((item) =>{
//       let itemVal = item[field]+"";
//       if(search == "")
//         {return item}
//       else
//         {return(itemVal.toLowerCase().includes(search.toLowerCase()))}
//       }
//     )
//   );
// }, [search,itemlist]);

  return (
    <div className="App">
      <form>
        <FloatLabel>
          <InputText
            id="Postal-Code"
            value={postCode} onChange={(e) => setPostCode(e.target.value)}
          />
          <label htmlFor="Postal-Code">POST CODE</label>
        </FloatLabel>

        <FloatLabel className="w-full md:w-14rem">
          <Dropdown
            inputId="no-of-rooms"
            value={selectedNumber}
            onChange={(e) => setselectedNumber(e.value)}
            options={nums}
            optionLabel="name"
            className="w-full"
          />
          <label htmlFor="dd-of">NUMBER OF ROOMS</label>
        </FloatLabel>

        <FloatLabel className="w-full md:w-14rem">
          <Dropdown
            inputId="no-of-living-rooms"
            value={selectedlivingRoom}
            onChange={(e) => setSelectedlivingRoom(e.value)}
            options={livingRoomOptions}
            optionLabel="name"
            className="w-full"
          />
          <label htmlFor="o-of-living-rooms">LIVING ROOMS</label>
        </FloatLabel>

        <FloatLabel className="w-full md:w-14rem">
          <Dropdown
            inputId="no-of-bathrooms"
            value={selectedBathroom}
            onChange={(e) => setselectedBathroom(e.value)}
            options={bathroomNumber}
            optionLabel="name"
            className="w-full"
          />
          <label htmlFor="dd-of">NUMBER OF BATHROOMS </label>
        </FloatLabel>

        <FloatLabel className="w-full md:w-14rem">
          <Dropdown
            inputId="no-of-Kitchens"
            value={selectedKitchen}
            onChange={(e) => setSelectedKitchen(e.value)}
            options={kitchenNumber}
            optionLabel="name"
            className="w-full"
          />
          <label htmlFor="dd-of">NUMBER OF KITCHENS</label>
        </FloatLabel>

        <FloatLabel className="w-full md:w-14rem">
          <Dropdown
            inputId="no-of-rooms"
            value={selectedhouseType}
            onChange={(e) => setSelectedhouseType(e.value)}
            options={nums}
            optionLabel="name"
            className="w-full"
          />
          <label htmlFor="dd-of">TYPE OF HOUSE</label>

        </FloatLabel>

        <div class="frm-container"><Button  label="Submit"  onClick={(e) => submitHnadler(e)}/></div>
        
      </form>

    </div>
  );
}

export default App;
