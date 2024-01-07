import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMoblie, setCartOpen } from '../../store/reducer'
import Badge from '@mui/material/Badge';
import { useNavigate, } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

function Mobilemenu() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mobile = useSelector(state => state.cart.isMobile)
    const cart = useSelector(state => state.cart.cart)

    return (
        <div className={`${mobile ? "block" : 'hidden'} bg-slate-200  flex flex-col fixed top-0 h-full w-[330px] md:w-[280px] `}>
            <div className='flex justify-between px-6 py-2 items-center mt-5'>
                <h1 className='font-semibold text-2xl'>Menu</h1>
                <div className='text-3xl items-center text-black' onClick={() => dispatch(setMoblie({}))}>
                    <IoMdClose />
                </div>
            </div>

            <div className='flex flex-col w-full items-center gap-5 justify-center h-screen text-3xl'>
                <div className=' hover:bg-slate-300 hover:rounded-xl px-12 h-12 flex'>
                    <div className=' cursor-pointer  w-full flex items-center gap-1' onClick={() => navigate()}>
                        <FiSearch /> <span>Search</span>
                    </div>
                </div>
                <div className=' hover:bg-slate-300 hover:rounded-xl px-12 h-12 flex'>
                    <div className='cursor-pointer w-full flex items-center gap-1' onClick={() => navigate()}>
                        <LuUser /> <span>User</span>
                    </div>
                </div>
                <div className=' hover:bg-slate-300 hover:rounded-xl px-12 h-12 flex gap-2'>
                    <div className='cursor-pointer w-full flex items-center ' onClick={() => dispatch(setCartOpen({}))}>
                        <Badge badgeContent={cart.length} color='warning'>
                            <LuShoppingCart className='mt-1' /> <span>Cart</span>
                        </Badge>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Mobilemenu;

 