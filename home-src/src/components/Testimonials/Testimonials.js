import React from "react";
import "../../index.css";

const avatarImg = {
  marginBottom: "-25px",
  maxWidth: "80px",
};
const avatar = {
  zIndex: 10,
  // marginBottom:'-25px',
  border: "none",
  overflow: "visible",
};

const Testimonials = () => {
  return (
    <section class="px">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-xl-8 text-center">
          <h3 className="mb-4" style={{ color: "#d8b65d" }}>
            WHAT OUR CLIENTS SAY ABOUT US{" "}
          </h3>{" "}
        </div>{" "}
      </div>{" "}
      <div className="row text-center d-flex align-items-stretch">
        <div className="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
          <div className="card testimonial-card">
            <div
              className="card-up"
              style={{ backgroundColor: "#d8b65d" }}
            ></div>{" "}
            <div className="avatar mx-auto" style={avatar}>
              <img
                style={avatarImg}
                alt="People 1"
                src="./testes/t1-80x80-1.jpg"
                className="rounded-circle img-fluid"
              />
            </div>{" "}
            <div className="card-body text-justify">
              <h4 className="my-4"> Afeef </h4> <hr />
              <p className="m-1">
                We like to use Mosook Limo because we feel happy to get an
                excellent price!My wife and I have hired Mosook Limo Cars
                several times in the past and will continue to do so in the
                future too.The hiring process is so simple and user friendly.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
          <div className="card testimonial-card">
            <div
              className="card-up"
              style={{ backgroundColor: "#d8b65d" }}
            ></div>{" "}
            <div className="avatar mx-auto" style={avatar}>
              <img
                style={avatarImg}
                alt="People 1"
                src="./testes/t3-80x80-1.jpg"
                className="rounded-circle img-fluid"
              />
            </div>{" "}
            <div className="card-body text-justify">
              <h4 className="my-4"> Habiba </h4> <hr />
              <p className="m-1">
                I rented a car with driver from Mosook Limo as I wanted to go
                Damman from Riyadh.The entire rental experience has by far
                exceeded my expectations!I can’ t say enough about how easy it
                was to reserve the car.It was well mannered and disciplined on
                the entire journey.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="col-md-4 mb-0 d-flex align-items-stretch">
          <div className="card testimonial-card">
            <div
              className="card-up"
              style={{ backgroundColor: "#d8b65d" }}
            ></div>{" "}
            <div className="avatar mx-auto" style={avatar}>
              <img
                style={avatarImg}
                alt="People 1"
                src="./testes/t2-80x80-1.jpg"
                className="rounded-circle img-fluid"
              />
            </div>{" "}
            <div className="card-body text-justify">
              <h4 className="my-4"> Office Event </h4> <hr />
              <p className="m-1">
                Our Employees were very happy because the transport was done
                using luxury cars.other Company members were admiring at the
                limousines which were booked from your website.looking forward
                to work with Mosooklimo for our next business events.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};

export default Testimonials;
