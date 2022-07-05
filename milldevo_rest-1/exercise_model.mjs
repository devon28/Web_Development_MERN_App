import mongoose from 'mongoose';

mongoose.connect(
    "mongodb://localhost:27017/exercise_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create a new exercise
 * @param {String} name 
 * @param {Number} reps 
 * @param {Number} weight
 * @param {String} unit 
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
};


/**
 * Retrieve all exercises in database
 * @param None
 * @returns 
 */
const findExercises = async () => {
    const query = Exercise.find()
    return query.exec();
};


/**
 * Replace the name, reps, weight, unit and/or date properties of the exercise with the id value provided
 * @param {String} _id 
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the number of documents modified
 */
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id },
        { name: name, reps: reps, weight: weight, unit: unit, date: date });
    return result.modifiedCount;
};


/**
 * Delete the exercise with provided id value
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
};

export { createExercise, findExercises, replaceExercise, deleteById };