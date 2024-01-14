import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMoblie, setCartOpen } from '../../store/reducer'
import {useForm} from 'react-hook-form'
import Badge from '@mui/material/Badge';
import { useNavigate, } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

function Mobilemenu() {

    const {
        register,
        handleSubmit,
        formState : {errors},
        reset
    } = useForm()

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mobile = useSelector(state => state.cart.isMobile)
    const cart = useSelector(state => state.cart.cart)

    const formsubmit = (data) => {
        navigate(`/search/${data.query}`)
        if(mobile) {
            dispatch(setMoblie())
        } else {
            return null;
        }
        reset()
        console.log(data.query)
    }

    return (
        <div className={`${mobile ? "block" : 'hidden'} z-[13] bg-slate-200  flex flex-col fixed top-0 h-full w-[330px] md:w-[340px] `}>
            <div className='flex justify-between px-6 py-2 items-center mt-5'>
                <h1 className='font-semibold text-2xl'>Menu</h1>
                <div className='text-3xl items-center cursor-pointer text-black' onClick={() => dispatch(setMoblie({}))}>
                    <IoMdClose />
                </div>
            </div>

            <div className='flex flex-col w-full items-center gap-5 justify-center h-screen text-3xl'>
                <div>
                    <div className=' cursor-pointer  w-full flex items-center gap-2 ' onClick={() => navigate()}>
                        <form action="#" onSubmit={handleSubmit(formsubmit)}>
                        <input className='px-2 w-56 rounded-md py-1 border border-slate-800 ring-1'
                        placeholder='search'
                        id='input'
                          {...register('query' , {required : 'input is required'})}
                        />
                                    <button className='text-black text-2xl ml-2'><FiSearch/></button>
                       {/* {errors.query && (
                                <span className='text-red-500 break-normal pl-[4px] mt-[-30px] text-[18px]' style={{ display: 'block' }}>
                                    {errors.query.message}
                                </span>
                            )} */}
                        </form>
                    </div>
                </div>
                <div className=' hover:bg-slate-300 hover:rounded-xl px-12 h-12 flex'>
                    <div className='cursor-pointer w-full flex items-center gap-1' onClick={() => navigate()}>
                        <LuUser />
                    </div>
                </div>
                <div className=' hover:bg-slate-300 hover:rounded-xl px-12 h-12 flex gap-2'>
                    <div className='cursor-pointer w-full flex items-center ' onClick={() => dispatch(setCartOpen({}))}>
                        <Badge badgeContent={cart.length} color='warning'>
                            <LuShoppingCart className='mt-1'/>
                        </Badge>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Mobilemenu;

 