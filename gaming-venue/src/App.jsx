import { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '/node_modules/bootstrap/dist/js/bootstrap.min.js'
import AddVenue from './components/venue/AddVenue'
import ExistingVenues from './components/venue/ExistingVenues'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import EditVenue from './components/venue/EditVenue'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import VenueListing from './components/venue/VenueListing'
import Admin from './components/admin/Admin'
import Checkout from './components/bookings/Checkout'
import BookingSuccess from './components/bookings/BookingSuccess'
import Bookings from './components/bookings/Bookings'

function App() {

  return (
    <>
    <main>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/edit-venue/:venueId' element={<EditVenue/>}/>
          <Route path='/existing-venues' element={<ExistingVenues/>}/>
          <Route path='/add-venue' element={<AddVenue/>}/>
          <Route path='/book-venue/:venueId' element={<Checkout/>}/>
          <Route path='/browse-all-venues' element={<VenueListing/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/booking-success' element={<BookingSuccess/>}/>
          <Route path='/existing-bookings' element={<Bookings/>}/>
        </Routes>
      </Router>
      <Footer/>
    </main>
    </>
  )
}

export default App
