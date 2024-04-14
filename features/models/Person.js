import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
    // You can add more fields as needed
});

// pre method
personSchema.pre('save', async function(next){
    const person = this;
    // hash the passsword only if its modified
    if(!person.isModified('password')) return next();

    try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(person.password, salt);
    this.password = hashedPassword
    } catch (error) {
        return next(error);
    }
    
})

personSchema.methods.comparepassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    } catch (error) {
        throw error ;
    }
    
}



// Create a model from the schema
const Person = mongoose.model('Person', personSchema);

export default Person;
