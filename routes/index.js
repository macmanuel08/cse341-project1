const express = require("express")
const router = new express.Router();
const contacts = require('./contacts');
const swaggerRoute = require('./swagger');

router.use('/', swaggerRoute);
router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
});
router.use('/contacts', contacts);

module.exports = router;