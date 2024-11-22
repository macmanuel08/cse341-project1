const express = require("express")
const router = new express.Router();
const contactsController = require('../controllers/contacts');
const { firstNameRules, checkFirstName } = require("../utilities/validator");

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getSingle);
router.post(
    '/',
    firstNameRules(),
    checkFirstName,
    contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;