import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData, getWeatherData } from './api'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

const App = () => {
  const [places, setPlaces] = useState([])
  const [weatherData, setWeatherData] = useState([])
  const [placeFilter, setPlaceFilter] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState({})
  const [childClicked, setchildClicked] = useState(null)

  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect (() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude} }) => {
      setCoordinates({lat: latitude, lng: longitude})
    })
  }, [])

  useEffect (() => {
    const placeFiltered = places.filter((place) => Number(place.rating) > rating)
    console.log(placeFiltered)
    setPlaceFilter(placeFiltered)
  }, [rating])

  useEffect(() => {
    if ( bounds.sw && bounds.ne) {
      setLoading(true)

      getWeatherData(coordinates.lat, coordinates.lng)
      .then((data) => setWeatherData(data))

      getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
        setPlaces(data)
        setPlaceFilter([])
        setLoading(false)
      })
    }
  }, [type, coordinates, bounds])

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List 
            places={placeFilter.length ? placeFilter : places} 
            type={type} 
            setType={setType} 
            rating={rating} 
            setRating={setRating} 
            childClicked={childClicked} 
            isLoading={loading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            places={placeFilter.length ? placeFilter : places} 
            setCoordinates={setCoordinates} 
            coordinates={coordinates}
            setBounds={setBounds} 
            setchildClicked={setchildClicked} 
            coordinates={coordinates}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
      
    </>
  )
}

export default App
