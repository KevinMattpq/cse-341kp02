const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'required|string',
    birthday: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// My Validations 
// const contactValid = [
//     check('firstName').not().isEmpty(),
//     check('lastName').not().isEmpty(),
//     check('email').isEmail(),
//     check('favoriteColor').isString(),
//     check('birthday').isISO8601(),
//   ]
  
  
//   const idValidationRules = [
//     check('id').isMongoId(),
//   ];
module.exports = {
  saveContact
};