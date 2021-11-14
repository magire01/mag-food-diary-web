import React, { useState, useEffect } from 'react';
import Axios from "axios";
import FoodAPI from "../utilities/food.json"
import { Typography, Button } from "@mui/material";

const AllMeals = (props) => {

    const [daily, setDaily] = useState({
        user: props.user,
        stamp: props.stamp,
        data: [{
            foodName: "loading",
            calories: "loading"
        }]

    })
    const [isAddMeal, setIsAddMeal] = useState(false)
    //API Call 
    useEffect(() => {
        Axios.get(`http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/summary/${daily.user}/${daily.stamp}/`)
        //.then(result => setDaily({ ...daily, data: result.data.meal }))
        .then(result => setDaily({ ...daily, data: result.data.meal}))
        .catch(err => console.log(err))
    }, [daily.data])

    const submitAddMeal = (e) => {
        e.preventDefault();
        Axios.patch(`http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/add/${daily.user}/${daily.stamp}/`,
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
        .then(setIsAddMeal(false ))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Button onClick={() => setIsAddMeal(!isAddMeal)}>Add Meal</Button>
                {(!isAddMeal) 
                ? null 
                :<div>
                    <Typography>Meal Name:</Typography>
                    <input />
                    <Typography>Calories</Typography>
                    <input />
                    <Button onClick={(e) => submitAddMeal(e)}>Submit</Button>
                </div>}
            {daily.data.map(result => (
                <div>
                    <Typography>{result.foodName}</Typography>
                    <Typography>{result.calories}</Typography>
                </div>
            ))}
        </div>
    )
}
export default AllMeals;