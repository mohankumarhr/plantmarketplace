import React, { useEffect, useState } from 'react'
import styles from '../CSS/addproduct.module.css'
import Previews from './DropZone'
import Input from './Input'
import axios from 'axios'
import { productBase } from './data'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader'

function UpdateProduct(props) {

    const [loading, setLoading] = useState(false)

    const location = useLocation();

    const navigate = useNavigate()

    const { user } = location.state;

    const [files, setFiles] = useState([])

    const [currentUser] = useState(localStorage.getItem('currentUser')||null)

    const [selectedOption, setSelectedOption] = useState(user.category);
    const [classInputValues, setClassInputValues] = useState({});

    const [productDetails, setProductDetails] = useState({
        title: user.title,
        desc: user.description,
        price: user.price,
        additional: '',
        quantity:user.quantity
    })

    const [tryy, settryy] = useState("hello")

    const options = ["House Plant", "Office Plant", "Garden Plant"]

    const features = ['low Mantainence', "Attractive Foliage", "Pollinator Frieldly", "frangnance", "longevity", "Adaptable", "less Watring"]


    const [selectedFeatures, setFeatures] = useState([])

    const [isImgChanged, setImageChanged] = useState(false)

    const OnRemoveImg = ()=>{
        setImageChanged(true)
    }

// ***************************************************************************************
    const uploadProduct = ()=>{

        const featureslist = []
        for (let i = 0; i < selectedFeatures.length; i++) {
            const newele = {
                fname: selectedFeatures[i]
            };
            featureslist.push(newele)
        }

        const formateDetails = {
            category: selectedOption,
            features: featureslist,
            pimageURL: null,
            ptitle: productDetails.title,
            pdescription: productDetails.desc,
            pprice: String(productDetails.price),
            quantity: productDetails.quantity
        }

        console.log(selectedFeatures)
        console.log(files[0])
        console.log(productDetails)
        console.log(selectedOption)
        console.log(formateDetails)

        


        console.log('Product Details:', formateDetails);
        setLoading(true)
        axios.post(`${productBase}/seller/${currentUser}/update-product/${user.ptitle}`, formateDetails, 
        )
          .then(response => {
            // Handle the response
            console.log(response.data);

            if (files) {
                const formData = new FormData();
            formData.append('image', files[0]);

            axios.post(`${productBase}/${currentUser}/file/${formateDetails.ptitle}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
                }
                })
                .then(response => {
                setLoading(false)
                console.log(response.data);
                
                })
                .catch(error => {
                setLoading(false)
                console.error('Error uploading image:', error);
                
                });
            }
            setLoading(false)
            navigate('/seller/dashbord')
          })
          .catch(error => {
            // Handle errors
            setLoading(false)
            console.error('Error:', error);
          });



    }
// ********************************************************************************************

    function handleFile(f) {
        console.log(f)
        setFiles(f)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setProductDetails({
            ...productDetails,
            [name]: value,
        });
    };


    const handleOptionChange = (event) => {
        const selected = event.target.value;
        setSelectedOption(selected);
        // Clear input values when the option changes
        console.log(selectedOption)
    }


    const handleFeatures = (index) => {
        const newItem = features[index]
        if (selectedFeatures.indexOf(newItem) < 0) {
            setFeatures([
                ...selectedFeatures,
                newItem
            ])
            document.getElementsByClassName(`${styles.featureItem}`)[index].classList.add(`${styles.selectedFeature}`)
        }
        else {
            const featureList = [...selectedFeatures]

            setFeatures(featureList.filter((item, index) => { return index !== selectedFeatures.indexOf(newItem) }))
            document.getElementsByClassName(`${styles.featureItem}`)[index].classList.remove(`${styles.selectedFeature}`)
        }


    }

    useEffect(() => {
        console.log(user)

        for (const element of selectedFeatures) {
            console.log(features.indexOf(element))
        }
        const element = []
        for (let i = 0; i < user.features.length; i++) {
            element.push(user.features[i])
            console.log(user.features[i])
        }
        setFeatures(element)
        settryy("hi")
        console.log(tryy)
    },[])

    useEffect(()=>{
        console.log("hihhh")
        console.log("features" ,selectedFeatures)
        for (let i = 0; i < selectedFeatures.length; i++) {
            const index = features.indexOf(selectedFeatures[i])
            console.log("in")
            document.getElementsByClassName(`${styles.featureItem}`)[index].classList.add(`${styles.selectedFeature}`)
        }
    })

    const styless = {
        width: '300px',
        height: '300px',
      };

  return (
    <div className={styles.addProductContainer}>
    {loading&&<Loader />}
    <h3>Update Product</h3>
    <div className={styles.addProductFrom}>
   {isImgChanged&&<div className={styles.addProductImgContainer}>
        <Previews
            handleChange={handleFile}
        />
        </div>}
        {!isImgChanged&&<div style={styless} className={styles.addProductImgContainer}>
            <img style={styless} src={user.img}></img>
            <button onClick={OnRemoveImg}>Remove</button>
        </div>}
        <div className={styles.addProductFromContainer}>
        <div className={styles.formBox1}>
            <Input
            name="title"
                label="Title"
                type="text"
                plassholder=""
                value={productDetails.title}
                changeValue={handleChange}
            />
            <select value={selectedOption} onChange={handleOptionChange}>
                <option value="">choose  category</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
        <div className={styles.featuresInput}>
            <label>Features</label>
            <div className={styles.fetureslist}>
                {features.map((item, index) => {
                    return <div className={`${styles.featureItem}`}
                        onClick={() => { handleFeatures(index) }}
                    >{item}</div>
                })}
            </div>
        </div>
        <div className={styles.descriptionBox}>
            <label>Description</label>
            <textarea onChange={handleChange} value={productDetails.desc} name='desc' rows={4}></textarea>
        </div>
        <div className={styles.descriptionBox}>
            <label>Additional Information (optional)</label>
            <textarea onChange={handleChange} value={productDetails.additional} name='additional' rows={2}></textarea>
        </div>
        <div className={styles.pricebox}>
            <label>Price</label>
            <input onChange={handleChange} name='price' value={productDetails.price} type='number'></input>
            <label>Quantity</label>
            <input onChange={handleChange} name='quantity' value={productDetails.quantity} type='number'></input>
        </div>
        <button onClick={uploadProduct}>Update Product</button>
        </div>
    </div>
</div>
  )
}

export default UpdateProduct