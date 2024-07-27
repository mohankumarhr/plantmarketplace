import React, { useState } from 'react'
import "../CSS/navbar.css"
import "../CSS/sellernavbar.css"
import { Badge } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useNavigate } from 'react-router-dom';

function SellerNavbar() {

    const [token] = useState(localStorage.getItem('authToken') || null);
    const [currentUser] = useState(localStorage.getItem('currentUser')||null)

    const navigate = useNavigate()

    const HandleTogleSwitch = ()=>{
        setTimeout(()=>{
            navigate('/')
        },300)
    }

    const [menuActive, setMenuActive] = useState(false)

    const hadleMenu = () => {
        setMenuActive(true)
    }

    const handleClose = () => {
        setMenuActive(false)
    }

  return (
    <div>
    <div className='navbar-container seller-navbar-container' >
        <div className='navbar-wrapper'>
            <div className='nav-sections search-section seller-btn-container'>
                <div className='seller-btn sell-btn'>
                    {/* <button onClick={()=>{navigate('/')}}>Buyer</button> */}
                    <input type="checkbox" id="check"></input>
	                <label onClick={HandleTogleSwitch} for="check" class="toggle-buyer-button"></label>
                </div>
            </div>
            <div className='nav-sections logo-container'><div onClick={hadleMenu} className='menu-icon' ><MenuIcon /></div>Shop.<div className='phone-cart'>
            {/* <Badge badgeContent={4} color="primary">
                <ShoppingCartOutlinedIcon />
            </Badge> */}</div></div>
            <div className='nav-sections menu-container'>
                <div className={`${'menu'} ${menuActive && 'active'}`}>
                    <ul className='nav-list seller-nav-list'>
                        <li onClick={handleClose} className='closs-icon'><CloseIcon /></li>
                        {token&&<li className='profile-logo-container-phone'><div>{currentUser}</div><ArrowDropDownIcon />
                                <li className='profile-logo-container-dropdown'>
                                    <ul>
                                        <li>Profile</li>
                                        <li>Your Orders</li>
                                    </ul>
                                </li>
                                </li>}
                        <li><Link to={'/seller/dashbord'}>Dashbord</Link></li>
                        <li><Link to={'/seller/addproduct'}>Add Product</Link></li>
                        {!token&&<li><Link to={"/login"}>Login</Link></li>}
                        {!token&&<li><Link to={"/register"}>Register</Link></li>}
                        {token&&<li className='profile-logo-container'><div className='profile-logo'>{currentUser[0].toUpperCase()}</div>
                                <div className='dropdown-menu-profile'>
                                        <ul
                                        >
                                            <li><Link to={"/profile"}>Profile</Link></li>
                                            <li><Link to={"/orders"}>Your Orders</Link></li>
                                            {/* <li onClick={handleLogout}>Log Out</li> */}
                                        </ul>
                                    </div>
                                </li>}
                        <li><div className='seller-btn p-v-seller-btn'>
                            {/* <button onClick={()=>{navigate("/seller/dashbord")}}>Seller</button> */}
                            <input type="checkbox" id="check2"></input>
	                <label onClick={HandleTogleSwitch} for="check2" class="toggle-buyer-button"></label>
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

export default SellerNavbar