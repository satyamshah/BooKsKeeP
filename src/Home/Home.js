import {Link,useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

import {Footer, footer} from '../Footer/Footer'
import { Navbar } from "../Header/Navbar";
import { HomeCard } from "../Cards/Card";
import style from "../Home/home.module.css";
import { ProductContext } from "../Context/ProductProvider"
import { AuthContext } from "../Context/AuthProvider";


const Home = () => {
  const {getAlldetails,state}=ProductContext()
  const navigate=useNavigate()
  const {user}=AuthContext()
  useEffect(()=>{
    if(!state.isstateloaded){
      getAlldetails()
    }
  },[user])

  const container = [
    {
      key:"1",
      imagelink: "./Images/Fault.jpg",
      Category: "NEW ARRIVAL",
      Collection: "FICTION",
      description: "Literature in the form of prose, especially novels, that describes imaginary events and people"
    },
    {
      key:"2",
      imagelink: "./Images/Night.jpg",
      Category: "NEW ARRIVAL",
      Collection: "NON FICTION",
      description: "Non-fiction is writing that gives information or describes real events, rather than telling a story."
    },
    {
      key:"3",
      imagelink: "./Images/Miraclemorning.jpg",
      Category: "NEW ARRIVAL",
      Collection: "SELF HELP",
      description: "Meant to cause discomfort and fear for both the character and readers."
    }
  ];

  return (
    <>
      <Navbar />
      <section className={style.homepage}>
        <div className={style.imagecontainer}>
          <Link to="/products"><img  className={style.img} src="./Images/frontwall.svg" /></Link>
        </div>
        <div className={style.imagecontainer}>
          <img className={style.middleimg} src="./Images/image2.jpg" />
        </div>
        <div className={style.bottomcontainer}>
          {container.map((items) => (
            <HomeCard
            key={items.key}
              img={items.imagelink}
              Category={items.Category}
              Collection={items.Collection}
              desc={items.description}
              id={items.key}
             
            />
          ))}
        </div>
        <Footer/>
      </section>
    </>
  );
};

export { Home };
