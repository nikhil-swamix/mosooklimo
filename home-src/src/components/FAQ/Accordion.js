import React, { useState } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { FiPlus, FiMinus } from "react-icons/fi";
import styles from "../../assets/css/Static.module.css";

import "../../index.css";

const AccordionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  position: relative;
  height: "auto";
  background: transparent;
`;

// const Container = styled.div`
//   /* position: absolute; */
//   top: 30%;
//   /* box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3); */
// `;

const Wrap = styled.div`
  background: #d8b65d;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
  margin-bottom: 10px;

  border: 1px solid #d8b65d;
  cursor: pointer;
  border-radius: 5px;
  h1 {
    padding: 2rem;
  }

  span {
    margin-right: 1.5rem;
  }
`;

const Dropdown = styled.div`
  background: #fff;
  color: #474747;
  width: 100%;
  min-height: 60px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  /* border: 1px solid black; */
  border-left: 1px solid #878787;
  border-right: 1px solid #878787;
  border-bottom: 1px solid #878787;
  border-radius: 5px;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 10px;
  margin-top: -10px;
`;

const Accordion = ({ isHome, data }) => {
  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  return (

    <section id="faq2">
        <div className="fluid-container mb-5">
      <IconContext.Provider value={{ color: "#000", size: "25px" }}>
        
        {isHome && (
          <div className="mt-4 contactFaq">
            <p className="h5" style={{ color: "#fff" }}>
              24 / 7 AVAILABLE
            </p>
            <p
              className="h2"
              style={{ color: "#d8b65d", marginBottom: "40px" }}
            >
              
              Customer Service
            </p>
            <p className="h4" style={{ marginBottom: "20px",color: "#fff" }}>
              
              Popular Questions
            </p>
          </div>
        )}
        <AccordionSection className="contactFaq">
          
          {/* <Container> */}
          {data &&
            data.map((item, index) => {
              return (
                <>
                  <Wrap onClick={() => toggle(index)} key={index}>
                    <h1 className={styles.accordionFont}> {item.question} </h1>
                    <span>
                      
                      {clicked === index ? <FiMinus /> : <FiPlus />}
                    </span>
                  </Wrap>
                  {clicked === index ? (
                    <Dropdown>
                      <p className={styles.accordionFont}> {item.answer} </p>
                    </Dropdown>
                  ) : null}
                </>
              );
            })}
          {/* </Container> */}
        </AccordionSection>
      </IconContext.Provider>
    </div>
    </section>
  
  );
};

export default Accordion;
