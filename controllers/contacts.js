const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = mongodb.getDatabase().db('project1').collection('contacts').find();
    result.toArray().then(contacts => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    }).catch(err => {
       console.log(err);
    });
};

const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id.toString());
    const result = mongodb.getDatabase().db('project1').collection('contacts').find({ _id: contactId });
    result.toArray().then(contacts => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    }).catch(err => {
       console.log(err);
    });
};

module.exports = { getAll, getSingle };