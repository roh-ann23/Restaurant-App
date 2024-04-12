import mongoose from 'mongoose';

// Define the schema for the person
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        // required: true
    },
    work: {
        type: String,
        enum : ['chef','waiter','manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
    // You can add more fields as needed
});

// Create a model from the schema
const Person = mongoose.model('Person', personSchema);

export default Person;
