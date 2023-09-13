import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/Usercontext";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./Loader";


axios.defaults.baseURL = "http://localhost:4000";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState(false);

  const navigate = useNavigate();

  // ERROR TOAST
  const errToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // SUCCESS TOAST
  const successToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // using useContext
  const { user, setuser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {

      const res = await axios.post("/login", data);
      const token = res.data.token;
      localStorage.setItem("token", token);

      setuser(res.data.user);
      successToast("Logged In");

      // here we are redirecting to the logged in page
      setredirect(true);
      
    } catch (err) {
      errToast(err.response.data.message);
    }
  };


  if (redirect) {
    navigate("/");
  }

  return (
    <div className="mt-4 grow flex items-center justify-around min-h-screen">
      <div className="mb-32">
        <h1 className="text-4xl text-center">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={handleLogin}>
          <input
            type="text"
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
          <button className="primary"  >Login</button>
          <ToastContainer />

          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login