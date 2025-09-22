const cors = require('cors');

const corsOptions = {
  origin: '*', // Allow all origins during development; for production, specify your frontend URL here e.g. 'http://localhost:8080'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, // For legacy browser support
};

module.exports = cors(corsOptions);
