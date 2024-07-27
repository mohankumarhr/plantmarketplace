import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import "../CSS/popularproduct.css"
import { popularProducts } from './data'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Popularproduct() {


  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [ProductData, setProductData] = useState([])


  const notify = () => toast.success("Added to cart", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: Bounce
    });


    useEffect(() => {
        const fetchData = async () => {
          
          try {
        
    
            // Make a GET request with headers
            const response = await axios.get(`https://product-service-zx9b.onrender.com/seller/ /get-products`);
    
            // Handle the server response
            console.log('Server Response:', response.data);
            // const splitList = response.data.split()
            setProductData(response.data.slice(0,8))
          } catch (error) {
            // Handle errors
            console.error('Error:', error);
          }
        };
    
        // Call the fetchData function
        fetchData();
      }, [token]);

  return (
    <div className='popular-product-container'>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce
        />
    <h3>PopularProducts</h3>
    <div className='popular-product-section'>
    {popularProducts.map((item)=>{
        return <ProductItem item={item} key={item.id} notification={notify}/>
    })}
    </div>
    <div className='all-products'>
        <a href='/'>All Products</a>
    </div>
    </div>
  )
}

export default Popularproduct