const logger = require('../util/utils').logger;

const helloController = {
    getHello: (req, res, next) => {
        logger.info('Get all hello');
        res.status(200).json({
            status: 200,
            message: 'Hello',
            data: "Hello to you",
          });
    }
}

module.exports = helloController;