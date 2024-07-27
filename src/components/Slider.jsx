import React from 'react'
// import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
// import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import "../CSS/slider.css"
import sliderimg from "../assets/slider-plant.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import {sliderdata} from "./data"


function Slider() {

    return (
        <div className='slider-container'>
            {/* <div className='arrow-left'>
                <ArrowLeftOutlinedIcon className='arrow' />
            </div> */}

           
                <div className='slide-wrapper'>
            
                <Carousel infiniteLoop="true" autoPlay="true" showThumbs={false}>

                {sliderdata.map((item)=>{return    <div className='slider' key={item.id}>
                        <div className='slider-imgcontainer' >
                            <img className='slider-img' src={sliderimg} alt='plants'></img>
                        </div>
                        <div className='slider-infocontainer'>
                            <h1>{item.title}</h1>
                            <p>{item.disc} </p>
                            <button>SHOP NOW</button> 
                    </div>
                </div>
                })}
               
            </Carousel>
            </div>
            {/* <div className='arrow-right'>
            <ArrowRightOutlinedIcon className='arrow' />
            </div> */}
        </div>
    )
}

export default Slider
