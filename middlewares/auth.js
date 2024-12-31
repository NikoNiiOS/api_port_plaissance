const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const KEY = process.env.SECRET_KEY

module.exports = (req, res, next) => {
    try {
        // Récupérer le token à partir de l'en-tête Authorization
        const authorizationHeader = req.headers['authorization'];
        console.log(authorizationHeader)
        if (!authorizationHeader) {
            throw new Error('Token manquant dans les en-têtes');
        }

        // Vérifier si le format du token est correct
        if (!authorizationHeader.startsWith('Bearer ')) {
            throw new Error('Format de token incorrect');
        }

        // Extraire le token du format 'Bearer <token>'
        const token = authorizationHeader.split(' ')[1];

        // Vérifier et décoder le token
        const decodedToken = jwt.verify(token, KEY);
        const userId = decodedToken.userId;
        req.user = {
            userId: userId
        };
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};