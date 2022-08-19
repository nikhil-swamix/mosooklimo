import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";
import UserContext from "../../auth/context";

const Payment = (props) => {
  const userContext = useContext(UserContext);
  const [sdkReady, setSdkReady] = useState(false);

  const navigate = useNavigate();

  const successPaymentHandler = (paymentResult) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .put(
          props.rental
            ? `/rental/pay/${props.userId}`
            : `/orders/pay/${props.userId}`,
          paymentResult,
          config
        )
        .then((response) => {
          if (response.data.paymentResult.status === "COMPLETED") {
            alert("Payment Successfull");
            navigate("/");
          } else {
            alert("Server Error");
          }
          // console.log(response);
        });
    } catch (error) {
      alert("Payment Failed");
    }
  };

  useEffect(() => {
    const addPayPalScript = async () => {

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=ARQnt-xQbCm3XN2mqCa4HbNgAX4QkWVSwegXdIsPjrKHUW9UokinQdMOsl6XOn_xfe5fzyeIvBOU2_sz`;
      script.async = true;

      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // addPayPalScript();
  });
  return (
    <div style={{ marginTop: "20px", marginBottom: "80px" }}>
      <PayPalButton
        amount={props.price}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={successPaymentHandler}
      />
    </div>
  );
};

export default Payment;
