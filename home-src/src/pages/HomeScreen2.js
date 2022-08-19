import React, { useState, useEffect, useContext } from "react";
import BookingDetailsCard from "../components/Cards/BookingDetailsCard";

import { Container } from "react-bootstrap";
import CarCard from "../components/Cards/CarCard";
import UserDetails from "../components/UserDetails/UserDetails";
import Payment from "../components/Payment/Payment";
import { useNavigate, Navigate } from "react-router-dom";

import UserContext from "../auth/context";
import axios from "axios";
import styles from "../assets/css/Home2.module.css";
// import MapScreen from "./MapScreen";

// import { gapi } from "gapi-script";

// distance, price
// const distance = 25;
const carmatch = [];
// const cars = [
//   {
//     babySeat: 10,
//     boosterSeat: 10,
//     brand: "BMW",
//     color: "white",
//     extraStop: 10,
//     luggageCapacity: 2,
//     model: "8 Series",
//     pets: 10,
//     priceperday: 100,
//     priceperkm: 5,
//     seatingCapacity: 4,
//     specialLuggage: 10,
//     type: "coupe",
//   },
// ];

const HomeScreen2 = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  // console.log(userContext.body.pickupAddress);
  const [page, setPage] = useState(1);
  // const distance = 18;
  // const duration = 36;
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  // const [loading, setLoading] = useState(false);
  // const [city, setCity] = useState();

  // console.log(userContext.body);

  // useEffect(() => {

  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCashPayment = (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios.put(`/orders/cash/${id}`, config).then((response) => {
        if (response.data.paymentMethod === "cash") {
          alert("Payment Successfully updated to Cash");
          navigate("/");
        } else {
          alert("Server Error");
        }
        // console.log(response);
      });
    } catch (error) {
      alert("Payment Failed");
    }
  };

  useEffect(() => {
    // console.log(userContext.body.pickupAddress);

    // console.log(userContext.body.destinationAddress);
    if (userContext.body) {
      axios.get("/chauffeurs/active").then((res1) => {
        let data = res1.data;
        for (let i = 0; i < data.length; i++) {
          if (
            userContext.body.pickupAddress
              .toLocaleLowerCase()
              .includes(data[i].toLocaleLowerCase())
          ) {
            console.log(data[i]);
            // setCity(data[i]);

            let temp = {
              // state: tarray[tarray.length - 2].trim().toLowerCase(),
              city: data[i],
            };

            axios
              .get("/chauffeurs/cars/city/filter", { params: temp })
              .then((res) => {
                // setCars(res.data[0]);

                // setLoading(true);

                // console.log("Car Data", res.data[0]);
                for (var i = 0; i < res.data[0].length; i++) {
                  if (
                    res.data[0][i].seatingCapacity >=
                      userContext.body.noOfPassenger &&
                    res.data[0][i].luggageCapacity >=
                      userContext.body.noOfLuggage
                  ) {
                    carmatch.push(res.data[0][i]);
                  }
                }
              });
          }
        }
      });

      axios
        .get(
          `/directions/p1=${userContext.body.destinationAddress
            .replace(/[^a-z ]/gi, "")
            .trim()}/p2=${userContext.body.pickupAddress
            .replace(/[^a-z ]/gi, "")
            .trim()}`
        )
        .then((res) => {
          // console.log(res.data);
          setDistance(res.data.distance);
          setDuration(res.data.duration);
        });
    } else {
      navigate("/");
    }
    // console.log(carmatch);
  }, [userContext.body, navigate]);

  const onPageChange = (p) => {
    setPage(p);
  };
  if (userContext.body) {
    return (
      <>
        <div style={{ marginTop: "90px" }}>
        <div className="col-lg-2 ghjgg">
                <a className="paf"
                  href="/"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    backgroundColor: "#000",
                  }}
                >
                  {" "}
                  ← Back{" "}
                </a>{" "}
              </div>{" "}
          <div className={styles.homeDiv} style={{marginTop:"50px"}}>
            <div style={{ flex: "1" }}>
              <div className={styles.cardWrap}>
                <BookingDetailsCard
                  isMap={true}
                  title1="FROM :"
                  subtitle1={userContext.body.pickupAddress}
                  title2="TO :"
                  subtitle2={userContext.body.destinationAddress}
                  title3="ON :"
                  subtitle31={`Date : ${userContext.body.bookingDate} | Time : ${userContext.body.bookingTime}`}
                  subtitle32={`Distance : ${distance} km`}
                  subtitle33={`Probable duration : ${duration}`}
                  title4={userContext.body.isRoundTrip && "RETURN :"}
                  subtitle4={`Date : ${userContext.body.rBookingDate} | Time : ${userContext.body.rBookingTime}`}
                  title5={userContext.body.vehicleClass && "TRANSFER TYPE :"}
                  subtitle5={userContext.body.vehicleClass}
                  title6="OPTIONS :"
                  subtitle6={`${userContext.body.noOfPassenger} Passengers | ${userContext.body.noOfLuggage} Suitcases`}
                  author={
                    userContext.body.price &&
                    `TOTAL PRICE  : $ ${Math.round(userContext.body.price)}`
                  }
                />
              </div>
            </div>
            <div className={styles.secondContainer}>
              <div className={`${styles.progressWrapper} mt-4`}>
                <div className={styles.progressDivClick}>Vehicle</div>
                <div
                  className={
                    page === 2
                      ? `${styles.progressDivClick}`
                      : page === 3
                      ? `${styles.progressDivClick}`
                      : `${styles.progressDiv}`
                  }
                >
                  Travel Details
                </div>
                <div
                  className={
                    page === 3
                      ? `${styles.progressDivClick}`
                      : `${styles.progressDiv}`
                  }
                >
                  Payment
                </div>
              </div>
              {isSuccess && (
                <div className="mt-5">
                  <div
                    style={{
                      backgroundColor: "#ffcc33",
                      textAlign: "center",
                      padding: "8px",
                      borderRadius: "5px",
                      width: "100%",

                      color: "rgb(30, 30, 30)",
                      fontWeight: "500",
                      textShadow: "2px 1px 5px #b5b5b5",
                      marginBottom: "30px",
                    }}
                  >
                    <p className="h6">
                      Order Successfully Placed, Proceed to Payment for
                      completion, You can track your order using your mobile
                      number .
                    </p>
                  </div>
                </div>
              )}
              {(() => {
                if (page === 1) {
                  // console.log(carmatch.length);
                  if (carmatch.length > 0) {
                    return (
                      // <>
                      //   <CarCard onRouChange={onRouChange} />
                      // </>
                      <div className="mt-5">
                        {carmatch.map((item, index) => (
                          <CarCard
                            key={index}
                            item={item}
                            distance={distance}
                            onPageChange={onPageChange}
                          />
                        ))}
                      </div>
                    );
                  } else {
                    // console.log(carmatch.length);
                    return (
                      <div className="mt-5">
                        <div
                          style={{
                            backgroundColor: "#ffcc33",
                            textAlign: "center",
                            padding: "8px",
                            borderRadius: "5px",
                            width: "100%",
                            color: "rgb(30, 30, 30)",
                            fontWeight: "500",
                            textShadow: "2px 1px 5px #b5b5b5",
                            marginBottom: "80px",
                          }}
                        >
                          <h6>
                            Sorry ! No cars available for the given details.
                          </h6>
                        </div>
                      </div>
                    );
                  }
                } else if (page === 2) {
                  return (
                    <UserDetails
                      setIsSuccess={setIsSuccess}
                      onPageChange={onPageChange}
                    />
                  );
                } else if (page === 3) {
                  return (
                    <>
                      <p
                        className={styles.button}
                        onClick={() => handleCashPayment(userContext.userId)}
                      >
                        Pay by Cash
                      </p>
                      <Payment
                        price={userContext.body.price}
                        userId={userContext.userId}
                      />
                    </>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default HomeScreen2;
