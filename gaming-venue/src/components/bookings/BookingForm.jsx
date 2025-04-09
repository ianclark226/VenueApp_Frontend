import React, { useEffect, useState } from 'react'
import { getVenueById } from '../utils/ApiFunctions'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import BookingSummery from './BookingSummery'

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [venuePrice, setVenuePrice] = useState(0)
    const [booking, setBooking] = useState({
        organizerFullName: '',
        organizerEmail: '',
        startDate: '',
        endDate: '',
        numOfOrganizers: '',
        numOfEvents: ''
    })

    const[venueInfo, setVenueInfo] = useState({
        photo: '',
        venueType: '',
        venuePrice: ''
    })

    const {venueId} = useParams()
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setBooking({...booking, [name]: value})
        setErrorMsg('')
    }

    const getVenuePriceById = async(venueId) => {
        try {

            const res = await getVenueById(venueId)
            setVenuePrice(res.venuePrice)

        } catch(error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getVenuePriceById(venueId)
    }, [venueId])

    const calculatePayment = () => {
        const startDate = moment(booking.startDate)
        const endDate = moment(booking.endDate)
        const diffInDays = endDate.diff(startDate)

        if (diffInDays <= 0) {
            return 0 // Ensure payment is zero for invalid date ranges
        }

        const price = venuePrice || 0
        return diffInDays * price
    }

    const isOrganizerCountValid = () => {
        const organizerCount = parseInt(booking.numOfOrganizers)
        const eventCount = parseInt(booking.numOfEvents)
        const totalCount = organizerCount + eventCount
        return totalCount >= 1 && organizerCount >= 1 && eventCount >= 1
    }

    const isEndDateValid = () => {
        if(!moment(booking.endDate).isSameOrAfter(moment(booking.startDate))) {
            setErrorMsg('End date must come before start date')
            return false
        } else {
            setErrorMsg('')
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if(form.checkValidity() === false || !isOrganizerCountValid() || !isEndDateValid()) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
            
        }
        setIsValidated(true)
    }

    const handleBooking = async() => {
        try {
            const confirmationCode = await bookedVenue(venueId, booking)
            setIsSubmitted(true)
            navigate('/booking-success', { state:  {message: confirmationCode }})

        } catch(error) {
            const errorMessage = error.message
            setErrorMsg(errorMessage.message)
            navigate('/booking-success', { state: { error: errorMessage }})
        }
    }

  return (
    <>
      <div className="container mb-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card card-body mt-5">
                        <h4 className="card card-title">Reserve Venue</h4>
                        <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                            <FormGroup>
                                <FormLabel htmlFor='organizerFullName'>
                                    Full Name:
                                </FormLabel>
                           
                            <FormControl 
                            required
                            type='text'
                            id='organizerFullName'
                            name='organizerFullName'
                            value={booking.organizerFullName}
                            placeholder='Enter Full Name'
                            onChange={handleInputChange}
                            />
                            <FormControl.Feedback type='invalid'>Please Enter your Full Name</FormControl.Feedback>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor='organizerEmail'>
                                    Email:
                                </FormLabel>
                           
                            <FormControl 
                            required
                            type='email'
                            id='organizerEmail'
                            name='organizerEmail'
                            value={booking.organizerEmail}
                            placeholder='Enter Full Email'
                            onChange={handleInputChange}
                            />
                            <FormControl.Feedback type='invalid'>Please Enter your Email</FormControl.Feedback>
                            </FormGroup>
                            <fieldset style={{border: '2px'}}>
                                <legend>Lodging Period</legend>
                                <div className='row'>

                                      <div className='col-6'>
                                          
                                              <FormLabel htmlFor='startDate'>
                                                  Start Date:
                                              </FormLabel>

                                              <FormControl
                                                  required
                                                  type='date'
                                                  id='startDate'
                                                  name='startDate'
                                                  value={booking.startDate}
                                                  placeholder='Start Date'
                                                  onChange={handleInputChange}
                                              />
                                              <FormControl.Feedback type='invalid'>Please select Start Date</FormControl.Feedback>
                                          
                                      </div>

                                      <div className='col-6'>
                                          
                                              <FormLabel htmlFor='endDate'>
                                                  End Date:
                                              </FormLabel>

                                              <FormControl
                                                  required
                                                  type='date'
                                                  id='endDate'
                                                  name='endDate'
                                                  value={booking.endDate}
                                                  placeholder='End Date'
                                                  onChange={handleInputChange}
                                              />
                                              <FormControl.Feedback type='invalid'>Please select End Date</FormControl.Feedback>
                                          
                                      </div>
                                        {errorMsg && <p className='error-message text-danger'>{errorMsg}</p>}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>
                                    Number of Organizers
                                </legend>
                                <div className='row'>
                                <div className='col-6'>
                                          
                                              <FormLabel htmlFor='numOfOrganizers'>
                                                  Number of Events:
                                              </FormLabel>

                                              <FormControl
                                                  required
                                                  type='number'
                                                  id='numOfOrganizers'
                                                  name='numOfOrganizers'
                                                  value={booking.numOfOrganizers}
                                                  placeholder='0'
                                                  min={1}
                                                  onChange={handleInputChange}
                                              />
                                              <FormControl.Feedback type='invalid'>Please select at least 1 Organizer</FormControl.Feedback>
                                          
                                      </div>

                                      <div className='col-6'>
                                          
                                              <FormLabel htmlFor='numOfEvents'>
                                                  Number of Events:
                                              </FormLabel>

                                              <FormControl
                                                  required
                                                  type='number'
                                                  id='numOfEvents'
                                                  name='numOfEvents'
                                                  value={booking.numOfEvents}
                                                  placeholder='0'
                                                  min={1}
                                                  onChange={handleInputChange}
                                              />
                                              <FormControl.Feedback type='invalid'>Please select at least 1 Organizer</FormControl.Feedback>
                                          
                                      </div>
                                      </div>
                            </fieldset>
                            <div className="form-group mt-2 mb-2">
                                <button className="btn btn-hotel" type='submit'>Continue</button>
                            </div>
                            </Form>
                    </div>
                </div>
                
                <div className="col-md-6">
                    {isSubmitted  && (
                        <BookingSummery booking={booking} isFormValid={isValidated} payment={calculatePayment()} onConfirm={handleBooking}/>
                        
                    )}
                </div>
            </div>
      </div>
    </>
  )
}

export default BookingForm
