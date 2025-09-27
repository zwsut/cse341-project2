const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//     //#swagger.tags=['Hello Project 2 World']
//     res.send('Hello Project 2 World!')
// });

router.use('/people', require('./people'));
router.use('/companies', require('./companies'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;