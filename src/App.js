import { Routes, Route } from "react-router-dom";

import "./styles.css";
import { AuthContext } from "./Context/AuthProvider";
import { RequiresAuth } from "./auth/RequireAuth";
import { RegisterPage } from "./auth/RegisterPage";
import { LoginPage } from "./auth/LoginPage";
import { Home } from "./Home/Home";
import { ProductPage } from "./Product/ProductPage";
import { ProductDetails } from "./Product/ProductDetails";
import { Wishlist } from "./Wishlist/Wishlist";
import { Cart } from "./Cart/Cart";
import { Profile } from "./Profile/Profile";
import { ErrorPage } from "./ErrorPage";
import { CheckOut } from "./Checkout/CheckOut";
import { Address } from "./Profile/Address";


export default function App() {
  const { user } = AuthContext();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/wishlist"
          element={
            <RequiresAuth login={user}>
              <Wishlist />
            </RequiresAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequiresAuth login={user}>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route path="/account" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/address" element={<Address/>} />
      </Routes>
    </div>
  );
}
