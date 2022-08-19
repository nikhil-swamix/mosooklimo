import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import styles from "../assets/css/Body.module.css";

import { LinkContainer } from "react-router-bootstrap";

let usa = [];
let ids =[];
const AirportScreen = (i) => {
  const [airport, setAirport] = useState();
  const settingData = (data) => {
    let resultBro = [];
    var countriesSet = new Set();
    data.map((arg) => { countriesSet.add(arg.country) })

    for (let c of countriesSet) {
      let t1 = { country: c, airports: [], ids }
      t1.airports = data.filter((arg) => { return arg.country == c }).map((arg) => { return arg.name })
      t1.ids = data.filter((arg) => { return arg.country == c }).map((arg) => { return arg._id })
      resultBro.push(t1)
    }
    let resptemplate = [{ "country": "XX", airports: ['a', 'b', 'c'], ids: ['i1', 'i2', 'i2'] }];
    usa = resultBro[0].airports;

    return resultBro;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get("/airports").then((res) => {
      // setAirport(res.data);
      setAirport(settingData(res.data));
      // console.log(settingData(res.data));
    });
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <div className="mt-5" style={{ display: "flex" }}>
        <LinkContainer role="button" to="/">
          <h6>Home</h6>
        </LinkContainer>
        <h6 className="text-muted">&nbsp;{`> Airport`}</h6>
      </div>
      <Row>
        <p className="h2 mt-3">Find taxi transfers for airports worldwide</p>
      </Row>
   
      <div className={styles.archive__content} key={i}>
   {airport?.map((v, i) => {
            return (
              <div key={i}>
                <p className="h4">{v.country}</p>
                {v.airports.map((x, j) => {
                  return (
             
                      <LinkContainer role="button" to={`/airports/${v.ids[j]}`}>
                       <ul>
                       <li className="text-muted h6" key={j} style={{fontSize:"1rem"}}>
                          {x} 
                        </li>
                       </ul>
                      </LinkContainer>
               
                  );
                })}
              </div>
            );
          })}
          </div>

{/* 
      <div className={styles.archive__content}>
        <div class="airport-archive__country">
          <h6>USA</h6>


          {usa.map((r,s)=>{
                return(
                  <LinkContainer role="button" to={`/airports/${ids[s]}`}>
                  <li className="text-muted h6" key={s} style={{fontSize:"0.5rem"}}>
                  <li>{r}</li>
                <li>{s}</li>
                  </li>
                </LinkContainer>
                )
                })}
     
        </div>
      </div> */}

    </div>
  );
};

export default AirportScreen;
