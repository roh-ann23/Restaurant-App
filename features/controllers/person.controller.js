
import Person from "../models/Person.js";

export const postPerson =  async (req,res) => {
    try {
      // store data from req.body in data variable
      const data = req.body;
      // creating new user
      const newPerson = new Person(data);
      // save new person in DB
      const response = await newPerson.save();
  
      console.log("Data saved");
      res.status(201).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Internal Server Error'})
    }
  };

  // get the person
export const getPerson =  async (req,res) => {
    try {
      const data = await Person.find();
      console.log("Data Fetched");
      res.status(201).json(data);
  
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
      res.status(201).json(data);
    } else {
      res.status(400).json({ error: "Invalid Work Type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
  *  Get / Person
  * /person/:work
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
    res.status(200).json(updatedPerson)
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
    res.status(200).json({Mesage:'Person Delete SuccessFully'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}