/**
 * @swagger
 * components:
 *   schemas:
 *     Catway:
 *       type: object
 *       required:
 *         - catwayNumber
 *         - type
 *         - catwayState
 *       properties:
 *         catwayNumber:
 *           type: number
 *           description: The number of the catway
 *         type:
 *           type: string
 *           description: the type of the catway (can have only 2 values, short or long)
 *         catwayState:
 *           type: boolean
 *           description: Whether the catway is free or booked
 *
 *       example:
 *         catwayNumber: 100
 *         type: short
 *         catwayState: false
 *
 *
 *
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - catwayNumber
 *         - clientName
 *         - boatName
 *         - checkIn
 *         - checkOut
 *       properties:
 *         catwayNumber:
 *           type: number
 *           description: The number of the catway
 *         clientName:
 *           type: string
 *           description: the nmae of the user
 *         boatName:
 *           type: string
 *           description: the name of the boat
 *         checkIn:
 *           type: date
 *           description: the date of the beginning of the reservation
 *         checkOut:
 *           type: date
 *           description: the date of the end of the reservation
 *
 *       example:
 *         catwayNumber: 100
 *         clientName: John Doe
 *         boatName: boat
 *         checkIn: 2024-03-10
 *         checkOut: 2024-03-17
 */
/**
 * @swagger
 * tags:
 *   name: Catways
 * /api/catways:
 *   post:
 *     summary: Create a new catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       201:
 *         description: The created catway.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
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
 * /api/catways:
 *   get:
 *     summary: Read all the catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: The list of the catways.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
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
 * /api/catways/id:
 *   get:
 *     summary: get one catway
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: One catway's details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
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
 * /api/catways/id:
 *   put:
 *     summary: update a catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       201:
 *         description: The updated catway.
 *         content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catway'
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
 * /api/catways/id:
 *   delete:
 *     summary: Delete a catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catways'
 *     responses:
 *       200:
 *         description: The deleted catway.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catways'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * tags:
 *   name: Reservations
 * /api/catways/id/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservations'
 *     responses:
 *       201:
 *         description: The created reservation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservations'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * tags:
 *   name: Reservations
 * /api/catways/reservations:
 *   get:
 *     summary: Read all the reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: The list of the reservations.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservations'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * tags:
 *   name: Reservations
 * /api/catways/reservations/id:
 *   get:
 *     summary: get one reservation
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: One reservation's details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservations'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 *
 */
/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: The catway managing API
 * /api/catways/id/reservations/id:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservations'
 *     responses:
 *       200:
 *         description: The deleted reservation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       401:
 *          description: Unauthorized
 *       500:
 *         description: Some server error
 *
 */

const express = require("express");
const router = express.Router();
const catwayCtrl = require("../controllers/catways");
const reservationCtrl = require("../controllers/reservations");
const auth = require("../middlewares/auth");

router.get("/reservations", auth, reservationCtrl.getAllReservations);
router.get(
  "/reservations/:idReservation",
  auth,
  reservationCtrl.getOneReservation
);

router.post("/", auth, catwayCtrl.createCatway);
router.get("/", auth, catwayCtrl.readAllCatways);
router.get("/:id", auth, catwayCtrl.readOneCatway);
router.put("/:id", auth, catwayCtrl.updateCatway);
router.delete("/:id", auth, catwayCtrl.deleteCatway);

router.post("/:id/reservations", auth, reservationCtrl.createReservation);
router.delete(
  "/:id/reservations/:idReservation",
  auth,
  reservationCtrl.deleteReservation
);

module.exports = router;
