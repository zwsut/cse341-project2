const express = require('express');
const router = express.Router();

const peopleController = require('../controllers/people');
const validation = require('../middleware/validate');

router.get('/', peopleController.getAllPeople);

router.get('/:id', peopleController.getSinglePerson);

router.post('/', validation.savePerson, peopleController.createPerson);
router.put('/:id', validation.savePerson, peopleController.updatePerson);
router.delete('/:id', peopleController.deletePerson);

module.exports = router;