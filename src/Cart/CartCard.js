import { Link } from "react-router-dom";

import style from './cart.module.css'
import { ProductContext } from "../Context/ProductProvider"
import { ACTION_TYPE } from "../Utils/Util"

const CartCard=(props)=>{
    const{state,dispatch}=ProductContext()
    const currentlist = props.details.filter(
      (item) => item.id === props.cartid
    );
    const originalprice = Math.round(
      (currentlist[0].Price * 100) / (100 - currentlist[0].Discount)
    );
    
console.log(state.wishlist)

return(
<section className={style.cartcard}>
<div className={style.cardheader}>
<div className={style.imagecontainer}>
<img className={style.image} src={currentlist[0].Imageurl}></img>
</div>
<div className={style.otherdetails}>
<h3>{currentlist[0].name}</h3>
<p>{currentlist[0].Author}</p>
<div className={style.pricecontainer}>
<span className={style.price}>{currentlist[0].Price}</span>
<span className={style.orginalprice}>{originalprice}</span>
<span className={style.discount}>({currentlist[0].Discount}%off)</span>
</div>
<div className={style.buttoncontainer}>
    <button className={style.buttoncontainerbutton} onClick={()=>dispatch({type:ACTION_TYPE.ADD_COUNT,payload:{value:currentlist[0].id}})}>+</button>
    <span>{state.cart.filter((item)=>item.cartid===currentlist[0].id)[0].count}</span>
    <button className={style.buttoncontainerbutton} onClick={()=>dispatch({type:ACTION_TYPE.SUBSTRACT_COUNT,payload:{value:currentlist[0].id}})}>-</button>  
</div>
</div>
</div>
<div className={style.cartfooter}>
<h3 onClick={()=>dispatch({type:ACTION_TYPE.REMOVE_FROM_CART,payload:{value:currentlist[0].id}})}>REMOVE</h3>
{(state.wishlist.indexOf(currentlist[0].id)===-1)?(<h3 onClick={()=>dispatch({type:ACTION_TYPE.ADD_TO_WISHLIST,payload:{value:currentlist[0].id}})}>MOVE TO WISHLIST</h3>):(<Link to="/wishlist"><h3>GO TO WISHLIST</h3></Link>)}
</div>
</section>
)

}


export {CartCard}