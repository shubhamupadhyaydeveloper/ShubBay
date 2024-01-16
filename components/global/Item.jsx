import React from 'react'
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { addToCart } from '../../store/reducer';
import {useNavigate} from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { showNotification } from './Notification';

function Item({item , width}) {

  const [count , setCount] = useState(1);
  const [hovered , setHovered] = useState(false)

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

  const handleclick = (e) =>  {
    e.stopPropagation()
    dispatch(addToCart({item : {...item , count}}))
    showNotification('Item is added' , 'success')
  }

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className={`overflow-hidden mb-5 mt-3 ${width}`}>
      <div className='flex mx-auto flex-col items-center justify-center'>
        <div
          className='w-[20rem] h-[27rem] relative'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => navigate(`/item/${item?.id}`)}
        >
          <img src={`${url}`} alt="photo" className='object-cover cursor-pointer w-full' />
          {hovered && (
            <div className='absolute bottom-0 flex justify-between w-[20rem] px-2'>
              <div className='flex gap-2 text-xl bg-slate-900 text-white p-2 rounded-md'>
                <button onClick={incrementCount}><IoMdAdd /></button>
                <p>{count}</p>
                <button onClick={decrementCount}><FiMinus /></button>
              </div>
              <div className='bg-white text-xl hover:bg-slate-200 text-black rounded-md px-2 flex items-center'
                 onClick={handleclick}
              >
                <button>Add</button>
              </div>
            </div>
          )}
        </div>
         <div className='flex justify-between bg-black  text-white px-1 z-[5] mt-2 w-[20rem]'>
            <div className='text-xl'>{name}</div>
            <div className='text-md'>${price}</div>
         </div>
      </div>
    </div>

  )
}

export default Item;
