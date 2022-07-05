import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const EditExercisePage = ({ exerciseToEdit }) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);
    const history = useHistory();


    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert('Exercise edited, keep up those gains!')
        } else {
            alert(`Failed to update exercise, status code = ${response.status}`)
        };
        history.push("/");
    };
    return (
        <><div id="add-edit">
            <h2 id="body-heading">Edit Exercise</h2>
            <div id="answer">
            <label for="name">Name</label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} classname="edit-box"/></div>
             <div id="answer">
            <label for="reps">Reps</label>
            <input
                id="reps"
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)} /></div>
             <div id="answer">
            <label for="weight">Weight</label>
            <input
                id="weight"
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} /></div>
             <div id="answer">
            <label for="units">Units</label>
            <select id="units" name="unit" value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="lbs" selected>lbs</option>
                <option value="kgs" >kgs</option>
                <option value="miles">miles</option>
            </select></div>  
            <div id="answer">
            <label for="date">Date</label>
            <input
                id="date"
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} /></div>
            
        </div>
        <button
                classname="add-button"
                onClick={editExercise}
            >Update</button>
            <Link id="App-link" to="/" exact>Back to homepage</Link></>
    );
};
export default EditExercisePage;