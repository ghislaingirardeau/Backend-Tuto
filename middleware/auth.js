/* POUR VERIFIER LE TOKEN SAISIE */

const jwt = require('jsonwebtoken'); /* ce que l'veut verifier */

module.exports = (req, res, next) => { /* middleware que je veux directement importer */
    try { /* pour capturer les probleme qui peuvent appraitre */
        const token = req.headers.authorization.split(' ')[1]; /* Là où le token est enregistrer dans le frontend, split car un espace */
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET") /* Focntion verify du token reuperer */
        const userId = decodedToken.userId /*  extraire l'ID utilisateur de notre token  */
        if(req.body.userId && req.body.userId != userId) { /* si la demande contient un ID utilisateur, nous le comparons à celui extrait du token. */
            throw 'User ID non valable' /* Si different alors erreur */
        } else {
            next() /* Sinon il appliquera la fonction suivante de la routes */
        }
    } catch (error) { /* Si a tout moment une erreur, renvoie a cache pour ne pas bloquer la suite du code */
        res.status(401).json({error : error | 'Requête non authentifié !'})
    }
}