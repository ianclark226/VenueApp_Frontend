import React from 'react'
import MainHeader from '../layout/MainHeader'
import OnlineServices from '../common/OnlineServices'
import Parallax from '../common/Parallax'
import VenueCarousel from '../common/VenueCarousel'
import VenueSearch from '../common/VenueSearch'

const Home = () => {
  return (
    <section>
      <MainHeader/>

      <section className="container">
        <VenueSearch/>
        <VenueCarousel/>
        <Parallax/>
        <OnlineServices/>
        
      </section>
    </section>
  )
}

export default Home
