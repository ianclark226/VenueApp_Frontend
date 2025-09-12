import React, { useEffect, useState } from 'react'
import { deleteVenue, getAllVenues } from '../utils/ApiFunctions'
import VenueFilter from '../common/VenueFilter'
import VenuePaginator from '../common/VenuePaginator'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import { FaEye, FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const ExistingVenues = () => {
    const [venues, setVenues] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [venuesPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredVenues, setFilteredVenues] = useState([])
    const [selectedVenueType, setSelectedVenueType] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        fetchVenues()
    }, [])

    const fetchVenues = async() => {
        setIsLoading(true)
        try {
            const result = await getAllVenues()
            setVenues(result)
            setIsLoading(false)


        } catch(err) {
            setErrorMsg(err.message)
        }

    }

    useEffect(() => {
        if(selectedVenueType === '') {
            setFilteredVenues(venues)
        } else {
            const filtered = venues.filter((venue) => venue.venueType === selectedVenueType)
            setFilteredVenues(filtered)
        }
        setCurrentPage(1)

    }, [venues, selectedVenueType])

    const calculateTotalPages = (filteredVenues, venuesPerPage, venues) => {
        const totalVenues = filteredVenues.length > 0 ? filteredVenues.length : venues.length
        return Math.ceil(totalVenues / venuesPerPage)
    }

    const idxOfLastVenue = currentPage * venuesPerPage
    const idxOfFirstVenue = idxOfLastVenue - venuesPerPage
    const currentVenues = filteredVenues.slice(idxOfFirstVenue, idxOfLastVenue)

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDeletes = async(venueId) => {
        try {
            const result = await deleteVenue(venueId)
            if(result === '') {
                setSuccessMsg(`Venue No: ${venueId} was deleted`)
                fetchVenues()
            } else {
                console.error(`Error deleting venue : ${result.message}`)
            }

        } catch(err) {
            setErrorMsg(err.message)
        }
        setTimeout(() => {
            setSuccessMsg('')
            setErrorMsg('')
        }, 3000)
    }

  return (
    <>
        {isLoading ? (
            <p>Loading Existing Venues</p>
        ) : (
            <>
            <section className='mt-5 mb-5 container'>
                <div className='d-flex justify-content-between mb-3 mt-5'>
                    <h2>Existing Venues</h2>
                    
                </div>
                <Row>
                <Col md={6} className='mb-2 md-mb-0'>
                <VenueFilter data={venues} setFilteredData={setFilteredVenues} />

                </Col>
                

                <Col md={6} className='d-flex justify-content-end'>
                <Link to={'/add-venue'}>
                    <FaPlus /> Add Venue
                    </Link>
                </Col>
                </Row>

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className='text-center'>
                            <th>Id</th>
                            <th>Venue Type</th>
                            <th>Venue Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentVenues.map((venue) => (
                            <tr key={venue.id} className='text-center'>
                                <td>{venue.id}</td>
                                <td>{venue.venueType}</td>
                                <td>{venue.venuePrice}</td>
                                <td className='gap-2'>
                                    <Link to={`/edit-venue/${venue.id}`}>
                                    <span className='btn btn-info btn-sm'><FaEye/></span>
                                    <span className='btn btn-warning btn-sm'><FaEdit/></span>
                                    </Link>

                                    <button
                                    className='btn btn-danger btn-sm'
                                    onClick={() => handleDeletes(venue.id)}>
                                    <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <VenuePaginator currentPage={currentPage} totalPages={calculateTotalPages(filteredVenues, venuesPerPage, venues)} onPageChange={handlePaginationClick}/>
            </section>
            </>
        )}
    </>
  )
}

export default ExistingVenues
