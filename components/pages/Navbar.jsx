import React from 'react'
import Badge from '@mui/material/Badge';
import { useForm } from 'react-hook-form'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCartOpen, setMoblie } from '../../store/reducer'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

function Navbar() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const formsubmit = (data) => {
        navigate(`/search/${data.query}`)
        reset()
        if (mobile) {
            dispatch(setMoblie())
        } else {
            return null;
        }
        console.log(data.query)
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart)
    const mobile = useSelector(state => state.cart.isMobile)

    return (
        <div className=' sticky top-0 flex h-16 flex-row  justify-between px-6 py-2 z-[13] bg-slate-200 items-center'>
            <div onClick={() => navigate('/')} className='cursor-pointer'>
                <h1 className='text-2xl md:text-3xl z-10 font-bold'>ShubBay</h1>
            </div>

            <div className='flex flex-row gap-4'>
                <div className='hidden md:flex gap-2 md:gap-7 '>
                    <div className=' cursor-pointer text-2xl'>
                        <form action="#" onSubmit={handleSubmit(formsubmit)} className='mb-2'>
                            <input
                                placeholder='search'
                                className='px-2 w-[12rem] rounded-md py-1 border border-slate-500 mt-[2px]'
                                {...register('query', { required: 'Input is required' })}
                            />
                            <button className='text-black text-2xl ml-2'>
                                <FiSearch />
                            </button>
                            {/* {errors.query && (
                                <span className='text-red-500 break-normal pl-[4px] mt-[-33px] text-[22px]' style={{ display: 'block' }}>
                                    {errors.query.message}
                                </span>
                            )} */}
                        </form>

                    </div>
                    <div className='cursor-pointer text-2xl mt-2' onClick={() => navigate()}>
                        <LuUser />
                    </div>
                    <div className='cursor-pointer text-2xl' onClick={() => dispatch(setCartOpen({}))}>
                        <Badge badgeContent={cart.length} color='warning'>
                            <LuShoppingCart />
                        </Badge>
                    </div>
                </div>
                <div className='flex items-center text-2xl mt-2 z-20 cursor-pointer md:block' onClick={() => dispatch(setMoblie({}))}>
                    {
                        mobile ? <IoMdClose /> : <RxHamburgerMenu />
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
