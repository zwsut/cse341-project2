const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Employees API',
        description: 'API for information on companies and employees'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

// To generate swaggerAutogen.json file
swaggerAutogen(outputFile, endpointFiles, doc);