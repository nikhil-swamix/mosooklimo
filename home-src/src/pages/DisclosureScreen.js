import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../assets/css/Static.module.css";

const DisclosureScreen = () => {
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
        <h6 className="text-muted">&nbsp;{`> Responsible disclosure`}</h6>
      </div>
      <Row>
        <p className="h1">Responsible disclosure</p>
      </Row>
      {data && (
        <div className={styles.disclosureMain}>
          <Row>
            <p className="h5 mt-4">{data.disclosureTitle}</p>
          </Row>

          <div>
            <div>
              <p className={styles.disclosureData} >
                {data.disclosureDescription}
              </p>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default DisclosureScreen;
