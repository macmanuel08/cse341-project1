const express = require("express")
const router = new express.Router();
const contacts = require('./contacts');

router.get('/contacts', contacts);

module.exports = router;