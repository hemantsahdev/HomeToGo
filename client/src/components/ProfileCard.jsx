import React, { useEffect, useState } from 'react'
import owner from '../assets/owner.png'
import axios from 'axios';

const ProfileCard = ({place}) => {


  const [ownerData, setOwnerData] = useState('')

  useEffect(()=>{

    const fetchHostData=async()=>{

      const {data}=await axios.get(`/host/${place._id}`);
      setOwnerData(data);

    }

    fetchHostData();


  },[place._id])


  return (
    <>
      <div className="max-w-xs">
        <div className="flex flex-col items-center bg-white shadow-xl rounded-lg py-3">
            <div>
                <h1 className='text-3xl font-semibold'>
                    Owner
                </h1>
            </div>
          <div className="photo-wrapper p-2">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={owner}
              alt="John Doe"
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {ownerData.name}
            </h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p>
                <i>Super Host</i>{" "}
              </p>
            </div>
            <table className="text-xs my-3">
              <tbody>
                
                
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Email
                  </td>
                  <td className="px-2 py-2">{ownerData.email}</td>
                </tr>
              </tbody>
            </table>

          
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileCard