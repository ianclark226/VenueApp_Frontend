import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../common/Header'

const BookingSuccess = () => {
    const location = useLocation();
    const message = location.state?.message || 'No success message available'
    const error = location.state?.error || 'No error message available'
    
    
    console.log('Location object:', location);
    console.log('Message:', message);
    console.log('Error:', error);
  return (
    <div className='container'>
        <Header title='Booking Success'/>
        <div className="mt-5">
            {message ? (
                <div>
                    <h3 className='text-success'>Booking Success</h3>
                    <p className='text-success'>{message}</p>
                    
                </div>
            ) : (
                <div>
                    <h3 className='text-danger'>Booking Failed</h3>
                    <p className='text-danger'>{error}</p>
                </div>
            )}
        </div>
    </div>
  )
}

export default BookingSuccess
