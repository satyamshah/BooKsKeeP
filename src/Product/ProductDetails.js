
import {useState,useEffect} from 'react';
import {useNavigate, useParams,Link} from 'react-router-dom'
import { ACTION_TYPE } from "../Utils/Util"
import {Navbar} from "../Header/Navbar"
import {ProductContext} from '../Context/ProductProvider'
import { AuthContext } from "../Context/AuthProvider";
import style from "./product.module.css"


const ProductDetails=()=>{
    const {id} = useParams()
    const {user}=AuthContext()
    const [loading,setloading]=useState(false)
    const {getAlldetails,state,dispatch}=ProductContext()
    const navigate=useNavigate()
const product=state.productdetails.filter((item)=>item.id===id)

function cartaddclick(){
    if(user){
        dispatch(({type:ACTION_TYPE.ADD_TO_CART,payload:{value:id}}))
    }
    else{
     navigate('/login')
    }
}

function wishlistaddclick(){
    if(user){
        dispatch(({type:ACTION_TYPE.ADD_TO_WISHLIST,payload:{value:id}}))
    }
    else{
        navigate('/login')
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
      ,2000)
    }
  },[user])

return(
    <>
    <Navbar/>
    {product.length===0?<div>
        <h3 style={{position:"relative" , top:"6rem"}}>{loading?"loading.....":"Product Not found"}</h3>
    </div>:
    <div className={style.productdetailscontainer} >
        <section className={style.productdetailssection}>
        <div className={style.detailimagecontainer}>
        <img className={style.detailimage} src={product[0]?.Imageurl}></img>
        </div>
        <div className={style.detailcontainer}>
            <div className={style.detailheader}>
            <h3>{product[0]?.name}</h3>
            <span>{product[0]?.Rating}</span><span>&#9733;</span>
            </div>
            <div className={style.detailsprice}>
            <span className={style.price}>{product[0]?.Price}</span>
            <span className={style.orginalprice}>{Math.round((product[0].Price*100)/(100-product[0].Discount))}</span>
            <span className={style.discount}>({product[0]?.Discount}%off)</span>
            </div>
            <div>
            <p className={style.alert}>Hurry,Only Few Left !</p>
            </div>
            <div className={style.features}> 
            <p><span>&#9751;</span> Fastest Delivery</p> 
            <p><span>&#9751;</span> Inclusive of All Taxes</p>
            <p><span>&#9751;</span> Cash On Delivery </p> 
            </div>
            <div className={style.moreinfo}>
             <p><span>Author :</span> {product[0]?.Author}</p>   
             <p><span>Category :</span> {product[0]?.Category}</p>   
             <p><span>Binding :</span> Hard Cover</p>   
             <p><span>Language :</span> English</p>   
            </div>
            
            {!state.cart.reduce((accm,curr)=>{
if(curr.cartid===id)
{
  accm=true
}
return accm 
  },false)?(<button className={style.detailscartbutton} onClick={cartaddclick}>Add to Cart</button>):(<Link to="/cart"><button className={style.detailscartbutton}>Go to Cart</button></Link>)} 
        {(state.wishlist.indexOf(id)===-1)?<button onClick={wishlistaddclick} className={style.detailswishlistbutton}>Add to Wishlist</button>:(<Link to="/wishlist"><button className={style.detailswishlistbutton}>Go to Wishlist</button></Link>)}
        </div>
        </section>  
    </div>
} 
    </>
)
}

export {ProductDetails}