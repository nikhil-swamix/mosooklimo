import { useState, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "../../assets/css/Home2.module.css";

import UserContext from "../../auth/context";
import {
  ListGroup,
  Button,
  Figure,
  Stack,
  Form,
  Container,
  Row,
  Col,
  Collapse,
} from "react-bootstrap";

const CarCard = ({ onPageChange, item, distance }) => {
  distance = parseInt(distance.replace(/,/g, ""));
  console.log("Items", item);

  const userContext = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const [total, setTotal] = useState();

  const [meetGreet, setMeetGreet] = useState(false);
  const [noOfBabySeat, setNoOfBabySeat] = useState(0);
  const [noOfBoosterSeat, setNoOfBoosterSeat] = useState(0);
  const [noOfSpecialLuggage, setnoOfSpecialLuggage] = useState(0);
  const [noOfPets, setNoOfPets] = useState(0);
  const [noOfExtraStop, setNoOfExtraStop] = useState(0);

  const handleSubmit = () => {
    // console.log({
    //   noOfBabySeat,
    //   noOfBoosterSeat,
    //   noOfSpecialLuggage,
    //   noOfPets,
    //   noOfExtraStop,
    // });

    let total =
      (noOfBabySeat ? noOfBabySeat * item.babySeat : 0) +
      (noOfBoosterSeat ? noOfBoosterSeat * item.boosterSeat : 0) +
      (noOfSpecialLuggage ? noOfSpecialLuggage * item.specialLuggage : 0) +
      (noOfPets ? noOfPets * item.pets : 0) +
      (noOfExtraStop ? noOfExtraStop * item.extraStop : 0) +
      item.priceperkm * distance;

    // console.log(distance);

    let temp = userContext.body;

    if (userContext.body.isRoundTrip) {
      let temp2 = {
        ...temp,
        distance,
        price: `${Math.round(2 * total)}`,
        vehicleClass: `${item.brand} - ${item.model} - ${item.type}`,
        meetGreet,
        noOfBabySeat,
        noOfBoosterSeat,
        noOfSpecialLuggage,
        noOfPets,
        noOfExtraStop,
      };

      userContext.setBody(temp2);
    } else {
      let temp2 = {
        ...temp,
        distance,
        price: `${Math.round(total)}`,
        vehicleClass: `${item.brand} - ${item.model} - ${item.type}`,
        meetGreet,
        noOfBabySeat,
        noOfBoosterSeat,
        noOfSpecialLuggage,
        noOfPets,
        noOfExtraStop,
      };

      userContext.setBody(temp2);
    }

    if (item.model && item.priceperkm) {
      onPageChange(2);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={4} >
          <img className='img-fluid car-img' src={item.carImage} />
        </Col>
        <Col size={6}>
          <>
            <div className="column2">
              <h4>{`${item.brand} - ${item.model} - ${item.type}`}</h4>
              <div style={{ display: "flex" }}>
                <PeopleCardIcon />
                <h5 style={{ marginInline: "10px" }}>{item.seatingCapacity}</h5>
                <SuitcaseIcon />
                <h5 style={{ marginInline: "10px" }}>{item.luggageCapacity}</h5>
              </div>
              <div>INCLUDES:</div>
              <Stack direction="horizontal" gap={3}>
                <FaCheckCircle size={25} />
                <p>Free cancelation Before 24Hrs</p>
              </Stack>
              <Stack direction="horizontal" gap={3}>
                <FaCheckCircle size={18} />
                <p>Taxes & Fees included</p>
              </Stack>
              <Stack direction="horizontal" gap={3}>
                {/* <CheckboxIcon /> */}
                <FaCheckCircle size={18} />
                <p>60 min. Free Waiting Time</p>
              </Stack>
              <>
                <Collapse in={open}>
                  <ListGroup id="example-collapse-text">
                    <ListGroup.Item>
                      <Form.Check
                        type="checkbox"
                        label={`Meet greet - Free`}
                        onChange={() => setMeetGreet(!meetGreet)}
                      />
                    </ListGroup.Item>
                    {item.babySeat && (
                      <ListGroup.Item>
                        <Form.Check
                          type="checkbox"
                          label={`Baby Seat  +$${item.babySeat}/seat`}
                          onChange={() => setNoOfBabySeat(1)}
                        />
                      </ListGroup.Item>
                    )}
                    {item.boosterSeat && (
                      <ListGroup.Item>
                        <Form.Check
                          type="checkbox"
                          label={`Booster seat  +$${item.boosterSeat}/seat`}
                          onChange={() => setNoOfBoosterSeat(1)}
                        />
                      </ListGroup.Item>
                    )}

                    {item.pets && (
                      <ListGroup.Item>
                        <Form.Check
                          type="checkbox"
                          label={`Pets  +$${item.pets}`}
                          onChange={() => setNoOfPets(1)}
                        />
                      </ListGroup.Item>
                    )}
                    {item.extraStop && (
                      <ListGroup.Item>
                        <Form.Check
                          type="checkbox"
                          label={`Extra stop  +$${item.extraStop}`}
                          onChange={() => setNoOfExtraStop(1)}
                        />
                      </ListGroup.Item>
                    )}
                    {item.specialLuggage && (
                      <ListGroup.Item>
                        <Form.Check
                          type="checkbox"
                          label={`Special luggage  +$${item.specialLuggage}`}
                          onChange={() => setnoOfSpecialLuggage(1)}
                        />
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Collapse>
                {/*<hr style={{ margin: "20px -160px" }} />*/}
              </>
            </div>
            <div className="mt-2 mt-lg-2">
              <b>
                <span style={{ textDecoration: "line-through", color: "red" }} className="cross-over-text">
                  ${userContext.body.isRoundTrip ? Math.round(2 * item.priceperkm * distance * 1.11) : Math.round(item.priceperkm * distance * 1.11)}
                </span> 
                {" "}
                > <span className={'text-success'}>Discount 10%</span> >
                {" "}
                ${userContext.body.isRoundTrip ? Math.round(2 * item.priceperkm * distance) : Math.round(item.priceperkm * distance)}
                {" "}
              </b>
              <br/>
              <Button variant="success"  onClick={() => {handleSubmit(); }} > 
                Select Car
              </Button>
              <Button variant="secondary" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} className="mx-2">
                Show Addons
              </Button>
            </div>
          </>
        </Col>

      </Row>
      <hr/>
    </Container>
  );
};

export default CarCard;

let PeopleCardIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="23"
      fill="currentColor"
      className="bi bi-people-fill"
      viewBox="0 0 16 16"
    >
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path
        fillRule="evenodd"
        d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
      />
      <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    </svg>
  );
};

let SuitcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="23"
    fill="currentColor"
    className="bi bi-briefcase"
    viewBox="0 0 16 16"
  >
    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z" />
  </svg>
);
