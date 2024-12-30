import React, { useState } from 'react'
import { addVenue } from '../utils/ApiFunctions'
import VenueTypeSelector from '../common/VenueTypeSelector'

const AddVenue = () => {
  const [newVenue, setNewVenue] = useState({
    photo: null,
    venueType: '',
    venuePrice: ''
  })

  const [imagePrev, setImagePrev] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const handleVenueInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
  
    if (name === "venuePrice" && !isNaN(value)) {
      value = parseInt(value);
    }
  
    setNewVenue({ ...newVenue, [name]: value });
  };
  

  const handleImgChange = (e) => {
    const selectedImg = e.target.files[0]
    setNewVenue({...newVenue, photo: selectedImg})
    setImagePrev(URL.createObjectURL(selectedImg))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const success = await addVenue(newVenue.photo, newVenue.venueType, newVenue.venuePrice)
      if(success !== undefined) {
        setSuccessMsg("A new venue was added to the db")
        setNewVenue({photo: null, venueType: '', venuePrice: ''})
        setImagePrev('')
        setErrMsg('')
      } else {
        setErrMsg('Error creating new venue')
      }

    } catch(err) {
      setErrMsg(err.message)
    }

    setTimeout(() => {
      setSuccessMsg('')
      setErrMsg('')
    }, 3000)

  }
  return (
    <>
    <section className='container, mt-5 mb-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <h2 className='mt-5 mb-2'>Add a New Venue</h2>

          {successMsg && (
            <div className='alert alert-success fade show'>
              {successMsg}
            </div>
          )}

{errMsg && (
            <div className='alert alert-danger fade show'>
              {errMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor='venueType' className='form-label'>Venue Type</label>
              <div>
                <VenueTypeSelector handleVenueInputChange={handleVenueInputChange} newVenue={newVenue} />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor='venuePrice' className='form-label'>Venue Price</label>
              <input 
              className='form-control' 
              required 
              id='venuePrice'
              type='number' 
              name='venuePrice' 
              value={newVenue.venuePrice} 
              onChange={handleVenueInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor='photo' className='form-label'>Venue Photo</label>
              <input 
              id='photo'
              name='photo'
              type='file'
              className='form-control'
              onChange={handleImgChange}
               />
               {imagePrev && (
                <img src={imagePrev} alt="Preview Venue Photo" style={{maxWidth: '400px', maxHeight: '400px'}} className='mb-3'/>
               )}
            </div>
            <div className='d-md-grid d-md-flex mt-2'>
              <button className='btn btn-outline-primary ml-5'>
                Save Venue
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
      
    </>
  )
}

export default AddVenue
