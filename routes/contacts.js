const express = require("express");
const router = express.Router();
const contactsFromControllers = require('../controllers/contacts');
// Importing validations
const validation = require('../middleware/validation');
// Here I will call the Functions from contacts inside the Controllers Folder

router.get('/', contactsFromControllers.getAllContacts);
router.get('/:id',contactsFromControllers.getSingle);

// Personal Assignment 03
router.post('/',validation.saveContact, contactsFromControllers.createContact);
router.put('/:id', validation.saveContact, contactsFromControllers.updateContact);
router.delete('/:id', contactsFromControllers.deleteContact);

module.exports = router;