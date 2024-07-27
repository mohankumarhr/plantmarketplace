import React, { useEffect, useState } from 'react'
import styles from "../CSS/addaddress.module.css"
import { Password } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close';
import { baseUrl } from './data';
import axios from 'axios';

function AddAddress(props) {

    const [addAddress, setAddress] = useState({
        fullName: "",
        phone:"",
        state:"",
        city:"",
        country:"",
        landmark:"",
        pincode:"",
        streetDetails:"",
        houseDetails:""
    
})



    const [currentUser] = useState(localStorage.getItem('currentUser')||null)

    const [token] = useState(localStorage.getItem('authToken') || null);

    // const [useeffectRun, setUseEffectRun] = useState(true)

    const handleClose = ()=>{
        setAddress({
            fullName:"",
            phone:"",
            state:"",
            city:"",
            country:"",
            landmark:"",
            pincode:"",
            streetDetails:"",
            houseDetails:""
        
    })
    console.log(props.changeItem)
    props.onClicked(false)
    }


    useEffect(()=>{
        // if (useeffectRun) {
        //     const readdata = async ()=>{
        //         if(props.changeItem){
        //             setAddress(props.changeItem)
        //         }
        //         console.log(props.changeItem)
        //        }
        //        readdata()
        // }
        setAddress(props.changeItem)
     },[props.changeItem])

    const handleCurrentLocation = ()=>{
        navigator.geolocation.getCurrentPosition(pos=>{
            const {latitude,longitude} = pos.coords;
            console.log(latitude,longitude)
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            fetch(url).then(res=>res.json()).then(data=>setAddress({
                fullName:"",
                phone:"",
                state:data.address.state,
                city: data.address.city,
                country:data.address.country,
                landmark:"",
                pincode:data.address.postcode,
                streetDetails:data.address.city_district,
                houseDetails:""
            
        }))
        })
    }


    const saveAddress = async ()=>{

    const formateddata = {
        fullName: addAddress.fullName,
        phone:addAddress.phone,
        state: addAddress.state,
        city: addAddress.city,
        country: addAddress.country,
        landmark: addAddress.landmark,
        pincode: addAddress.pincode,
        streetDetails: addAddress.streetDetails,
        houseDetails: addAddress.houseDetails
    
}

console.log('Address Details', formateddata);

    const headers = {
        Authorization: `Bearer ${token}`, // Include authorization header if needed
      };
   
      let addUrl = ``
      if(props.update){
        addUrl = `${baseUrl}/user/update-Address/${currentUser}/${props.changeItem.fullName}`  
      }
      else{
        addUrl = `${baseUrl}/user/add-Address/${currentUser}`
      }
      
      

    axios.post(addUrl, formateddata, 
    {
        headers: headers,
      }
   
    )
      .then(response => {
        // Handle the response
        console.log(response.status);
        props.onClicked(false)
        setAddress({
            fullName:"",
            phone:"",
            state:"",
            city:"",
            country:"",
            landmark:"",
            pincode:"",
            streetDetails:"",
            houseDetails:""
        
    })
        }
      )
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
    }

    const handleChange = (e)=>{
        // setUseEffectRun(false)
        const {name, value} = e.target
        setAddress({
            ...addAddress,
            [name]: value
        })
    }

  return (
    <div className={styles.addAddressContainer}>
    <label>Full Name
    <input
        name='fullName'
        type='text'
        value={addAddress.fullName}
        onChange={handleChange}
        ></input>
    </label>
    <label>Phone Number
    <input
        name='phone'
        type='text'
        value={addAddress.phone}
        onChange={handleChange}
        ></input>
    </label>
    <label>State
    <input
        name='state'
        type='text'
        value={addAddress.state}
        onChange={handleChange}
        ></input>
    </label>
    <label>City
    <input
        name='city'
        type='text'
        value={addAddress.city}
        onChange={handleChange}
        ></input>
    </label>
    <label>Country
    <input
        name='country'
        type='text'
        value={addAddress.country}
        onChange={handleChange}
        ></input>
    </label>
    <label>Landmark
    <input
        name='landmark'
        type='text'
        value={addAddress.landmark}
        onChange={handleChange}
        ></input>
    </label>
    <label>Street Details
    <input
   
        name='streetDetails'
        type='text'
        value={addAddress.streetDetails}
        onChange={handleChange}
        ></input>
    </label>
    <label>House Details
    <input
    
        name='houseDetails'
        type='text'
        value={addAddress.houseDetails}
        onChange={handleChange}
        ></input>
    </label>
    <label>Pincode
    <input
        name='pincode'
        type='text'
        value={addAddress.pincode}
        onChange={handleChange}
        ></input>
    </label>
    <button className={styles.currentLocationBtn} onClick={handleCurrentLocation}>current location</button>
    <button onClick={saveAddress} className={styles.addressSave}>Save</button>
    <div onClick={handleClose} className={styles.addressCancel}> <CloseIcon  /></div>
    </div>
  )
}

export default AddAddress