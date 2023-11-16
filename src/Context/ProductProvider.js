import { createContext,useContext, useEffect, useReducer, useState } from "react";
import {collection, getDocs,setDoc} from "firebase/firestore";
import { doc, getDoc,updateDoc ,arrayUnion } from "firebase/firestore";


import {db} from "../Firebase"
import {ACTION_TYPE} from "../Utils/Util"
import { AuthContext } from "./AuthProvider";

const productContext= createContext();

const ProductProvider=({children})=>{
    const { user } = AuthContext();

    const initialState = {
        isstateloaded:"",
        sortBy: "",
        priceRange: "",
        category:[],
        Rating: [],
        productdetails:[],
        cart: [],
        wishlist: [],
        search: "",
        coupon:"",
        address: {
          property:"",
          city:"",
          state:"",
          pin:"",
          country:"",
          phoneNumber:""
      },
      user:{
        email:"",
        firstname:"",
        lastname:""
      }
      };

const [state,dispatch]=useReducer(reducer,initialState)


function reducer(state, action) {
    switch (action.type) {
       case ACTION_TYPE.INITIALIZE_PRODUCTS:{
       //add code for refresh of all filters
       const newstate=action.payload
       return {...newstate}
       }
       case ACTION_TYPE.APPLY_PRICE_RANGE:{
        return {...state,priceRange:action.payload}
       }
       case ACTION_TYPE.APPLY_CATEGORY_FILTER:{
        if(action.payload.ischecked){
            if(state.category.includes(action.payload.value)!==true)
            {
              const categoryarr=state.category
              categoryarr.push(action.payload.value)
                return{...state,category:categoryarr}
            }
            else{
                return {...state}
            }
        }
        else if(action.payload.clearall=='true'){
          return{...state,category:[action.payload.value]}
        }
        else{
            if(state.category.includes(action.payload.value))
            {
                let temp=[...state.category]
                temp=temp.filter(item=>item!==action.payload.value)
                return {...state,category:temp}
               // return{...state,category:[state.category.filter(item=>item!==action.payload.value)]}
            }
            else{
                return {...state}
            }
        }
       }
       case ACTION_TYPE.APPLY_RATING_FILTER:{
         if(state.Rating.length!==0)
         {
           let temprating=state.Rating
           temprating[0]=action.payload.value
           return {...state,Rating:temprating}
         }
         else
         {
            return {...state,Rating:[action.payload.value]}
         }
       }
       case ACTION_TYPE.SORT:{
        let tempsort=state.sortBy
        tempsort=action.payload
        return {...state,sortBy:tempsort}
       }
       case ACTION_TYPE.RESET:{

        return {
        isstateloaded:true,
        sortBy: "",
        priceRange: "",
        category:[],
        Rating: [],
        productdetails: state.productdetails,
        cart: state.cart,
        wishlist: state.wishlist,
        search: "",
        coupon:state.coupon,
         address: {
          property:state.address.property,
          city:state.address.city,
          state:state.address.state,
          pin:state.address.pin,
          country:state.address.country,
          phoneNumber:state.address.phoneNumber
      },
      user:{
        email:state.user.email,
        firstname: state.user.firstname,
        lastname: state.user.lastname
      }
          };
       }
      
       case ACTION_TYPE.STATE_RESET:{
        return {
          isstateloaded:"",
          sortBy: "",
          priceRange: "",
          category:[],
          Rating: [],
          productdetails:[],
          cart: [],
          wishlist: [],
          search: "",
          coupon:"",
          address: {
            property:"",
            city:"",
            state:"",
            pin:"",
            country:"",
            phoneNumber:""
        },
        user:{
          email:"",
          firstname:"",
          lastname:""
        }
       }
      }
       case ACTION_TYPE.ADD_TO_CART:{
        // Add logic to check is user is signed IN
        //logic for checking and updating cart in db
      
        addtoCartorWish('cart',user?.uid,action.payload.value)

        //logic for checking and updating in state
        if(user?.uid)
        {
          if(state.cart.indexOf(action.payload.value)===-1)
          {
              const newcart=[...state.cart]
              newcart.push({cartid:action.payload.value,count:1})
              return{...state,cart:newcart}
          }
        }
            return{...state}
       }
       case ACTION_TYPE.ADD_TO_WISHLIST:{
        // Add logic to check is user is signed IN
        addtoCartorWish('wishlist',user?.uid,action.payload.value)
        if(user?.uid){
          if(state.wishlist.indexOf(action.payload.value)===-1)
          {
              const newwish=[...state.wishlist]
              newwish.push(action.payload.value)
              return{...state,wishlist:newwish}
          }
        }
            return{...state}
       }

       case ACTION_TYPE.REMOVE_FROM_WISHLIST:{

        let newwishlist=[...state.wishlist]
        newwishlist=newwishlist.filter((item)=>item!==action.payload.value)
       //code to update db
       updatedataindb("wishlist",newwishlist,user.uid)
       //code to update state
        return({...state,wishlist:newwishlist})
       }
       
       case ACTION_TYPE.ADD_COUNT:{
        let newlist=JSON.parse(JSON.stringify(state.cart))
        newlist=newlist.map((item)=>{
        if(item.cartid===action.payload.value)
        {
        return {...item,count:item.count+1}
        }
        return item;
        })
        //update db
        addorSubsCount(newlist,user.uid)
        //update state
        return {...state,cart:newlist}
       }

       case ACTION_TYPE.SUBSTRACT_COUNT:{
        let newlist=JSON.parse(JSON.stringify(state.cart))
        newlist=newlist.map((item)=>{
        if(item.cartid===action.payload.value&&item.count!==1)
        {
        return {...item,count:item.count-1}
        }
        return item;
        })
        //update db
        addorSubsCount(newlist,user.uid)
        //update state
        return {...state,cart:newlist}
       }
       case ACTION_TYPE.REMOVE_FROM_CART:{
        let newlist=JSON.parse(JSON.stringify(state.cart))
        newlist=newlist.filter((item)=>item.cartid!==action.payload.value)
        //update db
        addorSubsCount(newlist,user.uid)
        //update cart
        return {...state,cart:newlist}
       }
       case ACTION_TYPE.ADD_COUPON:{
        return {...state,coupon:action.payload}
       }
       case ACTION_TYPE.REMOVE_COUPON:{
        return {...state,coupon:""}
       }
       case ACTION_TYPE.SAVE_ADDRESS:{
        //update db
        console.log(action.payload)
        updateaddress(action.payload,user.uid)
        //update state
        return {...state,address:action.payload}
       }
       case ACTION_TYPE.SEARCH:{
        return {...state,search:action.payload}
       }
 }
    
}

async function updateaddress(payload,id){
  const usersRef = doc(db, "users", id);
  await updateDoc(usersRef, {
    city: payload.city,
    country:payload.country,
    phoneNumber:payload.number,
    pin:payload.pin,
    property: payload.property,
    state:payload.state
  });

}

async function addorSubsCount(newlist,userid){
const userRef = doc(db, "users", userid);
await updateDoc(userRef, {
  cart: newlist
});
}

async function updatedataindb(param,data,id){
try{
  const washingtonRef = doc(db, "users",id);
if(param==="wishlist")
{
  await updateDoc(washingtonRef, {
    wishlist: data
  });
}
if(param==="cart")
{
  await updateDoc(washingtonRef, {
    cart: data
  });
} 
}
catch(e){
  console.error(e)
}
}

  async function getcartandwishlistdata(newstate){
    try{
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
         newstate.cart=docSnap.data().cart
         newstate.wishlist=docSnap.data().wishlist
        } else {
        console.log("No such document!");
        }
    }
    catch(e){
     console.error(e)
    }
    return newstate
  }

  async function  addtoCartorWish(param,userid,productid){
if(userid!==undefined)
{
    try{
        const docRef = doc(db, "users", userid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let cartarray=docSnap.data().cart;
          let wishlistarray=docSnap.data().wishlist;
          if(param==='cart')
          {
            if(cartarray.indexOf(productid)===-1)
            {
              updatedata(param,userid,productid)
            }
          }
          else if (param==='wishlist')
          {
            if(wishlistarray.indexOf(productid)===-1)
            {
              updatedata(param,userid,productid)
            }
          }
          
        } else {
          console.log("No such user!");
        }
    }
    catch(e){
         console.error(e)
    }
} 
}

async function updatedata(param,userid,productid)
{
    try{
        const fireRef = doc(db, "users",userid);
        const obj={cartid:productid,count:1}
        if(param==='cart')
        {
          await updateDoc(fireRef, {
            cart:arrayUnion(obj)
          });
        }
        if(param==='wishlist')
        {
          await updateDoc(fireRef, {
            wishlist:arrayUnion(productid)
          });
        }  
    }
    catch(e)
    {
        console.error(e)
    }
}

  


const checkandupdate=(data,id,finalvalue)=>{
    //checks if present in productdetails otherwise add it.
   const isidpresent=finalvalue.find((item)=>item.id===id)
   if(isidpresent===undefined)
   {
    data={...data,id}
    finalvalue.push(data)
   }
    return finalvalue  
}




const getAlldetails=async()=>{
    
    try{
        const querySnapshot = await getDocs(collection(db, "books"));
        let newstate=JSON.parse(JSON.stringify(state));
        let finalvalue=newstate.productdetails;
        querySnapshot.forEach((doc) => {
            finalvalue= checkandupdate(doc.data(),doc.id,finalvalue)
        });
        newstate.productdetails=finalvalue
        if(user?.uid)
        {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
             if (docSnap.exists()) {
            
             newstate.cart=docSnap.data().cart
             newstate.wishlist=docSnap.data().wishlist
             newstate.address.property=docSnap.data().property
             newstate.address.city=docSnap.data().city
             newstate.address.state=docSnap.data().state
             newstate.address.pin=docSnap.data().pin
             newstate.address.country=docSnap.data().country
             newstate.address.phoneNumber=docSnap.data().phoneNumber
             newstate.user.email=docSnap.data().email
             newstate.user.firstname=docSnap.data().firstName
             newstate.user.lastname=docSnap.data().lastName
             newstate.isstateloaded=true
            } else {
            console.log("No such document!");
            }
        }
         
         dispatch({type:ACTION_TYPE.INITIALIZE_PRODUCTS,payload:newstate})   
    }
    catch(e){
      console.log(e)
    }
}


    
return(
<productContext.Provider value={{getAlldetails,state,dispatch}}>
    {children}
</productContext.Provider>
)

}

export {ProductProvider}

export const ProductContext = () => {
    return useContext(productContext);
  };