const Booking = require('../models/Booking');
const Activity = require('../models/Activity');

exports.bookActivity = async (req, res) => {
  try {
    // Check if activity exists
    const activity = await Activity.findById(req.body.activityId);
    if (!activity) return res.status(404).json({ error: 'Activity not found' });

    // Check if already booked
    const existingBooking = await Booking.findOne({
      user: req.user._id,
      activity: req.body.activityId
    });
    if (existingBooking) return res.status(400).json({ error: 'Activity already booked' });

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      activity: req.body.activityId
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('activity', 'title description location dateTime')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};