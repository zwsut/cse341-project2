const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAllPeople = async (req, res) => {
  //#swagger.tags=['People']
  try {
    const people = await mongodb
      .getDatabase()
      .db()
      .collection('people')
      .find({})
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(people); // <- was sending undefined "people"
  } catch (err) {
    console.error('getAllPeople error:', err);
    res.status(500).json({ message: err.message }); // 500 for server error
  }
};

// GET BY ID
const getSinglePerson = async (req, res) => {
  //#swagger.tags=['People']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid person id to find a person.');
  }
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
    console.error('getSinglePerson error:', err);
    res.status(500).json({ message: err.message });
  }
};

// POST
const createPerson = async (req, res) => {
  //#swagger.tags=['People']
  try {
    const person = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor
    };

    const response = await mongodb.getDatabase().db().collection('people').insertOne(person);
    if (response.acknowledged) {
      return res.status(201).json({ _id: response.insertedId }); // 201 Created
    }
    res.status(500).json(response.error || 'Error creating person.');
  } catch (err) {
    console.error('createPerson error:', err);
    res.status(500).json({ message: err.message });
  }
};

// PUT
const updatePerson = async (req, res) => {
  //#swagger.tags=['People']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid person id to update a person.');
  }

  try {
    const personId = new ObjectId(req.params.id);
    const person = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor
    };

    // was using undefined contactId/contact
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('people')
      .replaceOne({ _id: personId }, person);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('updatePerson error:', err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deletePerson = async (req, res) => {
  //#swagger.tags=['People']
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid person id to delete a person.');
  }
  try {
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('people').deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Not found.' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('deletePerson error:', err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPeople,
  getSinglePerson,
  createPerson,
  updatePerson,
  deletePerson
};
