import React from 'react'
import styles from "../CSS/category.module.css"

function CategoryItem({item}) {
  return (
    <div className={styles.itemContainer}  style={{ gridColumn:item.span}}>
        <img src={item.img}></img>
        <div className={styles.info}>
            <button className={styles.button}>{item.title}</button>
        </div>
    </div>
  )
}

export default CategoryItem