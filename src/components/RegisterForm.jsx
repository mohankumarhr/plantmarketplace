import React, { useState } from 'react'
import Input from './Input'
import styles from "../CSS/register.module.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from './data'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Loader from './Loader'

function RegisterForm() {

  const [loading, setLoading] = useState(false)

  const [registerValues, setRegisterValues] = useState({
    userName:"",
    userPassword:"",
    userEmail:"",
    userPhone:"",
    firstName:"",
    lastName:""
  })

  const [verifyLink, setVerifyLink] = useState(false)

  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)

  const [signUp2, setSignUp2] = useState(false)

  const [isIncorrect, setIsIncorrect] = useState(false)

  // ****************************************************************************************


  const handleRegister = async (e)=>{
    e.preventDefault();
    setLoading(true)
    console.log('Admin Details:', registerValues);
    axios.post(`${baseUrl}/user/auth/create-user`, registerValues, 
    )
      .then(response => {
        // Handle the response
        setLoading(false)
        console.log(response.data);
        setVerifyLink(true)
      })
      .catch(error => {
        // Handle errors
        setLoading(false)
        setIsLogin(false)
        setIsIncorrect(true)
        console.error('Error:', error);
      });
  }


  const handleResend = (e)=>{
    e.preventDefault()
    axios.put(`${baseUrl}/user/verify/regenerate-otp?email=${registerValues.userEmail}`).then(responce => {console.log(responce.status)})
  }

  // ********************************************************************************************


  function handleChange(e) {
    const {name, value} = e.target
    setRegisterValues({
      ...registerValues,
      [name]: value
    })
    console.log(registerValues)
  }


  const handleSing2 = ()=>{
    setSignUp2(true)
  }

  const handleBackSpace = ()=>{
    setSignUp2(false)
  }


  return (
    <div className={styles.registerFormContainer}>
    {loading&&<Loader />}
    {!verifyLink&&<form className={styles.registerForm}>
    <h3>Sign Up</h3>
    {isIncorrect&&<div className={styles.incorrect}>Email or Username already exists</div>}
    {!signUp2&&<div className={styles.registerSubFrom}>
    <div className={styles.registerInputBox}>
      <input 
        label="First Name:"
        type="text"
        name='firstName'
        plassholder=""
        value={registerValues.firstName}
        onChange={handleChange}
        required
      ></input>
      <span>First Name</span>
      </div>
      
      <div className={styles.registerInputBox}>
      <input 
        label="Last Name:"
        type="text"
        name='lastName'
        plassholder=""
        value={registerValues.lastName}
        onChange={handleChange}
        required
     ></input>
     <span>Last Name</span>
      </div>
      <div className={styles.registerInputBox}>
      <input 
        label="Phone Number:"
        type="text"
        name='userPhone'
        plassholder=""
        value={registerValues.userPhone}
        onChange={handleChange}
        required
      ></input>
      <span>Phone Number</span>
      </div>
      <div className={styles.registerInputBox}>
      <input 
        label="Email:"
        type="email"
        name='userEmail'
        plassholder=""
        value={registerValues.userEmail}
        onChange={handleChange}
        required
      ></input>
      <span>Email</span>
      </div>
      <button type='submit' onClick={handleSing2}>Continue</button>
      </div>}
      {signUp2&&<div className={styles.registerSubFrom}>
    <div onClick={handleBackSpace} className={styles.backSpace}><KeyboardBackspaceIcon /></div>  
    <div className={styles.registerInputBox}>
    <input 
        type="text"
        name='userName'
        plassholder=""
        value={registerValues.userName}
        onChange={handleChange}
        required
      ></input>
      <span>Username</span>
    </div>
    <div className={styles.registerInputBox}>
    <input 
        type="password"
        name='userPassword'
        plassholder=""
        value={registerValues.userPassword}
        onChange={handleChange}
        required
      ></input>
      <span>Password</span>
    </div>
    <button onClick={handleRegister}>Sign Up</button>
    </div>}
      <p>If you already have an account then <Link to={'/login'}>Login</Link></p>
    </form>}
    {verifyLink&&<form className={styles.registerForm}>
    <div>
      <p>A verification email as been sent to {registerValues.userEmail} if not click <a onClick={handleResend} href='#'>Resend</a></p>
      <button style={{marginTop: "20px"}} ><Link to={'/login'}>Login</Link></button>
    </div>
    </form>}
    </div>
  )
}

export default RegisterForm