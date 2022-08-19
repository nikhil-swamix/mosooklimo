import React, { useState, useEffect, useContext } from "react";
import BookingDetailsCard from "../components/Cards/BookingDetailsCard";

import { Container } from "react-bootstrap";
import CarCard from "../components/Cards/CarCardLux";
import UserDetails from "../components/UserDetails/UserDetailsLux";
import Payment from "../components/Payment/Payment";
import { useNavigate, Navigate } from "react-router-dom";

import UserContext from "../auth/context";
import axios from "axios";
import styles from "../assets/css/Home2.module.css";


const HomeScreen2 = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [day, setDay] = useState();
  const [page, setPage] = useState(1);
  const [cars, setCars] = useState();
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState();

  useEffect(() => {
    const calculateDate = () => {
      const days = (new Date(userContext.bodyLux.dropDate) - new Date(userContext.bodyLux.bookingDate)) / (1000 * 60 * 60 * 24);

      if (days === 0) {
        setDay(1);
      } else if (days > 0) {
        setDay(days);
      }
    };

    if (userContext.bodyLux) {
      let data;
      window.scrollTo(0, 0);
      // const tarray = userContext.bodyLux.pickupPoint.split(",");
      // console.log(tarray[tarray.length - 2].length);

      axios.get("/chauffeurs/active").then((res) => {
        data = res.data;
        for (let i = 0; i < data.length; i++) {
          if (
            userContext.bodyLux.pickupPoint
              .toLocaleLowerCase()
              .includes(data[i].toLocaleLowerCase())
          ) {
            // console.log(data[i]);
            setCity(data[i]);
          }
        }
      });

      calculateDate();
    } else {
      navigate("/");
    }
  }, [userContext.bodyLux, navigate]);

  useEffect(() => {
    let temp = {
      brand: userContext.bodyLux.brand,
      type: userContext.bodyLux.type,
      model: userContext.bodyLux.model,
      color: userContext.bodyLux.color,
      // state: tarray[tarray.length - 2].trim().toLowerCase(),
      city: city,
    };

    axios.get("/chauffeurs/cars/filter", { params: temp }).then((res) => {
      console.log(res);
      setCars(res.data);

      setLoading(true);

      // console.log("Car Data", res.data);
    });
  }, [city, userContext.bodyLux]);

  const handleCashPayment = (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios.put(`/rental/cash/${id}`, config).then((response) => {
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

  const onPageChange = (p) => {
    setPage(p);
  };
  if (userContext.bodyLux) {
    return (
      <>
        <Container style={{ marginTop: "90px" }}>
          <div className={styles.homeDiv}>
            <div style={{ flex: "1" }}>
              <div className={styles.cardWrap}>
                <BookingDetailsCard
                  isMap={true}
                  title1="Pickup Point :"
                  subtitle1={userContext.bodyLux.pickupPoint}
                  title2="Drop Point :"
                  subtitle2={userContext.bodyLux.dropPoint}
                  subtitle21={`No of Days : ${day}`}
                  title3="From :"
                  subtitle31={`Date : ${userContext.bodyLux.bookingDate} | Time : ${userContext.bodyLux.bookingTime}`}
                  title4={"To :"}
                  subtitle4={`Date : ${userContext.bodyLux.dropDate} | Time : ${userContext.bodyLux.dropTime}`}
                  title5={userContext.bodyLux.vehicleClass && "TRANSFER TYPE :"}
                  subtitle5={userContext.bodyLux.vehicleClass}
                  title6={"SPECIAL OPTIONS :"}
                  subtitle6={
                    (userContext.bodyLux.meetGreet ? "Meet Greet, " : "") +
                    (userContext.bodyLux.noOfBabySeat ? "Baby Seat, " : "") +
                    (userContext.bodyLux.noOfBoosterSeat
                      ? "Booster Seat, "
                      : "") +
                    (userContext.bodyLux.noOfSpecialLuggage
                      ? "Special Luggage,"
                      : "") +
                    (userContext.bodyLux.noOfPets ? "Pets, " : "") +
                    (userContext.bodyLux.noOfExtraStop ? "Extra Stop, " : "")
                  }
                  author={
                    userContext.bodyLux.price &&
                    `TOTAL PRICE  : $ ${Math.round(userContext.bodyLux.price)}`
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
                  if (loading) {
                    if (cars[0] && day) {
                      // console.log("Cars x", cars);
                      return (
                        // <>
                        //   <CarCard onRouChange={onRouChange} />
                        // </>
                        <div className="mt-5">
                          {cars.map((item, index) => (
                            <CarCard
                              key={index}
                              item={item}
                              day={day}
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
                              Sorry ! No cars available for the given area.
                            </h6>
                          </div>
                        </div>
                      );
                    }
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
                        rental={true}
                        price={userContext.bodyLux.price}
                        userId={userContext.userId}
                      />
                    </>
                  );
                }
              })()}
            </div>
          </div>
        </Container>
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default HomeScreen2;
