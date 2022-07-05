import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddExercisePage from "./pages/AddExercisePage";
import EditExercisePage from "./pages/EditExercisePage";
import { useState } from "react"
import weightLifter from "./images/weightLifter.png";

function App() {
  const [ exerciseToEdit, setExerciseToEdit ] = useState();

  return (
    <div>
      <Router>
      <header className="App-header">
        <img src={ weightLifter } alt="Logo" className="Header-logo" />
        <h1>Turn Fat to Fit!</h1>
        <p ID="slogan">Track your progress, get stronger and get those gains</p>
        </header>
        <main className="App-body"> 
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit}/>
          </Route>
          <Route path="/add-exercises">
            <AddExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
          </main>
        <footer className="App-footer">
        <p>© 2022 Devon Miller</p>
        </footer>
      </Router>
    </div>
  );
};
export default App;