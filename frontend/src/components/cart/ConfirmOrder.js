import { Typography } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from './../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import './ConfirmOrder.css';




const ConfirmOrder = ({history}) => {
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);


    const subtotal = cartItems.reduce((acc, item) =>
        acc + item.quantity * item.price, 0);

        const shippingCharges = subtotal >25000 ? 0 :79;

        const tax = subtotal*0.25;
        const totalPrice = subtotal+shippingCharges+tax;

        const address = `${shippingInfo.address}, ${shippingInfo.city},
        ${shippingInfo.pinCode},${shippingInfo.country}`;

        const proceedToPayment =()=>{
            const data ={ 
                subtotal,
                tax,
                shippingCharges,
                totalPrice,
            }

            sessionStorage.setItem('orderInfo',JSON.stringify(data));
            history.push('/process/payment');
        }

    return (
        <Fragment>
            <MetaData title="Confirm order" />
            <CheckoutSteps activeStep={1} />

            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {
                                cartItems && cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="Product" />
                                        <Link to={`/products/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        <span>
                                            {item.quantity} x kr.{item.price} ={" "}
                                            <b>kr.{item.price}* {item.quantity}</b>

                                        </span>

                                    </div>

                                ))
                            }
                        </div>
                    </div>

                </div>
                {/* -------------- */}
                <div>
                    <div className="orderSummary">
                        <Typography> Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>kr.{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>kr.{shippingCharges}</span>
                            </div>
                            <div>
                                <p>VAT:</p>
                                <span>kr.{tax}</span>
                            </div>
                        </div>


                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>{totalPrice}</span>
                        </div>
                        <button onClick={proceedToPayment}>Proceed to Payment</button>

                    </div>
                </div>

            </div>



        </Fragment>
    );
};

export default ConfirmOrder;
