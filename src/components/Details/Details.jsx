import React from 'react'
import { Box, Card, Buttons, CardMedia, CardContent, CardActions, Chip, Typography} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Phone from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating'

const Details = ({ place }) => {
    return (
        <div>
            <h1>{place.name}</h1>
        </div>
    )
}

export default Details
