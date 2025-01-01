import React, { useEffect, useState } from 'react'
import { getAllVenues } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardImg, CardText, CardTitle, Carousel, CarouselItem, Col, Container, Row } from 'react-bootstrap'

const VenueCarousel = () => {
    const [venues, setVenues] = useState([{id : '', venueType:'', venuePrice: '', photo:''}])
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllVenues().then((data) => {
            setVenues(data)
            setIsLoading(false)
        }).catch((err) => {
            setErrorMsg(err.message)
            setIsLoading(false)
        })
    }, [])

    if(isLoading) {
        return <div className='mt-5'>Loading Venues.....</div>
    }

    if(errMsg) {
        return <div className='text-danger mt-5 mb-5'>Error: ${errMsg}</div>
    }
 
  return (
    <section className='bg-light mb-5 mt-5 shadow'>
        <Link to={'/browse-all-venues'} className='hotel-color text-center'>
        Browse all venues
        </Link>
        <Container>
            <Carousel indicators={false}>
                {[...Array(Math.ceil(venues.length / 4))].map((_, idx) => (
                    <CarouselItem key={idx}>
                        <Row>
                            {venues.slice(idx * 4, idx * 4 + 4).map((venue) => (
                                <Col key={venue.id} className='mb-4' xs={12} md={6} lg={4}>
                                    <Card>
                                        <Link to={`/book-venue/${venue.id}`}>
                                            <CardImg
                                            variant='top'
                                            src={`data:image/png;base64, ${venue.photo}`}
                                            alt='venue photo'
                                            className='w-100'
                                            style={{height: '200px'}}
                                            />

                                            
                                        </Link>
                                        <CardBody>
                                            <CardTitle className='hotel-color'>${venue.venueType}</CardTitle>
                                            <CardTitle className='hotel-color'>${venue.venuePrice}/day</CardTitle>

                                            <div className="flex-shrink-0">
                                                <Link className='btn btn-sm btn-hotel' to={`/book-venue/${venue.id}`}>
                                                Book Now
                                                </Link>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </CarouselItem>
                ))}
            </Carousel>
        </Container>
    </section>
  )
}

export default VenueCarousel
