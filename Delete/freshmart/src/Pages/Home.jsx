import React from 'react'
import Hero from '../components/Hero'
import Category from '../components/Category'
import FeaturedProducts from '../components/FeaturedProducts'
import Template from '../components/Template'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Category/>
      <FeaturedProducts/>
      <Template/>
    </div>
  )
}

export default Home
