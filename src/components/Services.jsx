import React from 'react'
import customer from "../assets/customer-service.svg"
import van from "../assets/delivery.svg"
import styles from "../CSS/services.module.css"
import GIF from "../assets/plant.gif"

function Services() {
  return (
    <div className={styles.servicesContainer}>
        <div className={styles.service1}>
            <div className={styles.imageContainer}>
            <img src={customer} alt='customer service'></img>
            </div>
            <div className={styles.textContainer}>
            <h6>24/7 free support</h6>
            <p>Online Support 24/7</p>
            </div>
        </div>
        <div className={styles.gifContainer}>
            <img src={GIF} alt='plant gif'></img>
        </div>
        <div className={styles.service2}>
        <div className={styles.imageContainer}>
            <img src={van} alt='customer service'>
            </img>
            </div>
            <div className={styles.textContainer}>
            <h6>Free delivery</h6>
            <p>On shoping above 100rs</p>
            </div>
        </div>
    </div>
  )
}

export default Services