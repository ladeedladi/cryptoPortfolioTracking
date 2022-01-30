import React,{useState} from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../app.css"
const AllCryptos = () => {
  const history=useNavigate()
  const [name,setName]=useState("")
  const [price,setPrice]=useState("")
  const [amount,setAmount]=useState("")

  const notify = () => toast.success("Added to your portfolio");
  const notCompleted=()=>toast.error("please complete the form")
  const getData=(e)=>{
   if(e.target.name=="cryptoName"){
     setName(e.target.value)
   }else if(e.target.name=="boughtAt"){
    setPrice(e.target.value)
   }else{
    setAmount(e.target.value)
   }
  }

 const saveData=()=>{
   if(name&&price&&amount){
    notify()
   }else{
    notCompleted()
    return
   }
  
   let isItemExist=localStorage.getItem(name)
   

   if(isItemExist){
     let priceLS=+isItemExist.split(",")[0]
     let amountLS=+isItemExist.split(",")[1]
     console.log(price);
     console.log(amount);
     localStorage.setItem(name,`${+price+priceLS},${+amount+amountLS}`)
   }else{
    localStorage.setItem(name,`${price},${amount}`)
    const keys=Object.keys(localStorage)
    console.log(keys);
   }
   
 }
  return<div className="container">
 
  <div className="profits">
      <input onChange={getData} name="cryptoName" placeholder="cryptoName"/>
      <input onChange={getData} name="boughtAt" placeholder="total price"/>
      <input onChange={getData} name="amount" placeholder="no of coins"/>
      
      <button onClick={saveData} >Add To portfolio</button>
       <span onClick={()=>{history("/pf")}}>view portfolio</span>
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false} 
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        type='success'
        
        />
        {/* <ToastContainer/> */}
  </div>
  </div>;
};

export default AllCryptos;
