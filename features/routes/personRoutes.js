
import express from 'express';
// this are controller files which we are importing
import {postPerson,getPerson,personByWorkType,updatePersonById,deletePersonById } from '../controllers/person.controller.js';

const router = express.Router();

// main routes
router.get ('/', getPerson)
router.post('/', postPerson)

// Person By WorkType
router.get('/:workType',personByWorkType)

// Updated by Id
router.put('/:id',updatePersonById)

// Delete by Id
router.delete('/:id',deletePersonById)


export default router;