import AllCryptos from "./components/AllCryptos"
import ViewPf from "./components/ViewPf"
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";

const app=()=>{

return(
   
     <Router> 
          <Routes>  
           <Route exact path="/" element={ <AllCryptos />} />
           <Route exact path="/pf" element={ < ViewPf/>} />
          </Routes> 
    </Router>
)

}

export default app