import React, { useEffect, useState } from 'react'
import styles from "../CSS/cartlist.module.css"
import {cartProducts} from "./data"
import Cartitem from './Cartitem'
import AddressList from './AddressList'
import axios from 'axios'
import { productBase } from './data'
import { useNavigate } from 'react-router-dom'

function Cartlist() {

 const navigate = useNavigate()

  const [showAddressList, setAddressList] = useState(false)

  const [address, setAddress] = useState()

  const [currentUser] = useState(localStorage.getItem('currentUser')||null)

  const [cartItems , setCartItems] = useState([])

  const [totalCost, setTotalCost] = useState(0)


  const handleAddressList = (bool, item)=>{
    if (item=="undefined") {
      console.log("hi")
    }
      setAddressList(bool)
      setAddress(item)
      console.log(item)
    
}


const cartChanges = ()=>{
  axios.get(`${productBase}/${currentUser}/get-user-cart`).then(
    (responces)=>{
      setCartItems(responces.data.itemQuantity)
      setTotalCost(responces.data.totalCost)
      console.log(responces.data)
    })
}


// useEffect(()=>{

//   axios.get(`${productBase}/${currentUser}/get-user-cart`).then(
//     (responces)=>{
//       setCartItems(responces.data.itemQuantity)
//       setTotalCost(responces.data.totalCost)
//       console.log(responces.data)
//     }
//   ).catch(()=>{
//     navigate("/login")
//   })
  

// },[currentUser])


  return (
    <div className={styles.cartMainBody}>
    <div className={`${styles.addressListContainer} ${showAddressList&&styles.showAddressList}`}>
    <AddressList 
    onClicked = {handleAddressList}
    />
    </div>
        <div className={styles.cartList}>
        <div className={styles.cartHeader}>
        <h4>Shopping Cart</h4>
        </div>
         {cartItems.map((item)=>{
          return <Cartitem 
            img = {item.product.pimageURL}
            title={item.product.ptitle}
            price = {item.product.pprice}
            category = {item.product.category}
            quantity = {item.quantity}
            cartchanges = {cartChanges}
            maxquantity = {item.product.quantity}
            showAdd = {item.quantity>=item.product.quantity?false:true}
          />
         })}
        </div>
        <div className={styles.checkOut}>
          {/* <div className={styles.addressContainer}>
            <button>Add Address</button>
          </div> */}
          <div className={styles.addressContainer}>
          {address&&<p>{address.fullName} <br></br> {address.houseDetails}, {address.streetDetails}, {address.landmark}, 
          <br></br>{address.city}-{address.pincode} ,{address.state}, <br></br>{address.country},
                 {address.phone}
                </p>}
            <button onClick={()=>{handleAddressList(true, address)}}>Change</button>
          </div>
          <div className={styles.priceDetails}>
            <h5>Price Details</h5>
            <div>
              <p>Items</p>
              <p>3</p>
            </div>
            <div>
              <p>Price</p>
              <p>{totalCost}</p>
            </div>
            <div>
              <p>Delivery Charges</p>
              <p>50</p>
            </div>
            <div className={styles.finalPrice}> 
              <p>Total Amount</p>
              <p>{totalCost+50}</p>
            </div>
            <button>Place Order</button>
          </div>
        </div>
    </div>
  )
}

export default Cartlist