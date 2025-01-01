import React from 'react'
import MainHeader from '../layout/MainHeader'
import OnlineServices from '../common/OnlineServices'
import Parallax from '../common/Parallax'
import VenueCarousel from '../common/VenueCarousel'

const Home = () => {
  return (
    <section>
      <MainHeader/>

      <section className="container">
        <VenueCarousel/>
        <Parallax/>
        <OnlineServices/>
        
      </section>
    </section>
  )
}

export default Home
