import React from 'react'
import {categories} from "./data"
import styles from "../CSS/category.module.css"
import CategoryItem from './CategoryItem'

function Categories() {
  return (<div className={styles.catContainer}>
    {categories.map((item)=>{
        return <CategoryItem item={item} key={item.id} />
    })}
    </div>
  )
}

export default Categories