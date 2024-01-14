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
import Subscribe from '../components/global/Subscribe'
import Searchitems from '../components/global/Searchitems'

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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/item/:id' element={<Itemdetail />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/checkout/success' element={<Confirmation />} />
        <Route path='/search/:query' element={<Searchitems/>} />
      </Routes>
      <Cartmenu />
      <Mobilemenu/>
      <Subscribe/>
    </>
  )
}

export default App;
