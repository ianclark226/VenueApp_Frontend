import React from 'react'
import { Card, CardBody, CardText, CardTitle, Col, Container, Row } from 'react-bootstrap'
import Header from './Header'
import { FaAccessibleIcon, FaChild, FaClock, FaLocationArrow, FaMoneyBill, FaProcedures, FaUserFriends, FaWifi } from 'react-icons/fa'

const OnlineServices = () => {
  return (
    <>
      <Container className='mb-2'>
        <Header title={"Our Services"}/>
        <Row>
            <h4 className="text-center">
                Services on our <span className='venue-color'>Gaming - </span> Venue
                <span className='gap-2'><FaClock/> -Reserve a Venue at anytime of day</span>
            </h4>
        </Row>
        <hr />
        <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
            <Col>
                <Card>
                    <CardBody>
                        <CardTitle className='venue-color'>
                            <FaAccessibleIcon/> Easy Access
                            <CardText>Access from all devices</CardText>
                        </CardTitle>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card>
                    <CardBody>
                        <CardTitle className='venue-color'>
                            <FaUserFriends/> Make New Friends
                            <CardText>Find the right venue for people of your interests</CardText>
                        </CardTitle>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card>
                    <CardBody>
                        <CardTitle className='venue-color'>
                            <FaLocationArrow/> Local Venues
                            <CardText>Find a Venues that fits your traveling</CardText>
                        </CardTitle>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card>
                    <CardBody>
                        <CardTitle className='venue-color'>
                            <FaChild/> Kid Friendly
                            <CardText>Appropiate for all ages</CardText>
                        </CardTitle>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card>
                    <CardBody>
                        <CardTitle className='venue-color'>
                            <FaMoneyBill/> Low Prices
                            <CardText>Find Afforable Venues</CardText>
                        </CardTitle>
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <Card>
                    <CardBody>
                        <CardTitle className='venue-color'>
                            <FaProcedures/> Rules to Follow
                            <CardText>No illegal events. Everything is safe and family friendly</CardText>
                        </CardTitle>
                    </CardBody>
                </Card>
            </Col>
        </Row>

      </Container>
    </>
  )
}

export default OnlineServices
