import React from 'react'
import styles from "../CSS/brandpartner.module.css"
import { brandsPartner } from './data'

function BrandPartners() {
  return (
    <div className={styles.BrandPartnersSection}>
    <h3>Brand Partners</h3>
    <div className={styles.brandPartnersMain}>
    <div className={styles.brandPartnersContainer}>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[0]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[1]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[2]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[3]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[4]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[5]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[6]}></img>
        </div>

    {/* diplicated same */}

    <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[0]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[1]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[2]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[3]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[4]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[5]}></img>
        </div>
        <div className={styles.brandLogoSlider}>
            <img src={brandsPartner[6]}></img>
        </div>

    </div>
    </div>
    </div>
  )
}

export default BrandPartners