import React from 'react'
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Itemdetail from '../components/pages/Itemdetail'
import Checkout from '../components/pages/Checkout'
import Confirmation from '../components/pages/Confirmation'
import Home from '../components/pages/Home'
import Navbar from '../components/pages/Navbar'
import Cartmenu from '../components/pages/Cartmenu'
import Mobilemenu from '../components/global/Mobilemenu'
import Item from '../components/global/Item'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname]);

  return null;
};

function App() {


  return (
    <>
      <Navbar />
      <ScrollToTop />
      {/* <Item/> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/item/:id' element={<Itemdetail />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/checkout/success' element={<Confirmation />} />
      </Routes>
      <Cartmenu />
      <Mobilemenu/>
    </>
  )
}

export default App;
