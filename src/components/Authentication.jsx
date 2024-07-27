import React from 'react'
import styles from '../CSS/authentication.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Authentication() {

    const { useremail} = useParams();

    const handleVerify = async (e)=>{
        e.preventDefault()
        axios.post(``).then(data =>{console.log(data)})
        .catch(error=>{
          console.log(error)
        })
    }

  return (
    <div className={styles.authContainer}>
        <p>Click on verify for varification of Email</p>
        <button onClick={handleVerify}>Verify</button>
    </div>
  )
}

export default Authentication