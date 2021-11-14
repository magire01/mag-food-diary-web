import React, { useState, useEffect } from 'react';
import Axios from "axios";
import FoodAPI from "../utilities/food.json"
import { Typography, Button } from "@mui/material";

const AddMeal = (props) => {

    
    //API Call 
    const submitAddMeal = (e) => {
        e.preventDefault();
        Axios.patch(`http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/add/${props.user}/${props.stamp}/`,
        {
            meal: [
                { 
                mealName: "Breakfast",
                foodName: "chicken22",
                calories: "3333",
                comments: "testpost"
            }
        ]
        })
        .then(result => console.log("Successfully Added Item"))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Typography>Meal Name:</Typography>
            <input />
            <Typography>Calories</Typography>
            <input />
            <Button onClick={(e) => submitAddMeal(e)}>Submit</Button>
        </div>
    )
}
export default AddMeal;