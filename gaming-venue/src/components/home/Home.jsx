import React from 'react'
import MainHeader from '../layout/MainHeader'
import OnlineServices from '../common/OnlineServices'
import Parallax from '../common/Parallax'
import VenueCarousel from '../common/VenueCarousel'
import VenueSearch from '../common/VenueSearch'
import { useLocation } from 'react-router-dom'

const Home = () => {

  const location = useLocation()
    const message = location.state && location.state.message

    const currentUser = localStorage.getItem("userId")

  return (
    <section>
      {message && <p className='text-warning px-5'>{message}</p>}
      {currentUser && <h6 className='text-success text-center'>You are logged in as {currentUser}</h6>}
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
