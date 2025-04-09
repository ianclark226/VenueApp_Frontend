import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:9192"
})

// This will add a venue from db
export async function addVenue(photo, venueType, venuePrice) {
    const formData = new FormData();
    formData.append("photo", photo)
    formData.append("venueType", venueType)
    formData.append("venuePrice", venuePrice)

    const res = await api.post("/venues/add/new-venue", formData)

    if(res.status === 201) {
        return true
    } else {
        return false
    }
}

// This gets all the venue types from the db
export async function getVenueTypes() {
    try {
        const res = await api.get("/venues/venue/types")
        return res.data 


    } catch(err) {
        throw new Error("Venue Type is not defined")
    }
}

// This is to get all venues from db
export async function getAllVenues() {
    try {
        const result = await api.get("/venues/all-venues")
        return result.data
    } catch(err) {
        throw new Error("Can't find venues")
    }
}

// This is to delete a venue from db
export async function deleteVenue(venueId) {
    try {

        const result = await api.delete(`/venues/delete/venue/${venueId}`)
        return result.data

    } catch(err) {
        throw new Error(`Unable to delete venue ${err.message}`)
    }
}

// This updates a venue by id
export async function updateVenue(venueId, venueData) {
    const formData = new FormData()
    formData.append("venueType", venueData.venueType)
    formData.append("venuePrice", venueData.venuePrice)
    formData.append("photo", venueData.photo)

    const res = await api.put(`/venues/update/${venueId}`, formData)

    return res
}

// This gets a venue by id
export async function getVenueById(venueId) {
    try {

        const result = await api.get(`/venues/venue/${venueId}`)

        return result.data

    } catch(err) {
        throw new Error(`Error fetching venue ${err.message}`)
    }
}

// This will save a new booking to the db
export async function bookedVenue(venueId, booking) {
    try {

        const res = await api.post(`/bookings/venue/${venueId}/booking`, booking)
        return res.data

    } catch(error) {
        if(error.response && erorr.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking venue : ${error.message}`)
        }
    }
}

// This will get all the bookings in the db
export async function getAllBookings() {
    try {

        const result = await api.get(`/bookings/all-bookings`)
        return result.data

    } catch(err) {
        throw new Error(`Error fetching bookings : ${err.message}`)
    }
}

// This will get the booking by the confirmation code 
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

// This will cancel a booking
export async function cancelBooking(bookingId) {
    try {

        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data

    } catch(err) {
        throw new Error(`Error Cancelling Booking : ${err.message}`)
    }
}
