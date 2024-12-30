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