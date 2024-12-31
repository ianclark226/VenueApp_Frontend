import React, { useEffect, useState } from 'react'
import { getAllVenues } from '../utils/ApiFunctions'
import VenueCard from './VenueCard'
import { Container, Row, Col } from 'react-bootstrap'
import VenueFilter from '../common/VenueFilter'
import VenuePaginator from '../common/VenuePaginator'

const Venue = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [venuesPerPage, SetVenuesPerPage] = useState(6)
    const [filteredData, setFilteredData] = useState([{id:''}])

    useEffect(() => {
        setIsLoading(true)
        getAllVenues().then((data) => {
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        }).catch((err) => {
            setError(err.message)
            setIsLoading(false)
        })
    }, [])

    if(isLoading) {
        return <div>Loading venues....</div>
    }

    if(error) {
        return <div className='text-danger'>Error: {error} </div>
    }

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum)
    }

    const totalPages = Math.ceil(filteredData.length / venuesPerPage)

    const renderVenues = () => {
        const startIdx = (currentPage - 1) * venuesPerPage
        const endIdx = startIdx + venuesPerPage
        return filteredData
        .slice(startIdx, endIdx)
        .map((venue) => <VenueCard key={venue.id} venue={venue}/>)
    }

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
            <VenueFilter data={data} setFilteredData={setFilteredData}/>
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-end">
            <VenuePaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Col>
      </Row>
      <Row>
        {renderVenues()}
      </Row>
      <Row>
      <Col md={6} className="d-flex align-items-center justify-content-end">
            <VenuePaginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Col>
      </Row>
    </Container>
  )
}

export default Venue
