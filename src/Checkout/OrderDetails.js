import {Link,useLocation} from "react-router-dom"

import style from "./checkout.module.css";
import styles from "../Profile/profile.module.css";
import { ProductContext } from "../Context/ProductProvider";

const OrderDetails = () => {
const location=useLocation()
  const {dispatch,state}=ProductContext()
  const cart=state.cart
cart.forEach(element => {
  element.name=state.productdetails.reduce((accm,curr)=>{
   if(curr.id===element.cartid)
   {
    accm=curr.name
   }
   return accm 
  },"")
});
const totalcount=cart.reduce((accm,curr)=>{
  return accm+curr.count
},0)

//summarycart calculation 
const filteredcart=state.productdetails.filter((item)=>{
  let filter=false;
   state.cart.forEach(element => {
     if(element.cartid===item.id)
     {
       filter=true;
     }
   });
   return filter;
 })

 //create a map of(cartid vs count)
 const cartmap=new Map()
state.cart.forEach((element)=>{
  cartmap[element.cartid]=element.count
 })


//total price of element in cart (stricket price) ,before discount
const totalpriceobj=filteredcart.reduce((accm,curr)=>{
  const originalprice=Math.round((curr.Price*100)/(100-curr.Discount)*(cartmap[curr.id]??1))
  return {originalsum:accm.originalsum+originalprice,pricesum:accm.pricesum+Number(curr.Price*(cartmap[curr.id]??1))}
},{originalsum:0,pricesum:0})

// total discount
const totaldiscount=Number(totalpriceobj.originalsum)-Number(totalpriceobj.pricesum);
//coupon discount
const coupondiscount=state.coupon==="Recdiscount"?80:(state.coupon==="devdiscount"?30:0)
const coupondiscountamt=Math.round(((totalpriceobj.pricesum)*coupondiscount)/100)
//total amount
const totalamount=totalpriceobj.originalsum-totaldiscount-coupondiscountamt
//total amount after coupon saved - add dynamically


  return (
    <section className={style.orderdetailsconatiner}>
      <div className={style.container}>
        <h3>ORDER DETAILS</h3>
        <div className={style.bookscontainer}>
          <span>Item</span>
          <span>Qty</span>
        </div>
        <div className={style.dynamiccontainer} >
          {cart.map(item=><div key={item.cartid} className={style.dynamicrowcontainer}><div>{item.name}</div><div>{item.count}</div></div>)}
        </div>
        <h3>PRICE DETAILS</h3>
        <div className={style.bookscontainer}>
          <span>Price({totalcount} items)</span>{" "}
          <span>
            <span>&#8377; </span>{totalpriceobj.originalsum}
          </span>
        </div>
        <div className={style.bookscontainer}>
          <span>Discount</span>{" "}
          <span>
            -<span>&#8377; </span> {totaldiscount}
          </span>
        </div>
        <div className={style.bookscontainer}>
          <span>Delivery Charges</span> <span>FREE</span>
        </div>
        <div className={style.bookscontainer}>
          <span>Coupon Discount</span>{" "}
          <span>
            <span>&#8377; </span>{coupondiscountamt}
          </span>
        </div>
        <div className={style.bookscontainer}>
          <span>Total Amount</span>
          <span>
            <span>&#8377; </span>{totalamount}
          </span>
        </div>
        <h3>DELIVER TO</h3>
        <div className={style.address}>
        <div style={{margin:"none"}}className={styles.middleflex}>
        <h3 styles={{marginBottom:"0.1rem"}}>{state.user.firstname}{" "}Address</h3>
      </div>
                <span>{state.address.property}{" ,"}{state.address.city}</span>
                <span>{" Pin-"}{state.address.pin}</span>
                <span>{", "}{state.address.country}</span>
                <span>{", "}Phone Number :{state.address.number}</span>
        </div>
        <button>Place Order</button>
      </div>
    </section>
  );
};

export { OrderDetails };
