import React, { useState } from "react";
import BookingInputCard from "../components/Cards/BookingInputCard";
import BookingInputCardLux from "../components/Cards/BookingInputCardLux";

import styles from "../assets/css/Home.module.css";

import { Carousel, Button, Row, Col } from "react-bootstrap";

const HomeScreen = ({ onRouteChange }) => {
  const [screen1, setScreen1] = useState(false);
  const [screen2, setScreen2] = useState(false);
  const [screen3, setScreen3] = useState(true);
  return (
    <div className={styles.home_wrapper}>
      <div className={styles.mobile_expander}>
        <Carousel variant="light">
          <Carousel.Item className={styles.img_wrap}>
            <img
              className="d-block w-100"
              src="./carousel/2.png"
              alt="First slide"
            />
            <Carousel.Caption>
              <p className={styles.carousel_title}>
                Professional Luxury Pickup & Drop Service Making an
                unforgettable professional tour{" "}
              </p>{" "}
            </Carousel.Caption>{" "}
          </Carousel.Item>{" "}
          <Carousel.Item className={styles.img_wrap}>
            <img
              className="d-block w-100"
              src="./carousel/1.png"
              alt="Second slide"
            />
            <Carousel.Caption>
              <p className={styles.carousel_title}>
                Professional Luxury Rental Services Making an unforgettable
                professional tour{" "}
              </p>{" "}
            </Carousel.Caption>{" "}
          </Carousel.Item>{" "}
          <Carousel.Item className={styles.img_wrap}>
            <img
              className="d-block w-100"
              src="./carousel/3.png"
              alt="Third slide"
            />
            <Carousel.Caption>
              <p className={styles.carousel_title}>
                Mosook Limo - Life is either a daring adventure or nothing at
                all{" "}
              </p>{" "}
            </Carousel.Caption>{" "}
          </Carousel.Item>{" "}
        </Carousel>{" "}
      </div>{" "}
      {screen3 && (
        <Row className={[styles.card_wrapper, "mx-0"]}>
          <Col lg={6} className={[styles.cardbox, styles.bg1]}>
            <h2 className={`text-center ${styles.homesubtitle}`}>
              Luxury Pickup & Drop Service{" "}
            </h2>{" "}
            <p style={{ color: "#fff" }}>
              Travel from Airports to your destination hassle free, with our
              chauffeur.zero wait - time for your limo to arrive.{" "}
            </p>{" "}
            <div className="text-center">
              <Button
                variant="dark"
                size="lg"
                onClick={() => {
                  setScreen1(true);
                  setScreen2(false);
                  setScreen3(false);
                }}
              >
                Book Now{" "}
              </Button>{" "}
            </div>{" "}
          </Col>{" "}
          <Col lg={6} className={[styles.cardbox, styles.bg2]}>
            <h2 className={`text-center ${styles.homesubtitle}`}>
              Luxury Rental Service{" "}
            </h2>{" "}
            <p style={{ color: "#fff" }}>
              Avail our award - winning premium rental service.With flexible
              booking slots on hourly or daily basis.highest luxury guaranteed!
            </p>{" "}
            <div className="text-center">
              <Button
                variant="dark"
                size="lg"
                onClick={() => {
                  setScreen1(false);
                  setScreen2(true);
                  setScreen3(false);
                }}
              >
                Book Now{" "}
              </Button>{" "}
            </div>{" "}
          </Col>{" "}
        </Row>
      )}{" "}
      <div style={{ marginTop: "45px" }}>
        {" "}
        {!screen3 && (
          <div style={{ width: "60%", margin: "20px auto" }}>
            <Row>
              <div className="col-lg-2 ghjgjg">
                <a
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
              <Col sm>
                <Button
                  className="mt-2"
                  variant={screen1 ? "secondary" : "outline-secondary"}
                  size="lg"
                  style={{ display: "block", width: "100%" }}
                  onClick={() => {
                    setScreen1(true);
                    setScreen2(false);
                  }}
                >
                  Luxury Pickup & Drop Services{" "}
                </Button>{" "}
              </Col>{" "}
              <Col sm>
                <Button
                  className="mt-2"
                  variant={screen2 ? "secondary" : "outline-secondary"}
                  size="lg"
                  style={{ display: "block", width: "100%" }}
                  onClick={() => {
                    setScreen1(false);
                    setScreen2(true);
                  }}
                >
                  Luxury Rental Services{" "}
                </Button>{" "}
              </Col>{" "}
            </Row>{" "}
          </div>
        )}{" "}
        {screen1 && <BookingInputCard onRouteChange={onRouteChange} />}{" "}
        {screen2 && <BookingInputCardLux onRouteChange={onRouteChange} />}{" "}
      </div>{" "}
    </div>
  );
};

export default HomeScreen;
