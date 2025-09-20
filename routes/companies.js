const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companies');
const validation = require('../middleware/validate');

router.get('/', companyController.getAllCompanies);

router.get('/:id', companyController.getSingleCompany);

router.post('/', validation.saveCompany, companyController.createCompany);
router.put('/:id', validation.saveCompany, companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;