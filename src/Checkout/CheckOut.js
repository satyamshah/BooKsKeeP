import {useState,useEffect} from 'react'
import { Navbar } from "../Header/Navbar";
import { Addressbar } from "./Addressbar";
import { OrderDetails } from "./OrderDetails";
import { ProductContext } from "../Context/ProductProvider";
import { AuthContext } from "../Context/AuthProvider";
import style from "./checkout.module.css";

const CheckOut = () => {
  const [loading, setloading] = useState(false);
  const { getAlldetails,state } = ProductContext();
  const { user } = AuthContext();

  useEffect(() => {
    if(!state.isstateloaded){
      setloading(true);
      getAlldetails();
      setTimeout(()=>setloading(false),2000)
      }
  }, [user]);


  return (
   <>
    {loading?(<>
      <Navbar /><h3 className={style.header}>loading.....</h3></>):(
      <>
      <Navbar />
      <h3 className={style.header}>Checkout</h3>
      <section className={style.checkoutcontainer}>
        <div className={style.addressbarcontainer}>
          <Addressbar />
        </div>
        <OrderDetails />
      </section>
      </>
      )}
      </>
  );
};

export { CheckOut };
