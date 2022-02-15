import { Typography } from '@material-ui/core';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import React, { Fragment } from 'react';
import './CheckoutSteps.css';

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography> Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon/>,
        },

    ];

    const stepStyles ={
        boxSizing: "border-box",

    };
    return (
        <Fragment>
        <Stepper alternativeLabel  activeStep={activeStep} style={stepStyles}>

            {
                steps.map((item, index) =>(
                        <Step key={index} active={activeStep===index ? true : false}
                        completed={activeStep >=index ? true : false}
                        >
                        <StepLabel style={{
                            color:activeStep>=index ?"green" : "rgba(0,0,0,0.649)",
                        }}
                        icon= {item.icon} >       
                        {item.label}
                        </StepLabel>

                        </Step>
                ))
            }


        </Stepper>

        </Fragment>

    );
};

export default CheckoutSteps;
