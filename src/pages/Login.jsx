import React from 'react'
import Loginbody from '../components/Loginbody'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'

function Login() {
  return (
    <div>
    <Navbar />
    <Announcement />
        <Loginbody />
    </div>
  )
}

export default Login