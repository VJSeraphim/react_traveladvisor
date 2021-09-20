import axios from 'axios'
  
export const getPlacesData = async(type, sw, ne) => {
    try {
        const {data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': 'cd6cd91bf3msh6905a6c6b241644p1e8a3djsndcdb9fa298bd'
          }
        })

        return data
    } catch (error) {
        console.log(error.message)
    }
}