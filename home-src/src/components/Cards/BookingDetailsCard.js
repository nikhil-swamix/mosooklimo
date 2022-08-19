import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "../../assets/css/Home2.module.css";

import img from "../../images/map.jpg";

import MapScreen from "../../pages/MapScreen";

const BookingDetailsCard = (props) =>{
    return ( 
        <div className = { styles.cardWrapper }>

        <div className = { styles.card }>
            {props.isMap && (<div className = "mb-4" > <MapScreen origin = { props.subtitle1 } destination = { props.subtitle2 } /> </div> )}
        <div className = { styles.cardbody } >

        <div >

        <h5 >
        { props.title1 } 
        </h5>

        <p>
        {props.subtitle1} 
        </p >

        <hr / >

        </div>

        <div >

        <h5 >
        { props.title2 } 
        </h5>

        <p>
        {props.subtitle2} 
        </p >
        {props.subtitle21 && 
            <p >
            { props.subtitle21 } 
            </p>
        } 
        <hr / >

        </div>

        <div >

        <h5 >
        { props.title3 } 
        </h5>

        <p>
        {props.subtitle31} 
        </p >

        <p >
        { props.subtitle32 } 
        </p>

        <p>
        {props.subtitle33} 
        </p >

        <hr / >

        </div>
        {props.title4 && ( 
            <div >

            <h5 >
            { props.title4 } 
            </h5>

            <p>
            {props.subtitle4} 
            </p >

            <hr / >

            </div>
            ) } {props.title5 && ( 
                <div >

                <h5 >
                { props.title5 } 
                </h5>

                <p>
                {props.subtitle5} 
                </p >

                <hr / >

                </div>
                ) } {props.title6 && ( 
                    <div >

                    <h5 >
                    { props.title6 } 
                    </h5>
                    {props.subtitle6 && 
                        <p >
                        { props.subtitle6 } 
                        </p>
                    } 
                    <hr / >

                    </div>
                    ) } {} {props.author && ( 
                        <div >

                        <h5 >
                        { props.author } 
                        </h5>

                        </div>
                        ) } 
                    </div>

                    </div>

                    </div>
                    ); }; export default BookingDetailsCard;