import React, { useState } from 'react'

const VenueFilter = ({ data, setFilteredData }) => {

    const [filter, setFilter] = useState('')

    const handleSelectChange = (e) => {
        const selectedVenueType = e.target.value
        setFilter(selectedVenueType)
        const filteredVenues = data.filter((venue) => venue.venueType.toLowerCase().includes(selectedVenueType.toLowerCase()))
        setFilteredData(filteredVenues)
    }

    const clearFilter = () => {
        setFilter('')
        setFilteredData(data)
    }

    const venueTypes = ['', ...new Set(data.map((venue) => venue.venueType))]

  return (
    <div className='input-group mb-3'>
        <span className='input-group-text' id='venue-type-filter'> Filter Venues By Type</span>
        <select
        className='form-select'
        value={filter}
        onChange={handleSelectChange}>
        <option value={''}>Select a Venue Type to Filer...</option>
        {venueTypes.map((type, idx) => (
            <option key={idx} value={String(type)}>
                {String(type)}
            </option>
        ))}
        

        </select>
        <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button>
      
    </div>
  )
}

export default VenueFilter
