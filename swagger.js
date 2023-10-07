const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Contacts API',
    description: 'Contacts API Personal Assignment 04',
  },
//   to test locally write localhost:8080
  host: 'cse-341kp02.onrender.com', 
  schemes: ['http','https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// ...

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);