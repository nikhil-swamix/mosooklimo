import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../assets/css/Static.module.css";

import { FaSearchLocation } from "react-icons/fa";
import BookingDetailsCard from "../components/Cards/BookingDetailsCard";
import Payment from "../components/Payment/Payment";

const TrackScreen = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [phone, setPhone] = useState("");
  const [data, setData] = useState();
  const [isRental, setIsRental] = useState(false);

  const handleClick = () => {
    if (phone) {
      axios
        .get(
          isRental
            ? `/rental/track/${phone.toString()}`
            : `/orders/track/${phone.toString()}`
        )
        .then((res) => {
          setData(res.data);
          // console.log(res.data);
          setPhone("");
        });
    }
  };

  return (
    <Container fluid className={styles.disclosureWrapper}>
      <div className="mt-5" style={{ display: "flex" }}>
        <LinkContainer role="button" to="/">
          <h6>Home</h6>
        </LinkContainer>
        <h6 className="text-muted">&nbsp;{`> Track my Order`}</h6>
      </div>
      <Row>
        <p className="h1">Track my Order</p>
      </Row>
      <div className={styles.disclosureMain}>
        <Row>
          <p className="h5 mt-4">How to track ?</p>
        </Row>

        <div style={{ paddingTop: "30px" }}>
          <div>
            <p className="h5">Introduction</p>
            <p className={styles.disclosureData}>
              For tracking your order , you have to type your registered number
              inside the box with country code but not with the <b>+ sign</b>.
              For example - your mobile number is <b>9876543210</b> and your
              country code is +91. so you have to type <b>919876543210</b>{" "}
              inside the box. For rental booking you have to click the checkbox
              before procedding.
            </p>
          </div>
          <div
            className="align-items-center justify-content-center mt-5"
            style={{
              height: "auto",
              backgroundColor: "#5c5c5c",
              borderRadius: "10px",
              paddingBlock: "50px",
              paddingInline: "20px",
              width: "100%",
              border:"none"
            }}
          >
            <div
              style={{
                display: "block",
              }}
            >
              <div className="my-2">
                <input
                  type="checkbox"
                  style={{ marginRight: "8px" }}
                  data-toggle="toggle"
                  onChange={() => {
                    setIsRental(!isRental);
                    setData();
                    setPhone("");
                  }}
                />
                <span style={{ color: "#fff" }}>Click for Rental Service</span>
              </div>
              <div className={styles.trackInputContainer}>
                <FaSearchLocation size={25} />
                <input
                  id=""
                  placeholder="Mobile number"
                  style={{
                    border: "none",
                    paddingLeft: "10px",
                    outline: "none",
                    width: "100%",
                  }}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <Button
                style={{ paddingInline: "40px", marginTop: "10px" }}
                variant="primary"
                size="lg"
                onClick={handleClick}
              >
                Track
              </Button>
            </div>
          </div>
        </div>

        {data &&
          data.map((v, i) => {
            if (isRental) {
              return (
                <div
                  className="card mt-5"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "2px outset #1C6EA4",
                  }}
                >
                  <div className="card-body">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5 className="card-title">
                        Status : <span className="text-danger">{v.status}</span>
                      </h5>
                      <h5 className="card-title">
                        Payment :{" "}
                        {(() => {
                          if (v.paymentMethod === "cash") {
                            return <span className="text-danger">Cash</span>;
                          } else if (v.paymentMethod === "online") {
                            return (
                              <span className="text-danger">{`${
                                v.isPaid ? "Completed" : "Not Completed"
                              }`}</span>
                            );
                          }
                        })()}
                      </h5>
                    </div>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{v.name}</h5>
                    <h6 className="card-text">{`Pickup > ${v.pickupPoint}`}</h6>
                    <h6 className="card-text">{`Drop Point > ${v.dropPoint}`}</h6>
                    <h6 className="card-text">
                      {"Booking Date & Time : "}
                      <span className="text-danger">{`${
                        v.bookingDate.split("T")[0]
                      }, ${v.bookingTime}`}</span>
                    </h6>
                    <h6 className="card-text">
                      {"Drop Date & Time : "}
                      <span className="text-danger">{`${
                        v.dropDate.split("T")[0]
                      }, ${v.dropTime}`}</span>
                    </h6>
                    <h6 className="card-text">{`Vehicle Class > ${v.vehicleClass}`}</h6>
                  </div>

                  <div
                    className="card-body"
                    style={{
                      border: "8px outset #1C6EA4",
                      borderRadius: "0px 40px 40px 0px",
                    }}
                  >
                    <h5>Special Options :</h5>
                    <div className="px-3">
                      <h6 className="mt-4">{`Meet Greet > ${
                        v.meetGreet ? "Required" : "Not required"
                      }`}</h6>
                      <h6>{`Baby Seat > ${v.noOfBabySeat}`}</h6>
                      <h6>{`Booster Seat > ${v.noOfBoosterSeat}`}</h6>
                      <h6>{`Special Luggage > ${v.noOfSpecialLuggage}`}</h6>
                      <h6>{`Pets > ${v.noOfPets}`}</h6>
                      <h6>{`Extra Stop > ${v.noOfExtraStop}`}</h6>
                    </div>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">
                      Total :{" "}
                      <span className="text-danger">{`$ ${v.price}`}</span>
                    </h5>
                    <h6 className="card-text">{`Paid at : ${
                      v.paidAt
                        ? v.paidAt.split("T")[0] +
                          " , " +
                          v.paidAt.split("T")[1].split(".")[0]
                        : "Not Paid"
                    }`}</h6>
                  </div>
                  {!v.isPaid && (
                    <div className="card-body">
                      <Payment rental={true} price={v.price} userId={v._id} />
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div
                  className="card mt-5"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "2px outset #1C6EA4",
                  }}
                >
                  <div className="card-body">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5 className="card-title">
                        Status : <span className="text-danger">{v.status}</span>
                      </h5>
                      <h5 className="card-title">
                        Payment :{" "}
                        {(() => {
                          if (v.paymentMethod === "cash") {
                            return <span className="text-danger">Cash</span>;
                          } else if (v.paymentMethod === "online") {
                            return (
                              <span className="text-danger">{`${
                                v.isPaid ? "Completed" : "Not Completed"
                              }`}</span>
                            );
                          }
                        })()}
                      </h5>
                    </div>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">{v.name}</h5>
                    <h6 className="card-text">{`Pickup > ${v.pickupAddress}`}</h6>
                    <h6 className="card-text">{`Destination > ${v.destinationAddress}`}</h6>
                    <h6 className="card-text">
                      {"Booking Date & Time : "}
                      <span className="text-danger">{`${
                        v.bookingDate.split("T")[0]
                      }, ${v.bookingTime}`}</span>
                    </h6>
                    <h6 className="card-text">{`No of Passenger & Luggage > ${v.noOfPassenger} - ${v.noOfLuggage}`}</h6>
                    {v.rBookingDate && (
                      <h6 className="card-text">
                        {"Return Booking Date & Time : "}
                        <span className="text-danger">{`${
                          v.rBookingDate.split("T")[0]
                        }, ${v.rBookingTime}`}</span>
                      </h6>
                    )}
                    <h6 className="card-text">
                      {"Distance : "}
                      <span className="text-danger">{`${v.distance} KM`}</span>
                    </h6>
                    <h6 className="card-text">{`Vehicle Class > ${v.vehicleClass}`}</h6>
                  </div>

                  <div
                    className="card-body"
                    style={{
                      border: "8px outset #1C6EA4",
                      borderRadius: "0px 40px 40px 0px",
                    }}
                  >
                    <h5>Special Options :</h5>
                    <div className="px-3">
                      <h6 className="mt-4">{`Meet Greet > ${
                        v.meetGreet ? "Required" : "Not required"
                      }`}</h6>
                      <h6>{`Baby Seat > ${v.noOfBabySeat}`}</h6>
                      <h6>{`Booster Seat > ${v.noOfBoosterSeat}`}</h6>
                      <h6>{`Special Luggage > ${v.noOfSpecialLuggage}`}</h6>
                      <h6>{`Pets > ${v.noOfPets}`}</h6>
                      <h6>{`Extra Stop > ${v.noOfExtraStop}`}</h6>
                    </div>
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">
                      Total :{" "}
                      <span className="text-danger">{`$ ${v.price}`}</span>
                    </h5>
                    <h6 className="card-text">{`Paid at : ${
                      v.paidAt
                        ? v.paidAt.split("T")[0] +
                          " , " +
                          v.paidAt.split("T")[1].split(".")[0]
                        : "Not Paid"
                    }`}</h6>
                  </div>
                  {!v.isPaid && (
                    <div className="card-body">
                      <Payment price={v.price} userId={v._id} />
                    </div>
                  )}
                </div>
              );
            }
          })}
      </div>
    </Container>
  );
};

export default TrackScreen;
