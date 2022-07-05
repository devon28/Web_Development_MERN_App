import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert('Exercise added, keep up those gains!')
        } else {
            alert(`Failed to add exercise due to missing criterea status code = ${response.status}`)
        };
        history.push("/");
    };
    return (
        <><div>
            <h2 id="body-heading">Add Exercise</h2>
            <div id="answer">
            <label for="name">Name</label>
            <input
                id="name"
                type="text"
                placeholder="Exercise name:"
                value={name}
                onChange={e => setName(e.target.value)} /></div>
            <div id="answer">
            <label for="reps">Reps</label>
            <input
                id="reps"
                type="number"
                value={reps}
                placeholder="Reps:"
                onChange={e => setReps(e.target.value)} /></div>
            <div id="answer">
            <label for="weight">Weight</label>
            <input
                id="weight"
                type="number"
                placeholder="Weight:"
                value={weight}
                onChange={e => setWeight(e.target.value)} /></div>
            <div id="answer">
            <label for="unit">Unit</label>
            <select id="unit"name="unit" value={unit} onChange={e => setUnit(e.target.value)}>
                <option>Unit</option>
                <option value="lbs" selected>lbs</option>
                <option value="kgs" >kgs</option>
                <option value="miles">miles</option>
            </select></div>
            <div id="answer">  
            <label for="date">Date</label>
            <input
                type="Date"
                placeholder={Date()}
                value={date}
                onChange={e => setDate(e.target.value)} /></div>
            
            
        </div>
        
        
        <button
            classname="add-button"
            onClick={addExercise}
            >Add</button>
        
        <Link id="App-link" to="/" exact>Back to homepage</Link></>
        
        
    );
};
export default AddExercisePage;