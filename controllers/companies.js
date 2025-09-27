const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAllCompanies = async (req, res) => {
  //#swagger.tags=['Companies']
  try {
    const companies = await mongodb
      .getDatabase()
      .db()
      .collection('companies')
      .find({})
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(companies);
  } catch (err) {
    console.error('getAllCompanies error:', err);
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
const getSingleCompany = async (req, res) => {
  //#swagger.tags=['Companies']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid company id to find a company.');
  }
  try {
    const companyId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('companies')
      .find({ _id: companyId })
      .toArray();

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    console.error('getSingleCompany error:', err);
    res.status(500).json({ message: err.message });
  }
};

// POST
const createCompany = async (req, res) => {
  //#swagger.tags=['Companies']
  try {
    const company = {
      name: req.body.name,
      industry: req.body.industry,
      foundedYear: req.body.foundedYear,
      employees: req.body.employees,
      headquarters: req.body.headquarters,
      website: req.body.website,
      ceo: req.body.ceo
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('companies')
      .insertOne(company);

    if (response.acknowledged) {
      return res.status(201).json({ _id: response.insertedId });
    }
    res.status(500).json(response.error || 'Error creating company.');
  } catch (err) {
    console.error('createCompany error:', err);
    res.status(500).json({ message: err.message });
  }
};

// PUT
const updateCompany = async (req, res) => {
  //#swagger.tags=['Companies']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid company id to update a company.');
  }
  try {
    const companyId = new ObjectId(req.params.id);
    const company = {
      name: req.body.name,
      industry: req.body.industry,
      foundedYear: req.body.foundedYear,
      employees: req.body.employees,
      headquarters: req.body.headquarters,
      website: req.body.website,
      ceo: req.body.ceo
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('companies')
      .replaceOne({ _id: companyId }, company);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('updateCompany error:', err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteCompany = async (req, res) => {
  //#swagger.tags=['Companies']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid company id to delete a company.');
  }
  try {
    const id = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('companies')
      .deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Not found.' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('deleteCompany error:', err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCompanies,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany
};
