import React, { useEffect, useState } from 'react'
import { getVenueById, updateVenue } from '../utils/ApiFunctions'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditVenue = () => {
    const [venue, setVenue] = useState({
        photo: '',
        venueType: '',
        venuePrice: ''
      })
    
      const [imagePrev, setImagePrev] = useState('')
      const [successMsg, setSuccessMsg] = useState('')
      const [errMsg, setErrMsg] = useState('')

      const {venueId} = useParams()

      const handleImgChange = (e) => {
        const selectedImg = e.target.files[0]
        setVenue({...venue, photo: selectedImg})
        setImagePrev(URL.createObjectURL(selectedImg))
      }

      const handleVenueInputChange = (e) => {
        let { name, value } = e.target
      
        if (name === "venuePrice" && !isNaN(value)) {
          value = parseInt(value);
        }
      
        setVenue({ ...venue, [name]: value });
      };
      useEffect(() => {
        const fetchVenue = async () => {
            try {
                const venueData = await getVenueById(venueId)
                setVenue(venueData)
                setImagePrev(venueData.photo)
            } catch(err) {
                console.error(err)
        }
        }
        fetchVenue()
      }, [venueId])

      const handleSubmit = async(e) => {
          e.preventDefault();
      
          try {
            const res = await updateVenue(venueId, venue)
            if(res.status === 200) {
              setSuccessMsg("Venue Updated Successfully")
              const updatedVenueData = await getVenueById(venueId)
              setVenue(updatedVenueData)
              setImagePrev(updatedVenueData.photo)
              setErrMsg('')
            } else {
              setErrMsg('Error updating Venue')
            }
      
          } catch(err) {
            setErrMsg(err.message)
          }
      
        }
      
        return (
            <>
            <section className='container, mt-5 mb-5'>
              <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                  <h2 className='mt-5 mb-2'>Edit Venue</h2>
        
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
                      <input 
                      type="text" 
                      className='form-control'
                      id="venueType"
                      name='venueType'
                      value={venue.venueType}
                      onChange={handleVenueInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor='venuePrice' className='form-label'>Venue Price</label>
                      <input 
                      className='form-control' 
                      id='venuePrice'
                      type='number' 
                      name='venuePrice' 
                      value={venue.venuePrice} 
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
                    <div className='d-grid gap-2 d-md-flex mt-2'>
                    <Link to={'/existing-venues'} className='btn btn-outline-info ml-5'>
                    Back
                    </Link>
                      <button type='submit' className='btn btn-outline-warning'>
                        
                        Edit Venue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
              
            </>
          )
}

export default EditVenue
