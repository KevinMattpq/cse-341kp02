const express = require("express");
const router = express.Router();
const contactsFromControllers = require('../controllers/contacts');

// Here I will call the Functions from contacts inside the Controllers Folder

router.get('/', contactsFromControllers.getAllContacts);
router.get('/:id',contactsFromControllers.getSingle);

module.exports = router;