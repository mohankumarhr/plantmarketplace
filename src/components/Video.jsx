import React from 'react'
import plant from "../assets/plant.mp4"
import "../CSS/video.css"

function Video() {
  return (
    <div className='ai-section'>
    <video autoPlay muted loop playsInline width="100%" height="300">
  <source src={plant} type="video/mp4"></source>
</video>
</div>
  )
}

export default Video