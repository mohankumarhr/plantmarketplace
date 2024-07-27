import React, { useEffect, useState } from 'react'

import styles from "../CSS/cartitem.module.css"
import axios from 'axios'
import { productBase } from './data'




function Cartitem(props) {

  const [currentUser] = useState(localStorage.getItem('currentUser')||null)

  const [showAddBtn, setShowAddBtn] = useState(true)


  const handleRemoveItem = ()=>{
    axios.delete(`${productBase}/${currentUser}/${props.title}/delete-product-from-cart`).then((responces)=>{
        console.log(responces)
        props.cartchanges()
        if (props.quantity<=props.maxquantity) {
          console.log("problem")
          setShowAddBtn(true)
        }
    }).catch(error => {
    console.error('error:', error);
  });
  }

  const handleAddItem  = ()=>{
    console.log(props.title,props.quantity,props.maxquantity)
      if(props.showAdd){
        const headers = {
        quantity: 1, // Include authorization header if needed
      };
    
    axios.post(`${productBase}/${currentUser}/${props.title}/addProducts-to-cart`,{
        headers: headers
    }).then((response) => {
        console.log(response.data);
        props.cartchanges()
        if (props.quantity>=props.maxquantity-1) {
          console.log(props.title,props.quantity)
          setShowAddBtn(false)
        }
        })
        .catch(error => {
          setShowAddBtn(false)
        console.error('error:', error);
        });
      }
  }

  useEffect(()=>{
    if (props.quantity>=props.maxquantity) {
      console.log("load",props.quantity)
      setShowAddBtn(false)
    }
    console.log(props.title,props.quantity,props.maxquantity)
  })

  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.imageContainer}>
        <img src={props.img} alt='photo'></img>
      </div>
      <div className={styles.cartItemDetails}>
        <div className={styles.cartItemHeader}>
          <h3>{props.title}</h3>
          <h3>Price: <span>{props.price}</span></h3>
        </div>
        <div className={styles.cartItemBody}>
          <p>{props.category}</p>
          <p>Seller: {props.seller} </p>
        </div>
        <div className={styles.cartItemButtom}>
            <div onClick={handleRemoveItem} className={styles.removeItem}>-</div>
            <input type='numbers' value={props.quantity}></input>
            <div onClick={handleAddItem} className={`${styles.addItem} ${!props.showAdd&&styles.disableBtn}`}>+</div>
          </div>
      </div>
    </div>
  )
}

export default Cartitem