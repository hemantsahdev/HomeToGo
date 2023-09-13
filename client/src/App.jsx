
import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import { UserContextProvider } from './contexts/Usercontext';
import Home from './components/Home';
import Account from './components/Account';
import PlacesForm from './components/PlacesForm';
import Bookings from './components/Bookings';
import AddedPlaces from './components/AddedPlaces';
import Place from './components/Place';
import ParticularBooking from './components/ParticularBooking';
import BookingSuccess from './components/BookingSuccess';
import "react-toastify/dist/ReactToastify.css";

function App() {

  

  return (
    <Router>
        <UserContextProvider>
          <Header />
          <Routes>
            {/* exact is used when some paths have some common features like if we 
        put paht="/" it resemble with almost all paths , coz every path has atleast / in there path , so in order
        to resolve this overlapping conflict we use EXACT */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/account/places" element={<AddedPlaces />} />
            <Route exact path="/account/bookings" element={<Bookings />} />
            <Route
              exact
              path="/account/bookings/:id"
              element={<ParticularBooking />}
            />

            <Route exact path="/account/places/new" element={<PlacesForm />} />
            <Route exact path="/account/places/:id" element={<PlacesForm />} />
            <Route exact path="/place/:id" element={<Place />} />
            <Route exact path="/booking/success" element={<BookingSuccess />} />
          </Routes>
        </UserContextProvider>
    </Router>
  );
}

export default App
