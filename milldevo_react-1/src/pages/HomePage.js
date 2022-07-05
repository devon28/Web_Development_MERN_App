import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [ exercises, setExercises ] = useState([]);
    const history = useHistory();
    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method:'DELETE' });
        console.log(response.status)
        if (response.status === 204) {
            const newExercises = exercises.filter(e => e._id !== _id);
            setExercises(newExercises)
        } else {
            console.error(`failed to delete exercise with status code ${_id}, status code = ${response.status}`)
        };
    };
    const onEdit = exercise => {
        setExerciseToEdit(exercise)
        history.push("edit-exercise");
    };
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        //fetch returns json
        const data = await response.json();
        setExercises(data); // must usee usestate here
    };
    useEffect ( () => {
        loadExercises();
    }, [] );
    return (
        <>
            <h2 id="body-heading">List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link id="App-link" to="/add-exercises">Add an exercise</Link>
        </>
    );
};
export default HomePage;