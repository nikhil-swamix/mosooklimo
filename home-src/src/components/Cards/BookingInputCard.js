import React, { useState, useContext, useEffect } from "react";
import { Card, Form, Row, Col, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/Booking.module.css";

import UserContext from "../../auth/context";
import {
  MdOutlineAirplanemodeActive,
  MdLocationOn,
  MdPersonAddAlt,
} from "react-icons/md";
import * as io5 from "react-icons/io5" ;
import axios from "axios";



const BookingInputCard = ({ onRouteChange }) => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionMatch, setOptionMatch] = useState("");

  const [validated, setValidated] = useState(false);
  const userContext = useContext(UserContext);

  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [noOfPassenger, setNoOfPassenger] = useState("");
  const [noOfLuggage, setNoOfLuggage] = useState("");
  const [rBookingDate, setRBookingDate] = useState("");
  const [rBookingTime, setRBookingTime] = useState("");

  useEffect(() => {
    axios.get("/airports").then((res) => {
      setOptions(res.data);
      // console.log(res.data);
    });
  }, []);

  const searchOptions = (text) => {
    if (!text) {
      setOptionMatch([]);
    } else {
      let matches = options.filter((option) => {
        const regex = new RegExp(`${text}`, "gi");
        return option.name.match(regex);
      });
      setOptionMatch(matches.slice(0, 3));
    }
  };

  const handleRoundTrip = () => {
    setIsRoundTrip(!isRoundTrip);
    // if (!isRoundTrip) {
    setRBookingDate("");
    setRBookingTime("");
    // }
  };

  const handleChange = (address) => {
    setPickupAddress(address);
    setDisplay(false);
  };

  const handleChange2 = (e) => {
    function initAutocomplete() {
      var input = document.getElementById("destinationAddress");
      var searchBox = new window.google.maps.places.SearchBox(input);
      searchBox.addListener("places_changed", function () {
        setDestinationAddress(
          document.getElementById("destinationAddress").value
        );
      });
    }
    initAutocomplete();
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      userContext.setBody({
        pickupAddress,
        destinationAddress,
        bookingDate,
        bookingTime,
        noOfPassenger,
        noOfLuggage,
        isRoundTrip,
        rBookingDate,
        rBookingTime,
      });
      // console.log(userContext.body);

      if (
        pickupAddress &&
        destinationAddress &&
        bookingDate &&
        bookingTime &&
        noOfPassenger &&
        noOfLuggage
      ) {
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-box">
      <Card className={styles.wrapper}>
        <Card.Body>
          <Card.Title className={styles.cardTitle}>
            Book your taxi transfer.Worldwide.
          </Card.Title>
          <Card.Subtitle
            className={`mb-2 h3 text-white ${styles.cardSubtitle}`}
          >
            MosookLimo Cab Booking Service
          </Card.Subtitle>
          <Form onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className="w-100">
                <div className={styles.box}>
                  <io5.IoAirplaneSharp size={25} className={styles.icon} />
                  <input
                    onClick={() => setDisplay(true)}
                    onChange={(e) => {
                      searchOptions(e.target.value);
                      setPickupAddress(e.target.value);
                    }}
                  
                    value={
                      userContext.pickupAddress?userContext.pickupAddress:pickupAddress
                    }
                    id="pickupAddress"
                    placeholder="Enter Pickup Address"
                    required
                  />
             
                </div>
                {display && (
                  <div className="card" style={{ position: "absolute" }}>
                    
                    {optionMatch &&
                      optionMatch.map((value, i) => {
                        return (
                          <div
                            onClick={() => handleChange(value.name)}
                            style={{
                              border: "1px solid #EEEEEE",
                              borderRadius: "5px",
                              paddingLeft: "10px",
                              backgroundColor: "#F4F4F4",
                            }}
                            key={i}
                            tabIndex="0"
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span> {value.name} </span>
                              <span> Country: {value.country} </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
              <div >
                <img
                  className={`${styles.buttonRedo} text-center`}
                  role="button"
                  src="https://techbinge.org/wp-content/uploads/2022/07/exchange.png"
                  alt="loading..."
                />
              </div>
              <div className="w-100">
                <div className={styles.box}>
                  <MdLocationOn className={styles.icon} size={25} />
                  <input onChange={handleChange2} id="destinationAddress"placeholder="Enter Destination Address"required />
                </div>
              </div>
            </div>

            <div className={`${styles.row2} my-3`}>
              <div className="mt-2 mt-lg-0 w-100">
                <div className={styles.boxIcon}>
                  <io5.IoCalendarNumber size={25}/>
                  <input
                    onChange={(e) => setBookingDate(e.target.value)}
                    id="bookingDate"
                    type="date"
                    name="bookingDate"
                    style={{ border: "none", fontSize: "14px" }}
                    min={
                      new Date(new Date().setDate(new Date().getDate() + 1))
                        .toISOString()
                        .split("T")[0]
                    }
                    required
                  />
                </div>
              </div>

              <div className={`mt-2 mt-lg-0 w-100 `}>
                <div className={styles.boxIcon}>
                  <io5.IoTimeOutline size={25} />
                  <input 
                    id="bookingTime" 
                    onChange={(e) => setBookingTime(e.target.value)} 
                    type="time" 
                    required />

                </div>
              </div>

              <div className={`mt-2 mt-lg-0 w-100 `}>
                <div className={styles.boxIcon}>
                  <io5.IoPersonAddOutline size={25} />
                  <input id="noOfPassenger" onChange={(e) => setNoOfPassenger(e.target.value)} type='number' placeholder="Passenger" required />
                </div>
              </div>
              <div className={`mt-2 mt-lg-0 w-100`}>
                <div className={styles.boxIcon}>
                  <io5.IoBriefcaseOutline size={25} />
                  <input id="noOfLuggage"  onChange={(e) => setNoOfLuggage(e.target.value)} type='number' min='0' max='10' placeholder="Luggage"required />
                </div>
              </div>
            </div>
            <Form.Group className="" id="formGridCheckbox">
              <Form.Check
                // onChange={handleRoundTrip}
                id="isRoundTrip"
                type="checkbox"
                label="Round Trip"
                onClick={handleRoundTrip}
              />
            </Form.Group>
            {isRoundTrip && (
              <div className={styles.row3}>
                <div className={` w-30 `}>
                  <div className={styles.boxIcon}>

                    <Form.Control
                      onChange={(e) => setRBookingDate(e.target.value)}
                      id="rBookingDate"
                      type="date"
                      name="rBookingDate"
                      style={{ border: "none", fontSize: "14px" }}
                      min={
                        new Date(new Date().setDate(new Date().getDate() + 1))
                          .toISOString()
                          .split("T")[0]
                      }
                    />
                  </div>
                </div>
                <div className={` w-35 ${styles.row2margin}`}>
                  <div className={styles.boxIcon}>
                    <io5.IoTimeOutline size={25} />
                    <Form.Select
                      className={styles.innerBoxIcon}
                      onChange={(e) => setRBookingTime(e.target.value)}
                      id="rBookingTime"
                      arialabel="Default select example"
                    >
                      <option selected> Time </option>
                      <option value="12:00 AM"> 12: 00 AM </option>
                      <option value="12:05 AM"> 12: 05 AM </option>
                      <option value="12:10 AM"> 12: 10 AM </option>
                      <option value="12:15 AM"> 12: 15 AM </option>
                      <option value="12:20 AM"> 12: 20 AM </option>
                      <option value="12:25 AM"> 12: 25 AM </option>
                      <option value="12:30 AM"> 12: 30 AM </option>
                      <option value="12:35 AM"> 12: 35 AM </option>
                      <option value="12:40 AM"> 12: 40 AM </option>
                      <option value="12:45 AM"> 12: 45 AM </option>
                      <option value="12:50 AM"> 12: 50 AM </option>
                      <option value="12:55 AM"> 12: 55 AM </option>
                      <option value="01:00 AM"> 01: 00 AM </option>
                      <option value="01:05 AM"> 01: 05 AM </option>
                      <option value="01:10 AM"> 01: 10 AM </option>
                      <option value="01:15 AM"> 01: 15 AM </option>
                      <option value="01:20 AM"> 01: 20 AM </option>
                      <option value="01:25 AM"> 01: 25 AM </option>
                      <option value="01:30 AM"> 01: 30 AM </option>
                      <option value="01:35 AM"> 01: 35 AM </option>
                      <option value="01:40 AM"> 01: 40 AM </option>
                      <option value="01:45 AM"> 01: 45 AM </option>
                      <option value="01:50 AM"> 01: 50 AM </option>
                      <option value="01:55 AM"> 01: 55 AM </option>
                      <option value="02:00 AM"> 02: 00 AM </option>
                      <option value="02:05 AM"> 02: 05 AM </option>
                      <option value="02:10 AM"> 02: 10 AM </option>
                      <option value="02:15 AM"> 02: 15 AM </option>
                      <option value="02:20 AM"> 02: 20 AM </option>
                      <option value="02:25 AM"> 02: 25 AM </option>
                      <option value="02:30 AM"> 02: 30 AM </option>
                      <option value="02:35 AM"> 02: 35 AM </option>
                      <option value="02:40 AM"> 02: 40 AM </option>
                      <option value="02:45 AM"> 02: 45 AM </option>
                      <option value="02:50 AM"> 02: 50 AM </option>
                      <option value="02:55 AM"> 02: 55 AM </option>
                      <option value="03:00 AM"> 03: 00 AM </option>
                      <option value="03:05 AM"> 03: 05 AM </option>
                      <option value="03:10 AM"> 03: 10 AM </option>
                      <option value="03:15 AM"> 03: 15 AM </option>
                      <option value="03:20 AM"> 03: 20 AM </option>
                      <option value="03:25 AM"> 03: 25 AM </option>
                      <option value="03:30 AM"> 03: 30 AM </option>
                      <option value="03:35 AM"> 03: 35 AM </option>
                      <option value="03:40 AM"> 03: 40 AM </option>
                      <option value="03:45 AM"> 03: 45 AM </option>
                      <option value="03:50 AM"> 03: 50 AM </option>
                      <option value="03:55 AM"> 03: 55 AM </option>
                      <option value="04:00 AM"> 04: 00 AM </option>
                      <option value="04:05 AM"> 04: 05 AM </option>
                      <option value="04:10 AM"> 04: 10 AM </option>
                      <option value="04:15 AM"> 04: 15 AM </option>
                      <option value="04:20 AM"> 04: 20 AM </option>
                      <option value="04:25 AM"> 04: 25 AM </option>
                      <option value="04:30 AM"> 04: 30 AM </option>
                      <option value="04:35 AM"> 04: 35 AM </option>
                      <option value="04:40 AM"> 04: 40 AM </option>
                      <option value="04:45 AM"> 04: 45 AM </option>
                      <option value="04:50 AM"> 04: 50 AM </option>
                      <option value="04:55 AM"> 04: 55 AM </option>
                      <option value="05:00 AM"> 05: 00 AM </option>
                      <option value="05:05 AM"> 05: 05 AM </option>
                      <option value="05:10 AM"> 05: 10 AM </option>
                      <option value="05:15 AM"> 05: 15 AM </option>
                      <option value="05:20 AM"> 05: 20 AM </option>
                      <option value="05:25 AM"> 05: 25 AM </option>
                      <option value="05:30 AM"> 05: 30 AM </option>
                      <option value="05:35 AM"> 05: 35 AM </option>
                      <option value="05:40 AM"> 05: 40 AM </option>
                      <option value="05:45 AM"> 05: 45 AM </option>
                      <option value="05:50 AM"> 05: 50 AM </option>
                      <option value="05:55 AM"> 05: 55 AM </option>
                      <option value="06:00 AM"> 06: 00 AM </option>
                      <option value="06:05 AM"> 06: 05 AM </option>
                      <option value="06:10 AM"> 06: 10 AM </option>
                      <option value="06:15 AM"> 06: 15 AM </option>
                      <option value="06:20 AM"> 06: 20 AM </option>
                      <option value="06:25 AM"> 06: 25 AM </option>
                      <option value="06:30 AM"> 06: 30 AM </option>
                      <option value="06:35 AM"> 06: 35 AM </option>
                      <option value="06:40 AM"> 06: 40 AM </option>
                      <option value="06:45 AM"> 06: 45 AM </option>
                      <option value="06:50 AM"> 06: 50 AM </option>
                      <option value="06:55 AM"> 06: 55 AM </option>
                      <option value="07:00 AM"> 07: 00 AM </option>
                      <option value="07:05 AM"> 07: 05 AM </option>
                      <option value="07:10 AM"> 07: 10 AM </option>
                      <option value="07:15 AM"> 07: 15 AM </option>
                      <option value="07:20 AM"> 07: 20 AM </option>
                      <option value="07:25 AM"> 07: 25 AM </option>
                      <option value="07:30 AM"> 07: 30 AM </option>
                      <option value="07:35 AM"> 07: 35 AM </option>
                      <option value="07:40 AM"> 07: 40 AM </option>
                      <option value="07:45 AM"> 07: 45 AM </option>
                      <option value="07:50 AM"> 07: 50 AM </option>
                      <option value="07:55 AM"> 07: 55 AM </option>
                      <option value="08:00 AM"> 08: 00 AM </option>
                      <option value="08:05 AM"> 08: 05 AM </option>
                      <option value="08:10 AM"> 08: 10 AM </option>
                      <option value="08:15 AM"> 08: 15 AM </option>
                      <option value="08:20 AM"> 08: 20 AM </option>
                      <option value="08:25 AM"> 08: 25 AM </option>
                      <option value="08:30 AM"> 08: 30 AM </option>
                      <option value="08:35 AM"> 08: 35 AM </option>
                      <option value="08:40 AM"> 08: 40 AM </option>
                      <option value="08:45 AM"> 08: 45 AM </option>
                      <option value="08:50 AM"> 08: 50 AM </option>
                      <option value="08:55 AM"> 08: 55 AM </option>
                      <option value="09:00 AM"> 09: 00 AM </option>
                      <option value="09:05 AM"> 09: 05 AM </option>
                      <option value="09:10 AM"> 09: 10 AM </option>
                      <option value="09:15 AM"> 09: 15 AM </option>
                      <option value="09:20 AM"> 09: 20 AM </option>
                      <option value="09:25 AM"> 09: 25 AM </option>
                      <option value="09:30 AM"> 09: 30 AM </option>
                      <option value="09:35 AM"> 09: 35 AM </option>
                      <option value="09:40 AM"> 09: 40 AM </option>
                      <option value="09:45 AM"> 09: 45 AM </option>
                      <option value="09:50 AM"> 09: 50 AM </option>
                      <option value="09:55 AM"> 09: 55 AM </option>
                      <option value="10:00 AM"> 10: 00 AM </option>
                      <option value="10:05 AM"> 10: 05 AM </option>
                      <option value="10:10 AM"> 10: 10 AM </option>
                      <option value="10:15 AM"> 10: 15 AM </option>
                      <option value="10:20 AM"> 10: 20 AM </option>
                      <option value="10:25 AM"> 10: 25 AM </option>
                      <option value="10:30 AM"> 10: 30 AM </option>
                      <option value="10:35 AM"> 10: 35 AM </option>
                      <option value="10:40 AM"> 10: 40 AM </option>
                      <option value="10:45 AM"> 10: 45 AM </option>
                      <option value="10:50 AM"> 10: 50 AM </option>
                      <option value="10:55 AM"> 10: 55 AM </option>
                      <option value="11:00 AM"> 11: 00 AM </option>
                      <option value="11:05 AM"> 11: 05 AM </option>
                      <option value="11:10 AM"> 11: 10 AM </option>
                      <option value="11:15 AM"> 11: 15 AM </option>
                      <option value="11:20 AM"> 11: 20 AM </option>
                      <option value="11:25 AM"> 11: 25 AM </option>
                      <option value="11:30 AM"> 11: 30 AM </option>
                      <option value="11:35 AM"> 11: 35 AM </option>
                      <option value="11:40 AM"> 11: 40 AM </option>
                      <option value="11:45 AM"> 11: 45 AM </option>
                      <option value="11:50 AM"> 11: 50 AM </option>
                      <option value="11:55 AM"> 11: 55 AM </option>
                      <option value="12:00 PM"> 12: 00 PM </option>
                      <option value="12:05 PM"> 12: 05 PM </option>
                      <option value="12:10 PM"> 12: 10 PM </option>
                      <option value="12:15 PM"> 12: 15 PM </option>
                      <option value="12:20 PM"> 12: 20 PM </option>
                      <option value="12:25 PM"> 12: 25 PM </option>
                      <option value="12:30 PM"> 12: 30 PM </option>
                      <option value="12:35 PM"> 12: 35 PM </option>
                      <option value="12:40 PM"> 12: 40 PM </option>
                      <option value="12:45 PM"> 12: 45 PM </option>
                      <option value="12:50 PM"> 12: 50 PM </option>
                      <option value="12:55 PM"> 12: 55 PM </option>
                      <option value="01:00 PM"> 01: 00 PM </option>
                      <option value="01:05 PM"> 01: 05 PM </option>
                      <option value="01:10 PM"> 01: 10 PM </option>
                      <option value="01:15 PM"> 01: 15 PM </option>
                      <option value="01:20 PM"> 01: 20 PM </option>
                      <option value="01:25 PM"> 01: 25 PM </option>
                      <option value="01:30 PM"> 01: 30 PM </option>
                      <option value="01:35 PM"> 01: 35 PM </option>
                      <option value="01:40 PM"> 01: 40 PM </option>
                      <option value="01:45 PM"> 01: 45 PM </option>
                      <option value="01:50 PM"> 01: 50 PM </option>
                      <option value="01:55 PM"> 01: 55 PM </option>
                      <option value="02:00 PM"> 02: 00 PM </option>
                      <option value="02:05 PM"> 02: 05 PM </option>
                      <option value="02:10 PM"> 02: 10 PM </option>
                      <option value="02:15 PM"> 02: 15 PM </option>
                      <option value="02:20 PM"> 02: 20 PM </option>
                      <option value="02:25 PM"> 02: 25 PM </option>
                      <option value="02:30 PM"> 02: 30 PM </option>
                      <option value="02:35 PM"> 02: 35 PM </option>
                      <option value="02:40 PM"> 02: 40 PM </option>
                      <option value="02:45 PM"> 02: 45 PM </option>
                      <option value="02:50 PM"> 02: 50 PM </option>
                      <option value="02:55 PM"> 02: 55 PM </option>
                      <option value="03:00 PM"> 03: 00 PM </option>
                      <option value="03:05 PM"> 03: 05 PM </option>
                      <option value="03:10 PM"> 03: 10 PM </option>
                      <option value="03:15 PM"> 03: 15 PM </option>
                      <option value="03:20 PM"> 03: 20 PM </option>
                      <option value="03:25 PM"> 03: 25 PM </option>
                      <option value="03:30 PM"> 03: 30 PM </option>
                      <option value="03:35 PM"> 03: 35 PM </option>
                      <option value="03:40 PM"> 03: 40 PM </option>
                      <option value="03:45 PM"> 03: 45 PM </option>
                      <option value="03:50 PM"> 03: 50 PM </option>
                      <option value="03:55 PM"> 03: 55 PM </option>
                      <option value="04:00 PM"> 04: 00 PM </option>
                      <option value="04:05 PM"> 04: 05 PM </option>
                      <option value="04:10 PM"> 04: 10 PM </option>
                      <option value="04:15 PM"> 04: 15 PM </option>
                      <option value="04:20 PM"> 04: 20 PM </option>
                      <option value="04:25 PM"> 04: 25 PM </option>
                      <option value="04:30 PM"> 04: 30 PM </option>
                      <option value="04:35 PM"> 04: 35 PM </option>
                      <option value="04:40 PM"> 04: 40 PM </option>
                      <option value="04:45 PM"> 04: 45 PM </option>
                      <option value="04:50 PM"> 04: 50 PM </option>
                      <option value="04:55 PM"> 04: 55 PM </option>
                      <option value="05:00 PM"> 05: 00 PM </option>
                      <option value="05:05 PM"> 05: 05 PM </option>
                      <option value="05:10 PM"> 05: 10 PM </option>
                      <option value="05:15 PM"> 05: 15 PM </option>
                      <option value="05:20 PM"> 05: 20 PM </option>
                      <option value="05:25 PM"> 05: 25 PM </option>
                      <option value="05:30 PM"> 05: 30 PM </option>
                      <option value="05:35 PM"> 05: 35 PM </option>
                      <option value="05:40 PM"> 05: 40 PM </option>
                      <option value="05:45 PM"> 05: 45 PM </option>
                      <option value="05:50 PM"> 05: 50 PM </option>
                      <option value="05:55 PM"> 05: 55 PM </option>
                      <option value="06:00 PM"> 06: 00 PM </option>
                      <option value="06:05 PM"> 06: 05 PM </option>
                      <option value="06:10 PM"> 06: 10 PM </option>
                      <option value="06:15 PM"> 06: 15 PM </option>
                      <option value="06:20 PM"> 06: 20 PM </option>
                      <option value="06:25 PM"> 06: 25 PM </option>
                      <option value="06:30 PM"> 06: 30 PM </option>
                      <option value="06:35 PM"> 06: 35 PM </option>
                      <option value="06:40 PM"> 06: 40 PM </option>
                      <option value="06:45 PM"> 06: 45 PM </option>
                      <option value="06:50 PM"> 06: 50 PM </option>
                      <option value="06:55 PM"> 06: 55 PM </option>
                      <option value="07:00 PM"> 07: 00 PM </option>
                      <option value="07:05 PM"> 07: 05 PM </option>
                      <option value="07:10 PM"> 07: 10 PM </option>
                      <option value="07:15 PM"> 07: 15 PM </option>
                      <option value="07:20 PM"> 07: 20 PM </option>
                      <option value="07:25 PM"> 07: 25 PM </option>
                      <option value="07:30 PM"> 07: 30 PM </option>
                      <option value="07:35 PM"> 07: 35 PM </option>
                      <option value="07:40 PM"> 07: 40 PM </option>
                      <option value="07:45 PM"> 07: 45 PM </option>
                      <option value="07:50 PM"> 07: 50 PM </option>
                      <option value="07:55 PM"> 07: 55 PM </option>
                      <option value="08:00 PM"> 08: 00 PM </option>
                      <option value="08:05 PM"> 08: 05 PM </option>
                      <option value="08:10 PM"> 08: 10 PM </option>
                      <option value="08:15 PM"> 08: 15 PM </option>
                      <option value="08:20 PM"> 08: 20 PM </option>
                      <option value="08:25 PM"> 08: 25 PM </option>
                      <option value="08:30 PM"> 08: 30 PM </option>
                      <option value="08:35 PM"> 08: 35 PM </option>
                      <option value="08:40 PM"> 08: 40 PM </option>
                      <option value="08:45 PM"> 08: 45 PM </option>
                      <option value="08:50 PM"> 08: 50 PM </option>
                      <option value="08:55 PM"> 08: 55 PM </option>
                      <option value="09:00 PM"> 09: 00 PM </option>
                      <option value="09:05 PM"> 09: 05 PM </option>
                      <option value="09:10 PM"> 09: 10 PM </option>
                      <option value="09:15 PM"> 09: 15 PM </option>
                      <option value="09:20 PM"> 09: 20 PM </option>
                      <option value="09:25 PM"> 09: 25 PM </option>
                      <option value="09:30 PM"> 09: 30 PM </option>
                      <option value="09:35 PM"> 09: 35 PM </option>
                      <option value="09:40 PM"> 09: 40 PM </option>
                      <option value="09:45 PM"> 09: 45 PM </option>
                      <option value="09:50 PM"> 09: 50 PM </option>
                      <option value="09:55 PM"> 09: 55 PM </option>
                      <option value="10:00 PM"> 10: 00 PM </option>
                      <option value="10:05 PM"> 10: 05 PM </option>
                      <option value="10:10 PM"> 10: 10 PM </option>
                      <option value="10:15 PM"> 10: 15 PM </option>
                      <option value="10:20 PM"> 10: 20 PM </option>
                      <option value="10:25 PM"> 10: 25 PM </option>
                      <option value="10:30 PM"> 10: 30 PM </option>
                      <option value="10:35 PM"> 10: 35 PM </option>
                      <option value="10:40 PM"> 10: 40 PM </option>
                      <option value="10:45 PM"> 10: 45 PM </option>
                      <option value="10:50 PM"> 10: 50 PM </option>
                      <option value="10:55 PM"> 10: 55 PM </option>
                      <option value="11:00 PM"> 11: 00 PM </option>
                      <option value="11:05 PM"> 11: 05 PM </option>
                      <option value="11:10 PM"> 11: 10 PM </option>
                      <option value="11:15 PM"> 11: 15 PM </option>
                      <option value="11:20 PM"> 11: 20 PM </option>
                      <option value="11:25 PM"> 11: 25 PM </option>
                      <option value="11:30 PM"> 11: 30 PM </option>
                      <option value="11:35 PM"> 11: 35 PM </option>
                      <option value="11:40 PM"> 11: 40 PM </option>
                      <option value="11:45 PM"> 11: 45 PM </option>
                      <option value="11:50 PM"> 11: 50 PM </option>
                      <option value="11:55 PM"> 11: 55 PM </option>
                    </Form.Select>
                  </div>
                </div>
              </div>
            )}
            <button className={styles.button} type="submit">
              Show Possibilities
            </button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BookingInputCard;
