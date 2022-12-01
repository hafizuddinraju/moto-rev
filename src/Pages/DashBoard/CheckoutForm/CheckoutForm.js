import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();
    const { resalePrice, email,product_id, product_Name, _id } = booking;
    
        useEffect(() => {
            // Create PaymentIntent as soon as the page loads
            fetch("https://server-bike.vercel.app/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${localStorage.getItem('moto-token')}`
                },
                body: JSON.stringify({ resalePrice }),
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data.clientSecret)
                    setClientSecret(data.clientSecret)
                });
        }, [resalePrice]);

    

    //payment submit

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: product_Name,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            console.log('card info', card);
            // store payment info in the database
            const payment = {
                resalePrice,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }
            fetch('https://server-bike.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('moto-token')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {

                        fetch(`https://server-bike.vercel.app/unsold/${product_id}`,{
                            method: 'PATCH',
                            headers: {
                                'content-type': 'application/json',
                                authorization: `bearer ${localStorage.getItem('moto-token')}`
                            }

                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                        })
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                        swal('Congrats! your payment completed',`your TransactionId:${paymentIntent.id}`,"success");
                        navigate('/dashboard')

                    }
                })
        }
        setProcessing(false);


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm mt-4 bg-sky-500 border-none'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;