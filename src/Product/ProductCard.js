import style from "./product.module.css"
import { ACTION_TYPE } from "../Utils/Util"
import { ProductContext } from "../Context/ProductProvider"
import { AuthContext } from "../Context/AuthProvider"
import { Link, Navigate } from "react-router-dom"

const ProductCard=(props)=>{
    const{state,dispatch}=ProductContext()
    const { user } = AuthContext();
    const originalprice=Math.round((props.details.Price*100)/(100-props.details.Discount))



    return(
        <div className={style.productCard}>
            <Link to={`/products/${props.details.id}`}> 
            <div className={style.imagecontainer}>
            <img className={style.image}src={props?.details.Imageurl}></img>
            </div>
            </Link>
       <section className={style.detailssection}>
       <Link style={{textDecoration: 'none'}} to={`/products/${props.details.id}`}>
        <div  className={style.booknamecontainer}>
            <span  className={style.bookname}>{props?.details.name}</span>
            <button className={style.starbutton}>{props?.details.Rating} <span>&#9733;</span> </button>
            
        </div>
        <div >
            <p className={style.author}>{props?.details.Author}</p>
        </div>
        <div className={style.pricecontainer}>
            <span  className={style.price}>{props?.details.Price}</span>
            <span  className={style.orginalprice}>{originalprice}</span>
            <span  className={style.discount}>({props?.details.Discount}%off)</span>
        </div>
        </Link>
        <div className={style.cartbuttoncontainer}>
         {(state.cart.find((item)=>item.cartid===props.details.id))?(<Link to="/cart"><button className={style.cartbutton}  disabled={props.filter}>Go to Cart</button></Link>):user?(<Link to="/products"><button className={style.cartbutton} onClick={()=>dispatch(({type:ACTION_TYPE.ADD_TO_CART,payload:{value:props.details.id}}))} disabled={props.filter}>Add to Cart</button></Link>):(<Link to="/login"><button className={style.cartbutton} disabled={props.filter}>Add to Cart</button></Link>)}   
          {(state.wishlist.indexOf(props.details.id)!==-1)?(<Link to="/wishlist"><button className={style.wishlistbutton} disabled={props.filter}>Go to wishlist</button></Link>):user?(<Link to="/products"><button className={style.wishlistbutton} onClick={()=>dispatch(({type:ACTION_TYPE.ADD_TO_WISHLIST,payload:{value:props.details.id}}))} disabled={props.filter}>Add to wishlist</button></Link>):(<Link to="/login"><button className={style.wishlistbutton}>Add to wishlist</button></Link>)}  
        </div>
       </section>
        </div>
    )
}

export {ProductCard}