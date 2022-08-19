import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Accordion from "../components/FAQ/Accordion";
import { LinkContainer } from "react-router-bootstrap";
import {
  BeforeBook,
  AfterBook,
  DuringTrip,
  AfterTrip,
} from "../Data/AccordianFAQ";
import styles from "../assets/css/Static.module.css";

const ServiceScreen = () => {
  const [whichButton, setWhichButton] = useState(1);
  const [data, setData] = useState(BeforeBook);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
     <div className="fluid-container">
     <Container fluid style={{ marginTop: "100px" }}>
        <div className="mt-5" style={{ display: "flex" }}>
          <LinkContainer role="button" to="/">
            <h6>Home</h6>
          </LinkContainer>
          <h6 className="text-muted">&nbsp;{`> Customer Service`}</h6>
        </div>
        <Row className="mt-3 contactFaq" >
          <h3>How can we help you today?</h3>
        </Row>
        <div className={styles.serviceDiv}>
          <p className="text-center contactFaq">
            Please contact us if you have any questions regarding either making
            a booking or your existing booking(s). We are available by phone or
            you might send us a message. We typically respond within 8 business
            hours.
          </p>
          <p className="text-dark text-center mb-3 pb-0">
            Telephone : <b>&nbsp;+966-920001687</b>. Whatsapp :{" "}
            <b>&nbsp; +966-567495913</b>. Email :
            <b>
              {" "}
              &nbsp;limo@mosook.com, booking@mosooklimo.com, info@mosooklimo.com
            </b>
          </p>
          <div className={styles.serviceImgWrapper}>
            <div>
              <a href="mailto: limo@mosook.com">
                <img
                  className={styles.serviceImg}
                  role="button"
                  src="./email.png"
                  alt="email"
                />
              </a>
            </div>
            <div>
              <a href="tel:+966-920001687">
                <img
                  className={styles.serviceImg}
                  role="button"
                  src="./phone.png"
                  alt="phone"
                />
              </a>
            </div>
            <div>
              <a href="https://wa.me/+966-567495913">
                <img
                  className={styles.serviceImg}
                  role="button"
                  src="./chat.png"
                  alt="chat"
                />
              </a>
            </div>
          </div>
        </div>
        <Row className="mt-5 contactFaq">
          <h2>FAQs</h2>
        </Row>
        <Row className="contactFaq">
          <Col sm>
            <Button
              className="mt-2"
              variant={whichButton === 1 ? "primary" : "outline-primary"}
              size="lg"
              style={{ display: "block", width: "100%" }}
              onClick={() => {
                setData(BeforeBook);
                setWhichButton(1);
              }}
            >
              Before you book.
            </Button>
          </Col>
          <Col sm>
            <Button
              className="mt-2"
              variant={whichButton === 2 ? "primary" : "outline-primary"}
              size="lg"
              style={{ display: "block", width: "100%" }}
              onClick={() => {
                setData(AfterBook);
                setWhichButton(2);
              }}
            >
              After you've booked
            </Button>
          </Col>
          <Col sm>
            <Button
              className="mt-2"
              variant={whichButton === 3 ? "primary" : "outline-primary"}
              size="lg"
              style={{ display: "block", width: "100%" }}
              onClick={() => {
                setData(DuringTrip);
                setWhichButton(3);
              }}
            >
              During your trip
            </Button>
          </Col>
        </Row >
        <Row className="my-2 contactFaq">
          <Col>
            <Button
              variant={whichButton === 4 ? "primary" : "outline-primary"}
              size="lg"
              style={{ display: "block", width: "100%" }}
              onClick={() => {
                setData(AfterTrip);
                setWhichButton(4);
              }}
            >
              After your trip
            </Button>
          </Col>
        </Row>

        {data && (
          <div>
            <Accordion data={data} />
          </div>
        )}
      </Container>
     </div>
    </>
  );
};

export default ServiceScreen;
