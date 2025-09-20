const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Handling for people collection
const getAllPeople = async (req, res) => {
  //#swagger.tags=['People']
  try {
    const contacts = await mongodb
      .getDatabase()
      .db()
      .collection('people')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(people);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSinglePerson = async (req, res) => {
  //#swagger.tags=['People']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a person.');
  };
  try {
    const personId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('people')
      .find({ _id: personId })
      .toArray();

    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createPerson = async (req, res) => {
    //#swagger.tags=['People']
    const person = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor
    };
    const response = await mongodb.getDatabase().db().collection('people').insertOne(person);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while creating the person object.");
    }
};

const updatePerson = async (req, res) => {
    //#swagger.tags=['People']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid person id to update a person.');
  };
    const personId = new ObjectId(req.params.id);
    const person = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor
    };
    const response = await mongodb.getDatabase().db().collection('people').replaceOne({ _id: contactId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the person.");
    }
};

const deletePerson = async (req, res) => {
    //#swagger.tags=['People']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid person id to delete a person.');
  }
    try {
        const id = req.params.id;
        const result = await mongodb.getDatabase().db().collection('people').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Not found.' });
    }
        return res.status(204).send();
    } catch (err) {
        return res.status(400).json({ message: 'Error occurred during deletion.' });
    }
};

module.exports = {
    getAllPeople,
    getSinglePerson,
    createPerson,
    updatePerson,
    deletePerson
};