import {Link} from 'react-router-dom'
import { useState } from 'react'

import style from "./cart.module.css"
import { ProductContext } from '../Context/ProductProvider'
import { ACTION_TYPE } from '../Utils/Util'
const SummaryCart=(props)=>{
const {state,dispatch} =ProductContext()
 
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

return(
    <>
    <section className={style.summarycart}>
     <header className={style.summaryheader}>
       <p><span>&#9751;</span>Have a Coupon ?</p> 
       <span className={style.applybutton} onClick={()=>props.setCouponClicked(true)}>Apply</span>
     </header>
     <p>PRICE DETAILS</p>
     <div className={`${style.summarycostdiv} ${style.topborder}`}>
     <span>Price({state.cart.length} items)</span> <span><span>&#8377; </span>{totalpriceobj.originalsum}</span>
     </div>
     <div className={style.summarycostdiv}>
     <span>Discount</span> <span>-<span>&#8377; </span> {totaldiscount}</span>
     </div>
     <div className={style.summarycostdiv}>
     <span>Delivery Charges</span> <span>FREE</span>
     </div>
     <div className={`${style.summarycostdiv}`}>
     <span>Coupon Discount</span> <span><span>&#8377; </span>{coupondiscountamt}</span>
     </div>
     {state.coupon?(<div className={`${style.summarycostdiv} ${style.bottomborder}`}>
     <span  style={{color:"green"}}>{state.coupon==="Recdiscount"?"Recruiter_Discount":state.coupon==="devdiscount"?"Dev_discount":"No discount"}</span> <span  style={{color:"green"}} onClick={()=>dispatch({type:ACTION_TYPE.REMOVE_COUPON})}>&#10060;</span>
     </div>):(<div className={` ${style.bottomborder}`}>
     </div>)}
     <div className={`${style.summarycostdiv} ${style.topborder} ${style.bottomborder} ${style.summarcartamount}`}>
        <span>Total Amount</span> <span><span>&#8377; </span>{totalamount}</span>
     </div>
     <p style={{color:"green"}}>you will save <span>&#8377; </span>{coupondiscountamt+totaldiscount} on this order</p>
     <Link to="/checkout"><button className={style.checkoutbutton}>Checkout</button></Link>
    </section>
    </>
)
}

export {SummaryCart}