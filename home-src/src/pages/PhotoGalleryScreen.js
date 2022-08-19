import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../assets/css/Gallery.module.css";

const PhotoGalleryScreen = () => {
  const [airport, setAirport] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get("/airports").then((res) => {
      setAirport(res.data);
      setLoading(true);
    });
  }, []);

  var onlyPopular;
  if (loading) {
    onlyPopular = airport.filter(function (v) {
      return v.isPopular !== false;
    });
    // console.log(onlyPopular);
  }

  // let positive_array = numbers.filter(function (value) {
  //   return value >= 0;
  // });

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className="row" style={{ paddingInline: "10px" }}>
          <div className="text-center pt-5 pb-5">
            <p className="h6" style={{ color: "#000", fontSize:"1.5rem", fontWeight:"600" }}>
              Where Is Your Next Location?
            </p>
          </div>
          {onlyPopular &&
            onlyPopular.map((v, i) => {
              return (
                <div
                  key={i}
                  role="button"
                  className="col-lg-4 mb-3 container2 img-trns"
                >
                  <img
                    src={`./airports/air${i}.webp`}
                    alt="airports"
                    className="fluid" style={{width:"100%"}}
                  />
                  <div className={styles.centered}>
                    <LinkContainer role="button" to={`/airports/${v._id}`}>
                      <div>
                        <h3 className={styles.header}>A transfer from/to</h3>
                        <h2 className={styles.subheader}>{v.name}</h2>
                      </div>
                    </LinkContainer>
                  </div>
                </div>
              );
            })}
          <div className="d-flex justify-content-center">
            <LinkContainer role="button" to={`/airports.php`}>
              <Button className="px-4 py-3 mt-4" variant="outline-warning">
                View all airports
              </Button>
            </LinkContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGalleryScreen;
