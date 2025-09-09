import React, { useState } from 'react'
import moment from 'moment'
import { getAvailableVenues } from '../utils/ApiFunctions'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import VenueTypeSelector from '../common/VenueTypeSelector'
import VenueSearchResults from './VenueSearchResults'

const VenueSearch = () => {

    const[searchQuery, setSearchQuery] = useState({
        startDate: '',
        endDate: '',
        venueType: ''
    })

    const[errorMessage, setErrorMessage] = useState('')
    const[availableVenues, setAvailableVenues] = useState([])
    const[isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        const startDate = moment(searchQuery.startDate)
        const endDate = moment(searchQuery.endDate)

        if(!startDate.isValid() || !endDate.isValid()) {
            setErrorMessage('Please enter valid date range')
            return
        }

        if(!endDate.isSameOrAfter(startDate)) {
            setErrorMessage("Start Date must come before End Date")
            return
        }
        setIsLoading(true)
        getAvailableVenues(searchQuery.startDate, searchQuery.endDate, searchQuery.venueType)
        .then((response) => {
            setAvailableVenues(response.data)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setSearchQuery({ ...searchQuery, [name]: value })
        const startDate = moment(searchQuery.startDate)
        const endDate = moment(searchQuery.endDate)

        if(startDate.isValid && endDate.isValid) {
            setErrorMessage('')
        }
    }

    const clearSearch = () => {
        setSearchQuery({
            startDate: '',
            endDate: '',
            venueType: ''
        })
    }

  return (
    <>
      <Container className='mt-5 mb-5 py-5 shadow'>
        <Form onSubmit={handleSearch}>
            <Row className='justify-content-center'>
                <Col xs={12} md={3}>
                    <Form.Group controlId='startDate'>
                        <Form.Label>
                            Start Date
                        </Form.Label>
                        <Form.Control
                        type='date'
                        name='startDate'
                        value={searchQuery.startDate}
                        onChange={handleInputChange}
                        min={moment().format('YYYY-MM-DD')}
                       />
                    </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                    <Form.Group controlId='endDate'>
                        <Form.Label>
                            End Date
                        </Form.Label>
                        <Form.Control
                        type='date'
                        name='endDate'
                        value={searchQuery.endDate}
                        onChange={handleInputChange}
                        min={moment().format('YYYY-MM-DD')}
                       />
                    </Form.Group>
                </Col>
                <Col xs={12} md={3}>
                    <Form.Group>
                        <Form.Label>
                            Venue Type
                        </Form.Label>
                        <div className="d-flex">
                            <VenueTypeSelector
                            handleVenueInputChange={handleInputChange}
                            newVenue={searchQuery}
                            />
                            <Button variant='secondary' type='submit'>Search</Button>
                        </div>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        {isLoading ? (
            <p>finding available venues.....</p>
        ) : availableVenues ? (
            <VenueSearchResults results={availableVenues} onClearSearch={clearSearch}/>
        ) : (
            <p>No available Venues for the selected dates and venue type</p>
        )}
        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
      </Container>
    </>
  )
}

export default VenueSearch
