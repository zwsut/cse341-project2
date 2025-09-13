const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts]
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
}
// Week 2 additions
const createContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the contact.");
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: contactId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the contact.");
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts]
    try {
        const id = req.params.id;
        const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Not found.' });
    }
        return res.status(204).send();
    } catch (err) {
        return res.status(400).json({ message: 'Error occurred during deletion.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};