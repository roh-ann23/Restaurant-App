
import express from 'express';
import { getMenu,postMenu,menuByTaste,updateMenuById,deleteMenuById }from '../controllers/menu.controller.js'

const router = express.Router();

// menu get
router.get('/',getMenu);
// menu post
router.post('/',postMenu);

router.get('/:tasteType',menuByTaste)

// Updated by Id
router.put('/:id',updateMenuById)

// Delete by Id
router.delete('/:id',deleteMenuById)

export default router;