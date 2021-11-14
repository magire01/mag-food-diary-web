import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { Grid, Typography, Button } from "@mui/material";

import AllMeals from '../components/AllMeals';
import AddMeal from '../components/AddMeal';

const Summary = () => {
    const userStorage = window.sessionStorage.getItem("user")
    const [daily, setDaily] = useState({
        user: userStorage,
        stamp: null,
        day: null,
        date: null,
        data: []
    })
    useEffect(() => {
        setDaily({ ...daily, user: window.sessionStorage.getItem("user")})
        Axios.get("http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/day")
        .then(result => {
            setDaily({ ...daily, stamp: result.data.stamp, day: result.data.day, date: result.data.date })
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <Grid container direction="row" alignItems="center" justifyContent="center">
            {(daily.stamp === null) 
            ? <div> Searching For Results </div> 
            : <Grid item>
                <Typography variant="h4">{daily.day} {daily.date}</Typography>
                <AllMeals user={daily.user} stamp={daily.stamp}/>
            </Grid>}
        </Grid>
    )
}
export default Summary;