const Reservations = require("../models/reservations");
const Catway = require("../models/catways");

/**
 * Crée une réservation.
 * @param {object} req - L'objet de requête HTTP.
 * @param {object} res - L'objet de réponse HTTP.
 * @returns {object} - La réservation créée
 */

exports.createReservation = async (req, res, next) => {
  try {
    const reservation = new Reservations({
      catwayNumber: req.body.catwayNumber,
      clientName: req.body.clientName,
      boatName: req.body.boatName,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
    });
    const catway = await Catway.findOne({
      catwayNumber: reservation.catwayNumber,
    });
    catway.catwayState = false;
    await reservation.save();
    await catway.save();
    res.status(201).json({ message: "Réservation enregistrée !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
/**
 * Lit une réservation.
 * @param {object} req - L'objet de requête HTTP.
 * @param {object} res - L'objet de réponse HTTP.
 * @returns {object} - Les détails d'une réservation
 */
exports.getOneReservation = async (req, res, next) => {
  try {
    const reservation = await Reservations.findOne({
      _id: req.params.idReservation,
    });
    if (!reservation) {
      return res.status(400).json({ message: "Réservation non trouvée" });
    }
    res.status(200).json({ reservation: reservation });
  } catch (error) {
    res.status(400).json({ error });
  }
};
/**
 * Lit toutes les réservations.
 * @param {object} req - L'objet de requête HTTP.
 * @param {object} res - L'objet de réponse HTTP.
 * @returns {object} - La liste des réservations
 */
exports.getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservations.find();
    res.status(200).json({ reservations: reservations });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Supprime une réservation.
 * @param {object} req - L'objet de requête HTTP.
 * @param {object} res - L'objet de réponse HTTP.
 * @returns {void}
 */
exports.deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservations.findOne({
      _id: req.params.idReservation,
    });

    if (!reservation) {
      return res.status(404).json({ error: "Réservation non trouvée" });
    }

    const catway = await Catway.findOne({
      catwayNumber: reservation.catwayNumber,
    });

    if (!catway) {
      return res.status(404).json({ error: "Catway non trouvé" });
    }

    catway.catwayState = true;
    await catway.save();

    await Reservations.deleteOne({ _id: req.params.idReservation });

    res.status(200).json({ message: "Réservation supprimée !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
