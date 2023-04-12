import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// firebase
import { db } from "./firebase/firebase";
import { collection, onSnapshot } from 'firebase/firestore';

// import context
import { AuthProvider } from "./context/AuthContext";

// private and public route imoprt
import PrivateRoute from "./components/route/PrivateRoute";

// import components
import Header from './layout/Header';
import Footer from './layout/Footer';
import Login from "./components/Login";
// import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Places from "./components/Places";
import Hospitals from "./components/Hospitals";

function App() {

    // states
    const [places, setPlaces] = useState([]);
    const [hospitals, setHospitals] = useState([]);


  // get data from firebase
  useEffect(() => {
    // get palces data from firebase
    const unsub = onSnapshot(
      collection(db, "places"),
      (snapshot) => {
        let placeList = [];
        snapshot.docs.forEach((doc) => {
          placeList.push({ id: doc.id, ...doc.data() });
        });
        setPlaces(placeList);
      },
      (err) => {
        console.log(err);
      }
    );

    // get videos data from firebase
    const unsubHospitals = onSnapshot(
      collection(db, "hospitals"),
        (snapshot) => {
          let hospitals = [];
          snapshot.docs.forEach((doc) => {
            hospitals.push({ id: doc.id, ...doc.data() });
          });
          setHospitals(hospitals);
        }
    );


    return () => {
      unsub();
      unsubHospitals();
    }
  }, []);
  

  return (
    <>
      <AuthProvider>
        <Header />
        <main className="pt-60 pb-60">
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="signup" element={<Signup />} /> */}

            {/* private route */}
            <Route path="/*" element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="places" element={<Places places={ places } setPlaces={ setPlaces } />} />
              <Route path="hospitals" element={<Hospitals hospitals={ hospitals } setHospitals={ setHospitals } />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
