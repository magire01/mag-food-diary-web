import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { Grid, Typography, Button } from "@mui/material";

import DayAPI from "../utilities/day.json";

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
    
    const [dayButton, setDayButton] = useState({
        dddd: [],
        l: [],
        stamp: []
    })

    const [dayIndex, setDayIndex] = useState(3)


    // useEffect(() => {
    //     setDaily({ ...daily, user: window.sessionStorage.getItem("user")})
    //     Axios.get("http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/day")
    //     .then(result => {
    //         setDaily({ ...daily, stamp: result.data.stamp, day: result.data.day, date: result.data.date })
    //         setDayButton(result.data.week)
    //     })
    //     .catch(err => console.log(err))
    // }, [])

    useEffect(() => {
        setDaily({ ...daily, user: window.sessionStorage.getItem("user")})
            setDaily({ ...daily, stamp: DayAPI.data.week.stamp[dayIndex], day: DayAPI.data.week.dddd[dayIndex], date: DayAPI.data.week.l[dayIndex] })
            setDayButton(DayAPI.data.week)
    }, [dayIndex])

    return(
        <Grid container direction="row" alignItems="center" justifyContent="center" style={{marginTop: 20}}>
            {(daily.stamp === null) 
            ? <div> Searching For Results </div> 
            : <>
                <Grid item xs="2">
                    <Button onClick={() => setDayIndex(dayIndex - 1)}>-</Button>
                </Grid>
                <Grid item xs="8">
                    <Typography variant="h5">{daily.day} {daily.date}</Typography>
                </Grid>
                <Grid item xs="2">
                    <Button onClick={() => setDayIndex(dayIndex + 1)}>+</Button>
                </Grid>
                <Grid item xs="12">
                    <AllMeals user={daily.user} stamp={daily.stamp} day={daily.day} date={daily.date}/>
                </Grid>
            </>}
        </Grid>
    )
}
export default Summary;