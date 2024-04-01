const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nursery System API",
      version: "1.0.0",
      description: "API documentation for Nursery System",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          scheme: "bearer",
          in: "header",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./Routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
