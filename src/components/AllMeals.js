import React, { useState, useEffect } from 'react';
import Axios from "axios";
import FoodAPI from "../utilities/food.json"
import { Grid, Paper, Typography, Button, Modal, Fab } from "@mui/material";

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
    // useEffect(() => {
    //     Axios.get(`http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/summary/${daily.user}/${props.stamp}/`)
    //     .then(result => setDaily({ ...daily, stamp: props.stamp, day: props.day, date: props.date, data: result.data.meal}))
    //     .catch(err => setDaily({ ...daily, data: null}))
    // }, [daily])

    useEffect(() => {
        setDaily({ ...daily, stamp: props.stamp, day: props.day, date: props.date, data: FoodAPI.data.meal})
        //setDaily({ ...daily, stamp: props.stamp, day: props.day, date: props.date, data: null})
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

    // const submitAddMeal = (e) => {
    //     e.preventDefault();
    //     Axios.patch(`http://magfooddiary-env.eba-bh6g2nuu.us-east-2.elasticbeanstalk.com/add/${daily.user}/${daily.stamp}/`,
    //     {
    //         meal: [mealData]
    //     })
    //     .then(setIsAddMeal(false))
    //     .catch(err => console.log(err))
    // }

    const submitAddMeal = (e) => {
        e.preventDefault();
        setIsAddMeal(false)
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

    const style = {
        mealCard: {
            margin: "20px 40px 20px 40px",
            backgroundColor: "orange",
            color: "white"
        },
        mealFont: {
            textAlign: "left",
            padding: "10px 0px 10px 15px",
            fontWeight: "bold",
            fontSize: 20
        },
        foodFont: {
            padding: "10px 0px 10px 0px"
        },
        addMealButton: {
            backgroundColor: "yellow",
            color: "orange",
            position: "fixed", 
            bottom: "20px", 
            right: "35%"
        }
    }
    return (
        <div style={{ marginBottom: 100 }}>
            {(daily.data == null)
            ? <Grid Container direction="row" alignItems="center" justifyContent="center">
                <Typography>Start Day</Typography>
                <Grid item xs="12">
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
                </Grid>
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
            </Grid>
            : <Grid Container direction="row" alignItems="center" justifyContent="center">
                <Paper elevation="1" style={style.mealCard}>
                    <Typography style={style.mealFont}>Breakfast</Typography>
                    {daily.data.filter(filter => filter.mealName === "Breakfast").map(result => (
                            <Grid container direction="row" alignItems="center" justifyContent="center">
                                <Grid item xs="6">
                                    <Typography style={style.foodFont}>{result.foodName}</Typography>
                                </Grid>
                                <Grid item xs="6">
                                    <Typography style={style.foodFont}>{result.calories} cal</Typography>
                                </Grid>
                            </Grid>
                        
                    ))}
                </Paper>

                <Paper elevation="1" style={style.mealCard}>
                    <Typography style={style.mealFont}>Lunch</Typography>
                    {daily.data.filter(filter => filter.mealName === "Lunch").map(result => (
                            <Grid container direction="row" alignItems="center" justifyContent="center">
                                <Grid item xs="6">
                                    <Typography style={style.foodFont}>{result.foodName}</Typography>
                                </Grid>
                                <Grid item xs="6">
                                    <Typography style={style.foodFont}>{result.calories} cal</Typography>
                                </Grid>
                            </Grid>
                        
                    ))}
                </Paper>

                <Paper elevation="1" style={style.mealCard}>
                    <Typography style={style.mealFont}>Dinner</Typography>
                    {daily.data.filter(filter => filter.mealName === "Dinner").map(result => (
                            <Grid container direction="row" alignItems="center" justifyContent="center">
                                <Grid item xs="6">
                                    <Typography style={style.foodFont}>{result.foodName}</Typography>
                                </Grid>
                                <Grid item xs="6">
                                    <Typography style={style.foodFont}>{result.calories} cal</Typography>
                                </Grid>
                            </Grid>
                        
                    ))}
                </Paper>

                <Paper elevation="1" style={style.mealCard}>
                    <Typography style={style.mealFont}>Snack</Typography>
                    {daily.data.filter(filter => filter.mealName === "Snack").map(result => (
                        <Grid container direction="row" alignItems="center" justifyContent="center">
                            <Grid item xs="6">
                                <Typography style={style.foodFont}>{result.foodName}</Typography>
                            </Grid>
                            <Grid item xs="6">
                                <Typography style={style.foodFont}>{result.calories} cal</Typography>
                            </Grid>
                        </Grid>
                        
                    ))}
                </Paper>
                <Modal
                    open={isAddMeal}
                    onClose={submitAddMeal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Paper style={{ margin: "50% 5% 5% 5%"}}>
                        <Grid container direction="row" alignItems="center" justifyContent="center">  
                            <Grid item xs="12">
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
                            </Grid>
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
                        </Grid>
                    </Paper>
                </Modal>
                <Fab variant="extended" size="medium" color="primary" aria-label="add" style={style.addMealButton} onClick={() => setIsAddMeal(!isAddMeal)}>
                    Add Meal
                </Fab>
            </Grid>}
        </div>    
    )
}
export default AllMeals;