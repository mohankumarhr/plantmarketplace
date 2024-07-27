import React from 'react'
import '../CSS/footer.css'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';

function Footer() {
  return (
    <div className='footer-section'>
        <div className='newsletter-conatainer'>
            <h3>Newsletter</h3>
            <p>Get the update from yor favourite products</p>
            <div className='newsletter-input'>
            <input type='text' placeholder='subscribe newsletter..'></input>
            <button>SUBSCRIBE</button>
            </div>
        </div>
        <div className='footer-conatiner'>
                <div className='footer-contact'>
                    <h4>CONTACT US</h4>
                    <p><LocationOnOutlinedIcon className='footer-icon' /><p> Sapthagiri college of engineering, Bangalore-73</p></p>
                    <p><PhoneOutlinedIcon className='footer-icon' /> <p> +91 123456789</p> </p>
                    <p><DraftsOutlinedIcon className='footer-icon' /><p> mohankumarhr2003@gmail.com</p> </p>
                </div>
                <div className='footer-info'><h4>INFORMATION</h4>
                <p>About</p>
                <p>Delivery Information</p>
                <p>Privecy Policy</p>
                <p>Customer Care</p>
                <p>Terms & Conditions</p>
                <p>Contact Us</p>
                </div>
                <div className='footer-categories'><h4>CATEGORIES</h4>
                <p>Flowring Plant</p>
                <p>Plant Seeds</p>
                <p>Luck Plant</p>
                <p>Money Plant</p>
                <p>Outdoor Plnat</p>
                <p>Indoor Plant</p>
                </div>
        </div>
        <div className='copy-right'>
            <p>2023 @ All Rights Reserved Powered By ourwebsite.com</p>
        </div>
    </div>
  )
}

export default Footer