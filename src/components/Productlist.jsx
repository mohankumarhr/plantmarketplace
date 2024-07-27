import React, { useEffect, useState } from 'react'
import "../CSS/productlist.css"
import ProductItem from './ProductItem'
import { popularProducts } from './data'
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popularproduct from './Popularproduct';

function Productlist() {


    const [token, setToken] = useState(localStorage.getItem('authToken') || null);
    const [ProductData, setProductData] = useState([])
    const [featureFilter, setFeatureFilter] = useState([])
    const [categoryFilter, setCategoryFilter] = useState([])
    const [filteredProduct, setFilteredProduct] = useState([])
    const [minmax, setMinMax] = useState({
        min:"",
        max:""
    })


    useEffect(() => {
        const fetchData = async () => {
          
          try {
        
    
            // Make a GET request with headers
            const response = await axios.get(`https://product-service-zx9b.onrender.com/seller/ /get-products`);
    
            // Handle the server response
            console.log('Server Response:', response.data);
            setProductData(response.data)
            setFilteredProduct(response.data)
          } catch (error) {
            // Handle errors
            console.error('Error:', error);
          }
        };
    
        // Call the fetchData function
        fetchData();
      }, [token]);


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


      const notifyError = () => toast.info('Out of stock!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });  

    const handleFilterDisplay = ()=>{
        document.querySelector('.filter-container').classList.add('show-filter')
    }

    const handleFilter = ()=>{
        console.log(categoryFilter)
        console.log(featureFilter)
        console.log(minmax)
        if (categoryFilter.length!==0 || featureFilter.length!==0||(minmax.min!==""&&minmax.max!=="")) {
            const tempData = ProductData
            let  tempFiltered = categoryFilter.length!==0?[]:tempData
            if (categoryFilter.length!==0) {
                
               tempFiltered = tempData.filter((item)=>{
                    return categoryFilter.indexOf(item.category)>-1  
                })
            }
            if (featureFilter.length!==0) {
                for (let i = 0; i < featureFilter.length; i++) {
                      tempFiltered=tempFiltered.filter((item)=>{
                      const  itemFeatures = item.features.map(obj => obj["fname"]);
                        console.log(item.features)
                        console.log(itemFeatures.indexOf("Attractive Foliage"))
                        return itemFeatures.indexOf(featureFilter[i])>-1  
                    })
                    
                }
                console.log("filtered",tempFiltered)
            } 
            if (minmax.min!==""&&minmax.max!=="") {
                tempFiltered = tempFiltered.filter((item)=>{
                    return item.pprice >= Number(minmax.min) && item.pprice <= Number(minmax.max)
                })
            }
            setFilteredProduct(tempFiltered)
        }
        else{
            setFilteredProduct(ProductData)
        }
        document.querySelector('.filter-container').classList.remove('show-filter')
        console.log("filtered products", filteredProduct)
    }

    const handleFeaCheckBox = (e)=>{
        if (e.target.checked) {
            console.log(e.target.value,"add")
           const tempList = featureFilter
            tempList.push(e.target.value)
            setFeatureFilter(tempList)
        }
        else{
            console.log(e.target.value,"remove")
            if (featureFilter.indexOf(e.target.value)>-1) {
                const tempList = featureFilter
                tempList.splice(featureFilter.indexOf(e.target.value),1)
                setFeatureFilter(tempList)
            }
        }
        
    }

    const handleMinMax = (e)=>{
        const {name, value} = e.target
        setMinMax({
            ...minmax,
            [name]: value
        })
        console.log(minmax)
        }

    const handleCatCheckBox = (e)=>{
        if (e.target.checked) {
            console.log(e.target.value,"add")
            const tempList = categoryFilter
            tempList.push(e.target.value)
            setCategoryFilter(tempList)
        }
        else{
            console.log(e.target.value,"remove")
            const tempList = categoryFilter
            tempList.splice(categoryFilter.indexOf(e.target.value),1)
            setCategoryFilter(tempList)
        }
        
    }

    return (
        <div className='product-section-container'>
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
        <div className='filter-icon' onClick={handleFilterDisplay}>Filter<FilterListIcon/></div>
            <div className='filter-container'>
                <h3>FILTER BY</h3>
                <div className='filter-range'>
                    <h5>RANGE</h5>
                    <div className='range-input'>
                        <div className='range-min'>
                            <label>Min</label>
                            <input type='number' name='min' value={minmax.min} onChange={handleMinMax} placeholder='₹0'></input>
                        </div>
                        <div className='range-max'>
                            <label>Max</label>
                            <input type='number' name='max' value={minmax.max} onChange={handleMinMax} placeholder='₹0'></input>
                        </div>
                    </div>
                </div>
                <div className='filter-color'>
                    <h5>CATEGORY</h5>
                    <div className='checkbox-input'>
                        <label>House Plant</label>
                        <input type='checkbox' onChange={handleCatCheckBox} value={"House Plant"}></input>
                    </div>
                    <div className='checkbox-input'>
                        <label>Office Plant</label>
                        <input type='checkbox' onChange={handleCatCheckBox} value={"Office Plant"}></input>
                    </div>

                    <div className='checkbox-input'>
                        <label>Grden Plant</label>
                        <input type='checkbox' onChange={handleCatCheckBox} value={"Garden Plant"}></input>
                    </div>

                    <div className='checkbox-input'>
                        <label>Auspicious Plant</label>
                        <input type='checkbox' onChange={handleCatCheckBox} value={"Auspicious Plnat"}></input>
                    </div>

                </div>
                <div className='filter-brand'>
                    <h5>FEATURES</h5>
                    <div className='checkbox-input'>
                        <label>low Mantainence</label>
                        <input type='checkbox' onChange={handleFeaCheckBox} value={"low Mantainence"}></input>
                    </div>

                    <div className='checkbox-input'>
                        <label>Attractive Foliage</label>
                        <input type='checkbox' onChange={handleFeaCheckBox} value={"Attractive Foliage"}></input>
                    </div>

                    <div className='checkbox-input'>
                        <label>Pollinator Frieldly</label>
                        <input type='checkbox' onChange={handleFeaCheckBox} value={"Pollinator Frieldly"}></input>
                    </div>
                    <div className='checkbox-input'>
                        <label>frangnance</label>
                        <input type='checkbox' onChange={handleFeaCheckBox} value={"frangnance"}></input>
                    </div>
                    <div className='checkbox-input'>
                        <label>longevity</label>
                        <input type='checkbox' onChange={handleFeaCheckBox} value={"longevity"}></input>
                    </div>
                    <div className='checkbox-input'>
                        <label>Adaptable</label>
                        <input type='checkbox' onChange={handleFeaCheckBox} value={"Adaptable"}></input>
                    </div>
                    <div className='checkbox-input'>
                        <label>less Watring</label>
                        <input type='checkbox' onChange={handleFeaCheckBox} value={"less Watring"}></input>
                    </div>
                </div>
                <button onClick={handleFilter}>Apply</button>
            </div>
            <div className='product-page-container'>
                {popularProducts.map((item) => {
                    return <ProductItem item={item} key={item.id} notification={notify} outOfStock={notifyError}/>
                })}
            </div>
        </div>
    )
}

export default Productlist