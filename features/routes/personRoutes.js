import express from "express";
// this are controller files which we are importing
import {
  postPerson,
  getPerson,
  personByWorkType,
  updatePersonById,
  deletePersonById,
  loginPerson
  // getPerson,
} from "../controllers/person.controller.js";

import { jwtAuthMiddleware } from "../middleware/jwt.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Person:
 *      type: object
 *      required:
 *        - name
 *        - work
 *        - email
 *        - mobile
 *        - address
 *        - salary
 *        - username
 *        - password
 *      properties:
 *        name:
 *           type: string
 *           description: The name of the employee
 *        age:
 *          type: number
 *          description: The age of the employee
 *        work:
 *          type: string
 *          description: The job title of the employee within the restaurant
 *        mobile:
 *          type: string
 *          description: The mobile phone number of the employee
 *        email:
 *          type: string
 *          description: The email address of the employee, must be unique
 *        address:
 *          type: string
 *          description: The home address of the employee
 *        salary:
 *          type: number
 *          description: The salary of the employee in USD
 *        username:
 *          type: string
 *          description: The username for the employee's account
 *        password:
 *          type: string
 *          description: The password for the employee's account, must be secure
 *      example:
 *           age: 45     
 *           name: akka
 *           work: chef          
 *           email: akka@gmail.com  
 *           mobile: 123-456-7890
 *           address: 456 Oak Street, Springfield
 *           salary: 4500
 *           username: akka
 *           password: 12345  
 */


/**
 *  @swagger
 *  tags:
 *    name: Person 
 *    description: Person apis
 */


/**
 * @swagger
 * /person/signup:
 *    post:
 *      summary: signup person
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *      responses:
 *        201:
 *          description: SignUp Succesffully done!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Person'
 *        500:
 *          description: internal serevr error
 * 
 * 
 * 
 */
router.post("/signup", postPerson);

/**
 * @swagger
 * /person/login:
 *    post:
 *      summary: signin person
 *      tags: [Auth]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *      responses:
 *        200:
 *          description: Login Successylly!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Person'
 *        500:
 *          description: internal serevr error
 * 
 */

router.post("/login", loginPerson);

//  profile
// router.get("/profile",jwtAuthMiddleware, getProfile)


/**
 * @swagger
 * /person/:
 *    get:
 *      summary: Get all Persons
 *      tags: [Person]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *      responses:
 *        200:
 *          description: Fetched All Person
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Person'
 *        500:
 *          description: internal serevr error
 * 
 */


// main routes
router.get("/", getPerson);

/**
 * @swagger
 * /person/:workType:
 *    get:
 *      summary: This endpoint is for find a person by their worktype in the system.
 *      tags: [Person]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *      responses:
 *        200:
 *          description: Person find Successfully!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Person'
 *        500:
 *          description: internal serevr error
 */




// Person By WorkType
router.get("/:workType", jwtAuthMiddleware, personByWorkType);

/**
 * @swagger
 * /person/:id:
 *    put:
 *      summary: This endpoint is for updating a person in the system.
 *      tags: [Person]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *      responses:
 *        200:
 *          description: Updated Successfully Done!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Person'
 *        500:
 *          description: internal serevr error
 */

// Updated by Id
router.put("/:id",jwtAuthMiddleware, updatePersonById);

/**
 * @swagger
 * /person/:id:
 *    delete:
 *      summary: This endpoint is for deleting a person in the system.
 *      tags: [Person]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *      responses:
 *        200:
 *          description: Person Delete SuccessFully!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Person'
 *        500:
 *          description: internal serevr error
 */

// Delete by Id
router.delete("/:id",jwtAuthMiddleware, deletePersonById);

export default router;
