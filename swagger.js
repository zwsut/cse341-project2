const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for contact information'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

// To generate swaggerAutogen.json file
swaggerAutogen(outputFile, endpointFiles, doc);