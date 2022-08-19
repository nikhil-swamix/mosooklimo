import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import img from "../../images/logo.png";
import img2 from "../../images/mos.png";

import { LinkContainer } from "react-router-bootstrap";

import ReactFlagsSelect from "react-flags-select";
import GoogleTranslate from "../../pages/GoogleTranslate";
import styles from "../../assets/css/Static.module.css";

const Navigationbar = () => {
  const [selected, setSelected] = useState("US");
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  return (
    <>
      <Navbar expand="lg" variant="light" bg="light" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="http://mosook.com/mosook/wp-content/uploads/2022/01/NEW-e1641190205381.png"
              width="90"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <div>Service Provided by <br/> Mosook Limo</div>
          <Navbar.Toggle />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav style={{ fontWeight: "500" }}>
              <LinkContainer to="/" id="linkhover">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>

              <LinkContainer
                to="/about.php"
                className={styles.aboutPad}
                id="linkhover"
              >
                <Nav.Link>About us</Nav.Link>
              </LinkContainer>

              <LinkContainer
                to="/customer-service.php"
                id="linkhover"
                style={{ marginRight: "45px" }}
              >
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>

              <LinkContainer
                id="linkhover"
                className={`${styles.showTrackOrderNav}`}
                to="/trackorder.php"
                style={{ marginRight: "45px" }}
              >
                <Nav.Link>Track my Order</Nav.Link>
              </LinkContainer>
            </Nav>

            {/* <LinkContainer
              className={`${styles.showTrackOrderNav} ${styles.trackPad}`}
              to="/trackorder.php"
            >
              <h6 className={`text-warning font-weight-bold`} role="button">
                Track my Order
              </h6>
            </LinkContainer> */}
            <GoogleTranslate />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;
