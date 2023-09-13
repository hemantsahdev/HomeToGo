import  { useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios';


export const UserContext=createContext();

export const UserContextProvider=(props)=>{
    const [user, setuser] = useState(null);
    
    // this will tell if we fetched the data or not
    const [ready, setready] = useState(false)



   
    useEffect(()=>{
        const token=localStorage.getItem("token")
        
        const headers={
            token
        }
        if(!user){
           axios.get("/profile",{headers})
           .then(({data})=>{
             // here the data contains name,email and id ,
             // so user={name,email,_id}
             setuser(data);
             setready(true);
           })
        }
    },[])

    // doing useEffect to check the authenticity of the user 
//  using useContext to transfer the same to other pages also
    return (
        <UserContext.Provider value={{user,setuser,ready}}>
            {props.children}
        </UserContext.Provider>
    )
}

