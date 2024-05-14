import logo from './logo.svg';
import './App.css';
import {MdClose} from "react-icons/md"
import { useState } from 'react';
import axios from "axios"
import { set } from 'mongoose';
import Formtable from './components/Formtable';

axios.defaults.baseURL = "https:localhost:3001"

function App() {
  const [addSection,setAddSection] = useState(false) 
  const [editSection,setEditSection] = useState(false)
  const [formData, setFormData] =useState({
    name : "",
    email : "",
    mobile : "",
  })
  const [formDataEdit, setFormDataEdit] =useState({
    name : "",
    email : "",
    mobile : "",
    _id : ""
  })
  const [dataList,setDataList] = useState([])

  const handleOnChange = (e) => {
    const {value, name } = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const data = await axios.post("/create",formData)
    console.log(data)
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        name : "",
        email: "",
        mobile: ""
      })
    }
  }
  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success){
      setDataList(data.data.data)
      
    }
  }
  useEffect(()=>{
    getFetchData()
  },[])

const handleDelete = async(id)=>{
  const data =await axios.delete("/delete/"+id)
  alert(data.data.message)
  }
  }
  
  const handleUpdate = async(e)=>{
    e.preventDefault()
    const data =await axios.put("/update/",formDataEdit)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
  }
const handleEditOnChange = async(e)=>{
  const handleOnChange = (e) => {
    const {value, name } = e.target
    setFormDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
}
const handleEdit =()=>{
  setFormDataEdit(el)
  setEditSection(true)
}

  return (
    <>
    <div className = "container">
      <button className = "btn btn-add" onClick={()=>setAddSction(true)}>Add</button>
      {
        addSection &&(
         <Formtable 
         handleSubmit={handleSubmit}
         handleOnChange={handleOnChange}
         handleclose = {()=>setAddSction(false)}
         rest = {formData}
         />
        )
      }
      {
        editSection &&(
          <Formtable 
         handleSubmit={handleUpdate}
         handleOnChange={handleEditOnChange}
         handleclose = {()=>setAddSction(false)}
         rest = {formDataEdit}
         />

        )
      }

      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>
                
              </th>
            </tr>
          </thead>
          <tbody>
            { dataList[0] ? (
              
              dataList.map((e1)=>{
                return(
                  <tr>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                     <td>{el.mobile}</td>
                    <td>
                    <button className='btn btn-edit'onClick={()=>handleEditOnChange(el)}>Edit</button>
                <button className='btn btn-delete'onClick={()=>handleDelete(el._id)}>Delete</button>
                    </td>
                  </tr>
                )
              }))
              
              :(
                <p style = {{textAlign: "center"}}>No data</p>
              )
            }
          </tbody>
        </table>
      </div>
      
    </div>
    </>
  );
}

export default App;
