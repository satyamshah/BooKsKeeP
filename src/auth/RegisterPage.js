import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";

import { Navbar } from "../Header/Navbar";
import { AuthContext } from "../Context/AuthProvider";
import { ProductContext } from "../Context/ProductProvider";
import {db} from "../Firebase";
import {LoaderComp} from "../loader/loader"
import style from "./loginpage.module.css";

const RegisterPage = () => {
  const {getAlldetails}=ProductContext()
  const firstname = useRef();
  const lastname = useRef();
  const email = useRef();
  const password = useRef();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { createUser } = AuthContext();

  const Registerhandler = async (event) => {
    event.preventDefault();
    setError(null)
    setloading(true);
    try {
        const resp = await createUser(
        email.current.value,
        password.current.value
      );
      await setDoc(doc(db, "users",resp.user.uid ), {
        firstName: firstname.current.value,
        lastName: lastname.current.value,
        email: email.current.value,
        password:password.current.value,
        cart:[],
        wishlist:[],
        property:"",
        city:"",
        state:"",
        pin:"",
        country:"",
        phoneNumber:""
      });
      getAlldetails()
      setloading(false);
      navigate("/products");
    } catch (e) {
      console.error(e.code);
      console.error(e.message);
      console.error(e);
      setloading(false);
      event.target.reset();
      e.code === "auth/email-already-in-use"
        ? setError("Email already in use")
        : e.code === "auth/invalid-email"
        ? setError("Invalid Email Address")
        : setError("Unable to register");
    }
  };
  return (
    <>
      <Navbar opacity={loading?true:false}/>
     {error ?<div className={style.errorcontainer}><div className={style.errormsg}>
      <span className="material-symbols-outlined">warning</span> 
      <p>{error}</p>
      </div> </div>:""} 
      {loading?<div className={style.loader}><LoaderComp/></div>:""}
      <div className={style.registercontainer}>
        <section className={loading?`${style.registercard} ${style.opacity}`:`${style.registercard}`} >
          <h2 className={style.registerheader}>Sign Up</h2>
          <form onSubmit={Registerhandler}>
            <div className={style.name}>
              <div className={style.namelabel}>
                <label className={style.label} htmlFor="firstname">
                  First Name
                </label>
                <label className={style.label} htmlFor="lastname">
                  Last Name
                </label>
              </div>
              <div className={style.nameinput}>
                <input
                  className={style.input}
                  type="name"
                  id="firstname"
                  placeholder="test"
                  ref={firstname}
                  required
                />
                <input
                  className={style.input}
                  type="name"
                  id="lastname"
                  placeholder="Admin"
                  ref={lastname}
                  required
                />
              </div>
            </div>
            <div>
              <label className={style.emailpasslabel} htmlFor="email">
                Email Address
              </label>
              <input
                className={style.emailpassinput}
                type="email"
                id="email"
                placeholder="test@gmail.com"
                ref={email}
                required
              />
            </div>
            <div>
              <label className={style.emailpasslabel} htmlFor="password">
                Password
              </label>
              <input
                className={style.emailpassinput}
                type="password"
                id="password"
                placeholder="********"
                ref={password}
                minLength="8"
                required
              />
            </div>
            <footer className={style.footer}>
              <div>
                <button
                  // onClick={handleregister}
                  type="submit"
                  className={style.registerbutton}
                  disabled={loading}
                >
                  Create New Account
                </button>
              </div>
              <div className={style.loginlink}>
                <Link to="/login" disabled={loading}>
                  <p>Already have an account </p>
                </Link>
              </div>
            </footer>
          </form>
        </section>
      </div>
    </>
  );
};

export { RegisterPage };
