/* ROUTEUR POUR LA RECUPERATION ET RESPONSE */

const express = require('express');

const router = express.Router(); /* importe la fonction router */

const stuffCtrl = require("../controllers/stuff") /* importe les controllers */

const auth = require('../middleware/auth') /* importe le middleware */

const multer = require('../middleware/multer-config')

/* APPLIQUE UN CONTROLLER SUIVANT CHAQUE ROUTE ET METHODE*/

/* Attention a l'ordre des middleware ex MULTER !!! ex: Authenfication avant toute action possible */

router.post('/', auth, multer, stuffCtrl.createThing) /* applique le middleware sur les routes que nous souhaitons proteger */
router.delete('/:id', auth, stuffCtrl.deleteThing) /* pour acceder a la routes, il faudra donc etre connecter */
router.put('/:id', auth, multer, stuffCtrl.modifyThing)
router.get('/:id', auth, stuffCtrl.getOneThing)
router.get('/', auth, stuffCtrl.getThing);

module.exports = router;