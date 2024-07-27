import React, { useEffect, useState } from 'react'
import styles from "../CSS/singleproductdetails.module.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { productBase } from './data';
import axios from 'axios';
import Loader from './Loader';



function Singleproductdetails() {

    const location = useLocation();

    const [loading, setLoading] = useState(false)

    const { user } = location.state;

    const [currentUser] = useState(localStorage.getItem('currentUser')||null)

    const [showAddToCart, setAddToCart] = useState(true)

    useEffect(()=>{
        console.log(user)
    })

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const RemoveFromCart = ()=>{
        setLoading(true)
        axios.delete(`${productBase}/${currentUser}/${user.ptitle}/delete-product-from-cart`).then((responces)=>{
            setLoading(false)
            console.log(responces)
        }).catch(error => {
            setLoading(false)
        console.error('error:', error);
        });
    }


    const AddToCart =()=>{

        const headers = {
            quantity: 1, // Include authorization header if needed
          };
        setLoading(true)
        axios.post(`${productBase}/${currentUser}/${user.ptitle}/addProducts-to-cart`,{
            headers: headers
        }).then(response => {
            setLoading(false)
            console.log(response.data);
            setAddToCart(false)
            })
            .catch(error => {
                setLoading(false)
            console.error('error:', error);
            });
    }


    return (
        <div className={styles.productDetailsConatiner} >
        {loading&&<Loader />}
            <div className={styles.productImgContainer}>
                <div>
                    <div className={styles.imgMain}>
                        <img src={user.img} alt='mainimage'></img>
                    </div>
                </div>
            </div>
            <div className={styles.productDetails} id='details'>

                <h2 className={styles.productTitle}>{user.title}</h2>
                <p className={styles.productPrice}>{user.price}</p>
                <div className={styles.productFeatures}>
                    <img src='https://cdn.shopify.com/s/files/1/0646/8327/8550/files/Sunlight_1.png?v=1704258264' alt='feature'></img>
                    <img src='https://cdn.shopify.com/s/files/1/0646/8327/8550/files/not_child_friendly_a589e231-7ed5-4db6-99ff-a00bc94cac6e.png?v=1704258264' alt='feature'></img>
                    <img src='https://cdn.shopify.com/s/files/1/0646/8327/8550/files/Water_twice_2.png?v=1704258264' alt='feature'></img>
                    <img src='https://cdn.shopify.com/s/files/1/0646/8327/8550/files/Self_watering_c7fba125-1fba-4435-b88e-c70fba9f85bb.png?v=1704258264' alt='feature'></img>
                    <img src='https://cdn.shopify.com/s/files/1/0646/8327/8550/files/Pet_Friendly_1.png?v=1704269493' alt='feature'></img>
                </div>
                {/* <p className={styles.selectPotText}>Select Pot Color:</p>
                <div className={styles.chooseColor}>
                    <div className={styles.red}></div>
                    <div className={styles.red}></div>
                    <div className={styles.red}></div>
                    <div className={styles.red}></div>
                    <div className={styles.red}></div>
                </div> */}
                <p className={styles.selectPotText}>Qantity:</p>
                {!showAddToCart&&<div className={styles.chooseQuantity}>
                    <div onClick={RemoveFromCart} className={styles.minus}>-</div>
                    <div className={styles.quantity}>1</div>
                    <div onClick={AddToCart} className={styles.plus}>+</div>
                </div>}
                {showAddToCart&&<button onClick={AddToCart} className={styles.addToCart}>Add to cart</button>}
                <div className={styles.discription}>
                    <h5>Description</h5>
                    {user.description}
                </div>
                <div className={styles.specification}>
                    <h5>Features</h5>
                    <ul>
                      {user.features.map((item)=>{
                        return <li>{item}</li>
                      })}
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Singleproductdetails