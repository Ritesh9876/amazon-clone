import React, { useState, useEffect } from 'react';
import './payment.css';
import CheckoutProduct from '../CheckoutProduct';
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from '../reducer';
import axios from "../Api/axios.js"
import { db } from '../Firebase/firebase';
import { useStateValue } from '../StateProvider';
import { getDoc, doc, addDoc, collection, query, where, getDocs, setDoc } from 'firebase/firestore';

function PaymentPage() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        if (getBasketTotal(basket) * 100 === 0) return
        const getClientSecret = async () => {
            try {
                const response = await axios({
                    method: 'post',
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`
                });
                setClientSecret(response.data.clientSecret)
            } catch (err) {
                console.log("err ", err)
            }
        }
        getClientSecret();
    }, [basket])

    // console.log('THE SECRET IS >>>', clientSecret)
    // console.log('👱', user)

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (getBasketTotal(basket) * 100 === 0) return
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            },

        }).then(async (paymentIntent) => {
            const paymentIntentId = paymentIntent.id;
            db.collection("orders")
                .add({
                    basket: basket,
                    amount: paymentIntent.paymentIntent.amount ? paymentIntent.paymentIntent.amount : 0 ,
                    created: paymentIntent.paymentIntent.created

                })
                .then((docRef) => {
                    console.log("New order added with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding order: ", error);
                });
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history('/orders')
        })

    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>


                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic will go */}

                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className='payment__priceContainer'>
                                {/* <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    /> */}
                                ${getBasketTotal(basket).toFixed(2)}

                                <button
                                // disabled={processing || disabled || succeeded}
                                >
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage