import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Cartlist from '../components/Cartlist'

function Cart() {
  return (
    <div>
        <Navbar />
        <Announcement />
        <Cartlist />
    </div>
  )
}

export default Cart