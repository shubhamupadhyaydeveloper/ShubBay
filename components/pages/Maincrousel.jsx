import React from 'react'
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

function Maincrousel() {

  return (
    <div>
      <Carousel 
       infiniteLoop={true}
       showThumbs={false}
       showIndicators={false}
       showStatus={false}

       renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <div
          onClick={onClickHandler}
          className='text-[35px] text-black z-10 absolute top-24 flex left-0 items-center justify-center h-[12rem] md:h-72 lg:h-[20rem]'
        >
          <GrFormPrevious  />
        </div>
      )}
      
       renderArrowNext={(onClickHandler, hasPrev, label) => (
        <div
          onClick={onClickHandler}
          className='text-[35px] text-black absolute top-24 flex right-0 items-center justify-center h-[12rem] md:h-72 lg:h-[20rem]'
        >
          <GrFormNext  />
        </div>
      )}
       >
     <div className='h-[400px] xl:h-[510px] 2xl:h-[570px] lg:h-[480px] md:h-[450px] bg-slate-500 bg-center bg-cover'
      >
        <img src="/image/slider1.jpg" alt="error" className='object-cover w-full h-full' />
         <div className='bg-slate-900 absolute top-[15rem] flex flex-col gap-1 p-2 rounded-lg left-[5rem] lg:left-[8rem] xl:-left-[-13rem] xl:p-4'>
            <h1 className='flex items-center text-red-700 text-sm top-[15rem] xl:text-xl xl:mb-1'>--NEW ITEMS</h1>
            <h1 className=' text-2xl text-white font-medium xl:text-[3rem]'>SUMMER SALE</h1>
            <a href="#" className='flex items-center text-sm  pl-10 xl:pl-36 xl:text-xl xl:mt-1 text-blue-500'>DISCOVER MORE...</a>
        </div>
     </div>
          <div className='h-[400px] xl:h-[510px] 2xl:h-[570px] lg:h-[480px] md:h-[450px] bg-slate-500 bg-center bg-cover'
           >
            <img src="/image/slider2.jpg" alt="error" className='object-cover w-full h-full' />
          </div>
     <div className='h-[400px] xl:h-[510px] 2xl:h-[570px] lg:h-[480px] md:h-[450px] bg-slate-500 bg-center bg-cover'
      >
          <img src="/image/slider4.jpg" alt="error" className='object-cover w-full h-full' />
     </div>
     <div className='h-[400px] xl:h-[510px] 2xl:h-[570px] lg:h-[480px] md:h-[450px] bg-slate-500 bg-center bg-cover'
      >
    <img src="/image/slider3.jpg" alt="error" className='object-cover w-full h-full' />
     </div>
   
    </Carousel>
    </div>
  )
}

export default Maincrousel;
