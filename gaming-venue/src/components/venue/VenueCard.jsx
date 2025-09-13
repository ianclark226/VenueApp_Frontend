import React from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const VenueCard = ({venue}) => {
  return (
    <Col key={venue.id} className='mb-4' xs={12}>
      <Card>
        <CardBody className='d-flex flex-wrap align-items-center'>
            <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            <Link to={`/book-venue/${venue.id}`}>
                <CardImg
                variant='top'
                src={`data:image/png;base64, ${venue.photo}`}
                alt='Venue Photo'
                style={{width: '100%', maxWidth: '200px', height: 'auto'}}/>
                </Link>
            </div>
            
            
            <div className="flex-grow-1 ml-3 px-5">
                <CardTitle className='venue-color'>
                    {venue.venueType}
                </CardTitle>
                <CardTitle className='venue-color'>
                    {venue.venuePrice}
                </CardTitle>
                <CardText>Some Venue Information goes here for people to read through</CardText>
            </div>
            <div className="flex-shrink-0 mt-3" style={{backgroundColor: 'purple', borderRadius: '10px'}}>
                <Link to={`/book-venue/${venue.id}`} className='btn btn-venue btn-sm' style={{ color: '#fff'}}>Book Now</Link>
            </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default VenueCard
