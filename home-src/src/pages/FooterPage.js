import React from "react";
import Footer from "../components/footer";
import logo from "../images/logo.png";
import GalleryView from "../components/Gallery/GalleryView";
import { LinkContainer } from "react-router-bootstrap";
import { ImgDiv } from "../components/footer/styles/footer";
import styles from "../assets/css/Static.module.css";

const FooterPage = () => {
  return (
    <div>
      <Footer style={{background:"#000"}}>
        <Footer.Wrapper>
          <Footer.Row>
            <Footer.Column>
              <ImgDiv src={logo} alt="logo" />
              {/* <img src={logo} alt="Logo" /> */}
            </Footer.Column>
            <Footer.Column>
              <LinkContainer
                className={styles.showTrackOrderFoot}
                to="/trackorder.php"
              >
                <Footer.Link>Track my Order</Footer.Link>
              </LinkContainer>
              {/* <Footer.Title>About Us</Footer.Title> */}
              <LinkContainer to="/about.php">
                <Footer.Link>About us</Footer.Link>
              </LinkContainer>
              <LinkContainer to="/airports.php">
                <Footer.Link>Airports</Footer.Link>
              </LinkContainer>
            </Footer.Column>
            <Footer.Column>
              {/* <Footer.Title>Services</Footer.Title> */}
              <LinkContainer to="/customer-service.php">
                <Footer.Link>Customer Service</Footer.Link>
              </LinkContainer>
              <LinkContainer to="/partner.php">
                <Footer.Link>Become a partner</Footer.Link>
              </LinkContainer>
              <Footer.Link href="/driver/sign-in.html">
                Login as partner
              </Footer.Link>
            </Footer.Column>
            <Footer.Column>
              {/* <Footer.Title>Contact Us</Footer.Title> */}
              <LinkContainer to="/terms.php">
                <Footer.Link>Terms and Conditions</Footer.Link>
              </LinkContainer>
              <LinkContainer to="/policy.php">
                <Footer.Link>Privacy policy</Footer.Link>
              </LinkContainer>
              <LinkContainer to="/disclosure.php">
                <Footer.Link>Responsible disclosure</Footer.Link>
              </LinkContainer>
            </Footer.Column>
          </Footer.Row>
          {/* <Footer.Row> */}
          <p className="text-white d-flex justify-content-center mb-0 mt-5 pb-0">
            Copyright © 2022 |
            <a
              href="https://techbinge.org/"
              target="_blank"
              className="text-decoration-none text-white mx-1"
            >
              Techbinge
            </a>
          </p>
          {/* </Footer.Row> */}
        </Footer.Wrapper>
      </Footer>
    </div>
  );
};

export default FooterPage;
