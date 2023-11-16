import { useNavigate,Navigate,Link,useLocation } from "react-router-dom";
import {useEffect, useState} from 'react';

import { auth,db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../Context/AuthProvider";
import { Navbar} from '../Header/Navbar'
import {LoaderComp} from "../loader/loader";
import { ProductContext } from "../Context/ProductProvider";
import { ACTION_TYPE } from "../Utils/Util";
import style from './profile.module.css'

const Profile=()=>{
    let location = useLocation()
    
    const { user, logout } = AuthContext();
    const {dispatch,state,getAlldetails}=ProductContext();
    const [loading, setloading] = useState(false);
    const navigate=useNavigate()
    
    console.log(state)

      useEffect(()=>{
        if(!state.isstateloaded){
        setloading(true);
        getAlldetails()
        setTimeout(()=>setloading(false),2000)
        }
      },[user])

async function handleClick(){
setloading(true);
 try{
    const resp= await logout()
    dispatch({type:ACTION_TYPE.STATE_RESET})
    setloading(false);
    navigate("/")
    }
    catch(e){
    console.error(e)
     }
}




    return(
        <>
       <Navbar opacity={loading?true:false}/>
      {loading?<div className={style.loader}><LoaderComp/></div>:(
        <section className={style.section}> 
        <div className={loading?`${style.addresscardcontainer} ${style.opacity}`:`${style.addresscardcontainer}`}>
            <header className={style.cardheader}>
                <h3>
                   Address
                </h3>     
            </header>
            <article >
                {!state.address.city?( <Link to="/address" state={{ from: location }} ><h3 style={{margin:"1rem"}} >+ Add New Address</h3></Link>):
                (<section className={style.addressdisplaysection}>
                    <div className={style.middleflex}>
                    <h3 style={{textDecorationLine:"underline",marginBottom:"0.1rem"}} >My Address</h3>
                    </div>
                <h3 style={{marginBottom:"0.1rem"}}>{state.user.firstname}</h3>
                <span>{state.address.property}{" ,"}{state.address.city}</span>
                <span>{state.address.pin}</span>
                <span>{state.address.country}</span>
                <span>Phone Number :{state.address.number}</span>
                <div className={style.middleflex}>
                <Link to="/address" state={{ from: location }} ><button className={style.editbutton} >Edit</button></Link>
                 </div>
                </section>)}       
            </article>
            </div>
            <div className={loading?`${style.cardcontainer} ${style.opacity}`:`${style.cardcontainer}`}>
            <header className={style.cardheader}>
                <h3>
                    Profile Details
                </h3>
            </header>
            <article className={style.details}>
                <div className={style.detailscolumns}>
                <p className={style.firstcolumn}>FirstName</p>
                <p className={style.firstName}>{state.user.firstname}</p>
                </div>
                <div className={style.detailscolumns}>
                <p className={style.firstcolumn}>LastName</p>
                <p className={style.lastName}>{state.user.lastname}</p>
                </div>
                <div className={style.detailscolumns}>
                <p className={style.firstcolumn}>Email</p>
                <p>{state.user.email}</p>
                </div>
                <div className={style.setting}>
                    <h3 className={style.settingh3}>
                        Account Settings
                    </h3>
                </div>
                <div className={style.logout}>
                    <button onClick={handleClick} className={style.logoutbutton}>
                        Logout
                    </button>
                </div>
            </article>
            </div>
        </section>)}
        </>
    )
}

export {Profile}