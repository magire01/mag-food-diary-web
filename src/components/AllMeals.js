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

    const [mealData, setMealData] = useState({
        mealName: "Breakfast",
        foodName: "",
        calories: "",
        comments: "test"
    })
    //API Call 
    useEffect(() => {
        Axios.get(`http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/summary/${daily.user}/${daily.stamp}/`)
        .then(result => setDaily({ ...daily, data: result.data.meal}))
        .catch(err => console.log(err))
    }, [daily.data])

    const handleMealName = (meal) => {
        setMealData({ ...mealData, mealName: meal })
    }
    const handleFoodName = (e) => {
        setMealData({ ...mealData, foodName: e.target.value })
    }
    const handleCalories = (e) => {
        setMealData({ ...mealData, calories: e.target.value })
    }

    const submitAddMeal = (e) => {
        e.preventDefault();
        Axios.patch(`http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/add/${daily.user}/${daily.stamp}/`,
        {
            meal: [mealData]
        })
        .then(setIsAddMeal(false))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Button onClick={() => setIsAddMeal(!isAddMeal)}>Add Meal</Button>
                {(!isAddMeal) 
                ? null 
                :<div>
                    <Button 
                        onClick={() => handleMealName("Breakfast")} 
                        style={(mealData.mealName == "Breakfast") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Breakfast</Button>
                    <Button onClick={() => handleMealName("Lunch")}
                        style={(mealData.mealName == "Lunch") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Lunch</Button>
                    <Button onClick={() => handleMealName("Dinner")}
                        style={(mealData.mealName == "Dinner") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Dinner</Button>
                    <Button onClick={() => handleMealName("Snack")}
                        style={(mealData.mealName == "Snack") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Snack</Button>
                    <Typography>Food Name:</Typography>
                    <input onChange={handleFoodName}/>
                    <Typography>Calories</Typography>
                    <input onChange={handleCalories}/>
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