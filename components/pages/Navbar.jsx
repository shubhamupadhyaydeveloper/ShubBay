import React from 'react'
import Badge from '@mui/material/Badge';
import { useNavigate ,} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCartOpen , setMoblie } from '../../store/reducer'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart)
    const mobile = useSelector(state => state.cart.isMobile)

    return (
        <div className=' sticky top-0 flex h-16 flex-row  justify-between px-6 py-2 z-10 bg-slate-200 items-center'>
            <div onClick={() => navigate('/')} className='cursor-pointer'>
                <h1 className='text-2xl md:text-3xl z-10 font-bold'>ShubBay</h1>
            </div>

            <div className=' gap-3 md:block md:gap-7 md:me-5 me-4 dark:flex'>
                <div className='hidden md:flex gap-2 md:gap-7 '>
                <div className=' cursor-pointer text-2xl' onClick={() => navigate()}>
                    <FiSearch />
                </div>
                <div className='cursor-pointer text-2xl' onClick={() => navigate()}>
                    <LuUser />
                </div>
                <div className='cursor-pointer text-2xl mt-[-8px]' onClick={() => dispatch(setCartOpen({}))}>
                    <Badge badgeContent={cart.length} color='warning'>
                        <LuShoppingCart  />
                    </Badge>                
                </div>
                </div>
                <div className='flex items-center text-2xl z-20 cursor-pointer md:block' onClick={() => dispatch(setMoblie({}))}>
                    {
                        mobile ? <IoMdClose /> : <RxHamburgerMenu />
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
