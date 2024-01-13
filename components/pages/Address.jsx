import React from 'react'
import {useDispatch} from 'react-redux'
import { addresssetFormData } from '../../store/reducer';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Address({ onNext }) {

    const dispatch = useDispatch()

    const validateSchema = Yup
        .object()
        .shape({
            firstname: Yup.string().required('fullname is required').min(2, 'atleast 2 alphabet is required'),
            lastname: Yup.string().required('lastname is required').min(2, 'atleast 2 alphabet is required'),
            country: Yup.string().required('country is required'),
            streetaddress: Yup.string().required('streetaddress is required'),
            streetaddressoptional: Yup.string(),
            city: Yup.string().required('city is required'),
            state: Yup.string().required('state is required'),
            zipcode: Yup.number().typeError('Zip Code must be a number')
                .positive('Zip Code must be a positive number')
                .integer('Zip Code must be an integer')
                .required('Zip Code is required'),
        })
        .required();

        
        const { register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(validateSchema),
        });
        
        const onSubmit = (data) => {
            dispatch(addresssetFormData(data))
            onNext()
        };
        
    return (
        <div className="mx-auto flex md:items-center flex-col overflow-hidden max-w-md p-6 bg-white text-black font-mono text-md">
            <h1 className="text-2xl font-medium mb-6">Billing Information</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <input
                        {...register('firstname')}
                        name='firstname'
                        type="text"
                        className="p-2 w-[20rem] md:w-[25rem] border-slate-300 form-input border mt-1"
                        placeholder="firstname"
                    />
                    {errors.fullname && <span className='text-red-500 font-serif'>{errors.fullname.message}</span>}
                </div>

                 <div className="mb-4">
                    <input type="text" className="p-2 w-[20rem]  md:w-[25rem] form-input border mt-1"
                        placeholder='Last name' {...register('lastname')} name='lastname'/>
                    {errors.lastname && <span className='text-red-500 font-serif'>{errors.lastname.message}</span>}
                </div>

                <div className="mb-4">
                    <input type="text" className="p-2 w-[20rem]  md:w-[25rem] form-input border mt-1"
                        placeholder='Country' {...register('country')} name='country'/>
                    {errors.country && <span className='text-red-500 font-serif'>{errors.country.message}</span>}
                </div>

                <div className="mb-4">
                    <input type="text" className="p-2 w-[20rem] md:w-[25rem] form-input border mt-1"
                        placeholder='Street Address' {...register('streetaddress')} name='streetaddress' />
                    {errors.streetaddress && <span className='text-red-500 font-serif'>{errors.streetaddress.message}</span>}
                </div>

                <div className="mb-4">
                    <input type="text" className="p-2 w-[20rem]  md:w-[25rem] form-input border mt-1"
                        placeholder='Street Address 2 (Optional)' {...register('streetaddressoptional')} name='streetaddressoptional'/>
                    {errors.streetaddressoptional && <span className='text-red-500 font-serif'>{errors.streetaddressoptional.message}</span>}
                </div>

                <div className="mb-4">
                    <input type="text" className="p-2 w-[20rem]  md:w-[25rem] form-input border mt-1"
                        placeholder='City' {...register('city')} name='city'/>
                    {errors.city && <span className='text-red-500 font-serif'>{errors.city.message}</span>}
                </div>

                <div className="mb-4">
                    <input type="text" className="p-2 w-[20rem]  md:w-[25rem] form-input border mt-1"
                        placeholder='State' {...register('state')} name='state'/>
                    {errors.state && <span className='text-red-500 font-serif'>{errors.state.message}</span>}
                </div>

                <div className="mb-4">
                    <input type="number" className="p-2 w-[20rem] md:w-[25rem] form-input border mt-1"
                        placeholder='Zip Code' {...register('zipcode')} name='zipcode' />
                    {errors.zipcode && <span className='text-red-500 font-serif'>{errors.zipcode.message}</span>}
                </div> 

                <div className='bg-black text-white w-[5rem] text-center p-2 hover:bg-slate-800'>
                    <button type='submit'>Next</button>
                </div> 
            </form>
        </div>
    )
}

export default Address;
