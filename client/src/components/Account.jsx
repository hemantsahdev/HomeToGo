import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/Usercontext'
import { Link, Navigate } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';

const Account = () => {

    const {user,ready,setuser}=useContext(UserContext);

    // const [redirect, setredirect] = useState(false)

    const logout=()=>{
        localStorage.removeItem('token');
        setuser(null);
        // <Navigate to={"/"}/>
    }

    if(!ready) return "Loading..."

    // if we just write this and refresh we will be redirct to user ,
    // even though wehave user.. this is because it takes some milisec to do a axios cmd to /profile to get the user
    // till then it is null, so in that milisec we are assumed a no user
    if(ready && !user){
        // here using ready which tells us that, we fetched the data still we didnt found any user
        return <Navigate to={"/login"} />
    }

    
    // if(redirect){
    //     return <Navigate to={"/"} />
    // }
    

  return (
    <div>
  
      <ProfileHeader/>

      <div className="text-center max-w-md mx-auto ">
        Logged in as {user.name} ({user.email}) <br />
        <button className="primary max-w-sm mt-2" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Account