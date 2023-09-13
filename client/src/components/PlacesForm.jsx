import  { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import axios from "axios";
import Perks from "./Perks";
import PhotoUploader from "./PhotoUploader";
import { useParams } from "react-router-dom";
// import AddedPlaces from "./AddedPlaces";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ToastContainer, toast } from "react-toastify";




axios.defaults.baseURL = "http://localhost:4000";

const Places = () => {
  const { id } = useParams();
  // perks and addedPhotos will have numerous things to carry so array[]
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState("");

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

  useEffect(() => {
    // agar id nhi hai url mei mtlb yeh vala useEffect nhi chaiye
    if (!id) return;

    // id agr milgyi url mei
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      console.log(data);
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);

      // the only problem here is that perks are not being selected
    });
  }, [id]);

  // here we have to save the new place and also update the saved place
  // we will be differntiating on the basis (if the url contians id then to update else save as new place)
  const savePlace = async (e) => {
    e.preventDefault();

    if (id) {
      // UPDATE

      const placeData = {
        // id is here the differntiating factor
        id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      };
      // PUT
      const { data } = await axios.put("/places", placeData, {
        headers: { token: localStorage.getItem("token") },
      });
      window.location.assign("/account/places");

      // could have used navigate and a reddirect UseState Variable
    } else {
      // create new
      const placeData = {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      };
      try {
        const { data } = await axios.post("/places", placeData, {
          headers: { token: localStorage.getItem("token") },
        });
        successToast("Place Registered")
        window.location.assign("/account/places");
      } catch (err) {
        errToast(err.response.data.message);
        console.log(err.response.data.message)
      }
    }
  };

  return (
    <div>
      <ProfileHeader />
      <div className="mx-4 py-4 px-8 lg:px-72 ">
        <form onSubmit={savePlace}>
          <div className="pb-6">
            <label htmlFor="newTitle" className="text-2xl mt-5 font-semibold">
              Title
            </label>

            <input
              type="text"
              placeholder="Title for your place . should be short and catchy"
              id="newTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-400 "
            />
          </div>

          <div className="pb-6">
            <label htmlFor="newAddress" className="text-2xl mt-5 font-semibold">
              Address
            </label>

            <input
              type="text"
              placeholder="Address for your place"
              id="newAddress"
              value={address}
              className="border border-gray-400 "
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="pb-6">
            <h2 className="text-2xl font-semibold">Photos</h2>
            <p className="text-gray-500 px-2 text-sm">(More = better)</p>

            {/* ============================ */}
            {/* addedPhotos will be given as props because it also used here, photoLink can be used there only  */}
            <PhotoUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
            {/* ============================ */}
          </div>

          <div className="pb-6">
            <h2 className="text-2xl  font-semibold">Description</h2>
            <textarea
              value={description}
              className="border border-gray-400 "
              placeholder="What best describes your place!"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="pb-6">
            <h2 className="text-2xl  font-semibold">Perks</h2>
            <p className="text-gray-500 text-sm">
              select all the perks of your place
            </p>
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {/* used in other component because useState sambhni mushkil ho rhi thi */}
              <Perks selected={perks} onChange={setPerks} />
            </div>
          </div>

          <div className="pb-6">
            <h2 className="text-2xl  font-semibold">Extra info</h2>
            <p className="text-gray-500 text-sm ml-1"></p>
            <textarea
              value={extraInfo}
              className="border border-gray-400 "
              placeholder="House rules, Important Notices etc"
              onChange={(e) => setExtraInfo(e.target.value)}
            />
          </div>

          <h2 className="text-2xl mt-4 font-semibold">Check in-out times</h2>
          <p className="text-gray-500 text-sm">
            remember to have a window for cleaning
          </p>
          <div className="flex flex-col ">
            <div className="flex py-5 px-3 gap-32">
              <div>
                <h3 className="mt-2 -mb-1 font-medium">Check in time</h3>
                <div className="w-full border my-1 py-2 px-3 rounded-2xl">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={checkIn}
                      onChange={(e) => setCheckIn(e)}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div>
                <h3 className="mt-2 -mb-1 font-medium">Check out time</h3>
                {/* <input
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="11:00 am"
              /> */}
                <div className="w-full border my-1 py-2 px-3 rounded-2xl">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      value={checkOut}
                      onChange={(e) => setCheckOut(e)}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>

            <div className="flex  px-3 gap-60">
              <div>
                <h3 className="mt-2 -mb-1 font-medium">Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  className="border border-gray-400  "
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1 font-medium">Price per Night</h3>
                <input
                  type="number"
                  value={price}
                  className="border border-gray-400 "
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="₹"
                />
              </div>
            </div>
          </div>
          <div>
            <button className="primary my-4 ">Save</button>
            <ToastContainer/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Places;
