import Style from "./product.module.css"
import { ProductContext } from "../Context/ProductProvider"
import {ACTION_TYPE} from "../Utils/Util"



const Filter=(props)=>{

    const {dispatch,state}=ProductContext()


    return(<section className={props.filter?`${Style.filtersection}`:`${Style.filtersection} ${Style.nodisplay}`}>
    <header className={Style.filterheader}>
     <h3>Filters</h3>
     <h3 className={Style.clear} onClick={(e)=>dispatch({type:ACTION_TYPE.RESET})} >Clear</h3>
    </header>
    <div className={Style.slider}>
    <h3>Price</h3> 
    <div>
    <p>100</p>
    <p>250</p>
    <p>500</p>
    </div>
    <input type="range" min='100' max='500' value={state.priceRange===""?'100':state.priceRange} onChange={(e)=>dispatch({ type:ACTION_TYPE.APPLY_PRICE_RANGE,payload:e.target.value})}
     ></input>
    </div>
    <div className={Style.category}>
        <h3>Category</h3>
        <div> <input type="checkbox" id="fiction" defaultChecked={state.category.includes('Fiction')?true:false} onClick={(e)=>dispatch({type:ACTION_TYPE.APPLY_CATEGORY_FILTER ,payload:{ischecked:e.target.checked,value:'Fiction'}})}></input>
        <label htmlFor="fiction">Fiction</label></div>
       <div><input type="checkbox" id="nonfiction" defaultChecked={state.category.includes('nonfiction')?true:false} onClick={(e)=>dispatch({type:ACTION_TYPE.APPLY_CATEGORY_FILTER ,payload:{ischecked:e.target.checked,value:'nonfiction'}})}></input>
        <label htmlFor="nonfiction">Non Fiction</label></div>
        <div><input type="checkbox" id="SelfHelp" defaultChecked={state.category.includes('selfhelp')?true:false} onClick={(e)=>dispatch({type:ACTION_TYPE.APPLY_CATEGORY_FILTER ,payload:{ischecked:e.target.checked,value:'selfhelp'}})}></input>
        <label htmlFor="SelfHelp">Self Help</label></div>    
    </div>
    <div className={Style.rating}>
        <h3>Rating</h3>
        <div>
            <input type="radio" name="rating" id="1star" defaultChecked={state.Rating.includes('1')?true:false} onClick={(e)=>dispatch({type:ACTION_TYPE.APPLY_RATING_FILTER,payload:{value:'1'}})}></input>
            <label htmlFor="1star">1 star & above</label>
        </div>
        <div>
            <input type="radio" name="rating" id="2star" defaultChecked={state.Rating.includes('2')?true:false} onClick={(e)=>dispatch({type:ACTION_TYPE.APPLY_RATING_FILTER,payload:{value:'2'}})}></input>
            <label htmlFor="2star">2 star & above</label>
        </div>
        <div>
            <input type="radio" name="rating" id="3star" defaultChecked={state.Rating.includes('3')?true:false} onClick={(e)=>dispatch({type:ACTION_TYPE.APPLY_RATING_FILTER,payload:{value:'3'}})}></input>
            <label htmlFor="3star">3 star & above</label>
        </div>
        <div>
            <input type="radio" name="rating" id="4star" defaultChecked={state.Rating.includes('4')?true:false} onClick={(e)=>dispatch({type:ACTION_TYPE.APPLY_RATING_FILTER,payload:{value:'4'}})}></input>
            <label htmlFor="4star">4 star & above</label>
        </div>
    </div>
    <div className={Style.sort}>
        <h3>Sort by</h3>
        <div>
            <input type="radio" name="sort" id="low" defaultChecked={state.sortBy==='asc'?true:false} onClick={(e)=>dispatch({type:ACTION_TYPE.SORT,payload:'asc'})}></input>
            <label htmlFor="lowr">Price - Low to High</label>
        </div>
        <div>
            <input type="radio" name="sort" id="high" defaultChecked={state.sortBy==='desc'?true:false} onClick={(e)=>dispatch({type:ACTION_TYPE.SORT,payload:'desc'})}></input>
            <label htmlFor="high">Price - High to Low</label>
        </div>
    </div>
    </section>)
}

export {Filter}