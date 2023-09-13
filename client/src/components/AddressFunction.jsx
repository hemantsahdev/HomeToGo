import React from 'react'

const AddressFunction = ({children}) => {
  return (
    <div className='px-32'>
      <a
        href={"https://www.google.com/maps?q=" + children}
        target="blank"
        className="cursor-pointer underline font-semibold block my-2 flex gap-1 item-center"
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {children}
      </a>
    </div>
  );
}

export default AddressFunction