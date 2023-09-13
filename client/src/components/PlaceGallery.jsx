import React, { useState } from 'react'

const PlaceGallery = ({place}) => {
 
  const [showAllPhotos, setShowAllPhotos] = useState(false);
 
 
    // TO SHOW ALL THE PHOTS WHEN CLICKED ON ALL PHOTOS BTN
  if (showAllPhotos) {
    return (
      // this div covers the whole space in black...
      <div className="absolute inset-0 top-0 bg-black ">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-white text-3xl mb-6 mr-40">
              Photos of {place.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-8 top-8 flex gap-1 px-2 py-2 rounded-full shadow shadow-gray text-black bg-white font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className='flex flex-col items-center gap-14'>
            {place?.photos?.length > 0 &&
              place.photos.map((photo) => {
                return (
                  <div key={photo._id} className='w-2/3'>
                    <img
                      className="rounded-2xl"
                      src={"http://localhost:4000/uploads/" + photo}
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative px-16">
        <div className="grid gap-1 border border-gray-200 grid-cols-[2fr,1fr] px-16 bg-gray-200 rounded-xl ">
          <div className="cols-span-1 py-3 pl-4 ">
            {place.photos?.[0] && (
              <div>
                <img
                  className=" aspect-square cursor-pointer object-cover rounded-md shadow shadow-gray-400"
                  src={"http://localhost:4000/uploads/" + place.photos[0]}
                  onClick={() => setShowAllPhotos(true)}
                />
              </div>
            )}
          </div>
          <div className="cols-span-1 py-3 pl-4">
            <div className="grid  ">
              {place.photos?.[1] && (
                <div>
                  <img
                    className="aspect-square cursor-pointer object-cover rounded-lg shadow shadow-gray-400"
                    src={"http://localhost:4000/uploads/" + place.photos[1]}
                    onClick={() => setShowAllPhotos(true)}
                  />
                </div>
              )}
            </div>
            <div className="grid ">
              {place.photos?.[2] && (
                <div>
                  <img
                    className="aspect-square cursor-pointer object-cover rounded-lg shadow shadow-gray-400"
                    src={"http://localhost:4000/uploads/" + place.photos[2]}
                    onClick={() => setShowAllPhotos(true)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-7 hover:bg-secondary right-10 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Show more photos
        </button>
      </div>
    </div>
  );
}

export default PlaceGallery