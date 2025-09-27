const express = require('express');
const router = express.Router();

const peopleController = require('../controllers/people');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', peopleController.getAllPeople);
router.get('/:id', peopleController.getSinglePerson);

router.post('/', isAuthenticated, validation.savePerson, peopleController.createPerson);
router.put('/:id', isAuthenticated, validation.savePerson, peopleController.updatePerson);
router.delete('/:id', isAuthenticated, peopleController.deletePerson);

module.exports = router;