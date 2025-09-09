import React, { useEffect, useState } from 'react'
import DateSlider from '../common/DateSlider'
import { parseISO } from 'date-fns';

export default function BookingsTable({ bookingInfo, handleBookingCancellation }) {
  const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

  useEffect(() => {
    setFilteredBookings(bookingInfo)
  }, [bookingInfo])

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo

    if (startDate && endDate) {
      filtered = bookingInfo.filter(booking => {
        const bookingStartDate = parseISO(booking.startDate)
        const bookingEndDate = parseISO(booking.endDate)
        return (
          bookingStartDate >= startDate && bookingEndDate <= endDate && bookingEndDate > startDate
        )
      })
    }

    setFilteredBookings(filtered);
  }

  return (
    <section className="p-4">
      <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />

      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Booking ID</th>
            <th>Venue ID</th>
            <th>Venue Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Organizer Name</th>
            <th>Organizer Email</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Total Participates</th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.map((booking, index) => (
            <tr key={booking.bookingId}>
              <td>{index + 1}</td>
              <td>{booking.bookingId}</td>
              <td>{booking.venue.id}</td>
              <td>{booking.venue.venueType}</td>
              <td>{booking.startDate}</td>
              <td>{booking.endDate}</td>
              <td>{booking.organizerFullName}</td>
              <td>{booking.organizerEmail}</td>
              <td>{booking.numOfAdults}</td>
              <td>{booking.numOfChildren}</td>
              <td>{booking.totalNumOfParticipations}</td>
              <td>{booking.bookingConfirmationCode}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleBookingCancellation(booking.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredBookings.length === 0 && <p> No booking found for the selected dates</p>}
    </section>
  )
}