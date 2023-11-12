import { useEffect,useState } from "react";

import { Navbar } from "../Header/Navbar";
import { CartCard } from "./CartCard";
import { SummaryCart } from "./SummaryCart";
import style from "./cart.module.css"
import { ProductContext } from "../Context/ProductProvider";
import { AuthContext } from "../Context/AuthProvider";
import { ACTION_TYPE } from "../Utils/Util";



const Cart = () => {
  const { state, getAlldetails ,dispatch} = ProductContext();
  const { user } = AuthContext();
  const [isCouponClicked,setCouponClicked]=useState(false)
  const [selectedOption,setselectedOption]=useState()
  const [loading, setloading] = useState(false);


  useEffect(() => {
    if(!state.isstateloaded){
      setloading(true);
      getAlldetails();
      setTimeout(()=>setloading(false),2000)
      }
  }, [user]);

  function handleOptionChange(event){
    setselectedOption(event.target.value)
  }
function handleClick(){
  if(selectedOption)
  {
    dispatch({type:ACTION_TYPE.ADD_COUPON,payload:selectedOption})
    setCouponClicked(false)
  }
  
}
  return (
    <>
      <Navbar opacity={isCouponClicked}/>
      {state.cart.length === 0 ? (
          <h3 className={style.cartheader}>{loading?"loading.....":"No Item present in Cart"}</h3>
      ) : (
        <>
      <h3 className={style.cartheader}>Cart({state.cart.length})</h3>
      <section className={style.cartcontainer}>
       <section className={style.cartcardcontainer}>
       {state.cart.map((item) => (
            <CartCard
              details={state.productdetails}
              cartid={item.cartid}
              key={item.cartid}
            />
          ))}
      {isCouponClicked?(<section className={style.couponsectioncontainer}>
        <div className={style.couponcontainer}>
        <div className={style.couponsection}>
        <section className={style.couponinnersection}>
        <header className={style.couponheader}>
        <h2>Apply Coupon</h2>
        <span className="material-symbols-outlined" onClick={()=>setCouponClicked(false)}>close</span>
        </header>
       <div className={style.couponinput}>
       <input type="radio" name="couponradio" id="recr" value="Recdiscount" checked={selectedOption === 'Recdiscount'} onChange={handleOptionChange}></input>
       <label htmlFor="recr">80% OFF RECRUITER DISCOUNT</label>
       </div>
       <div className={style.couponinput}>
       <input type="radio" name="couponradio" id="dev" value="devdiscount" checked={selectedOption === 'devdiscount'} onChange={handleOptionChange}></input>
       <label htmlFor="dev">30% OFF DEVELOPER DISCOUNT</label>
       </div>
       <button onClick={handleClick}>Apply</button>
       </section>
       </div>
        </div>
      </section>):(<></>)}
       </section>
        <div className={style.summarycartcontainer}>
        <SummaryCart setCouponClicked={setCouponClicked}/> 
       </div>
      </section>
      </>)}
      
    </>
  );
};

export { Cart };
