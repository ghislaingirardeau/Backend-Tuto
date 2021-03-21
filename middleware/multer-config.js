/* Pour gerer le telechargement des images, on creer un nouveau middleware */

const multer = require('multer')

const MIME_TYPE = { /* POUR DEFINIR LE TYPE D'IMAGE QUE NOUS RECEVRONS */
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

  const storage = multer.diskStorage({ /* prend comme argument : la destination et filename  */
    destination: (req, file, callback) => { /* oú enregistrer l'image */
      callback(null, 'images'); /* null = pas erreur, 'images' le dossier */
    },
    filename: (req, file, callback) => { /* Nom du fichier a utiliser et pour avoir des noms uniques */
      const name = file.originalname.split(' ').join('_'); /* image souvent envoyé avec des espaces dans le nom */
      /* split pour supprimer les espaces et join _ pour recreer le nom ex : mon_image_photo */
      /* fct pour generer le nouveau nom */
      const extension = MIME_TYPES[file.mimetype]; /* Pour generer l'extension au fichier creer au dessus car pas automatique */
      callback(null, name + Date.now() + '.' + extension); /* Date.now() ajoute la date et le temps au nom du fichier ce qui le rendra unique*/
    }
  });

  module.exports = multer({storage}).single('image');