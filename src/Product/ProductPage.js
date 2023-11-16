import {useState,useEffect} from 'react';
import { Link,useNavigate } from "react-router-dom";


import { AuthContext } from "../Context/AuthProvider";
import { ProductCard } from './ProductCard';
import {Filter} from './Filter'
import {LoaderComp} from "../loader/loader";
import {ProductContext} from '../Context/ProductProvider'
import { ACTION_TYPE } from '../Utils/Util';
import styles from "../Header/navbar.module.css";
import style from "./product.module.css";

const ProductPage = () => {
  const [input,setinput]=useState("")
  const [filter,setfilter]=useState(false)
  const {user}=AuthContext()
  const {getAlldetails,state,dispatch}=ProductContext()
  const [loading,setloading]=useState(false)
  const navigate=useNavigate()

  
function handleinput(e){
  setinput(e.target.value)
}
function handleClick(e){
  
  if(e.key === 'Enter'){
    
    dispatch({type:ACTION_TYPE.SEARCH,payload:input})
  }
 
}


useEffect(()=>{
  if(!state.isstateloaded){
    setloading(true)
    getAlldetails()
    setTimeout(()=>
    {
        setloading(false)
    }
    ,800)
  }
},[user])

const filterupdate=()=>filter?setfilter(false):setfilter(true)

let opacity=false; 
let filters={...state}
let filtereddata=filters?.productdetails

if(state?.priceRange!==""){
  filtereddata=filtereddata?.filter(item=>item.Price<=state.priceRange)
}
if(state?.category.length!==0 && state?.category.length!==3)
{
  filtereddata=filtereddata?.filter((item)=>{
    return state.category.includes(item.Category)
  })
}

if(state?.Rating?.length!==0){
  filtereddata=filtereddata?.filter((item)=>{
    return item.Rating>=state.Rating
  })
}

if(state?.sortBy!=="")
{
  if(state?.sortBy==='asc')
  {
   filtereddata?.sort((a,b)=>a.Price-b.Price)
  }
  if(state?.sortBy==='desc')
  {
    filtereddata?.sort((a,b)=>b.Price-a.Price)
  }
}


//search logic 
filtereddata=filtereddata.filter((item)=>{
  return item.name.toLowerCase().includes(state.search.toLowerCase())
})





  return (
    
    <>
     <nav className={opacity ?`${styles.navstyle} ${styles.opacity}`:`${styles.navstyle}`}>
      <header className={styles.navheader}>
        <div className={styles.navlink}>
          <div className={styles.hideburger}>
          <span onClick={filterupdate}className="material-symbols-outlined">menu</span>
          </div>
        <Link to="/" className={styles.navlink}>
        <span className={styles.heros}>Book'sKeep</span>    
        </Link>
        </div>
        <input
          className={styles.searchbarinv}
          value={input}
          onChange={(e)=>handleinput(e)}
          onKeyDown={(e)=>handleClick(e)}
          placeholder=" &#128269; search"
          type="text"
        />
        <div className={styles.links}>
          <Link to="/products" className={styles.navlink}>
            <span className="material-symbols-outlined" id={style.isvisible}>
              home
            </span>
          </Link>
          <Link to="/wishlist" className={styles.navlink}>
            <span className="material-symbols-outlined">favorite</span>
            {state.wishlist.length!==0?<span className={styles.topnum}>{state.wishlist.length}</span>:""} 
          </Link>
          <Link to="/cart" className={styles.navlink}>
            <span className="material-symbols-outlined">shopping_cart</span>
            {state.cart.length!==0?<span className={styles.topnum}>{state.cart.length}</span>:""} 
          </Link>
          {user? <Link to="/account" className={styles.navlink}>
            <span className="material-symbols-outlined">login</span>
          </Link>: <Link to="/login" className={styles.navlink}>
            <span className="material-symbols-outlined">login</span>
          </Link>}
        </div>
      </header>
      <div className={styles.container}>
        <input
          className={styles.searchbar}
          value={input}
          onChange={(e)=>handleinput(e)}
          onKeyDown={(e)=>handleClick(e)}
          placeholder=" &#128269; search"
          type="text"
        />
      </div>
    </nav>
    {loading?<div className={style.loader}><LoaderComp/></div>:
      <div className={style.nonnavcontainer}>
        <section className={filter?(`${style.transon}`):(`${style.transoff}`)}>
        <Filter filter={filter}/>
        </section>
        <section className={filter?(`${style.productscontainer} ${style.opacity}`):(`${style.productscontainer}`)}>
        <header className={style.headercontainer}>
        <h3>
          {filtereddata?.length===0?((!state.search.length===0)?"No books Found":""):`Showing All Products (${filtereddata?.length??0})`}
          
        </h3>
      </header>
      <section className={style.sectioncontainer}>
        {filtereddata?.map((item)=> <ProductCard key={item.id} filter={filter} details={item}/> )}
      </section>
      </section>
      </div>
}
    </>
  );
};

export { ProductPage };
