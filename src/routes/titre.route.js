const express = require('express');
const router = express.Router();

const titreController = require('../controllers/titre.controller.js');

router.get('/:type_titre', (req, res) => {
    titreController.listeTitre(req, res);
});

module.exports = router;