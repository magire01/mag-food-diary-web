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
    
    const [dayButton, setDayButton] = useState({
        dddd: [],
        l: [],
        stamp: []
    })
    useEffect(() => {
        setDaily({ ...daily, user: window.sessionStorage.getItem("user")})
        Axios.get("http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/day")
        .then(result => {
            setDaily({ ...daily, stamp: result.data.stamp, day: result.data.day, date: result.data.date })
            setDayButton(result.data.week)
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <Grid container direction="row" alignItems="center" justifyContent="center">
            {(daily.stamp === null) 
            ? <div> Searching For Results </div> 
            : <Grid item>
                {dayButton.dddd.map((result, index) => (
                    <Button onClick={() => setDaily({ ...daily, stamp: dayButton.stamp[index], date: dayButton.l[index], day: result })}>{result}</Button>
                ))}
                <Typography variant="h4">{daily.day} {daily.date}</Typography>
                <AllMeals user={daily.user} stamp={daily.stamp} day={daily.day} date={daily.date}/>
            </Grid>}
        </Grid>
    )
}
export default Summary;