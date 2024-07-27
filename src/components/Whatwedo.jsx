import React, { useEffect } from 'react'
import styles from "../CSS/whatwedo.module.css"

function Whatwedo() {


    useEffect(()=>{
        const observe = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                console.log(entry)
                if (entry.isIntersecting) {
                    console.log('hi')
                    entry.target.classList.add(`${styles.show}`)
                }else{
                    console.log('hello')
                    entry.target.classList.remove(`${styles.show}`)
                }
            })
        })
        const elements = document.querySelectorAll(`.${styles.wwdImg}`)
        elements.forEach((e)=>{observe.observe(e)})
    },[])

  return (
    <div className={styles.whatwedoMainContainer} id='whatwedo'>
        <div className={styles.wwdConatiner}>
            <div className={styles.wwdDetails}>
            <h3>What We Do?</h3>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                e also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
            </div>
            <div className={`${styles.wwdImg}`}>
                <img src='https://dostguru.com/HTML/plantly/assets/img/blog/img-2.png'></img>
            </div>
        </div>
    </div>
  )
}

export default Whatwedo