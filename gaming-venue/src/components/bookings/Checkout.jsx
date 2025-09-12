import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { getVenueById } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import { FaAccessibleIcon, FaChild, FaClock, FaLocationArrow, FaMoneyBill, FaProcedures, FaUserFriends, FaWifi } from 'react-icons/fa'
import VenueCarousel from '../common/VenueCarousel'

const Checkout = () => {

  const [error, setError] = useState("")
  const [isloading, setIsLoading] = useState(false)
  const[venueInfo, setVenueInfo] = useState({photo: "", venueType: "", venuePrice: ""})

  const{ venueId } = useParams()

  useEffect(() => {
    setTimeout(() => {
      getVenueById(venueId)
      .then((response) => {
        setVenueInfo(response)
        setIsLoading(false)
      }).catch((error) => {
        setError(error)
        setIsLoading(false)
      })
    }, 2000)

  }, [venueId])

  return (
    <div>
      <section className='container'>
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-5 mb-5">
            {isloading ? (
              <p>Loading Venue information...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="venue-info">
                <img 
                src={`data:image/png;base64, ${venueInfo.photo}`} 
                alt="Venue Image" 
                style={{width : "100%", height: "200px"}}
                />

                <table className='table table-bordered'>
                  <tbody>
                    <tr>
                      <th>Venue Type:</th>
                      <th>{venueInfo.venueType}</th>
                    </tr>
                    <tr>
                      <th>Venue Price:</th>
                      <th>{venueInfo.venuePrice}</th>
                    </tr>

                    <tr>
                      <th>Venue Service:</th>
                      <td>
                        <ul className='list-unstyled'>
                          <li>
                            <FaAccessibleIcon/> Easy Access
                            </li>
                            <li>
                            <FaUserFriends/> Make New Friends
                            </li>
                            <li>
                            <FaLocationArrow/> Local Venues
                            </li>
                            <li>
                            <FaChild/> Kid Friendly
                            </li>
                            <li>
                            <FaMoneyBill/> Low Prices
                            </li>
                            <li>
                            <FaProcedures/> Rules to Follow
                            </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-6">
            <BookingForm/>
          </div>
        </div>
      </section>
        <div className="container">
          <VenueCarousel/>
        </div>
    </div>
  )
}

export default Checkout
