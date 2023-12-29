const express = require("express");
const logger = require('./src/util/utils').logger;
var helloRoutes = require('./src/routes/hello.routes');


const app = express();
const port = 3000;

// For access to application/json request body
app.use(express.json());

// Algemene route, vangt alle http-methods en alle URLs af, print
// een message, en ga naar de next URL (indien die matcht)!
app.use('*', (req, res, next) => {
    const method = req.method;
    logger.trace(`Methode ${method} is aangeroepen`);
    next();
  });

  // Info endpoints
app.get('/api/info', (req, res) => {
    logger.info('Get server information');
    res.status(201).json({
      status: 201,
      message: 'Server info-endpoint',
      data: {
        creator: 'Jorn van Bommel',
        description: 'Mijn api toch.'
      }
    });
  });

  // Hier staan de referenties naar de routes
app.use('/api/hello', helloRoutes);

// Wanneer geen enkele endpoint matcht kom je hier terecht. Dit is dus
// een soort 'afvoerputje' (sink) voor niet-bestaande URLs in de server.
app.use('*', (req, res) => {
    logger.warn('Invalid endpoint called: ', req.path);
    res.status(404).json({
      status: 404,
      message: 'Endpoint not found',
      data: {}
    });
  });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});