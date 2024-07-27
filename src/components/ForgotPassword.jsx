import React, { useState } from 'react'
import styles from '../CSS/forgotpassword.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from './data';

function ForgotPassword() {

    const [pass, setPass] = useState({
        pass:"",
        conpass:""
    })

    const { useremail} = useParams();

    const handlePassChange = async (e)=>{
        e.preventDefault()
        console.log(useremail)
        console.log(pass)
        const headers  = {
            newPassword: pass
        }
        const params = {
            email: useremail,
          };
        axios.post(`${baseUrl}/user/verify/set-password`,
        {
            params: params
        },
        {
            headers: headers
        }
        ).then(data =>{console.log(data)})
        .catch(error=>{
          console.log(error)
        })
    }

    const handleChange = (e)=>{
        const {name, value} = e.target
        setPass({
            ...pass,
            [name]: value
        })
    }


  return (
    <div className={styles.forgotpasswordMain}>
        <div className={styles.chnagePasswordCont}>
        <h3>Change Password</h3>
            <label>New Password</label>
            <input name='pass' onChange={handleChange} value={pass.pass} type='password'></input>
            <label>Conform Password</label>
            <input name='conpass' onChange={handleChange} value={pass.conpass} type='password'></input>
            <button onClick={handlePassChange}>Change Password</button>
        </div>
    </div>
  )
}

export default ForgotPassword