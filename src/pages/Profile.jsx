import React from 'react'
import ProfileDetails from '../components/ProfileDetails'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'

function Profile() {
  return (
    <div>
        <Navbar />
        <Announcement />
        <ProfileDetails />
    </div>
  )
}

export default Profile