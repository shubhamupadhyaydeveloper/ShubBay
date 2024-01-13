import React from 'react'
import { useState } from 'react';
import {Stepper, Step , StepLabel } from '@mui/material'
import Address from './Address';
import Payment from './Payment';
import Stripe from './Stripe';

function Checkout() {

  const [activeStep , setActiveStep] = useState(0)

  const handleprev = () => {
    setActiveStep(prev => prev - 1)
  }

  const handlenext = () => {
    setActiveStep(prev => prev + 1)
  }

  return (
    <div>
      <Stepper className='mt-5 px-5 md:p-5 md:w-[50vw] block mx-auto'
        activeStep={activeStep}
      >
        <Step>
          <StepLabel>Billing Form</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>

      {activeStep === 0 && (
      <Address onNext={handlenext}/>
      )}

      {activeStep === 1 && (
       <Payment onPrev={handleprev} onNext={handlenext}/>
      )}
    
      {activeStep === 2 && (
         <Stripe/>
      )}

    </div>
  )
}

export default Checkout;
