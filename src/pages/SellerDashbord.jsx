import React from 'react'
import Navbar from '../components/Navbar'
import Dashbord from '../components/Dashbord'
import Inventoty from '../components/Inventoty'
import SellerNavbar from '../components/SellerNavbar'
import styles from '../CSS/dashbord.module.css'

function SellerDashbord() {
  return (
    <div className={styles.dashbortMainContainer}>
        <SellerNavbar />
        <Dashbord />
        <Inventoty />
    </div>
  )
}

export default SellerDashbord