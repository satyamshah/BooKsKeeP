import { Link } from "react-router-dom";

import style from "./wishlist.module.css";
import { ProductContext } from "../Context/ProductProvider"
import { ACTION_TYPE } from "../Utils/Util"

const WishListCard = (props) => {
    const{state,dispatch}=ProductContext()
  const currentlist = props.details.filter(
    (item) => item.id === props.wishlistid
  );
  const originalprice = Math.round(
    (currentlist[0].Price * 100) / (100 - currentlist[0].Discount)
  );
  
  return (
    <section className={style.wishlistcard}>
      <div className={style.wishlistheader}>
        <div className={style.imagecontainer}>
          <img className={style.image} src={currentlist[0].Imageurl}></img>
        </div>
        <div className={style.otherdetails}>
          <h3>{currentlist[0].name}</h3>
          <p>{currentlist[0].Author}</p>
          <div className={style.pricecontainer}>
            <span className={style.price}>{currentlist[0].Price}</span>
            <span className={style.orginalprice}>{originalprice}</span>
            <span className={style.discount}>
              ({currentlist[0].Discount}%off)
            </span>
          </div>
         {state.cart.indexOf(props.wishlistid)===-1?(<button className={style.addcart} onClick={()=>dispatch(({type:ACTION_TYPE.ADD_TO_CART,payload:{value:props.wishlistid}}))}>Add to Cart</button>):(<Link to="/cart"><button className={style.addcart}>Move to Cart</button></Link>)} 
          <button className={style.removewishlist} onClick={()=>dispatch({type:ACTION_TYPE.REMOVE_FROM_WISHLIST,payload:{value:props.wishlistid}})}>Remove from Wishlist</button>
        </div>
      </div>
    </section>
  );
};

export { WishListCard };
