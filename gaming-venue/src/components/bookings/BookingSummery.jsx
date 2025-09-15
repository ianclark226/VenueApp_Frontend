import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const BookingSummery = ({booking, payment, isFormValid, onConfirm}) => {
    const startDate = moment(booking.startDate)
    const endDate = moment(booking.endDate)
    const numOfDays = endDate.diff(startDate, 'days')
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const navigate = useNavigate();

    const handleConfirmBooking = () => {
        setIsProcessingPayment(true)
        setTimeout(() => {
            setIsProcessingPayment(false)
            setIsBookingConfirmed(true)
            onConfirm()
        }, 3000)
    }

    useEffect(() => {
        if(isBookingConfirmed) {
            navigate('/booking-success', { state: { message: 'Booking successful!' } });
        }

    }, [isBookingConfirmed, navigate])

  return (
    <div className="row justify-content-center" style={{ width: '600px' }}>
  <div className='card card-body mt-5'>
        <h4>Reservation Summary</h4>
        <p>Full Name: <strong>{booking.organizerFullName}</strong></p>
        <p>Email: <strong>{booking.organizerEmail}</strong></p>
        <p>Start Date: <strong>{moment(booking.startDate).format('MMM Do YYYY')}</strong></p>
        <p>End Date: <strong>{moment(booking.endDate).format('MMM Do YYYY')}</strong></p>
        <p>Number of Days: <strong>{numOfDays}</strong></p>
        <div>
            <h5>Number of Adults and Children</h5>
            <strong>
                Organizer{booking.numOfAdults > 1 ? 's' : ''} : {booking.numOfAdults}
            </strong>
            <strong>
                Event{booking.numOfChildren > 1 ? 's' : ''} : {booking.numOfChildren}
            </strong>
        </div>
        {numOfDays > 0 ? (
            <>
            <p>Total Payment : <strong>${payment}</strong></p>
            {isFormValid && !isBookingConfirmed ? (
                <Button
                variant='success'
                onClick={handleConfirmBooking}
                >
                    {isProcessingPayment ? (
                        <>
                        <span className='spinner-border spinner-border-sm mr-2' role='status' aria-hidden='true'></span>
                        Booking Confirmed, redirecting to payments...
                        </>
                    ): (
                        "Confirm Booking and proceed to payment"
                    )}

                </Button>
            ) : isBookingConfirmed ? (
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='sr-only'>Loading...</span>
                    </div>
                </div>
            ) : null}
            </>
        ) : (
            <p className='text-danger'>End date must be after Start</p>
        )}
    </div>
    </div>
  )
}

export default BookingSummery
