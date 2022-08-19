import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../../assets/css/CarGallery.module.css";

import { CarList } from "../../Data/CarList";

const CarGallery = () => {
    const [airport, setAirport] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("/airports").then((res) => {
            setAirport(res.data);
            setLoading(true);
        });
    }, []);

    var onlyPopular;
    if (loading) {
        onlyPopular = airport.filter(function(v) {
            return v.isPopular != false;
        });
        // console.log(onlyPopular);
    }

    // let positive_array = numbers.filter(function (value) {
    //   return value >= 0;
    // });

    return ( <
        div className = { styles.wrapper } >
        <
        div className = "container"
        id = "padd" >
        <
        div className = "row px-0 "
        style = {
            { paddingInline: "10px" }
        } >
        <
        div className = "text-center py-lg-5 px-2" >
        <
        h3 className = "h3"
        style = {
            { color: "#d8b65d" }
        } >
        OUR FLEET { " " } <
        /h3>{" "} <
        p className = "text-justify mx-auto col-lg-6 px-1"
        id = "para"
        style = {
            { color: "#fff" }
        } >
        Mosook Limo adheres to the highest standards of vehicles quality,
        with exceptional service and amenities you would expect from a five - star hotel. { " " } <
        /p>{" "} < /
        div > { " " } {
            CarList &&
                CarList.map((v, i) => {
                    return ( <
                        div key = { i }
                        className = { `${styles.containerWrap} col-6 col-md-4 mb-0 mb-lg-0 container2 pad` } >
                        <
                        img src = { v.imageUrl }
                        alt = "cars"
                        className = "fluid img-thumbnail" /
                        >
                        <
                        div className = { styles.centered } > { " " } { /* <LinkContainer role="button" to={`/airports/${v._id}`}> */ } { " " } <
                        div >
                        <
                        h3 className = { styles.header } > { v.name } < /h3>{" "} <
                        h2 className = { styles.subheader } > { v.model } < /h2>{" "} < /
                        div > { " " } { /* </LinkContainer> */ } { " " } <
                        /div>{" "} < /
                        div >
                    );
                })
        } { " " } <
        /div>{" "} < /
        div > { " " } <
        /div>
    );
};

export default CarGallery;