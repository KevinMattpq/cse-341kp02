const express = require('express');
const router = express.Router();
const contacts = require('./contacts');

router.use['/',require('./swagger')]
router.use('/contacts', contacts);
router.use(
    '/',
    (docData = (req, res) =>{
    let docData = {
        documentationURL: 'https://github.com/KevinMattpq/cse-341kp02',
    };
    res.send(docData);
    })
)

router.use('/contacts', require('./contacts'));

module.exports = router;