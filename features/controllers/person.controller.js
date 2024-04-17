
import Person from "../models/Person.js";
import {jwtAuthMiddleware,generateToken} from '../middleware/jwt.js'
// import { json } from "body-parser";

export const postPerson =  async (req,res) => {
    try {
      // store data from req.body in data variable
      const data = req.body;
      // creating new user
      const newPerson = new Person(data);
      // save new person in DB
      const response = await newPerson.save();
      console.log("Data saved");

      // id and username varun apn payload create krt ahe
      const payload = {
        id:response.id,
        username:response.username
      }
      
      console.log(JSON.stringify(payload)); // just to print payload
      const token = generateToken(payload); // paylaod varun apn takon create krt ahe
      console.log(token); // to print token on console
      
      res.status(201).json({message: "SignUp Succesffully done!", response: response,token: token});
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Internal Server Error'})
    }
  };

  // login person

  export const loginPerson =  async (req,res) => {
    try {
      const { username,password } = req.body;

      const user = await Person.findOne({username:username});

      if(!user || !(await user.comparepassword(password))){
        return res.status(401).json({error:'Invalid username or password'});
      }

      const payload = {
        id: user.id,
        username: user.username
      }

      const token = generateToken(payload);
      res.status(200).json({message:'Login successful',token});

    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Internal Server Error'})
    }
  }

  // get profile of person

  // export const getProfile = async(req,res)=>{
  //   try {
  //     const userData = req.user;
  //     console.log(userData);

  //   const userId =userData.id;
  //   console.log(userId);
  //   const user = await Person.findById(userId);

  //   console.log(user);
  //   res.status(200).json(user);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({error:'Internal Server Error'})
  //   }
    
  // }

  // get the person
export const getPerson =  async (req,res) => {
    try {
      const data = await Person.find();
      console.log("Data Fetched");
      res.status(201).json({message:"Fetched All Person"},data);
  
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Internal Server Error'})
    }
  }

 /**
  *  Get / Person
  * /person/:work
  */
 export const personByWorkType = async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const data = await Person.find({ work: workType });

      // const data = await Person.find();
      console.log("Data Fetched");
      res.status(201).json({message: "Person find Successfully!"},data);
    } else {
      console.log(error);
      res.status(400).json({ error: "Invalid Work Type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
  *  PUT / Person
  * /person/ update person
  */

export const updatePersonById = async (req,res) =>{
  try {
    const personId = req.params.id;
    const updatedPersonEntries = req.body;

    const updatedPerson = await Person.findByIdAndUpdate(personId,updatedPersonEntries,{
      new:true,
      runValidators:true
    });
    if(!updatedPerson){
      return res.status(404).json({error:'Person not found'})
    }
    console.log('Data Updated');
    res.status(200).json({message:"Updated Successfully Done!"},updatedPerson)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



/**
  *  DELETE / Person
  * /person/:id
  */

export const deletePersonById = async (req,res) =>{
  try {
    const personId = req.params.id;
    

    const deletePerson = await Person.findByIdAndDelete(personId);
    if(!deletePerson){
      return res.status(404).json({error:'person not found'})
    }
    console.log('Person Deleted Succefully');
    res.status(200).json({Mesage:'Person Delete SuccessFully'},deletePerson)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}