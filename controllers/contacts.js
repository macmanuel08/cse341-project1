const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    const result = mongodb.getDatabase().db('project1').collection('contacts').find();
    result.toArray().then(contacts => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    }).catch(err => {
       console.log(err);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id.toString());
    const result = mongodb.getDatabase().db('project1').collection('contacts').find({ _id: contactId });
    result.toArray().then(contacts => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    }).catch(err => {
       console.log(err);
    });
};

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const contact = {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    };
    const result = await mongodb.getDatabase().db('project1').collection('contacts').insertOne(contact);
    if (result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while creating the contact');
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id.toString());
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const contact = {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    };
    const result = await mongodb.getDatabase().db('project1').collection('contacts').replaceOne({ _id: contactId }, contact);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while updating the contact');
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const contactId = new ObjectId(req.params.id.toString());
    const result = await mongodb.getDatabase().db('project1').collection('contacts').deleteOne({ _id: contactId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Some error occured while deleting the user');
    }
};

module.exports = { 
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
 };