import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import AddNewPlaceBtn from './AddNewPlaceBtn'

const AddedPlaces = () => {

    const [places, setPlaces] = useState([]);

    useEffect(()=>{

        axios.get('/userPlaces',{headers:{'token':localStorage.getItem('token')}})
        .then(({data})=>{
            setPlaces(data);

        })


    },[])


  return (
    <>
      <ProfileHeader />
      <AddNewPlaceBtn />
      <div className="mt-4 py-4 px-8 ">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              key={place._id}
              className="cursor-pointer mb-3  gap-4 flex bg-gray-300 p-4 rounded-2xl"
            >
              <div className="flex w-40 h-32 grow shrink-0">
                {place.photos.length && (
                  //                                                       here it just simply takes the first photo in addedPhotos to show
                  <img
                    className="object-cover rounded-xl w-40"
                    src={"http://localhost:4000/uploads/" + place.photos[0]}
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default AddedPlaces