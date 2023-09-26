const mongodb = require('../db/connect');
const{ObjectId}  = require('mongodb');


const getAllContacts = async(req, res, next) => {
    const result = await mongodb.getDb().db().collection('contacts').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res, next) => {
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('contacts')
        .findOne({ _id: userId });
      if (result) {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(result);
      } else {
        res.status(200).json({ error: 'No Contact found' });
      }
    } catch (error) {
      console.error(error);
      res.status(200).json({ error: 'server error' });
    }
  };

module.exports = { getAllContacts, getSingle };

