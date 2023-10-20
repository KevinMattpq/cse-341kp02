const mongodb = require('../db/connect');
const{ObjectId}  = require('mongodb');
const { param } = require('../routes');



const getAllContacts = (req, res) => {
    mongodb
    .getDb()
    .db()
    .collection('contacts')
    .find()
    .toArray((err, list) => {
      if(err) {
        res.status(400).json({message: err});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);

  });
};

const getSingle = async (req, res) => {
  if (!ObjectId.contactValid(req.params.id)){
    res.status(500).json(response.error || 'Some error ocurred while deleting the contact');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('contacts')
    .findOne({ _id: userId })
    .toArray((err, result) => {
      if(err){
        res.status(400).json({message: err});
        }
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(result[0]);
      });
};
  //   try {
  //     const userId = new ObjectId(req.params.id);
  //     const result = await mongodb
  //       .getDb()
  //       .db()
  //       .collection('contacts')
  //       .findOne({ _id: userId })
  //       .toArray((err, list) => {
  //         if(err){
  //           res.status(400).json({message: err});
  //         }
  //       })
  //     if (result) {
  //       res.setHeader('Content-type', 'application/json');
  //       res.status(200).json(result);
  //     } else {
  //       res.status(200).json({ error: 'No Contact found' });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     res.status(200).json({ error: 'server error' });
  //   }
  // };

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
      if (result.contactValidtact){
        res.setHeader('Content-type', 'application/json');
        res.status(201).json(result);
      }else{
        res.status(500).json(response.error || 'Some error ocurred while creating the contact');
      }
  }

  const updateContact = async (req, res, next) => {
    if(!ObjectId.validationResult(req.params.id)){
      res.status(400).json('Must use a valid contact id to update contact');  
    }
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
      res.status(500).json(response.error || 'Some error ocurred while updating the contact');
    }
    }
  
  const deleteContact = async (req, res) =>{
    if(!ObjectId.validationResult(req.params.id)){
      res.status(400).json('Must use a valid contact id to delete a contact.');
    }

    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('contacts').deleteOne({_id: userId});
    if (result){
      res.setHeader('Content-type', 'application/json');
      res.status(200).json(result);
    }else{
      res.status(500).json(response.error || 'Some error ocurred while deleting the contact');
    }
  }

module.exports = { getAllContacts, getSingle, createContact, updateContact, deleteContact };

