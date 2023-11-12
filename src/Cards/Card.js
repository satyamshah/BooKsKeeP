import {Link,useNavigate} from 'react-router-dom'

import style from "./card.module.css";
import { ProductContext } from "../Context/ProductProvider"
import {ACTION_TYPE} from "../Utils/Util"

const HomeCard = (props) => {
  const {dispatch,state}=ProductContext()
  const navigate=useNavigate()

function handlenavigate(key){
  switch(key)
  {
    case '1':
      dispatch({type:ACTION_TYPE.APPLY_CATEGORY_FILTER ,payload:{value:'Fiction',clearall:'true'}})
      navigate("/products")
      break;
    case '2':
      dispatch({type:ACTION_TYPE.APPLY_CATEGORY_FILTER ,payload:{value:'nonfiction',clearall:'true'}})
      navigate("/products")
      break;
    case '3':
      dispatch({type:ACTION_TYPE.APPLY_CATEGORY_FILTER ,payload:{value:'selfhelp',clearall:'true'}})
      navigate("/products")
      break;
  }

}

  return (
    <div  onClick={()=>handlenavigate(props.id)} className={style.cardcontainer}>
      <div  className={style.cardimagecontainer}>
        <img  className={style.cardimage} src={props.img} />
      </div>
     <div className={style.category}>
     <h3>{props.Category}</h3>
     </div>
     <div className={style.collection}>
     <h2>{props.Collection}</h2>
     </div>
     <div className={style.desc}>
     <p>{props.desc}</p>
     </div>
    </div>
  );
};

export { HomeCard };
