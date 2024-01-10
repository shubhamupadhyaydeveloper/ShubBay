import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Item from './Item';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { setItem } from '../../store/reducer';

function Shopping() {
    const dispatch = useDispatch()
    const items = useSelector(state => state.cart.items)
    const [value, setValue] = useState('men')

    const handlevalue = (event, newvalue) => {
        setValue(newvalue)
    }

    async function getItems() {
        let items = await fetch('http://localhost:1337/api/items?populate=image', { method: 'GET' })
        let itemsjson = await items.json()
        // console.log(itemsjson)
        dispatch(setItem(itemsjson.data))
    }

    useEffect(() => {
        getItems()
    }, [])

    const men = items.filter((item) => item.attributes.Category === 'men')
    const women = items.filter(item => item.attributes.Category === 'women')
    const newArrival = items.filter(item => item.attributes.Category === 'newArrival')
    const bestSeller = items.filter(item => item.attributes.Category === 'bestSeller')
    const topRated = items.filter(item => item.attributes.Category === 'topRated')
    console.log(items)
    console.log(men)

    return (
        <div className='mt-8'>
            <h1 className='md:text-[3rem] text-3xl flex items-center justify-center font-serif'>Category</h1>
            <Tabs
                value={value}
                onChange={handlevalue}
                scrollButtons
                allowScrollButtonsMobile
                aria-label="icon label scrollable force tabs example"
                textColor="primary"
                indicatorColor="primary"
                variant="scrollable"
                className='mt-5'
            >
             <Tab label='Men' value='men' />
             <Tab label='Women' value='women' />
             <Tab label='NewArrival' value='newArrival' />
             <Tab label='BestSeller' value='bestSeller' />
             <Tab label='TopRated' value='topRated' />
            </Tabs>
          <div className='mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:ml-8 lg:ml-20 md:gap-1'>
            {value === 'men' && men.map((item , index) => (
                  <Item item={item} key={`${item.attributes}-${item.name}-${index}`}/>
            ))}
            {value === 'women' && women.map((item , index) => (
                  <Item item={item} key={`${item.attributes}-${item.name}-${index}`}/>
            ))}
            {value === 'newArrival' && newArrival.map((item , index) => (
                  <Item item={item} key={`${item.attributes}-${item.name}-${index}`}/>
            ))}
            {value === 'bestSeller' && bestSeller.map((item , index) => (
                  <Item item={item} key={`${item.attributes}-${item.name}-${index}`}/>
            ))}
            {value === 'topRated' && topRated.map((item , index) => (
                  <Item item={item} key={`${item.attributes}-${item.name}-${index}`}/>
            ))}
            
          </div>
        </div>
    )
}

export default Shopping;
