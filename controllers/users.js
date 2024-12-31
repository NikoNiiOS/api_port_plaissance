bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const KEY = process.env.SECRET_KEY;

const User = require("../models/users");

/**
 * Crée un utilisateur.
 * @param {object} req - L'objet de requête HTTP.
 * @param {object} res - L'objet de réponse HTTP.
 * @returns {object} - L'utilisateur créé
 */

exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Connecte un utilisateur.
 * @param {object} req - L'objet de requête HTTP.
 * @param {object} res - L'objet de réponse HTTP.
 * @returns {object} - L'utilisateur est connecté
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "user_not_found" });
    }

    bcrypt.compare(password, user.password, async (err, response) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Erreur lors de la comparaison de mots de passe" });
      }
      if (response) {
        // Supprimer le champ de mot de passe de la réponse
        delete user._doc.password;

        // Générer le jeton JWT
        const expireIn = 24 * 60 * 60;
        const token = jwt.sign({ userId: user._id }, KEY, {
          expiresIn: expireIn,
        });

        // Ajouter le jeton JWT dans l'en-tête de la réponse et le cookie
        res.header("Authorization", "Bearer " + token);
        res.cookie("token", token, { maxAge: expireIn * 1000, httpOnly: true });

        return res.status(200).json({
          userId: user._id,
          token: token,
        });
      } else {
        return res.status(403).json({ error: "wrong_credentials" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/**
 * Lit un utilisateur.
 * @param {object} req - L'objet de requête HTTP.
 * @param {object} res - L'objet de réponse HTTP.
 * @returns {object} - Les détails d'un utilisateur
 */

exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Lit tous les utilisateurs.
 * @param {object} req - L'objet de requête HTTP.
 * @param {object} res - L'objet de réponse HTTP.
 * @returns {object} - La liste des utilisateurs
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Met à jour un utilisateur.
 * @param {object} req - L'objet de requête HTTP.
 * @param {object} res - L'objet de réponse HTTP.
 * @returns {object} - L'utilisateur mis à jour
 */

exports.updateUser = async (req, res, next) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      {
        _id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }
    );
    return res.status(200).json("Utilisateur modifié");
  } catch (error) {
    res.status(400).json({ error });
  }
};

/**
 * Supprime un utilisateur.
 * @param {object} req - L'objet de requête HTTP.
 * @param {object} res - L'objet de réponse HTTP.
 * @returns {void}
 */
exports.deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Utilisateur supprimé !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
