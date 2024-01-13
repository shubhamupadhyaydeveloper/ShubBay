import React from 'react'
import {useDispatch} from 'react-redux'
import { paymentFormData } from '../../store/reducer'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

function Payment({ onPrev , onNext }) {

  const dispatch = useDispatch()

  const validateschema = Yup.object().shape({
    email: Yup.string().email('please provide a valid email').required('email is required'),
    number: Yup.number()
      .typeError('Zip Code must be a number')
      .positive('Zip Code must be a positive number')
      .integer('Zip Code must be an integer')
      .required('phone number is required')
  }).required()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validateschema)
  })

  const formsubmit = (data) => {
    dispatch(paymentFormData(data))
    onNext()
  }

  return (
    <div className="mx-auto flex md:items-center flex-col overflow-hidden max-w-md p-6 bg-white text-black font-mono text-md">
      <h1 className="text-2xl font-medium mb-6">Payment Information</h1>

      <form onSubmit={handleSubmit(formsubmit)}>
        <div className="mb-4">
          <input type="email" className="p-2 w-[20rem]  md:w-[25rem] border-slate-300 form-input border mt-1"
            placeholder='Enter your Email' {...register('email')} />
          {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <input type="Number" className="p-2 w-[20rem]  md:w-[25rem] form-input border mt-1"
            placeholder='Number' {...register('number')} />
          {errors.number && <span className='text-red-500'>{errors.number.message}</span>}
        </div>
        <div className='flex justify-between px-4 mt-10 '>
          
        <div >
          <button className='text-white bg-black px-4 md:px-10 md:w-36 w-20 py-2 hover:bg-slate-800' onClick={onPrev}>Back</button>
        </div>

        <div className='text-white bg-slate-900 px-10 py-2 hover:bg-slate-800' >
          <button type='submit'>Place Order</button>
        </div>
        </div>
      </form>
    </div>
  )
}

export default Payment;
