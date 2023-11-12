import { auth,db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence, 
  browserSessionPersistence 
} from "firebase/auth";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [authloading,setauthloading]=useState(false);
  const currentuser = auth?.currentUser;
 

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };


  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
  
      });
      return () => {
        unsubscribe();
      };
  },);


  return (
    <UserContext.Provider value={{ createUser, user, setUser, logout, signIn,authloading }}>
      {children}
    </UserContext.Provider>
  );
};

export const AuthContext = () => {
  return useContext(UserContext);
};
