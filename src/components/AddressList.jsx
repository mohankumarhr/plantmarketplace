import React, { useEffect, useState } from 'react'
import styles from '../CSS/addresslist.module.css'
import { addressList } from './data'
import { baseUrl } from './data';
import axios from 'axios';

function AddressList(props) {

  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  // const [addressList, setAddressList] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {

  //       const headers = {
  //           Authorization: `Bearer ${token}`, // Include authorization header if needed
  //         };      
  //     try {
  //       // Make a GET request with headers
  //       const response = await axios.get(`${baseUrl}/user/get-User`,
  //       {
  //           headers: headers,
  //         }
  //       );

  //       // Handle the server response
  //       console.log('Server Response:', response.data);
  //       if (response.data.address!=[]) {
  //         setAddressList(response.data.address)
  //       }else{
  //         setAddressList(["No Address saved add one"])
  //       }
        
  //     } catch (error) {
  //       // Handle errors
  //       console.error('Error:', error);
  //     }
  //   };

  //   // Call the fetchData function
  //   console.log("hello",addressList)
  //   fetchData();
  // }, [token]);

  return (
    <div className={styles.addressList}>
        {addressList.length!=0?addressList.map((item)=>{
            return <div className={styles.addreessItem} onClick={()=>{props.onClicked(false, item)}}>
                <p>{item.fullName} <br></br> {item.houseDetails}, {item.streetDetails}, {item.landmark}, <br></br>{item.city}-{item.pincode} ,{item.state}, <br></br>{item.country},
                 {item.phone}
                </p>
            </div>
        }):<div onClick={()=>{props.onClicked(false, null)}}>No address saved Add one</div>}
    </div>
  )
}

export default AddressList