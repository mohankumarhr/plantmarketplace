import React from 'react'
import styles from '../CSS/dashbord.module.css'

function Dashbord() {

    

  return (
    <div className={styles.dashbordContainer}>
    <h3>Dashbord</h3>
    <div className={styles.dashbordWrapper}>
    <div className={styles.dashbordBox}>
        <p>Items Sold</p>
        <p>₹10</p>
        </div>
        <div className={styles.dashbordBox}>
        <p>Todya's Sale</p>
        <p>₹200</p>
        </div>
        <div className={styles.dashbordBox}>
        <p>Last Month</p>
        <p>₹5000</p>
        </div>
        <div className={styles.dashbordBox}>
        <p>Total Profit</p>
        <p>₹20000</p>
        </div>
    </div>
    </div>
  )
}

export default Dashbord