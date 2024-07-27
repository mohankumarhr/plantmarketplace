import React, { useState } from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import "../CSS/productitem.css"
import axios from 'axios';
import { productBase } from './data';
import { useNavigate } from 'react-router-dom';


function ProductItem(props) {

    const [currentUser] = useState(localStorage.getItem('currentUser')||null)

    const navigate = useNavigate()

    const GoToSinglePage = ()=>{
        
        navigate('/productitem', { state: { user: props.item } });
    }

    const AddToCart =()=>{

        const headers = {
            quantity: 1, // Include authorization header if needed
          };
        
        axios.post(`${productBase}/${currentUser}/${props.item.ptitle}/addProducts-to-cart`,{
            headers: headers
        }).then(response => {
            console.log(response.data);
            props.notification()
            })
            .catch(error => {
            props.outOfStock()
            console.error('error:', error);
            });
    }

  return (
    <div className='product-container'>
   
        <div  className='product-img'>
        <img src={props.item.img} alt='img'></img>
        <div className='product-icon'>
            <div onClick={AddToCart} className='icon'>
                <ShoppingCartOutlinedIcon className='icon-item' />
            </div>
            <div className='icon'>
                <InfoOutlinedIcon className='icon-item' />
            </div>
            <div className='icon'>
                <FavoriteBorderOutlinedIcon className='icon-item' />
            </div>
        </div>
        </div>
        <div className='product-info' onClick={GoToSinglePage}>
            <a onClick={GoToSinglePage} className='product-title'>{props.item.title}</a>
            <a href='/' className='rating'>{props.item.rating}</a>
            <a  className='price'>₹{props.item.price}</a>
        </div>
    </div>
  )
}

export default ProductItem