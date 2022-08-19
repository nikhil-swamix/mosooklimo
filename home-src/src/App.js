import HomeScreen from "./pages/HomeScreen";
import Navigationbar from "./components/Navbar/Navbar";
import HomeScreen2 from "./pages/HomeScreen2";
import HomeScreen2Lux from "./pages/HomeScreen2Lux";
import { useState, createContext } from "react";
import FooterPage from "./pages/FooterPage";
import BodyPage from "./pages/BodyPage";
import Accordion from "./components/FAQ/Accordion";
import GalleryView from "./components/Gallery/GalleryView";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import UserContext from "./auth/context";
import Places from "./Places";
import AirportScreen from "./pages/AirportScreen";
import AirportDetailScreen from "./pages/AirportDetailScreen";
import BlogScreen from "./pages/BlogScreen";
import TermsScreen from "./pages/TermsScreen";
import PrivacyScreen from "./pages/PrivacyScreen";
import DisclosureScreen from "./pages/DisclosureScreen";
import PartnerScreen from "./pages/PartnerScreen";
import TrackScreen from "./pages/TrackScreen";
import AboutScreen from "./pages/AboutScreen";
import PhotoGalleryScreen from "./pages/PhotoGalleryScreen";
import Service from "./pages/ServiceScreen";

import { HomeFAQ } from "./Data/AccordianFAQ";
import BlogDetailScreen from "./pages/BlogDetailScreen";
import GoogleTranslate from "./pages/GoogleTranslate";
import Testimonials from "./components/Testimonials/Testimonials";
import CarGallery from "./components/Cards/CarGallery";
import ReactPlayer from "react-player";

function App() {
  const [body, setBody] = useState();
  const [userId, setUserId] = useState();
  const [bodyLux, setBodyLux] = useState();
  // const onRouteChange = (route) => {
  //   setRoute(route);
  // };
  return (
    <UserContext.Provider
      value={{ body, setBody, userId, setUserId, bodyLux, setBodyLux }}
    >
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigationbar />
                <HomeScreen />
                {/*<div className="video-container"> 
                                  <ReactPlayer url="/video/vid60fps_color.mp4"volume="1"muted width="100%"height="100%"playing={true} loop={true} controls={true} />
                                </div>*/}
                <BodyPage />
                <CarGallery />
                <Testimonials />
                <Accordion isHome={true} data={HomeFAQ} />
                {/* <img
                  style={{ width: "100%", marginBottom: "-105px" }}
                  src="./footer.png"
                  alt="footer"
                /> */}
                <PhotoGalleryScreen />
                <FooterPage />{" "}
              </>
            }
            exact
          />
          <Route
            path="/home"
            element={
              <>
                <Navigationbar />
                <HomeScreen2 />
              </>
            }
          />
          <Route
            path="/home/rental"
            element={
              <>
                <Navigationbar />
                <HomeScreen2Lux />
              </>
            }
          />
          <Route
            path="/airports.php"
            element={
              <>
                <Navigationbar />
                <AirportScreen />
                <FooterPage />{" "}
              </>
            }
          />
          <Route
            path="/airports/:id"
            element={
              <>
                {" "}
                <Navigationbar /> <AirportDetailScreen />
                <FooterPage />{" "}
              </>
            }
          />
          <Route
            path="/blogs.php"
            element={
              <>
                <Navigationbar />
                <BlogScreen />
                <FooterPage />{" "}
              </>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <>
                {" "}
                <Navigationbar /> <BlogDetailScreen />
                <FooterPage />{" "}
              </>
            }
          />
          <Route
            path="/terms.php"
            element={
              <>
                <Navigationbar />
                <TermsScreen />
                <FooterPage />
              </>
            }
          />
          <Route
            path="/policy.php"
            element={
              <>
                <Navigationbar />
                <PrivacyScreen />
                <FooterPage />
              </>
            }
          />

          <Route
            path="/disclosure.php"
            element={
              <>
                <Navigationbar />
                <DisclosureScreen />
                <FooterPage />
              </>
            }
          />
          <Route
            path="/partner.php"
            element={
              <>
                <Navigationbar />
                <PartnerScreen />
                <FooterPage />
              </>
            }
          />

          <Route
            path="/trackorder.php"
            element={
              <>
                <Navigationbar />
                <TrackScreen />
                <FooterPage />
              </>
            }
          />

          <Route
            path="/about.php"
            element={
              <>
                <Navigationbar />
                <AboutScreen />
                <FooterPage />
              </>
            }
          />
          <Route
            path="/photo"
            element={
              <>
                <PhotoGalleryScreen />
              </>
            }
          />
          <Route
            path="/customer-service.php"
            element={
              <>
                <Navigationbar />
                <Service />
                <FooterPage />
              </>
            }
          />
        </Routes>
      </div>
    </UserContext.Provider>
    // <Places />
    // <AirportDetailScreen />
    // <PhotoGalleryScreen />
  );
}

export default App;
