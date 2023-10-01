const mongodb = require('../db/connect');
const{ObjectId}  = require('mongodb');
const { param } = require('../routes');


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

  // New Functions Personal Assignment 03
  const createContact = async (req, res, next) =>{
     const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      bithday: req.body.birthday
     }
      const result = await mongodb.getDb().db().collection('contacts').insertOne(newContact)
      if (result){
        res.setHeader('Content-type', 'application/json');
        res.status(201).json(result);
      }else{
        console.log("Error")
      }
  }

  const updateContact = async (req, res, next) => {
    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      bithday: req.body.birthday
    }
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('contacts').replaceOne({_id: userId},updatedContact);
    if (result){
      res.setHeader('Content-type', 'application/json');
      res.status(204).json(result);
    }else{
      console.log("Error")
    }
    }
  
  const deleteContact = async (req, res, next) =>{
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({_id: userId});
    if (result){
      res.setHeader('Content-type', 'application/json');
      res.status(200).json(result);
    }else{
      console.log("Error")
    }
  }

module.exports = { getAllContacts, getSingle, createContact, updateContact, deleteContact };

