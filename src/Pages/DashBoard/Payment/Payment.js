import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://server-bike.vercel.app/findorder/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.data[0]);
      });
  }, [id]);

  return (
    <div>
      <h3 className="text-3xl">Payment for {order?.product_Name}</h3>
      <p className="text-xl">
        Please pay <strong>$ {order?.resalePrice}</strong> for your Location{" "}
        <strong>{order?.location}</strong>{" "}
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={order} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
