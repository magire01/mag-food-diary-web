import React, { useState, useEffect } from 'react';
import Axios from "axios";
import FoodAPI from "../utilities/food.json"
import { Grid, Typography, Button } from "@mui/material";

const AllMeals = (props) => {

    const [daily, setDaily] = useState({
        user: props.user,
        stamp: props.stamp,
        day: props.day,
        date: props.date,
        data: []
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
        Axios.get(`http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/summary/${daily.user}/${props.stamp}/`)
        .then(result => setDaily({ ...daily, stamp: props.stamp, day: props.day, date: props.date, data: result.data.meal}))
        .catch(err => setDaily({ ...daily, data: null}))
    }, [daily])

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


    const submitStartDay = (e) => {
        e.preventDefault();
        Axios.post(`http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/create/item/`, 
        {
            _id: daily.user + daily.stamp,
            user: daily.user,
            stamp: daily.stamp,
            day: daily.day,
            date: daily.date,
            meal: mealData
        })
        .then(result => console.log("Successfully starte day"))
        .catch(err => console.log(err))
    }


    return (
        <div>

            {(daily.data == null)
            ? <>
                <Typography>Start Day</Typography>
                <Button 
                    onClick={() => handleMealName("Breakfast")} 
                    style={(mealData.mealName == "Breakfast") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Breakfast</Button>
                <Button 
                    onClick={() => handleMealName("Lunch")}
                    style={(mealData.mealName == "Lunch") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Lunch</Button>
                <Button 
                    onClick={() => handleMealName("Dinner")}
                    style={(mealData.mealName == "Dinner") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Dinner</Button>
                <Button 
                    onClick={() => handleMealName("Snack")}
                    style={(mealData.mealName == "Snack") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Snack</Button>
                <Grid item xs="12">
                    <Typography>Food Name:</Typography>
                    <input onChange={handleFoodName}/>
                </Grid>
                <Grid item xs="12">
                    <Typography>Calories</Typography>
                    <input onChange={handleCalories}/>
                </Grid>
                <Grid item xs="12">
                    <Button onClick={(e) => submitStartDay(e)}>Submit</Button>
                </Grid>
            </>
            : <>
                <Button onClick={() => setIsAddMeal(!isAddMeal)}>Add Meal</Button>
                    {(!isAddMeal) 
                    ? null 
                    :<>
                        <Button 
                            onClick={() => handleMealName("Breakfast")} 
                            style={(mealData.mealName == "Breakfast") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Breakfast</Button>
                        <Button 
                            onClick={() => handleMealName("Lunch")}
                            style={(mealData.mealName == "Lunch") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Lunch</Button>
                        <Button 
                            onClick={() => handleMealName("Dinner")}
                            style={(mealData.mealName == "Dinner") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Dinner</Button>
                        <Button 
                            onClick={() => handleMealName("Snack")}
                            style={(mealData.mealName == "Snack") ? { backgroundColor: "yellow" } : { backgroundColor: "white" }}>Snack</Button>
                        <Grid item xs="12">
                            <Typography>Food Name:</Typography>
                            <input onChange={handleFoodName}/>
                        </Grid>
                        <Grid item xs="12">
                            <Typography>Calories</Typography>
                            <input onChange={handleCalories}/>
                        </Grid>
                        <Grid item xs="12">
                            <Button onClick={(e) => submitAddMeal(e)}>Submit</Button>
                        </Grid>
                    </>}
            
                {daily.data.map(result => (
                    <div>
                        <Typography>{result.foodName}</Typography>
                        <Typography>{result.calories}</Typography>
                    </div>
                ))}
            </>}
        </div>    
    )
}
export default AllMeals;