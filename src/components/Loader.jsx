import React from 'react'
import styles from "../CSS/loader.module.css"

function Loader() {
  return (
    <div className={styles.pageBlur}><img className={styles.loadingGif} src='https://media.tenor.com/k-wL_qZAELgAAAAi/test.gif' alt='loading'></img></div>
  )
}

export default Loader