import axios from "axios";
import React, { useState, useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import styles from "../../assets/css/Static.module.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactFlagsSelect from "react-flags-select";

import UserContext from "../../auth/context";

const UserDetails = ({ onPageChange, setIsSuccess }) => {
  const userContext = useContext(UserContext);
  const [isBookingForSomeone, setIsBookingForSomeone] = useState(false);
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [flightNo, setFlightNo] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("US");
  const [remarks, setRemarks] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAccept, setIsAccept] = useState(false);

  const handleBookingToggle = () => {
    setIsBookingForSomeone(!isBookingForSomeone);
    setPassengerName("");
    setPassengerEmail("");

    setPassengerPhone("");
  };

  let handleSubmit = async (e) => {
    setIsSubmitting(true);
    let temp = userContext.body;

    let temp2 = {
      isBookingForSomeone,
      passengerName,
      passengerPhone,
      passengerEmail,
      email,
      name,
      phone,
      flightNo,
      countryOfResidence,
      remarks,
      ...temp,
    };

    if (email && name && phone && countryOfResidence) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        axios.post("/orders", temp2, config).then((response) => {
          if (response.status === 201) {
            // alert("Form successfully Submitted");
            onPageChange(3);
            setIsSuccess(true);
            userContext.setUserId(response.data._id);
          } else {
            alert("Server Error");
          }
        });
      } catch (error) {}
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: "90px" }}>
      <Form>
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="I'm booking for someone else"
            onClick={handleBookingToggle}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="">
          <Form.Label>Enter your email address :</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="">
            <Form.Label>Name :</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          {/* <Form.Group as={Col} controlId="">
          <Form.Label>Country Code :</Form.Label>
          <Form.Select defaultValue="Select...">
            <option>Select...</option>
            <option>01</option>
            <option>02</option>
          </Form.Select>
        </Form.Group> */}

          <Form.Group as={Col} controlId="">
            <Form.Label>Phone number :</Form.Label>
            {/* <Form.Control
              type="number"
              onChange={(e) => setPhone(e.target.value)}
              required
            /> */}
            <PhoneInput country={"us"} onChange={(phone) => setPhone(phone)} />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Flight no :</Form.Label>
            <Form.Control
              onChange={(e) => setFlightNo(e.target.value)}
              type="text"
            />
          </Form.Group>
        </Row>


        <Form.Group as={Col} controlId="">
          <Form.Label>Country of residence :</Form.Label>
          {/* <Form.Select
            defaultValue="Select..."
            onChange={(e) => setCountryOfResidence(e.target.value)}
            required
          >
            <option>Select...</option>
            <option value="india">INDIA</option>
            <option value="united arab emirates">UNITED ARAB EMIRATES</option>
          </Form.Select> */}
          <ReactFlagsSelect
            selected={countryOfResidence}
            showSelectedLabel={true}
            onSelect={(code) => {
              setCountryOfResidence(code);
            }}
          />
        </Form.Group>

        {isBookingForSomeone && (
          <>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Enter Passenger's email address :</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setPassengerEmail(e.target.value)}
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setPassengerName(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="">
                <Form.Label>Phone number :</Form.Label>
                {/* <Form.Control
                  type="number"
                  onChange={(e) => setPassengerPhone(e.target.value)}
                /> */}
                <PhoneInput
                  country={"us"}
                  onChange={(phone) => setPassengerPhone(phone)}
                />
              </Form.Group>
            </Row>{" "}
          </>
        )}

        <div className="form-group">
          <label for="exampleFormControlTextarea1">Comments or remarks :</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
        </div>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            type="checkbox"
            label="Accept the Terms And Conditions and the Privacy Policy"
            onChange={() => setIsAccept(!isAccept)}
          />
        </Form.Group>

        {isAccept && (
          <Button
            className={`${styles.button} btn-warning`}
            style={{
              paddingInline: "60px",
              marginTop: "25px",
              width: "100%",
              color: "white",
              fontWeight: "500",
              letterSpacing: "0.05em",
            }}
            variant="warning"
            size="lg"
            disabled={isSubmitting}
            onClick={(e) => {
              // onRouChange("3");
              handleSubmit(e);
            }}
          >
            BOOK NOW
          </Button>
        )}
      </Form>
    </div>
  );
};

export default UserDetails;
