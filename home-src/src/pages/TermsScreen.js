import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../assets/css/Static.module.css";

const TermsScreen = () => {
  const [buttonClick, setButtonClick] = useState(true);
  const [data, setData] = useState();
  useEffect(() => {
    axios.get("/data").then((res) => {
      setData(res.data[0]);
      // console.log(res.data);
    });
  }, []);
  
  useEffect(() => {window.scrollTo(0, 0); }, []);
  return (
    <Container className={styles.disclosureWrapper}>
      <div className="mt-5" style={{ display: "flex" }}>
        <LinkContainer role="button" to="/">
          <h6>Home</h6>
        </LinkContainer>
        <h6 className="text-muted">&nbsp;{`> Terms and Conditions`}</h6>
      </div>
      <Row>
        <p className="h1">Terms and Conditions</p>
      </Row>
      <div className={styles.disclosureData}>
        <Row>
          <p className="h5">
            Please Read These User Terms Carefully Before Accessing Or Using Our Services
          </p>
        </Row>
        <Row className="mt-4">
          <div style={{ display: "flex" }}>
            <Button
              className={styles.button}
              variant={buttonClick ? "primary" : "outline-primary"}
              size="lg"
              onClick={() => setButtonClick(true)}
            >
              Traveller
            </Button>
            <Button
              className={styles.button}
              variant={buttonClick ? "outline-primary" : "primary"}
              size="lg"
              onClick={() => setButtonClick(false)}
            >
              Transportation
            </Button>
          </div>
        </Row>
        {data && (
          <div className={styles.termsData}>
            <div>
              <p className="h5">{data.termsTitle}</p>
              {buttonClick && (
                <p 
                  style={{paddingLeft: "25px", fontSize: "18px", paddingTop: "5px", }}
                  dangerouslySetInnerHTML={{ __html: data.termsDescriptionTraveller }}> 
                </p>
              )}

              {!buttonClick && (
                <p 
                  style={{paddingLeft: "25px", fontSize: "18px", paddingTop: "5px", }} 
                  dangerouslySetInnerHTML={{ __html:data.termsDescriptionTransportation}}> 
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default TermsScreen;
