import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../assets/css/Static.module.css";

const PrivacyScreen = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios.get("/data").then((res) => {
      // console.log(res.data);
      setData(res.data[0]);
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className={styles.disclosureWrapper}>
      <div className="mt-5" style={{ display: "flex" }}>
        <LinkContainer role="button" to="/">
          <h6>Home</h6>
        </LinkContainer>
        <h6 className="text-muted">&nbsp;{`> Privacy policy`}</h6>
      </div>
      <Row className="mt-3">
        <p className="h1">Privacy policy</p>
      </Row>
      {data && (
        <div className={styles.disclosureMain}>
          <Row>
            <p className="h5 mt-4">{data.privacyTitle}</p>
          </Row>

          <div style={{ paddingLeft: "25px", paddingTop: "30px" }}>
            <div>
              <p className={styles.disclosureData}>{data.privacyDescription}</p>
            </div>

            {/* <div>
                <p className="h5">
                  The personal data T2A collects and processes and how
                </p>
                <p
                  style={{
                    paddingLeft: "30px",
                    fontSize: "18px",
                    paddingTop: "5px",
                  }}
                >
                  Customer profile: we collect data when customers create or
                  update their T2A accounts. This may include their name, email,
                  phone number, login name and password, address, profile
                  picture, payment or banking information (including related
                  payment verification information). Customer details: we
                  collect data from customer which do not create a customer
                  profile or account. This may include their name, email, phone
                  number, address, pickup and drop-off locations, payment or
                  banking information (including related payment verification
                  information). Demographic data: we may collect demographic
                  data about customers, including through customer surveys. In
                  some countries, we may also receive demographic data about
                  customers from third parties. Customer content: we collect the
                  information customers submit when they contact T2A customer
                  support, provide ratings or reviews for other customers, or
                  otherwise contact T2A. This may include feedback, photographs
                  or other recordings collected by customers.
                </p>
              </div> */}
          </div>
        </div>
      )}
    </Container>
  );
};

export default PrivacyScreen;
