import React,{useState,useEffect,useRef} from 'react';
import axios from "axios"
import "../app.css"
const ViewPf = () => {  
    const [crytpo,setAllCrypto]=useState([])
    const [state,setState]=useState(false)
    const [totals,setTotal]=useState(0)
    // const totalMyPrice = useRef(0);
const getAllCrypto=async()=>{
  let myCrypto=Object.keys(localStorage)
  // console.log("myCrypto",myCrypto);
  const index = myCrypto.indexOf("ally-supports-cache");
if (index > -1) {
  myCrypto.splice(index, 1); // 2nd parameter means remove one item only
}

 for(let i=0;i<myCrypto.length;i++) {
 const localS= +localStorage.getItem(myCrypto[i]).split(",")[0]
 console.log(localS);
  setTotal(prev=>(prev+localS))
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
  // if(mytotalPrice==0){

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
// let total=0
  const findMyPrice=(price,name)=>{
    let priceNAmount=localStorage.getItem(name)
    let myprice=+priceNAmount.split(",")[0]
    let myamount=+priceNAmount.split(",")[1]
  // console.log("myprice",myprice);
  // totalMyPrice.current+=myprice

       let forOneCoin=1/myamount
       myprice=myprice*forOneCoin
      
      //  setMytotalPrice((prev)=>(prev+myamount*myprice))
      // totalMyPrice.current+=myprice
       return myamount*myprice
     
  }

  const findCoinPrice=(price,name)=>{
    let priceNAmount=localStorage.getItem(name)
    let myprice=+priceNAmount.split(",")[0]
    let myamount=+priceNAmount.split(",")[1]
  // console.log("myprice",myprice);
  // totalMyPrice.current+=myprice

       let forOneCoin=1/myamount
       myprice=myprice*forOneCoin
      
      //  setMytotalPrice((prev)=>(prev+myamount*myprice))
      // totalMyPrice.current+=myprice
       return myamount*price
  }



  const howmanyCoins=(price,name)=>{
    let priceNAmount=localStorage.getItem(name)
    let myamount=+priceNAmount.split(",")[1]
    
    

    return myamount
  }


  return<div className="containerPF">
    
   <div className="innerContainer">
     <h3 className="total">TOTAL INVESTED: {totals}</h3>
     <div className="card">
       <h4>crytpo</h4>
       <h4>price</h4>
       <h4>marketcap</h4>
       <h4>profit</h4>
       <h4>profit percentage</h4>
       <h4>my price</h4>
       <h4>coin price</h4>
       <h4>coinCount</h4>
      
       
     </div>
     {crytpo&&crytpo.map(el=>(<div className={findProfit(el.ticker.last,el.name).toString().split(".")[0]>0?"cardG":"cardR"}>
       <h4>{el.name.split("inr")[0].toUpperCase()}</h4>
       <h4>{el.ticker.last}rs</h4>
       <h4>{el.ticker.vol}</h4>
       <h4>{findProfit(el.ticker.last,el.name).toString().split(".")[0]} rs</h4>
       <h4>{findPercentage(el.ticker.last,el.name).toString().split(".")[0]}%</h4>
       <h4>{findMyPrice(el.ticker.last,el.name).toString().split(".")[0]}</h4>
       <h4>{findCoinPrice(el.ticker.last,el.name).toString().split(".")[0]}</h4>

       <h4>{howmanyCoins(el.ticker.last,el.name)}</h4>
      
     </div>))}
    
   </div>
  </div>;
};

export default ViewPf;
