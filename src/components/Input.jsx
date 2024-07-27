import React from 'react'
import styles from "../CSS/input.module.css"

function Input(props) {
  return (
    <div className={styles.inputContainer}>
    <label>
    {props.label}
    </label>
    <input required type={props.type} name={props.name} value={props.value} placeholder={props.plassholder} onChange={(e)=>{props.changeValue(e)}}></input>
    </div>
  )
}

export default Input