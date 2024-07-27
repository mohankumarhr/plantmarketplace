import React, { useEffect, useState } from 'react'
import styles from "../CSS/profile.module.css"
import AddAddress from './AddAddress'
import { baseUrl } from './data'
import axios from 'axios';

function ProfileDetails() {

    const [token, setToken] = useState(localStorage.getItem('authToken') || null);

    const [currentUser] = useState(localStorage.getItem('currentUser')||null)

    const [changeList, setChangeList] = useState([])
    const [chnagedValues, setChangedvalues] = useState({})

    const [registerValues, setRegisterValues] = useState({
    })

    const [isAddAddress, setAddAdddress] = useState(false)

    const [profileEdit, setProfileEdit] = useState(false)

    const [addressList, setAddressList] = useState([])

    const [addressChangeItem, setAddressChangeItem] = useState(true)

    const [addressUpdate, setAddressUpdate] = useState(false)

    const [tryy, settryy] = useState("hello")

    function handleChange(e) {
        const { name, value } = e.target
        setRegisterValues({
            ...registerValues,
            [name]: value
        })
        setChangedvalues({
            ...chnagedValues,
            [name]:value
        })
        if(changeList.indexOf(name)<0){
            setChangeList([
                ...changeList,
                name
            ])
        }
        
        console.log(registerValues)
        console.log(changeList)
    }

    const handleAddAddress = (item)=>{
        setAddAdddress(item)
        setAddressUpdate(false)
        setAddressChangeItem({
            ...addressChangeItem,
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


    useEffect(() => {
        const fetchData = async () => {

            const headers = {
                Authorization: `Bearer ${token}`, // Include authorization header if needed
              };      
          try {
            // Make a GET request with headers
            const response = await axios.get(`${baseUrl}/user/get-User`,
            {
                headers: headers,
              }
            );
    
            // Handle the server response
            console.log('Server Response:', response.data);
            setRegisterValues(response.data)
            setAddressList(response.data.address)
          } catch (error) {
            // Handle errors
            console.error('Error:', error);
          }
        };
    
        // Call the fetchData function
        fetchData();
      }, [token]);





      const handleProfileEdit = ()=>{
        setProfileEdit(true)
      }

      const handleAdddresEdit = (bool,item)=>{
            console.log(addressChangeItem)
            setAddressUpdate(true)
            setAddAdddress(bool)
            setAddressChangeItem(item)
           
        
      }

    const handleProfileSave = async ()=>{
        const changes = changeList.join(" ")
        console.log(chnagedValues)
        const headers = {
            Authorization: `Bearer ${token}`, // Include authorization header if needed
          };      
      try {
        // Make a GET request with headers
        const response = await axios.post(`${baseUrl}/user/update-user/${currentUser}/${changes}`, chnagedValues ,
        {
            headers: headers,
          }
        );

        // Handle the server response
        console.log('Server Response:', response.data);
        setProfileEdit(false)
      } catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    }


    return (
        <div className={styles.profileConatiner}>
        <div className={`${styles.addAddressMainContainer} ${isAddAddress&&styles.showAddAddress}`}>
              <AddAddress 
                onClicked={handleAddAddress}
                changeItem = {addressChangeItem}
                update = {addressUpdate}
              />
        </div>
            <h2>Hey {registerValues.username}</h2>
            <div className={styles.profileDetails}>
                <div className={styles.profileHeading}>
                    <h4>About</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
                <div className={styles.ProfileDetailsContainer}>
                    <label>
                        Username
                    </label>
                    <input
                        className={!profileEdit&&styles.profileEditStyle}
                        readOnly={profileEdit ? false : true}
                        required
                        type="text"
                        name="username"
                        value={registerValues.username || ''}
                        onChange={handleChange}>
                    </input>
                    <label>
                        First Name
                    </label>
                    <input
                     className={!profileEdit&&styles.profileEditStyle}
                        readOnly={profileEdit ? false : true}
                        required
                        type="text"
                        name="firstName"
                        value={registerValues.firstName || ''}
                        onChange={handleChange}>
                    </input>
                    <label>
                        Last Name
                    </label>
                    <input
                     className={!profileEdit&&styles.profileEditStyle}
                        readOnly={profileEdit ? false : true}
                        required
                        type="text"
                        name="lastName"
                        value={registerValues.lastName || ''}
                        onChange={handleChange}>
                    </input>
                    <label>
                        Phone Number
                    </label>
                    <input
                     className={!profileEdit&&styles.profileEditStyle}
                        readOnly={profileEdit ? false : true}
                        required
                        type="text"
                        name="userPhone"
                        value={registerValues.userPhone || ''}
                        onChange={handleChange}>
                    </input>
                    <label>
                        Email
                    </label>
                    <input
                     className={!profileEdit&&styles.profileEditStyle}
                        readOnly={profileEdit ? false : true}
                        required
                        type="email"
                        name="userEmail"
                        value={registerValues.userEmail || ''}
                        onChange={handleChange}>
                    </input>
                    {!profileEdit&&<button onClick={handleProfileEdit}>Edit</button>}
                    {profileEdit&&<button onClick={handleProfileSave}>Save</button>}
                    <a href='#'>Change Password</a>
                </div>
            </div>
            <div className={styles.addressContainer}>
                <div className={styles.profileHeading}>
                    <h4>Address</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
                <div className={styles.addressDetailsContainer}>
                    {addressList.map((item)=>{
                        return <div className={styles.userAddress}>
                        <h5>{item.fullName}</h5>
                        <p>{item.houseDetails}, {item.streetDetails}, {item.landmark}, <br></br>{item.city}-{item.pincode} ,{item.state}, <br></br>{item.country},
                            {item.phone}
                            </p>
                    <button onClick={(e)=>{handleAdddresEdit(true,item)}}>Edit</button>
                    </div>
                    })}
                    <button className={styles.addAddressbtn} onClick={()=>{handleAddAddress(true)}}>Add Address</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails