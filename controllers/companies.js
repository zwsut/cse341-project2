const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Handling for companies collection
const getAllCompanies = async (req, res) => {
  //#swagger.tags=['Companies']
  try {
    const contacts = await mongodb
      .getDatabase()
      .db()
      .collection('companies')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(companies);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingleCompany = async (req, res) => {
  //#swagger.tags=['Companies']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid company id to find a company.');
  };
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
    res.status(400).json({ message: err.message });
  }
};

const createCompany = async (req, res) => {
    //#swagger.tags=['Companies']
    const company = {
        name: req.body.name,
        industry: req.body.industry,
        foundedYear: req.body.foundedYear,
        employees: req.body.employees,
        headquarters: req.body.headquarters,
        website: req.body.website
    };
    const response = await mongodb.getDatabase()
    .db()
    .collection('companies')
    .insertOne(person);

    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while creating the company object.");
    }
};

const updateCompany = async (req, res) => {
    //#swagger.tags=['Companies']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid company id to update a company.');
  };
    const companyId = new ObjectId(req.params.id);
    const company = {
        name: req.body.name,
        industry: req.body.industry,
        foundedYear: req.body.foundedYear,
        employees: req.body.employees,
        headquarters: req.body.headquarters,
        website: req.body.website
    };
    const response = await mongodb.getDatabase()
    .db()
    .collection('companies')
    .replaceOne({ _id: companyId}, company);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the company.");
    }
};

const deleteCompany = async (req, res) => {
    //#swagger.tags=['Companies']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid company id to delete a company.');
  }
    try {
        const id = req.params.id;
        const result = await mongodb.getDatabase().db().collection('companies').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Not found.' });
    }
        return res.status(204).send();
    } catch (err) {
        return res.status(400).json({ message: 'Error occurred during deletion.' });
    }
};

module.exports = {
    getAllCompanies,
    getSingleCompany,
    createCompany,
    updateCompany,
    deleteCompany
};