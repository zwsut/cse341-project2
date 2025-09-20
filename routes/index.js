const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello Project 2 World']
    res.send('Hello Project 2 World!')
});

router.use('/people', require('./people'));
router.use('/companies', require('./companies'));

module.exports = router;