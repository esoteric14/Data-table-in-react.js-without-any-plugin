// import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import Modal from 'react-modal';
import './App.css';


function App() {

const [item,setItem] = useState({Ino:"", Description:"", Price:"", Quantity:""});
const [itemlist, setitemlist]= useState([]);
const [modal, setModal] = useState(false);
const [modaldata, setModaldata] = useState([]);
const [updatedData, setUpdatedData] = useState([]);
const [search, setSearch] = useState("");
const [field, setField] = useState("");
const [filteredData, setFiltered] = useState([]);


useEffect(()=>{
  getalldata();
},[]);

const getalldata=()=>{
  Axios.get("http://localhost:3001/readAll").then((response)=>{
    setitemlist(response.data);
  });
}

const addtolist =(e)=>{
  let name = e.target.name;
  let value = e.target.value;
  setItem({...item, [name]:value})
}

const submitData = ()=>{
  Axios('http://localhost:3001/insert', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify(item),
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const deleteHandler =(id)=>{
  Axios.delete(`http://localhost:3001/delete/${id}`).then((respone)=>{
      console.log("done");
      getalldata();
  })
};

const modalHandler=(id)=>{
  setModal(true);
  Axios.get(`http://localhost:3001/read/${id}`).then((response)=>{
    setModaldata(response.data);
    console.log(response.data);
  });  
}

const updateData=(e)=>{
  e.preventDefault();
  let name = e.target.name;
  let value = e.target.value;
  setUpdatedData({...updatedData, [name]:value})
}

const submitUpdatedData=(id)=>{
  
  Axios(`http://localhost:3001/update/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify(updatedData),
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}


const handleFilter = (obkey, e)=>{
  setSearch(e.target.value);
  setField(obkey);
}




useEffect(() => {
  setFiltered(
    itemlist.filter((item) =>{
      let itemVal = item[field]+"";
      if(search == "")
        {return item}
      else
        {return(itemVal.toLowerCase().includes(search.toLowerCase()))}
      }
    )
  );
}, [search,itemlist]);

  return (
    <div className="App">
      <form>
          <h1>the real stuff</h1>
            <input name="Ino"  placeholder="Item Number" onChange={addtolist} type="number"/>
            <input name="Description" placeholder="Description" onChange={addtolist} type="text"/>
            <input name="Price" placeholder="Price" onChange={addtolist} type="number" min="1" step="any"/>
            <input name="Quantity" placeholder="Quantity" onChange={addtolist} type="number"/>
            <button onClick={submitData}>Add to list</button>
      </form>

      <div className="table">
      <table>

        <thead>
            <tr>
              <th>Item name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Delete item</th>
              <th>Edit item</th>
            </tr>
        </thead>

        <tbody>
          <tr className="filter">
                  <td><input className="Ino" onChange={(e)=>handleFilter("Ino", e)}/></td>
                  <td><input className="Description" onChange={(e)=>handleFilter("Description", e)}/></td>
                  <td><input className="Price" onChange={(e)=>handleFilter("Price", e)}/></td>
                  <td><input className="Quantity" onChange={(e)=>handleFilter("Quantity", e)}/></td>
                  <td></td>
                  <td></td>
          </tr>
        {filteredData.map(item=>{
            return(
              <tr key={item._id}>
                  <td>{item.Ino}</td>
                  <td>{item.Description}</td>
                  <td>INR {item.Price}</td>
                  <td>{item.Quantity}</td>
                  <td><button onClick={()=>deleteHandler(item._id)}>delete</button></td>
                  <td><button onClick={()=>modalHandler(item._id)}>edit</button></td>
             </tr>
            )
          }
        )}
        </tbody>

        </table>
      </div>
      
      <div className="modal">

       <Modal isOpen={modal}>
            <h2>{modaldata.Ino} {modaldata.Description}</h2>
            <form>
                <h1>update data</h1>
                <input name="Description"  placeholder="description" onChange={updateData} type="text"/>
                <input name="Price" placeholder= "price" onChange={updateData} type="number" min="1" step="any"/>
                <input name="Quantity" placeholder= "qunatity" onChange={updateData} type="number"/>
                <button onClick={()=>submitUpdatedData(modaldata._id)}>update</button>
            </form>
            <button onClick={()=> setModal(false)}>close</button>
        </Modal>

      </div>
      
    </div>
  );
}

export default App;
