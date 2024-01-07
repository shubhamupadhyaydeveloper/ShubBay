import React from 'react'
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux'
import {
  increaseCount,
  decreaseCount,
  setCartOpen,
  removeFromCart,
  setMoblie
} from '../../store/reducer'
import {useNavigate} from 'react-router-dom'


function Cartmenu() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart)
  const isCartOpen = useSelector(state => state.cart.isCartOpen)
  const mobile = useSelector(state => state.cart.isMobile)

  const total = cart.reduce((total , item) => {
     return total + item.count * item.attributes.price;
  },0)

  return (
    <>
    <div className={` ${isCartOpen ? 'block' : 'hidden'}`}>
      <div className="relative z-10" >
        =
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            =
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button type="button" className="relative -m-2 p-2 text-2xl text-gray-400 hover:text-gray-500"
                       onClick={() => dispatch(setCartOpen())}
                      >
                        <IoMdClose />
                      </button>
                    </div>
                  </div>

                {
                  cart.map((item , index) => {
                    <div className="mt-8" key={`${item.attributes.name}-${index}`}>
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      <li className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`} />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href="#">{item?.attributes?.name}</a>
                              </h3>
                              <p className="ml-4">${item.attributes.price}</p>
                            </div>

                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className='flex gap-2'>
                  <button className='border px-1 py-1 border-slate-400 rounded-md' onClick={() => dispatch(increaseCount({id : item.id}))}><IoMdAdd/></button>
                               <h3 className='text-blue-500 text-xl'>{item.count}</h3>
                   <button className='border px-1 py-1 border-slate-400 rounded-md'onClick={() => dispatch(decreaseCount({id : item.id}))}><FiMinus/></button>
                            </div>

                            <div className="flex">
              <button type="button" className="font-medium text-slate-800 hover:text-slate-700" onClick={() => dispatch(removeFromCart({id : item.id}))}>Remove</button>
                            </div>
                          </div>
                        </div>
                      </li>

                    </ul>
                  </div>
                  })

                }
                  
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{total}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-slate-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-slate-600" 
                    onClick={() => {
                      navigate('/checkout')
                      dispatch(setCartOpen())
                      {mobile ? dispatch(setMoblie()) : ''}
                    }}
                    >Checkout</a>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    </>
  )
}

export default Cartmenu;
