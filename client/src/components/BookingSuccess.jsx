import { useEffect, useState } from "react";
import Loader from "./Loader";
import ProfileHeader from "./ProfileHeader";
import axios from "axios";
import { Navigate } from "react-router-dom";

const BookingSuccess = () => {

  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchTempData = async () => {
      const res = await axios.get("/getTempBooking", {
        headers: {
          tempbookingid: localStorage.getItem("place"),
        },
      });
      const placeData = res.data;
      const { data } = await axios.post("/booking", placeData, {
        headers: { token: localStorage.getItem("token") },
      });
      localStorage.removeItem('place')
      setLoading(false);
      console.log(data);
    };
    fetchTempData();
  }, []);

if(!loading){
  return <Navigate to={"/account/bookings"} />;
}



  return (
    <div className="h-screen">
      {loading && (
        <div>
          <h1 className="text-center">Saving your Data</h1>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default BookingSuccess;
