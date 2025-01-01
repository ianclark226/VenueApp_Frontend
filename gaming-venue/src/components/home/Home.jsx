import React from 'react'
import MainHeader from '../layout/MainHeader'
import OnlineServices from '../common/OnlineServices'
import Parallax from '../common/Parallax'

const Home = () => {
  return (
    <section>
      <MainHeader/>

      <section className="container">
        <Parallax/>
        <OnlineServices/>
        
      </section>
    </section>
  )
}

export default Home
