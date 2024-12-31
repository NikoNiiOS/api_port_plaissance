/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: email
 *           description: the email of the user
 *         password:
 *           type: string
 *           description: the password of the user
 *
 *       example:
 *         name: John Doe
 *         email: johndoe@mail.com
 *         password: password
 *
 *
 *
 */
/**
 * @swagger
 * tags:
 *   name: Users
 * /api/users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * tags:
 *   name: Users
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * tags:
 *   name: Users
 * /api/users:
 *   get:
 *     summary: Read all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * tags:
 *   name: Users
 * /api/users/id:
 *   get:
 *     summary: get one catway
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: One user's details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * tags:
 *   name: Catways
 * /api/users/id:
 *   put:
 *     summary: update a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * tags:
 *   name: Users
 * /api/users/id:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The deleted user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 *
 */

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
