import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Loader from './Loader';

const Home = () => {

  const [places, setPlaces] = useState([]);
  const [loading, setloading] = useState(true)

  useEffect(()=>{

    axios.get('/places')
    .then((res)=>{
      // console.log(res);
      setPlaces([...res.data]);
      setloading(false)
      // console.log(places[0].title);
    })

   

  },[]);

if(loading){
  return <Loader/>
}

  return (
    
    <div className='px-16 py-4 mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
      {places.length &&
        places.map((place) => {
          return (
            
            <Link key={place._id} to={"/place/"+place._id} >
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {/* ?.: The optional chaining operator. It ensures 
              that if the photos property is null or undefined, 
              the expression will short-circuit and return undefined */}

                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square "
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h3 className="font-bold truncate ">{place.address}</h3>
              <h2 className="text-sm truncate text-gray-500">{place.title}</h2>
              <div className="mt-1">
                <span className='font-semibold'>₹{place.price}</span> per night
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default Home