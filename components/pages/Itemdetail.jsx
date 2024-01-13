import React from 'react'
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { addToCart } from '../../store/reducer';
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { showNotification } from '../global/Notification';

function Itemdetail() {

  const [count , setCount] = useState(1)
  const [value , setvalue] = useState(false)
  const [item , setItem] = useState(null)
  const [items , setItems] = useState([])
  const {id} = useParams()
  const dispatch = useDispatch()

  async function getItem() {
    try {
      let request = await fetch(`http://localhost:1337/api/items/${id}?populate=image` , {method : 'GET'})
      let response = await request.json()
      setItem(response.data)
    } catch (error) {
      console.log(error.message + 'error in apicall')
    }
  }

  useEffect(() => {
    getItem()
  } , [id])


  return (
    <div className="bg-white overflow-hidden mt-2">
  <nav className="flex items-start text-xl pl-2 md:pl-7 2xl:pl-10 font-mono">
    <h1>Home/item</h1>
  </nav>
  <div className=" block w-full md:flex">
 
    <div className=" mt-2 2xl:ml-[20rem]">
    {item && item.attributes && item.attributes.image && item.attributes.image.data && item.attributes.image.data.attributes && item.attributes.image.data.attributes.formats && item.attributes.image.data.attributes.formats.medium && (
      <div className="w-[25rem] md:w-[27rem] lg:w-[30rem] xl:w-[33rem] lg:ml-10 2xl:mr-[-10rem]">
        <img src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`} alt="Item Image" />
      </div>
    )}
    </div>

 
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6">
      <div className="lg:col-span-2 ">
        <h1 className="text-2xl font-serif tracking-tight text-gray-900 sm:text-3xl">{item?.attributes?.name}</h1>
      </div>

     
      <div className="mt-4 lg:row-span-3 lg:mt-0">
        <p className="text-2xl font-mono mt-2 tracking-tight text-gray-900">${item?.attributes?.price}</p>
      </div>

      <div className="flex flex-col md:flex-row mt-3 gap-3">
         <div className="flex gap-2 items-center hover:bg-slate-700 w-[5rem] bg-slate-800 text-white text-xl h-11 px-1 rounded-md">
           <button onClick={() => setCount(count + 1)}><IoMdAdd/></button>
           <h1>{count}</h1>
           <button onClick={() => setCount(Math.max(count-1 , 1))}><FiMinus/></button>
         </div>
          <button className="bg-slate-800 text-white h-11 rounded-md hover:bg-slate-700 md:w-[10rem] "
            onClick={() => {
              showNotification('Item is added', 'success')
              dispatch(addToCart({item : {...item , count}}))
            }}
          >Add to bag</button>
      </div>
   

      <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pb-16 lg:pr-8 lg:pt-6">
        <div>
          <h3 className="sr-only">Description</h3>

          <div className="space-y-6">
            <p className="text-xl  text-gray-900">{item?.attributes?.shortDescription}</p>
          </div>
        </div>



        <div className="mt-10">
          <h2 className="text-lg font-bold text-gray-900">Details</h2>

          <div className="mt-4 space-y-6">
            <p className="text-xl text-gray-600">{item?.attributes?.longDescription}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

    </div>
  )
}

export default Itemdetail;
