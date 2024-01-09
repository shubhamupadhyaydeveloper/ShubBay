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

  console.log(hovered)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handlehover = () => {
    console.log('clicked')
  }

  return (
<div className="bg-white" onMouseOver={() => setIshovered(true)}  onMouseOut={() => setIshovered(false)}>
  <div className="mx-auto px-4 lg:max-w-7xl lg:px-8">
    <div className="mt-6 ">
      <div className="group relative">
        <div className=" h-[24rem] md:w-[20rem] overflow-hidden rounded-md bg-gray-200" >
          <img src={`http://localhost:1337${url}`} className="h-full w-full object-cover object-center "/>
          {hovered && (
            <div className='flex justify-between md:w-[20rem] w-[18rem] text-black text-2xl absolute bottom-14 px-2'>
               <div className='flex gap-1'>
                 <button className='text-white text-xl '><IoMdAdd/></button>
                  <h1>{count}</h1>
                 <button className='text-white text-xl '><FiMinus/></button>
               </div>
               <div onClick={() => handlehover()}>
                <button className='bg-slate-600 text-white text-xl px-3 rounded-md'>Add</button>
               </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between md:w-[20rem]">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {name}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{category}</p>
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
