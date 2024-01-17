import React from 'react'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_TOKEN}`)

function Stripe() {
  const { firstname, lastname } = useSelector(state => state.cart.addressformdata)
  const { email } = useSelector(state => state.cart.paymentformdata)
  const cart = useSelector(state => state.cart.cart)

  async function makepayment() {
    const stripe = await stripePromise;
    const requestBody = {
      Username: [firstname, lastname].join(" "),
      email: email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch("https://backendshubbay.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
    }, 
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const session = await response.json()
    console.log(session);

    await stripe.redirectToCheckout({
      sessionId: session.id
    })
  }
  makepayment()

  return (
    <div className='mb-[10rem]'>
       <div className='flex items-center justify-center'>
         <h1 className='text-2xl text-purple-700'>Stripe Payment</h1>
       </div>
    </div>
  )
}

export default Stripe;
