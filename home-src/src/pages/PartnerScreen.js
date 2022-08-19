import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../assets/css/Static.module.css";

const TermsScreen = () => {
  const [buttonClick, setButtonClick] = useState(true);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={styles.disclosureWrapper}>
      <div className="mt-5" style={{ display: "flex" }}>
        <LinkContainer role="button" to="/">
          <h6>Home</h6>
        </LinkContainer>
        <h6 className="text-muted">&nbsp;{`> Become a Mosooklimo Driver`}</h6>
      </div>
      <Row>
        <p className="h1" style={{textAlign:"left"}}>Become a Mosooklimo Driver</p>
      </Row>
      <div className={styles.disclosureMain}>
        <div style={{}}>
          <div>
            <Row>
              <Col sm={8}>
                Mosooklimo stands for excellent service and a superb customer
                experience. We offer an online reservation system for all
                transfers to and from airports all around the globe (over 50
                countries and 200 airports). Thanks to our extensive knowledge
                in the industry (Mosooklimo was founded in 2003), we connect
                both leisure and business travellers to our partners.
              </Col>
              <Col sm={4} className="text-center">
                <img src="./partner.png" alt="ph" />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col xs={6} md={4} className="mt-4">
                <h5 style={{textAlign:"left"}}>NO FEES</h5>
                <p style={{textAlign:"left"}}>Simply register online for free. There are no hidden
                registration or monthly fees. You take care of the transfers,
                we’ll take care of everything else.</p>
              </Col>
              <Col xs={6} md={4} className="mt-4">
                <h5 style={{textAlign:"left"}}>TECHNOLOGY-DRIVEN</h5>
              <p style={{textAlign:"left"}}>  Recieve a text message when a client’s flight is delayed.
                Receive a detailed email with all the transfer requests for your
                registered airports.</p>
              </Col>
              <Col xs={6} md={4} className="mt-4">
                <h5 style={{textAlign:"left"}}>INCREASE YOUR BUSINESS</h5> 
                <p style={{textAlign:"left"}}>We have customers all over the
                globe. Fill the empty slots in your schedule and receive weekly
                or monthly payouts for the completed rides.</p>
              </Col>
            </Row>
            <Row className="mt-5">
              <h2 style={{textAlign:"left"}}>How does it work?</h2>
            </Row>
            <Row className="mt-1">
              <Col xs={6} md={4}>
                <h1>1</h1>
               <p style={{textAlign:"left"}}> Register your company on our portal by clicking link in footer</p>
              </Col>
              <Col xs={6} md={4}>
                <h1>2</h1>
            <p style={{textAlign:"left"}}>    Receive scheduled transfer requests for your selected airports</p>
              </Col>
              <Col xs={6} md={4}>
                <h1 style={{textAlign:"left"}}>3</h1> 
                <p style={{textAlign:"left"}}>Accept the transfers that suit your schedule</p>
              </Col>
            </Row>
            <Row className="mt-5">
              <h2 style={{textAlign:"left"}}>Get Started Today</h2>
            </Row>
          <a  href="/driver/sign-up.html">
          <Button
              className={styles.button}
              style={{
                paddingInline: "60px",
                marginTop: "25px",
                width: "auto",
              }}
              variant="primary"
              size="lg"
            >
              <a
                href="/driver/sign-up.html"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign up
              </a>
            </Button>
          </a>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TermsScreen;
