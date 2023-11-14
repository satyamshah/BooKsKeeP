import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import { Navbar } from "../Header/Navbar";
import {LoaderComp} from "../loader/loader";
import style from "./loginpage.module.css";
import { AuthContext } from "../Context/AuthProvider";
import { ProductContext } from "../Context/ProductProvider";
import { ACTION_TYPE } from "../Utils/Util";

const LoginPage = () => {
  const {getAlldetails}=ProductContext()
  const email = useRef();
  const password = useRef();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location=useLocation()
  const { signIn, setUser } = AuthContext();
  

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null)
    setloading(true);
    try {
      const res = await signIn(email.current.value, password.current.value);
      let from = location.state?.from?.pathname || '/products'
      getAlldetails()
      setloading(false);
      navigate(from)
    } catch (e) {
      console.error(e.code);
      console.error(e.message);
      console.error(e);
      setloading(false);
      event.target.reset();
      e.code === "auth/wrong-password"
        ? setError("Wrong Password")
        : e.code === "auth/user-not-found"
        ? setError("User not Found ! please register")
        : setError("Unable to login");
    }
  };

  const handleGuestUser=async()=>{
    setError(null)
    setloading(true);
    try {
      const res = await signIn("GuestUser@gmail.com", "TestUser@2023");
      let from = location.state?.from?.pathname || '/products'
      getAlldetails()
      setloading(false);
      navigate(from)
    } catch (e) {
      console.error(e.code);
      console.error(e.message);
    }
    
  }

  return (
    <>
      <Navbar opacity={loading?true:false}/>
     {error ?<div className={style.errorcontainer}><div className={style.errormsg}>
      <span className="material-symbols-outlined">warning</span> 
      <p>{error}</p>
      </div> </div>:""} 
      {loading?<div className={style.loader}><LoaderComp/></div>:""}
      <div className={style.logincontainer}>
        <section className={loading?`${style.logincard} ${style.opacity}`:`${style.logincard}`}>
          <h2 className={style.loginheader}>Sign In</h2>
          <form onSubmit={handleLogin}>
            <div className={style.emailaddress}>
              <label className={style.labelpadd} htmlFor="emailaddress">
                Email Address
              </label>
              <input
                className={style.padd}
                type="email"
                id="emailaddress"
                placeholder="test@gmail.com"
                ref={email}
                required
              />
              <label className={style.labelpadd} htmlFor="password">
                Password
              </label>
              <input
                className={style.padd}
                type="password"
                id="password"
                placeholder="*********"
                ref={password}
                required
              />
              <footer className={style.footer}>
                <div>
                  <button type="submit" className={style.button} disabled={loading}>
                    Login
                  </button>
                </div>
                <div>
                  <button onClick={handleGuestUser} className={style.button} disabled={loading}>
                    Login as Guest
                  </button>
                </div>
                <div className={style.registerlink}>
                  <Link to="/register">
                    <p>Create New Account </p>
                  </Link>
                </div>
              </footer>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export { LoginPage };
