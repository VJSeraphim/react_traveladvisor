import React, { useState, useEffect, createRef } from 'react'
import { CircularProgress, Grid, InputLabel, MenuItem, FormControl, Select, Typography } from '@material-ui/core'

import Details from '../Details/Details'

import useStyles from './styles'

const List = ({ places, childClicked, loading, type, setType, rating, setRating }) => {
    const classes = useStyles()

    const [elementRefs, setElementRefs] = useState([])

    useEffect (() => {
        const refs = Array(places?.length).fill().map((_, i) => elementRefs[i] || createRef())
        setElementRefs(refs)
    }, [places])

    return (
        <div className={classes.container}>
            <Typography variant="h4">Restaurants, Hotels and Attractions Around You</Typography>
            {loading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
            <>
                <FormControl className={classes.formControl}>
                    <InputLabel>
                        Type
                    </InputLabel>
                    <Select value={type} onChange={(e) => setType(e.target.value)}>
                        <MenuItem value="restaurants">Restaurants</MenuItem>
                        <MenuItem value="hotels">Hotels</MenuItem>
                        <MenuItem value="attractions">Attractions</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="rating">
                        Rating
                    </InputLabel>
                    <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <MenuItem value={0}>Show All</MenuItem>
                        <MenuItem value={3}>Above 3.0</MenuItem>
                        <MenuItem value={3.5}>Above 3.5</MenuItem>
                        <MenuItem value={4}>Above 4.0</MenuItem>
                        <MenuItem value={4.5}>Above 4.5</MenuItem>
                    </Select>
                </FormControl>
                <Grid container spacing={3} className={classes.list}>
                    {places?.map((place, i) => (
                        <Grid item key={i} xs={12}>
                            <Details place={place} selected={Number(childClicked) === i} refProp={elementRefs[i]}/>
                        </Grid>
                    ))}
                </Grid>
            </>
            )}
        </div>
    )
}

export default List
