import React, { useEffect, useState } from 'react'
import "../CSS/navbar.css"
import { Badge } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from './data';
import { productBase } from './data';

function Navbar() {

    const navigate = useNavigate()
    const [menuActive, setMenuActive] = useState(false)

    const [dropdown, setDopdown] = useState(false)

    const [totalCartItems, setTotalCartItems] = useState(0);

    const [token] = useState(localStorage.getItem('authToken') || null);
    const [currentUser] = useState(localStorage.getItem('currentUser')||null)


    useEffect( () =>{
        const headers = {
            Authorization: `Bearer ${token}`, // Include authorization header if needed
          };
          
            console.log(currentUser)
            axios.get(`${baseUrl}/user/get-CurrentUser`,
              {
                headers: headers,
              }
            ).then((responces)=>{console.log(responces.status)}
            ).catch(error => {
                localStorage.removeItem("authToken")
                localStorage.removeItem("currentUser")
               console.log("hi")
              console.error('error:', error);
         });

         axios.get(`${productBase}/${currentUser}/get-user-cart`).then(
            (responces)=>{ 
              setTotalCartItems(responces.data.itemQuantity.length)
            }
          ).catch((error)=>{
            console.log(error)
          })

    },[token])

    // ************************** connecting to backed *******************************

    
    
    const handleLogout = async ()=>{
        const headers = {
            Authorization: `Bearer ${token}`, // Include authorization header if needed
          };
          try{
            console.log(currentUser)
            const responces = await axios.get(`${baseUrl}/user/auth/${currentUser}/Log-out`,
              {
                headers: headers,
              }
            )
            localStorage.removeItem("authToken")
            localStorage.removeItem("currentUser")
            console.log(responces.status)
            navigate('/')
            window.location.reload()
          }catch (error){
            console.log(error)
          }
        
    }


    // ************************************************************************************


    const HandleTogleSwitch = async ()=>{

        // const headers = {
        //     Authorization: `Bearer ${token}`, // Include authorization header if needed
        //   };
        //   try{
        //     console.log(currentUser)
        //     const responces = await axios.get(`${baseUrl}/user/${currentUser}/register-as-seller`,
        //       {
        //         headers: headers,
        //       }
        //     )
        //     console.log(responces.status)
        //   }catch (error){
        //     console.log(error)
        //   }

        setTimeout(()=>{
                navigate('/seller/dashbord')
        },250)
    }

    const handleDropDown = () => {
        if (dropdown) {
            setDopdown(false)
        }
        else {
            setDopdown(true)
        }
    }

    const hadleMenu = () => {
        setMenuActive(true)
    }

    const handleClose = () => {
        setMenuActive(false)
    }

    return (
        <div>
            <div className='navbar-container' onMouseLeave={() => { setDopdown(false) }}>
                <div className='navbar-wrapper'>
                    <div className='nav-sections search-section'>
                        <div className='seller-btn'>
                            {/* <button onClick={()=>{navigate("/seller/dashbord")}}>Seller</button> */}
                            <input type="checkbox" id="check"></input>
	                        <label onClick={HandleTogleSwitch} for="check" class="toggle-seller-button"></label>
                        </div>
                        <div className='search-conatiner'>
                            <input className='search' placeholder='search'></input>
                            <button>search</button>
                        </div>
                    </div>
                    <div className='nav-sections logo-container'><div onClick={hadleMenu} className='menu-icon' ><MenuIcon /></div>Green Grove<div className='phone-cart'>
                    <Link to={'/cart'}>
                    <Badge badgeContent={totalCartItems} color="primary">
                        <ShoppingCartOutlinedIcon color="action" />
                    </Badge>
                    </Link></div></div>
                    <div className='nav-sections menu-container'>
                        <div className={`${'menu'} ${menuActive && 'active'}`}>
                            <ul className='nav-list'>
                                <li onClick={handleClose} className='closs-icon'><CloseIcon /></li>
                                {token&&<li className='profile-logo-container-phone'><div>{currentUser}</div><ArrowDropDownIcon />
                                <li className='profile-logo-container-dropdown'>
                                    <ul>
                                        <li>Profile</li>
                                        <li>Your Orders</li>
                                    </ul>
                                </li>
                                </li>}
                                <li><Link to={"/"}>Home</Link></li>
                                <li><Link to={"/product"}>Shop</Link></li>
                                <li className='dropdown'
                                    // onMouseEnter={() => { setDopdown(true) }}
                                    // onMouseLeave={() => { setDopdown(false) }}
                                // onMouseOver={handleDropDown}
                                >Category <ArrowDropDownIcon />
                                    <div className='dropdown-menu'>
                                        <ul
                                            // onMouseEnter={() => { setDopdown(true) }}
                                            // onMouseLeave={() => { setDopdown(false) }}
                                        >
                                             <li><Link to={"/"}>House Plant</Link></li>
                                            <li><Link to={"/"}>Office Plant</Link></li>
                                            <li><Link to={"/"}>Office Plant</Link></li>
                                            <li><Link to={"/"}>Decoratives</Link></li>
                                        </ul>
                                    </div>
                                </li>
                                <li><Link to={"/"}>About Us</Link></li>
                                {!token&&<li><Link to={"/login"}>Login</Link></li>}
                                {!token&&<li><Link to={"/register"}>Register</Link></li>}
                                <li className='desktop-badge'><Link to={"/cart"}>
                                <Badge badgeContent={totalCartItems} color="primary">
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                                </Link></li>
                                {token&&<li className='profile-logo-container'><div className='profile-logo'>{currentUser[0].toUpperCase()}</div>
                                <div className='dropdown-menu-profile'>
                                        <ul
                                        >
                                            <li><Link to={"/profile"}>Profile</Link></li>
                                            <li><Link to={"/orders"}>Your Orders</Link></li>
                                            <li onClick={handleLogout}>Log Out</li>
                                        </ul>
                                    </div>
                                </li>}
                                <li><div className='seller-btn p-v-seller-btn'>
                            {/* <button onClick={()=>{navigate("/seller/dashbord")}}>Seller</button> */}
                            <input type="checkbox" id="check-pv"></input>
	                        <label onClick={HandleTogleSwitch} for="check-pv" class="toggle-seller-button"></label>
                        </div>
                        </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar