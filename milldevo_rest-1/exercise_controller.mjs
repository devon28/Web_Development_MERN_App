import * as exercises from './exercise_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express(); 

app.use(express.json());

/**
 * Create a new exercise with the name, reps, weight, unit and date provided in the body
 * Uses POST method
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
    .then(exercise => {
        res.status(201).json(exercise);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ Error: 'Failed to create exercise document due to syntax error' });
    });
});


/**
 * Retrieve all exercises
 * @param None
 * Uses GET method
 */
app.get('/exercises', (req, res) => {
    console.log(req.query);
    exercises.findExercises()
        .then(exercises => {
            res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 500 in case of an error.
            res.status(500).json({ Error: 'Failed to retrieve exercise log due to syntax error' });
        });
        
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit and date to the values provided in the body.
 */
app.put('/exercises/:id', (req, res) => {
    exercises.replaceExercise(req.params.id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ id: req.params.id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 500 in case of an error.
            res.status(500).json({ Error: 'Failed to update exercise document due to syntax error' });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:id', (req, res) => {
    exercises.deleteById(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            // In case of an error, send back status code 500 in case of an error.
            res.status(500).json({ Error: 'Failed to delete exercise document due to syntax error' });
        });
        
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});