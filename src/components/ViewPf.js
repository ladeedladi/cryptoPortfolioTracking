import React,{useState,useEffect} from 'react';
import axios from "axios"
import "../app.css"
const ViewPf = () => {  
    const [crytpo,setAllCrypto]=useState([])
    const [state,setState]=useState(false)

const getAllCrypto=async()=>{
  let myCrypto=Object.keys(localStorage)
  // console.log("myCrypto",myCrypto);
  const index = myCrypto.indexOf("ally-supports-cache");
if (index > -1) {
  myCrypto.splice(index, 1); // 2nd parameter means remove one item only
}
  
  for(let i=0;i<myCrypto.length;i++){
// console.log(myCrypto[i]);
    let {data}=await axios.get(`/api/v2/tickers/${myCrypto[i]}`)
    // console.log(data);
    data.name=myCrypto[i]
    setAllCrypto(prev=>([...prev,data]))
  }
    // console.log(data);
    
  //  console.log(crytpo);

  }
  useEffect(()=>{

  getAllCrypto()
   
  },[])

useEffect(()=>{
    if(crytpo!==[]){
        setState(true)
        // console.log(state);
        // console.log(crytpo);
       


         
    }
},[state,crytpo])
  const findProfit=(price,name)=>{
  let priceNAmount=localStorage.getItem(name)
  let myprice=+priceNAmount.split(",")[0]
  let myamount=+priceNAmount.split(",")[1]
// console.log("myprice",myprice);
  
     let forOneCoin=1/myamount
     myprice=myprice*forOneCoin
     return myamount*price-myamount*myprice
   
  }
  const findPercentage=(price,name)=>{
    let priceNAmount=localStorage.getItem(name)
    let myprice=+priceNAmount.split(",")[0]
    let myamount=+priceNAmount.split(",")[1]
  // console.log("myprice",myprice);
    
       let forOneCoin=1/myamount
       myprice=myprice*forOneCoin
      
      let num=myamount*price-myamount*myprice

       return (num*100)/(myamount*myprice)
  }
 
  return<div className="containerPF">
    
   <div className="innerContainer">
     <div className="card">
       <h3>crytpo</h3>
       <h3>price</h3>
       <h3>marketcap</h3>
       <h3>profit</h3>
       <h3>profit percentage</h3>
     </div>
     {crytpo&&crytpo.map(el=>(<div className={findProfit(el.ticker.last,el.name).toString().split(".")[0]>0?"cardG":"cardR"}>
       <h3>{el.name.split("inr")[0].toUpperCase()}</h3>
       <h3>{el.ticker.last}rs</h3>
       <h3>{el.ticker.vol}</h3>
       <h3>{findProfit(el.ticker.last,el.name).toString().split(".")[0]} rs</h3>
       <h3>{findPercentage(el.ticker.last,el.name).toString().split(".")[0]}%</h3>
     </div>))}
    
   </div>
  </div>;
};

export default ViewPf;
