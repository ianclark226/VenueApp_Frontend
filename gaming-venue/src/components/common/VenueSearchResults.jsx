import React, { useState } from 'react'
import VenueCard from '../venue/VenueCard'
import VenuePaginator from '../common/VenuePaginator'
import { Button, Row } from 'react-bootstrap'

const VenueSearchResults = ({results, onClearSearch}) => {

    const[currentPage, setCurrentPage] = useState(1)
    const resultPerPage = 3
    const totalResults = results.length
    const totalPages = Math.ceil(totalResults / resultPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const startIndex = (currentPage - 1) * resultPerPage
    const endIndex = startIndex + resultPerPage
    const paginatedResult = results.slice(startIndex, endIndex)

  return (
    <>
      {results.length > 0 ? (
        <>
        <h5 className='text-center mt-5'>Search Result</h5>
        <Row>
            {paginatedResult.map((venue) => (
                <VenueCard key={venue.id} venue={venue}/>
            ))}
        </Row>

        <Row>
            {totalResults > resultPerPage && (
                <VenuePaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                />
            )}
            <Button
      variant='secondary' onClick={onClearSearch}>
        Clear Search
      </Button>
        </Row>
        </>
      ): (
        <p></p>
      )}
    </>
  )
}

export default VenueSearchResults
