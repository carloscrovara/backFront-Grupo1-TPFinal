const service = require('../Services/healthService');

exports.check = (req, res) => {
    res.json(service.getStatus());
};