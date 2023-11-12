import { Link,Navigate, useNavigate} from "react-router-dom";
import { useState } from "react";

import style from "./navbar.module.css";
import { AuthContext } from "../Context/AuthProvider";
import {ProductContext} from "../Context/ProductProvider";
import { ACTION_TYPE } from "../Utils/Util";


const Navbar = (props) => {
  const [input,setinput]=useState("")
  const {dispatch} = ProductContext();
  const {user}=AuthContext()
  const navigate=useNavigate()

function handleinput(e){
  setinput(e.target.value)
}
function handleClick(e){
 
  if(e.key === 'Enter'){
    
    dispatch({type:ACTION_TYPE.SEARCH,payload:input})
    navigate("/products")
  }
 
}

  return (
    <nav className={props.opacity ?`${style.navstyle} ${style.opacity}`:`${style.navstyle}`}>
      <header className={style.navheader}>
        {props.hambergerenable?(
        <div className={style.navlink}>
          <div className={style.hideburger}>
          <span className="material-symbols-outlined">menu</span>
          </div>
        <Link to="/" className={style.navlink}>
        <span className={style.hero}>Book'sKeep</span>    
        </Link>
        </div>
       )
        :
        (<Link to="/" className={style.navlink}>
          <span className={style.hero}>Book'sKeep</span>
        </Link>)}
        <input
          className={style.searchbarinv}
          value={input}
          onChange={(e)=>handleinput(e)}
          onKeyDown={(e)=>handleClick(e)}
          placeholder=" &#128269; search"
          type="text"
        />
        <div className={style.links}>
          <Link to="/products" className={style.navlink}>
            <span className="material-symbols-outlined" id={style.isvisible}>
              home
            </span>
          </Link>
          <Link to="/wishlist" className={style.navlink}>
            <span className="material-symbols-outlined">favorite</span>
          </Link>
          <Link to="/cart" className={style.navlink}>
            <span className="material-symbols-outlined">shopping_cart</span>
          </Link>
          {user? <Link to="/account" className={style.navlink}>
            <span className="material-symbols-outlined">login</span>
          </Link>: <Link to="/login" className={style.navlink}>
            <span className="material-symbols-outlined">login</span>
          </Link>}
        </div>
      </header>
      <div className={style.container}>
        <input
          className={style.searchbar}
          value={input}
          onChange={(e)=>handleinput(e)}
          onKeyDown={(e)=>handleClick(e)}
          placeholder=" &#128269; search"
          type="text"
        />
      </div>
    </nav>
  );
};

export { Navbar };

