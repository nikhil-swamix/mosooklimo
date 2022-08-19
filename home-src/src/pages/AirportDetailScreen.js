import React, { useEffect, useState } from "react";
import { Container,Carousel, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../assets/css/Static.module.css";
import BookingInputCard from "../components/Cards/BookingInputCard";
import BookingInputCardLux from "../components/Cards/BookingInputCardLux";



const AirportDetailScreen = ({ match,onRouteChange }) => {
  const { id } = useParams();
  const [airport, setAirport] = useState();
  const [loading, setLoading] = useState(false);
  const [screen1, setScreen1] = useState(false);
  const [screen2, setScreen2] = useState(false);
  const [screen3, setScreen3] = useState(true);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    axios.get("/airports").then((res) => {
      setAirport(res.data);
      setLoading(true);
    });
  }, []);

  var airportmatch = [];
  if (loading) {
    airportmatch = airport.filter((d) => d._id === id);
    // console.log(airportmatch);
  }

  return (
    <Container fluid className={styles.wrapper}>
      {loading && (
        <div style={{ marginTop: "100px" }}>
      
          <div class="aboutbanner" id="containq1"><h2> {airportmatch[0].name}</h2></div>

          <div className="breadcum" style={{ display: "flex",    position: "absolute" }}>
            <LinkContainer role="button" to="/">
              <h6>Home</h6>
            </LinkContainer>
            <LinkContainer role="button" to="/airports.php">
              <h6>&nbsp;{`> Airport`}</h6>
            </LinkContainer>

            <h6 className={`text-muted ${styles.blogTitle}`}>
              &nbsp;{`> ${airportmatch[0].name}`}
            </h6>
          </div>

    <div className={styles.home_wrapper}>
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
  
          <div className={styles.blogDetailWrapper}>
            <Row style={{ paddingBlock: "50px" }}>
              <p className="h5">{airportmatch[0].name}</p>
              <hr></hr>
            </Row>
            <div className="mt-4">{airportmatch[0].description}</div>
            <Row style={{ paddingBlock: "50px" }}>
              <p className="h1">{`Affordable Transfer from ${airportmatch[0].name}`}</p>
            </Row>
            <div className="mt-4">
              {`For a comfortable and affordable ${airportmatch[0].name} transfer, trust
            Mosooklimo. In addition to transfers to your business meeting or
            hotel, we can also provide a transfer from ${airportmatch[0].name} to virtually
            any place you need to be. This includes transport for both small and
            larger groups. We also provide larger vehicles that are ideal for
            families and groups of friends. Whether you are visiting your
            destination for a getaway or to do business, we have a vehicle that
            suits your budget. More importantly, our drivers will ensure you
            reach your destination on time and with as little hassle as
            possible. We strive to take the stress out of travelling to and from
            the airport, giving you more time to enjoy your holiday or prepare
            for your business meetings.`}
            </div>
            <Row style={{ paddingBlock: "50px" }}>
              <p className="h1">{`${airportmatch[0].name} Transfers with Mosooklimo`}</p>
            </Row>
            <div className="mt-4">
              {`Mosooklimo is available 24 hours a day, providing real-time
            details on available vehicles and convenient online booking. We
            offer easy booking online for your transfer from Bost Airport. We
            take pride in providing low prices without compromising customer
            service. Changes and cancellations to your transfer from ${airportmatch[0].name} are also hassle-free, giving you the best possible
            flexibility in case your travel plans change. Once you book your taxi, you simply meet your driver upon arrival. All
            taxi companies and drivers for your ${airportmatch[0].name} are fully
            vetted to ensure the highest quality of service and safety. We only
            work with experienced drivers and regularly evaluate our partners
            performance. With a presence in more than 50 countries and over
            2,000 airports, it is little wonder why more and more travellers are
            turning to Mosooklimo for their ${airportmatch[0].name} transfer needs. Book
            your transfer from ${airportmatch[0].name} today at Mosooklimo.`}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AirportDetailScreen;
