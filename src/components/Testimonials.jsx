import React from 'react'
import pic1 from "../assets/pic-1.jpg"
import pic2 from "../assets/pic-2.jpeg"
import pic3 from "../assets/pic-3.jpg"
import "../CSS/testimonilas.css"

function Testimonials() {
  return (
    <div className="section__container">
    <div className="header">
      <p>TESTIMONIALS</p>
    </div>
    <div className="testimonials__grid">
      <div className="card">
        <span><i className="ri-double-quotes-l"></i></span>
        <p>
          I've been working with these guys for a long time and I can say that
          my house is in the perfect hands.
        </p>
        <hr />
        <img src={pic1} alt="user" />
        <p className="name">Allan Collins</p>
      </div>
      <div className="card">
        <span><i className="ri-double-quotes-l"></i></span>
        <p>
          Working with Sentry Oak is just great, every problem in my house is
          solved in a matter of days.
        </p>
        <hr />
        <img src={pic2} alt="user" />
        <p className="name">Clay Washington</p>
      </div>
      <div className="card">
        <span><i className="ri-double-quotes-l"></i></span>
        <p>
          Once a pipe burst in my kitchen and an hour later it was already
          repaired, thanks to Sentry Oak.
        </p>
        <hr />
        <img src={pic3} alt="user" />
        <p className="name">Tanya Grant</p>
      </div>
    </div>
  </div>
  )
}

export default Testimonials