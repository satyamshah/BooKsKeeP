import {Link,useLocation} from "react-router-dom"

import style from "./checkout.module.css";
import styles from "../Profile/profile.module.css";
import { ProductContext } from "../Context/ProductProvider";

const Addressbar = () => {


  const {dispatch,state}=ProductContext()
  const location=useLocation()

  return (
    <section className={style.addressbar}>
      <div className={style.internalcontainer}>
      <div style={{margin:"none"}}className={styles.middleflex}>
        <h3 styles={{marginBottom:"0.1rem"}}>{state.user.firstname}{" "}Address</h3>
      </div>
                <span>{state.address.property}{" ,"}{state.address.city}</span>
                <span>{" Pin-"}{state.address.pin}</span>
                <span>{", "}{state.address.country}</span>
                <span>{", "}Phone Number :{state.address.number}</span>
                <div className={styles.middleflex}>
                <Link to="/address" state={{ from: location }} ><button className={styles.editbutton} >Edit</button></Link>
      </div>
      </div>
    </section>
  );
};

export { Addressbar };
