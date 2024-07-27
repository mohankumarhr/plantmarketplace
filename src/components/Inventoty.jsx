import React, { useEffect, useState } from 'react'
import styles from '../CSS/inventory.module.css'
import { cartProducts } from './data'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { productBase } from './data'
import { popularProducts } from './data'

function Inventoty() {

    const navigate = useNavigate()
    const [currentUser] = useState(localStorage.getItem('currentUser')||null)
    const [ProductData, setProductData] = useState([])

    const handleSendItem = (item)=>{
        navigate('/updateProduct', { state: { user: item } });
    }


    const handleDelete = (item)=>{
        axios.delete(`${productBase}/seller/${currentUser}/delete-product/${item.ptitle}`
        )
          .then(response => {
            console.log(response.status)
          })
        window.location.reload()
    }

    useEffect(() => {
        const fetchData = async () => {
          
          try {
        
           console.log("current", currentUser)
            // Make a GET request with headers
            const response = await axios.get(`https://product-service-zx9b.onrender.com/seller/${currentUser}/get-products`);
    
            // Handle the server response
            console.log('Server Response:', response.data);
            setProductData(response.data)
          } catch (error) {
            // Handle errors
            console.error('Error:', error);
          }
        };
    
        // Call the fetchData function
        fetchData();
      }, [currentUser]);

  return (
    <div className={styles.inventoryContainer}>
    <h3>Inventory</h3>
        <div className={styles.inventoryWrapper}>
            {popularProducts.map((item)=>{
                return <div className={styles.inventoryItem}>
                <div className={styles.inventoryImg}>
                    <img src={item.img}></img>
                    <div className={styles.inventoryEdit}>
                        <button onClick={()=>{handleSendItem(item)}}>Edit</button>
                        <button onClick={()=>{handleDelete(item)}}>Delete</button>
                    </div>
                </div>
                <div className={styles.inventoryItemDetails}>
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                </div>
            </div>
            })}
            <div className={styles.inventoryItem} onClick={()=>{navigate('/seller/addproduct')}}>
                <div className={styles.inventoryAddBtn}>
                    <div className={styles.addCircleBtn}>
                        <p>+</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Inventoty