const express = require('express');
const router = express.Router();

const companyController = require('../controllers/companies');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', companyController.getAllCompanies);

router.get('/:id', companyController.getSingleCompany);

router.post('/', isAuthenticated, validation.saveCompany, companyController.createCompany);
router.put('/:id', isAuthenticated, validation.saveCompany, companyController.updateCompany);
router.delete('/:id', isAuthenticated, companyController.deleteCompany);

module.exports = router;