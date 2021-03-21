const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require('../models/user')

/* Installation du package de cryptage : npm install --save bcrypt */

exports.signup = (req, res, next) => { /* creation de nouveau user */
    bcrypt.hash(req.body.password, 10) /* Pour hasher le mot de passe, 10 = combien de fois l'alg est passé, plus c'est eleve plus c'est crypter mais plus de temps */
        .then(hash => { /* Recupere le mot de passe crypte*/
            const user = new User ({ /* Creer un nouveau user avec ce mot de passe */
                email: req.body.email,
                password: hash
            })
            user.save() /* Enregistre user dans la base de données */
                .then(() => res.status(201).json({ message: 'Utilisateur créé'}))
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) /* Recupere l'email envoyé */
    .then(user => {
      if (!user) { /* Si l'email n'est pas dans la base de donnée alors erreur */
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) /* Si email ok, alors compare le hash saisie et le hash enregistrer */
        .then(valid => {
          if (!valid) { /* Si le hash et donc le password ne correspond pas alors renvoie erreur */
            return res.status(401).json({ error: 'Mot de passe incorrect !' }); /* 401 Unauthorized */
          } /* Si le hash correspond alors recupere le user et son token */
          res.status(200).json({ /* Renvoie ce qui est attendu par le frontend */
            userId: user._id, 
            token: jwt.sign (/* cf ci dessous */ /* encoder un nouveau token  */
                { userId: user._id}, /*  contient l'ID de l'utilisateur en tant que payload (les données encodées dans le token) */
                "RANDOM_TOKEN_SECRET", /* chaîne secrète de développement temporaire RANDOM_SECRET_KEY pour encoder notre token (à remplacer par une chaîne aléatoire beaucoup plus longue pour la production) */
                {expiresIn: '24h' } /*  durée de validité du token à 24 heures */
            ) 
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); /* 500  la requête envoyée par le navigateur n'a pas pu être traitée */
}

/* Les tokens d'authentification permettent aux utilisateurs de ne se connecter 
qu'une seule fois à leur compte. Au moment de se connecter, ils recevront leur token et le renverront 
automatiquement à chaque requête par la suite */

