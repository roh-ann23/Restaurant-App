import express from "express";
// this are controller files which we are importing
import {
  postPerson,
  getPerson,
  personByWorkType,
  updatePersonById,
  deletePersonById,
  loginPerson,
  getProfile
} from "../controllers/person.controller.js";

import {jwtAuthMiddleware} from "../middleware/jwt.js"

const router = express.Router();

// main routes
router.get("/",getPerson);
router.post("/signup", postPerson);
router.post("/login", loginPerson);

//  profile
// router.get("/profile",jwtAuthMiddleware, getProfile)

// Person By WorkType
router.get("/:workType", jwtAuthMiddleware,personByWorkType);

// Updated by Id
router.put("/:id", updatePersonById);

// Delete by Id
router.delete("/:id", deletePersonById);



export default router;
