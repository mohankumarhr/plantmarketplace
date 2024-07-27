import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Productlist from '../components/Productlist'
import Footer from '../components/Footer'

function Product() {
  return (
    <div>
        <Navbar />
        <Announcement />
        <Productlist />
        <Footer />
    </div>
  )
}

export default Product