const validator = require('../helpers/validate');

const savePerson = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    age: 'required|integer',
    email: 'required|email',
    favoriteColor: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveCompany = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    industry: 'required|string',
    foundedYear: 'required|integer',
    employees: 'required|integer',
    headquarters: 'required|string',
    website: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePerson,
  saveCompany
};