import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:4000";

const Register = () => {


  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState("");
  const [redirect, setRedirect] = useState(null)

  

const handleSubmit= async (e)=>{
    e.preventDefault();
    const data={
      name,email,password
    }
    // ERROR TOAST
    const errToast=(message)=>{
      toast.error(message,{
        position:toast.POSITION.TOP_RIGHT
      })
    }

    // SUCCESS TOAST
      const successToast=(message)=>{
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

     axios.post("/register",data).then((response)=>{
     
      successToast("Successfully Registered")
      setRedirect('/login')

     }).catch((err)=>{
      errToast(err.response.data.message);
     });

}

if(redirect){
  return <Navigate to={redirect} />
}




  return (
    <div className="mt-4 grow flex items-center justify-around min-h-screen">
      <div className="mb-32">
        <h1 className="text-4xl text-center">Register</h1>
        <form className="max-w-md mx-auto " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <ToastContainer/>
          <div className="text-center py-2 text-gray-500">
            Already have an account?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register