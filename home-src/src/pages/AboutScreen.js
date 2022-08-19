import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";

const AboutScreen = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios.get("/data").then((res) => {
      // console.log(res.data);
      setData(res.data[0]);
    });
  }, []);

  return (
    // <Container>
    //   <div style={{ padding: "80px 200px 100px 150px" }}>
    //     <div className="mt-5" style={{ display: "flex" }}>
    //       <LinkContainer role="button" to="/">
    //         <p>Home</p>
    //       </LinkContainer>
    //       <p>&nbsp;{`> About us`}</p>
    //     </div>
    //     <Row>
    //       <p className="h1">About Mosooklimo</p>
    //     </Row>

    //     <div style={{ padding: "0px 0px 0px 80px" }}>
    //       <Row>
    //         <h3 className="mt-4">Our journey ></h3>
    //       </Row>

    //       <div style={{ paddingLeft: "30px", paddingTop: "40px" }}>
    //         <div>
    //           <p className="h5">
    //             We work together with trusted transfer companies to offer your
    //             customers a trouble-free door-to-door experience.
    //           </p>
    //           <p
    //             style={{
    //               paddingLeft: "30px",
    //               fontSize: "18px",
    //               paddingTop: "5px",
    //             }}
    //           >
    //             At the Mosooklimo, we consider the security of our systems a top
    //             priority. But no matter how much effort we put into system
    //             security, there can still be vulnerabilities present. If you
    //             discover a vulnerability, we would like to know about it so we
    //             can take steps to address it as quickly as possible. We would
    //             like to ask you to help us better protect our clients and our
    //             systems. Please do the following: Submit your report, preferably
    //             through an encrypted email, to security@transferz.com, Do not
    //             take advantage of the vulnerability or problem you have
    //             discovered, for example by downloading more data than necessary
    //             to demonstrate the vulnerability or deleting or modifying other
    //             people’s data, Do not reveal the problem to others until it has
    //             been resolved, Do not use attacks on physical security, social
    //             engineering, distributed denial of service, spam or applications
    //             of third parties, and Do provide sufficient information to
    //             reproduce the problem, so we will be able to resolve it as
    //             quickly as possible. Usually, the IP address or the URL of the
    //             affected system and a description of the vulnerability will be
    //             sufficient, but complex vulnerabilities may require further
    //             explanation. What we promise: We will respond to your report
    //             within 10 business days with our evaluation of the report and an
    //             expected resolution date, If you have followed the instructions
    //             above, we will not take any legal action against you in regard
    //             to the report, We will handle your report with strict
    //             confidentiality, and not pass on your personal details to third
    //             parties without your permission, We will keep you informed of
    //             the progress towards resolving the problem, In the public
    //             information concerning the problem reported, we will give your
    //             name as the discoverer of the problem (unless you desire
    //             otherwise), and We strive to resolve all problems as quickly as
    //             possible, and we would like to play an active role in the
    //             ultimate publication on the problem after it is resolved. Please
    //             note: at the moment we no longer offer monetary rewards for
    //             reporting security vulnerabilities. This text is written by
    //             Floor Terra and is published with a Creative Commons Attribution
    //             3.0 Unported license.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Container>

    <>
      {" "}
      {data && (
        <div>
          <div className="aboutbanner" id="containq">
            <h2>About Mosooklimo</h2>
          </div>
          <header className="bg-light">
            <div className="container">
              <div className="row gx-5 align-items-center justify-content-center">
                <div className="col-lg-8 col-xl-7 col-xxl-6">
                  <div className="my-5 text-center text-xl-start">
                    <h1
                      className="display-5 fw-bolder mb-2"
                      style={{ color: "#d8b65d" }}
                    >
                      {data.aboutTitle}{" "}
                    </h1>{" "}
                    <p
                      className="lead fw-normal text-muted-50 mb-4"
                      style={{ fontSize: "18px", textAlign: "justify" }}
                    >
                      {" "}
                      {data.aboutSub1}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                  <img
                    className="img-fluid rounded-3 my-5"
                    src="./carousel/bugati.jpeg"
                    alt="mosooklimo car"
                  />
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </header>{" "}
          <div className="py-5 bg-light">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                <img
                    className="img-fluid rounded-3 my-5"
                    src="./carousel/mangment.jpg"
                    alt="mosooklimo car"
                  />
                </div>{" "}
                <div className="col-lg-6">
                  <div className="text-cent">    
                  <p  style={{ fontSize: "18px", textAlign: "justify" }}>{data.aboutSub2}</p>
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </>
  );
};

export default AboutScreen;
