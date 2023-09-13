import {  useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/Usercontext";

import { ToastContainer, toast } from "react-toastify";




const BookingCard = ({place}) => {
  
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  // ===========================
  const [fullName, setFullName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");



  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setFullName(user.name);
    }
  }, [user]);



  

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

  let totalNumberOfNights = 0;
  if (checkIn && checkOut) {
    totalNumberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const validatingData=async()=>{
        
    const validateData = {
           checkIn,
           checkOut,
           numberOfGuests,
           fullName,
           phoneNumber,
         };
         try {
           const response = await axios.post("/validate", validateData);
           const isValid = response.data;
           
           if(isValid){
            tempSave();
           callingStripe();

           }
         } catch (e) {
           errToast(e.response.data.message);
         }
  }
  
const tempSave=async()=>{

          const data = {
            place: place._id,
            checkIn,
            checkOut,
            numberOfGuests,
            fullName,
            phoneNumber,
            price: totalNumberOfNights * place.price,
          };
       const response= await axios.post("/temp", data,{headers:{token:localStorage.getItem('token')}});
          localStorage.setItem('place',response.data._id)

}

  const callingStripe = async () => {
   
    const data = {
      placeId: place._id,
      totalNumberOfNights,
    };
    try {
      const response = await axios.post("/create-checkout-session", data);
      const url = response.data.url;
      window.location = url;
    } catch (err) {
      errToast(err.response)
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div>
        <div className="bg-white shadow shadow-black p-4 rounded-2xl ">
          <div className="text-xl text-center">
            Price: ₹{place.price} / per night
          </div>
          <div className="border border-gray-300 shadow  rounded-2xl mt-4">
            <div className="flex">
              <div className=" py-3 px-3 ">
                <label htmlFor="checkIn">Check in:</label>
                <input
                  type="date"
                  id="checkIn"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="py-3 px-3 border-l">
                <label htmlFor="checkOut">Check Out:</label>
                <input
                  type="date"
                  id="checkOut"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
            </div>
            <div className="py-3 px-4 border-t flex ">
              <label htmlFor="guests">Number of Guests</label>
              <input
                className="border border-gray-300"
                type="number"
                id="guests"
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
              />
            </div>
          </div>
          {totalNumberOfNights > 0 && (
            <div className="py-3 px-4 border-t  ">
              <label htmlFor="guests">Full Name</label>
              <input
                className="border border-gray-300"
                type="text"
                id="guests"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <label htmlFor="guests">Phone Number:</label>
              <input
                className="border border-gray-300"
                type="tel"
                id="guests"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          )}

          <button className="primary mt-4" onClick={validatingData}>
            Book this place
            {totalNumberOfNights > 0 && (
              <span> ₹{totalNumberOfNights * place.price}</span>
            )}
          </button>
          <ToastContainer />
          
        </div>
      </div>
    </>
  );
};

export default BookingCard;
