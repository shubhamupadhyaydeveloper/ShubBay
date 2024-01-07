import React from 'react'
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { addToCart } from '../../store/reducer';
import {useNavigate} from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

function Item({item , width}) {

  const [count , setCount] = useState(1);
  const [hovered , setIshovered] = useState(false)

  const {image , price , category , name } = item.attributes;
  const {
    data : {
        attributes : {
            formats :{
                medium : {url}
            }
        }
    }
  } = image

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
<div className={`bg-white w-[${width}px]`}>
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80" onMouseOver={() => setIshovered(true)} onMouseOut={() => setIshovered(false)}>
          <img src={`http://localhost:1337${url}`} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
          <div className={`${hovered ? 'block' : 'hidden'} absolute bottom-3 flex justify-between`}>
            <div className='flex gap-1'>
               <button className='bg-slate-700 text-white text-xl px-2 py-1 rounded-lg hover:bg-slate-600' onClick={() => setCount(count + 1)}><IoMdAdd/></button>
               <h1 className='text-xl text-blue-500'>{count}</h1>
               <button className='bg-slate-700 text-white text-xl px-2 py-1 rounded-lg hover:bg-slate-600' onClick={() => setCount(Math.max(count -1 , 1))}><FiMinus/></button>
            </div>
            <div onClick={() => {
                dispatch(addToCart({item : {...item , count}}))
                navigate('/checkout')
                }}>
                <button className='bg-slate-700 text-white text-xl px-2 py-1 rounded-lg hover:bg-slate-600'>Add</button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
            {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
            </p>
          </div>
          <p className="text-sm font-medium text-gray-900">${price}</p>
        </div>
      </div>
      
    </div>
  </div>
</div>

  )
}

export default Item;
