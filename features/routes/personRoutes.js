
import express from 'express';
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