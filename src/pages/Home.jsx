import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Services from '../components/Services'
import Categories from '../components/Categories'
import Aisection from '../components/Aisection'
import Popularproduct from '../components/Popularproduct'
import Testimonials from '../components/Testimonials'
import Video from '../components/Video'
import Footer from '../components/Footer'
import Whatwedo from '../components/Whatwedo'
import BrandPartners from '../components/BrandPartners'

function Home() {
  return (
    <div>
    <Navbar />
    <Announcement />
    {/* <Slider /> */}
    <Video />
    <Services />
    <Categories />
    <Whatwedo />
    <BrandPartners />
    <Popularproduct />
    <Testimonials />
    <Footer />
    </div>
  )
}

export default Home