// src/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi    = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Atividade JS',
      version: '1.0.0',
      description: 'Documentação da API RESTful com Express, Sequelize e JWT'
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}` }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'] // caminhos para comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
