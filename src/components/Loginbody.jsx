import React, { useState } from 'react'
import style from "../CSS/loginbody.module.css"
import Input from "./Input"
import styles from "../CSS/register.module.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from './data'
import Loader from './Loader'


function Loginbody() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [inputValues, setInputValues] = useState({
      userName:'',
      userPassword:''
    })
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const [isActive, setIsActive] = useState(false);

const [forgotEmail, setForgotEmail] = useState('')

const [isForgot, setForgot] = useState(false)

  // *********************************** connecting backed *********************************


  const [token, setToken] = useState(localStorage.getItem('authToken') || null);

  const [isLogin, setIsLogin] = useState(true)


  const handleLogin = async (e) => {
    e.preventDefault()
     setLoading(true)
    console.log('Login Details', inputValues);
   
    axios.post(`${baseUrl}/user/auth/login-user`, inputValues, 
   
    )
      .then(response => {
        // Handle the response
        setLoading(false)
        console.log(JSON.stringify(response.data));
        const stringData = JSON.stringify(response.data)
        const data = JSON.parse(stringData)
        if (data !== "Credentials Invalid !!") {
          console.log(data)
          localStorage.setItem('authToken', data.jwtToken);
          setToken(localStorage.getItem('authToken'))
          localStorage.setItem('currentUser', data.userName);
          navigate('/')
          // window.location.reload()
        }
        else{
          setIsLogin(false)
        }
         
      })
      .catch(error => {
        // Handle errors
        setLoading(false)
        setIsLogin(false)
        console.error('Error:', error);
      });
      
     
  };



  // *******************************************************************************************


  function handleChange(e) {
    const {name, value} = e.target
    setInputValues({
      ...inputValues,
      [name]: value
    })
    console.log(inputValues)
  }

  const handleForgotChange = (e)=>{
    setForgotEmail(e.target.value)
  }

  const handleForgot = (e)=>{
    e.preventDefault()
    setForgot(true)
  }

  const handleForgotBtn = async (e)=>{
    e.preventDefault()
    const params = {
      email: forgotEmail,
    };
    axios.post(`${baseUrl}/user/verify/fotgot-password`, {
    params: params
    }).then(data =>{console.log(data)})
    .catch(error=>{
      console.log(error)
    })
  }

  const handleClick = (e) => {
    e.preventDefault()
    console.log(inputValues)
    setIsActive(true)
  }


  const handleOtpClick = (e)=>{
    e.preventDefault()
    console.log(otp.join(''))
  }


  const handleOtpChange = (e, index) => {
    const otpNum = String(e.target.value)
    console.log(e.target.value)
    if (otpNum.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = otpNum
      setOtp(newOtp)
    }
    if (otpNum.length >= 1 && index < otp.length - 1) {
      document.querySelectorAll(`.${style.otpInput}`)[index + 1].focus()
    }
  }


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      if (document.querySelectorAll(`.${style.otpInput}`)[index].value === '') {
        document.querySelectorAll(`.${style.otpInput}`)[index - 1].value = ''
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
        document.querySelectorAll(`.${style.otpInput}`)[index - 1].focus()
      }
      console.log(otp)
    }
  }

  return (
    <div className={style.loginMain}>
    {loading&&<Loader />}
      <div className={style.loginContainer}>
        <div className={style.loginForm}>
        <h3>Sign In</h3>
          {!isForgot&&<form>
            <div className={isActive&&style.toggleClass}>
            <div className={styles.registerInputBox}>
            {!isLogin&&<div className={style.incorrect}>incorrect username or password</div>}
              <input
               required
                type="text"
                name="userName"
                plassholder=""
                value={inputValues.userName}
                onChange={handleChange}
              ></input>
               <span>User Name</span>
              </div>
              <div className={styles.registerInputBox}>
              <input
               required
                type="password"
                name="userPassword"
                plassholder=""
                value={inputValues.userPassword}
                onChange={handleChange}
              ></input>
               <span>Password</span>
              </div>
              <a  onClick={handleForgot} className={style.forgotpassword} href='#'>Forgot password</a><br></br>
              <button onClick={handleLogin}>Login</button>
            </div>
            {/* <div className={!isActive&&style.toggleClass}>
              <label className={style.otpLabel}>Enter OTP</label>
              <div className={style.otpConatiner}>
                {otp.map((item, index) => {
                  return <input onKeyDown={(e) => { handleKeyDown(e, index) }} className={style.otpInput} type='number' value={otp[index]} onChange={(e) => { handleOtpChange(e, index) }} ></input>
                })}
              </div>
              <button onClick={handleOtpClick}>verify</button>
            </div> */}
          </form>}
          {isForgot&&<form>
          <div className={styles.registerInputBox}>
              <input
               required
                type="email"
                name="email"
                plassholder=""
                value={forgotEmail}
                onChange={handleForgotChange}
              ></input>
               <span>Enter Registered Email</span>
              </div>
              <button onClick={handleForgotBtn}>Continue</button>
          </form>}
        </div>
      </div>
    </div>
  )
}

export default Loginbody