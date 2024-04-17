
import express from 'express';
import { getMenu,postMenu,menuByTaste,updateMenuById,deleteMenuById }from '../controllers/menu.controller.js'

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    MenuItem:
 *      type: object
 *      required:
 *        - name
 *        - price
 *        - taste
 *        - is_drink
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the menu item
 *        price:
 *          type: number
 *          description: The price of the menu item in USD
 *        taste:
 *          type: string
 *          description: The taste category of the menu item (sour, sweet, spicy)
 *          enum:
 *            - sour
 *            - sweet
 *            - spicy
 *        is_drink:
 *          type: boolean
 *          description: Specifies if the menu item is a drink or not
 *        ingredients:
 *          type: array
 *          items:
 *            type: string
 *          description: The list of ingredients used in the menu item
 *        num_sales:
 *          type: number
 *          description: The number of times the menu item has been sold
 *      example:
 *        name: "Spicy Chicken Curry"
 *        price: 10
 *        taste: "spicy"
 *        is_drink: false
 *        ingredients: ["chicken", "curry sauce", "spices"]
 *        num_sales: 25
 */



/**
 *  @swagger
 *  tags:
 *    name: Menu 
 *    description: Menu's apis
 */



// menu get

/**
 * @swagger
 * /menu:
 *    get:
 *      summary: Get all Menu
 *      tags: [Menu]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *      responses:
 *        200:
 *          description: Fetched all menu's!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/MenuItem'
 *        500:
 *          description: internal serevr error
 * 
 */

router.get('/',getMenu);


// menu post

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Bad request. The request payload is invalid.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */


router.post('/',postMenu);

// menu by taste

/**
 * @swagger
 * /menu/:tasteType:
 *   get:
 *     summary: Get menu items by taste type
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: tasteType
 *         required: true
 *         description: The taste type of menu items to retrieve (sour, sweet, or spicy)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu items fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Bad request. The taste type provided is invalid.
 *       404:
 *         description: No menu items found for the provided taste type.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

router.get('/:tasteType',menuByTaste)

// Updated by Id
/**
 * @swagger
 * /menu/:id:
 *   put:
 *     summary: Update a menu item by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the menu item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Bad request. The request payload is invalid.
 *       404:
 *         description: Menu item not found for the provided ID.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

router.put('/:id',updateMenuById)

// Delete by Id
/**
 * @swagger
 * /menu/:id:
 *   delete:
 *     summary: Delete a menu item by ID
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the menu item to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Menu item deleted successfully
 *       404:
 *         description: Menu item not found for the provided ID.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

router.delete('/:id',deleteMenuById)

export default router;