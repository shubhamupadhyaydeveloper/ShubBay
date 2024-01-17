import { useEffect , } from 'react'
import { useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_TOKEN}`)

function Stripe() {
  const { firstname, lastname } = useSelector(state => state.cart.addressformdata)
  const { email } = useSelector(state => state.cart.paymentformdata)
  const cart = useSelector(state => state.cart.cart)

  const makePayment = async () => {
    const stripe = await stripePromise;
    const requestBody = {
      Username: [firstname, lastname].join(" "),
      email: email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    try {
      const response = await fetch("https://backendshubbay.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
        "Authorization" : "fbf64eea0ca3db6bb9394df863fb4362933df0ab96871ddecaaab6735cb83b1639bf60d2aa9e1730fb5968267b1f2a4c681ab281be7c6e540007c67644f59b7daf0c25f6342d6b3acb8a440972a6882bfa82ac433cf2b561de61edd300707d256f466914dbe09f6315f40b3cf36cf52ea98ff547f0db369bcea8af42ede458d4"
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
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  }

  useEffect(() => {
    makePayment()
  } , [])

  return (
    <div className='mb-[10rem]'>
       <div className='flex items-center justify-center'>
         <h1 className='text-2xl text-purple-700'>Stripe Payment</h1>
       </div>
    </div>
  )
}

export default Stripe;
