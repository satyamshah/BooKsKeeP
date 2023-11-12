import { useEffect,useState } from "react";

import { Navbar } from "../Header/Navbar";
import { WishListCard } from "./WishListCard";
import style from "./wishlist.module.css";
import { ProductContext } from "../Context/ProductProvider";
import { AuthContext } from "../Context/AuthProvider";

const Wishlist = () => {
  const { state, getAlldetails } = ProductContext();
  const [loading, setloading] = useState(false);
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
      <Navbar />
      {state.wishlist.length === 0 ? (
        <section className={style.wishlistcontainer}>
          <h3>{loading?"loading.....":"No Item present in Wishlist"}</h3>
        </section>
      ) : (
        <section className={style.wishlistcontainer}>
          <h3>My Wishlist</h3>
          {state.wishlist.map((item) => (
            <WishListCard
              details={state.productdetails}
              wishlistid={item}
              key={item}
            />
          ))}
        </section>
      )}
    </>
  );
};

export { Wishlist };
