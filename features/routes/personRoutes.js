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
 *   post:
 *     summary: Register a new person
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       201:
 *         description: Person registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       400:
 *         description: Bad request. The request payload is invalid.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

router.post("/signup", postPerson);

/**
 * @swagger
 * /person/login:
 *   post:
 *     summary: Log in a person
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the person
 *               password:
 *                 type: string
 *                 description: The password of the person
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the login
 *                 token:
 *                   type: string
 *                   description: A token to authenticate subsequent requests
 *       401:
 *         description: Unauthorized. Invalid username or password provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating invalid credentials
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating internal server error
 */


router.post("/login", loginPerson);

//  profile
// router.get("/profile",jwtAuthMiddleware, getProfile)

/**
 * @swagger
 * /person:
 *   get:
 *     summary: Get all persons
 *     tags: [Persons]
 *     responses:
 *       200:
 *         description: Persons fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of fetching persons
 *                 data:
 *                   type: array
 *                   description: An array containing all persons
 *                   items:
 *                     $ref: '#/components/schemas/Person'
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating internal server error
 */



// main routes
router.get("/", getPerson);

/**
 * @swagger
 * /person/:workType:
 *   get:
 *     summary: Get persons by work type
 *     tags: [Persons]
 *     parameters:
 *       - in: path
 *         name: workType
 *         required: true
 *         description: The work type of persons to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - jwtAuth: []
 *     responses:
 *       200:
 *         description: Persons fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               description: An array containing persons with the specified work type
 *               items:
 *                 $ref: '#/components/schemas/Person'
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating internal server error
 */

// Person By WorkType
router.get("/:workType", jwtAuthMiddleware, personByWorkType);


/**
 * @swagger
 * /person/:id :
 *   put:
 *     summary: Update a person by ID
 *     tags: [Persons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the person to update
 *         schema:
 *           type: string
 *     security:
 *       - jwtAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       200:
 *         description: Person updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *       404:
 *         description: Person not found for the provided ID.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating internal server error
 */

// Updated by Id
router.put("/:id",jwtAuthMiddleware, updatePersonById);



/**
 * @swagger
 * /person/:id:
 *   delete:
 *     summary: Delete a person by ID
 *     tags: [Persons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the person to delete
 *         schema:
 *           type: string
 *     security:
 *       - jwtAuth: []
 *     responses:
 *       204:
 *         description: Person deleted successfully
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *       404:
 *         description: Person not found for the provided ID.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating internal server error
 */


// Delete by Id
router.delete("/:id",jwtAuthMiddleware, deletePersonById);

export default router;
