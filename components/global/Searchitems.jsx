import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Item from './Item'

function Searchitems() {

    const { query } = useParams()
    const [items, setItems] = useState([])

    async function getSearch() {
        try {
            if (query.length > 0) {
                const request = await fetch(`https://backendshubbay.onrender.com/api/items?populate=*&filters[longDescription][$contains]=${query}`)
                const response = await request.json()
                setItems(response.data)
                console.log(response.data)
            } else {
                return null;
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getSearch()
    }, [query])


    return (
        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:ml-8 lg:ml-20 md:gap-1'>
            {items && items.length > 0 ? (
                items.map((item, index) => (
                    <Item item={item} key={`${item.attributes}-${item.name}-${index}`} />
                ))
            ) : (
                <p className='flex items-center mb-[20rem] text-xl font-mono'>No Result found for &nbsp;<b>{query}</b></p>
            )}
        </div>


    )
}

export default Searchitems;
