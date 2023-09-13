import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingCard from "./BookingCard";
import PlaceGallery from "./PlaceGallery";
import Loader from "./Loader";
import AddressFunction from "./AddressFunction";
import PlaceOffers from "./PlaceOffers";
import ProfileCard from "./ProfileCard";
import verified from '../assets/verified.png'

const Place = () => {
  const { id } = useParams();

  const [place, setPlace] = useState(null);


  useEffect(() => {
    if (!id) return;

    async function fetchPlace() {
      const { data } = await axios.get("/places/" + id);
      setPlace(data);
      console.log(data);
    }
    fetchPlace();
    // whenever the id chnges this useEffect should Work
  }, [id]);

  if (!place) return <Loader/>


  

  return (
    <div className="mt-4 px-16 pt-8 bg-gray-200 lg:p-20">
      <h1 className="text-4xl px-20 font-semibold"> {place.title} </h1>

      <AddressFunction>{place.address}</AddressFunction>
      <PlaceGallery place={place} />

      <div className=" mt-8 mb-8 px-16 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div className="bg-white shadow shadow-black border border-gray-600  rounded-2xl ">
          {/* description */}
          <div className="p-6 border border-b-gray-400 grow ">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          <div className="p-6 px-16 flex justify-between">
            <div className="flex flex-col gap-4">
              <div>
                <strong className="text-2xl font-semibold">Check In: </strong>
              </div>
              <div className="text-xl px-4">
                {new Date(place.checkIn).toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata", // IST timezone
                  timeStyle: "short", // Show only the time portion
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <strong className="text-2xl font-semibold">Check Out: </strong>
              </div>
              <div className="text-xl px-4">
                {new Date(place.checkOut).toLocaleTimeString("en-IN", {
                  timeZone: "Asia/Kolkata", // IST timezone
                  timeStyle: "short", // Show only the time portion
                })}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <strong className="text-2xl font-semibold">Max Guests: </strong>
              </div>
              <div className="text-xl px-4">{place.maxGuests}</div>
            </div>
          </div>
        </div>
        <div>
          <BookingCard place={place} />
        </div>
      </div>
      {/* extra info */}
      <div className="px-16 ">
        <div className="bg-white  shadow shadow-black   rounded-2xl ">
          <div className="flex justify-between items-center ">
            <div className="px-6 pt-6">
              <h2 className="font-semibold text-2xl">
                What this place offers:
              </h2>
              <PlaceOffers place={place} />
            </div>
            <div className="mt-16 w-72">
              <img
                src={verified}
                alt=""
                className="w-full border-8 border-[#009900] rounded-full"
              />
            </div>
            <div className="pr-36 pt-16">
              <ProfileCard place={place} />
            </div>
          </div>

          <div className="px-4 pt-4">
            <h2 className="font-semibold text-2xl">Extra Info</h2>
            <span className="text-sm">(Things to keep in mind)</span>
          </div>
          <div className=" px-4 pb-4 pt-3 leading-5">{place.extraInfo}</div>
        </div>
      </div>
    </div>
  );
};

export default Place;
