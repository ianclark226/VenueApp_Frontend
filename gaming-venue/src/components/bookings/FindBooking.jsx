import React, { useState } from 'react'
import { getBookingByConfirmationCode, cancelBooking } from '../utils/ApiFunctions'
import moment from 'moment'

const FindBooking = () => {
  const [confirmationCode, setConfirmationCode] = useState('')
  const [error, setError] = useState('')
  const [succussMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

  const clearBookingInfo = {
    bookingId: '',
    venue: { id: '', venueType: '' },
    bookingConfirmationCode: '',
    venueNumber: '',
    startDate: '',
    endDate: '',
    organizerFullName: '',
    organizerEmail: '',
    numOfAdults: '',
    numOfChildren: '',
    totalNumOfParticipates: ''
  }

  const [bookingInfo, setBookingInfo] = useState(clearBookingInfo)

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setIsDeleted(false)

    try {
      const data = await getBookingByConfirmationCode(confirmationCode)
      setBookingInfo(data)
      setError('')
    } catch (error) {
      setBookingInfo(clearBookingInfo)
      if (error.response && error.response.status === 404) {
        setError(error.response.data)
      } else {
        setError(error.message || 'Something went wrong')
      }
    }

    setTimeout(() => setIsLoading(false), 2000)
  }

  const handleBookingCancellation = async (bookingId) => {
    try {
      await cancelBooking(bookingId)
      setIsDeleted(true)
      setSuccessMessage('Booking has been cancelled successfully!')
      setBookingInfo(clearBookingInfo)
      setConfirmationCode('')
      setError('')
    } catch (error) {
      setError(error.message || 'Cancellation failed')
    }
    setTimeout(() => {
      setSuccessMessage('')
      setIsDeleted(false)
    }, 2000)
  }

  return (
    <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
      <h2>Find My Booking</h2>
      <form onSubmit={handleFormSubmit} className="col-md-6">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="confirmationCode"
            name="confirmationCode"
            value={confirmationCode}
            onChange={handleInputChange}
            placeholder="Enter the Booking Confirmation code"
          />
          <button
            className="btn input-group-text"
            style={{ backgroundColor: 'purple', color: '#fff' }}
          >
            Find Booking
          </button>
        </div>
      </form>

      {isLoading ? (
        <div>Finding Booking...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : bookingInfo.bookingConfirmationCode ? (
        <div className="col-md-6 mt-4 mb-5">
          <h3>Booking Information</h3>
          <p>Booking Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
          <p>Booking ID: {bookingInfo.bookingId}</p>
          <p>Venue Type: {bookingInfo.venue.venueType}</p>
          <p>
            Check-in Date:{" "}
            {moment(bookingInfo.startDate).subtract(1, "month").format("MMM Do, YYYY")}
          </p>
          <p>
            Check-out Date:{" "}
            {moment(bookingInfo.endDate).subtract(1, "month").format("MMM Do, YYYY")}
          </p>
          <p>Organizer Full Name: {bookingInfo.organizerFullName}</p>
          <p>Organizer Email: {bookingInfo.organizerEmail}</p>
          <p>Number of Adults: {bookingInfo.numOfAdults}</p>
          <p>Number of Children: {bookingInfo.numOfChildren}</p>
          <p>Total Number of Participants: {bookingInfo.totalNumOfParticipates}</p>

          {!isDeleted && (
            <button
              className="btn btn-danger"
              onClick={() => handleBookingCancellation(bookingInfo.bookingId)}
            >
              Cancel Booking
            </button>
          )}
        </div>
      ) : (
        <div>Find Booking...</div>
      )}

      {isDeleted && (
        <div className="alert alert-success mt-3" role="alert">
          {succussMessage}
        </div>
      )}
    </div>
  )
}

export default FindBooking