const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const bookingValidation = require('../validations/bookingValidation');
const bookingController = require('../controllers/bookingController');

router.post('/', auth, validate(bookingValidation), bookingController.bookActivity);
router.get('/', auth, bookingController.getUserBookings);

module.exports = router;