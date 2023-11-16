import { useNavigate,useLocation } from "react-router-dom";
import {useState} from "react";

import { Navbar} from '../Header/Navbar'
import { ProductContext } from "../Context/ProductProvider";
import { ACTION_TYPE } from "../Utils/Util";
import style from "./profile.module.css";

const Address=()=>{
const {dispatch,state}=ProductContext()
const[error,setError]=useState()


const [formdata,setFormdata]=useState({
    property:state.address.property,
    city:state.address.city,
    states:state.address.state,
    pin:state.address.pin,
    country:state.address.country,
    number:state.address.number
})


const navigate = useNavigate();
const location=useLocation()
console.log(formdata)
console.log(state)

function handlesave(e){
    e.preventDefault()
    if(formdata.pin.length>10){
        setError("Pin length should be less than 10")
    }
    else if(formdata.number.length>13)
    {
        setError("Number length should be less than 10")
    }
    else
    {
        dispatch({type:ACTION_TYPE.SAVE_ADDRESS,payload:{property:formdata.property,city:formdata.city,state:formdata.states,pin:formdata.pin,country:formdata.country,number:formdata.number}})
        let from = location.state?.from?.pathname || '/account'
        navigate(from)
    }
}
function handlecancel(){
    let from = location.state?.from?.pathname || '/account'
    navigate(from)  
}
function editfield(event,name)
{
    switch(name)
    {
        case 'property':{
            setFormdata({...formdata,property:event.target.value})
            break;
        }
        case 'city':{
            setFormdata({...formdata,city:event.target.value})
            break;
        }
        case 'state':{
            setFormdata({...formdata,states:event.target.value})
            break;
        }
        case 'pin':{
                setFormdata({...formdata,pin:event.target.value})
                break;
            }
           
        case 'country':{
            setFormdata({...formdata,country:event.target.value})
            break;
        }
        case 'phoneNumber':{
                setFormdata({...formdata,number:event.target.value})
                break;
        }
           
    }
     
}
    return(
        <>
    <Navbar/>
    {error ?<div className={style.errorcontainer}><div className={style.errormsg}>
      <span className="material-symbols-outlined">warning</span> 
      <p>{error}</p>
      </div> </div>:""}
    <form className={style.addresssection}  onSubmit={(e)=>handlesave(e)}>
        <div className={style.addresssubsection}>
        <div className={style.addressbox}>
        <h3>
        Add New Address
        </h3>
        <input value={formdata.property} onChange={(e)=>editfield(e,"property")} type="text" placeholder="Enter House,Colony"  maxLength="40" className={style.inputfield} required></input>
        <input value={formdata.city} onChange={(e)=>editfield(e,"city")} type="text" placeholder="Enter city" maxLength="15"  className={style.inputfield} required></input>
        <input value={formdata.states} onChange={(e)=>editfield(e,"state")} type="text" placeholder="Enter state" maxLength="20"  className={style.inputfield} required></input>
        <input value={formdata.pin} onChange={(e)=>editfield(e,"pin")} type="number" placeholder="Enter pin"  className={style.inputfield} required></input>
        <input value={formdata.country} onChange={(e)=>editfield(e,"country")} type="text" placeholder="Enter Country" maxLength="15"  className={style.inputfield} required></input>
        <input value={formdata.number} onChange={(e)=>editfield(e,"phoneNumber")} type="number" placeholder="Enter Phone Number"   className={style.inputfield} required></input>
        <button type="submit" className={style.addressbutton}> Save</button>
        <button className={style.addressbutton} onClick={handlecancel}>Cancel</button>
        </div>
        </div>
    </form>
    </>)
}

export {Address}