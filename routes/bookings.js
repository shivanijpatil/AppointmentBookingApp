// const express = require('express');
// const router = express.Router();
// const db = require('../models');

// // API to book an appointment
// router.post('/', async (req, res) => {
//   const { name, phone, date, time } = req.body;

//   try {
//     // Check if slot is already booked
//     const slot = await db.Slot.findOne({ where: { time } });
//     if (slot.isBooked) {
//       return res.status(400).json({ error: 'Slot already booked' });
//     }

//     // Create Booking
//     const booking = await db.Booking.create({ name, phone, date, slotId: slot.id });

//     // Update Slot to Booked
//     slot.isBooked = true;
//     await slot.save();

//     res.json({ message: 'Appointment booked successfully', booking });
//   } catch (err) {
//     res.status(500).send('Error booking appointment');
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Slot = require('../models/slot');
// const Booking = require('../models/booking');

// // API to book an appointment
// router.post('/', async (req, res) => {
//   const { name, phone, date, time } = req.body;

//   try {
//     // Check if the slot exists and is available
//     const slot = await Slot.findOne({ time });
//     if (!slot) {
//       return res.status(404).json({ error: 'Slot not found' });
//     }
//     if (slot.isBooked) {
//       return res.status(400).json({ error: 'Slot already booked' });
//     }

//     // Create a new booking
//     const booking = new Booking({ name, phone, date, slotId: slot._id });
//     await booking.save();

//     // Mark the slot as booked
//     slot.isBooked = true;
//     await slot.save();

//     res.json({ message: 'Appointment booked successfully', booking });
//   } catch (err) {
//     console.error('Error booking appointment:', err);
//     res.status(500).send('Error booking appointment');
//   }
// });

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Slot = require('../models/slot');
// const Booking = require('../models/booking');

// // API to book an appointment
// router.post('/', async (req, res) => {
//   const { name, phone, date, time } = req.body;

//   try {
//     // Validate input
//     if (!name || !phone || !date || !time) {
//       return res.status(400).json({ error: 'All fields (name, phone, date, time) are required.' });
//     }

//     const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
//     const isValidTime = /^\d{2}:\d{2}$/.test(time);

//     if (!isValidDate || !isValidTime) {
//       return res.status(400).json({ error: 'Invalid date or time format.' });
//     }

//     // Check if the slot exists
//     const slot = await Slot.findOne({ time });
//     if (!slot) {
//       return res.status(404).json({ error: 'Slot not found' });
//     }

//     // Check if the slot is already booked
//     const existingBooking = await Booking.findOne({ date, time });
//     if (existingBooking || slot.isBooked) {
//       return res.status(400).json({ error: 'Slot already booked' });
//     }

//     // Create a new booking
//     const booking = new Booking({ name, phone, date, time, slotId: slot._id });
//     await booking.save();

//     // Mark the slot as booked
//     slot.isBooked = true;
//     await slot.save();

//     res.status(201).json({ message: 'Appointment booked successfully', booking });
//   } catch (err) {
//     console.error('Error booking appointment:', err);
//     res.status(500).json({ error: 'Error booking appointment' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Slot = require('../models/slot');
const Booking = require('../models/booking');

// API to book an appointment
router.post('/', async (req, res) => {
  const { name, phone, date, time } = req.body;

  try {
    // Validate input
    if (!name || !phone || !date || !time) {
      return res.status(400).json({ error: 'All fields (name, phone, date, time) are required.' });
    }

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const isValidTime = /^\d{2}:\d{2}$/.test(time);

    if (!isValidDate || !isValidTime) {
      return res.status(400).json({ error: 'Invalid date or time format.' });
    }

    // Check if the slot exists
    const slot = await Slot.findOne({ time });
    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    // Check if the slot is already booked
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking || slot.isBooked) {
      return res.status(400).json({ error: 'Slot already booked' });
    }

    // Create a new booking
    const booking = new Booking({ name, phone, date, time, slotId: slot._id });
    await booking.save();

    // Mark the slot as booked
    slot.isBooked = true;
    await slot.save();

    res.status(201).json({ message: 'Appointment booked successfully', booking });
  } catch (err) {
    console.error('Error booking appointment:', err);
    res.status(500).json({ error: 'Error booking appointment' });
  }
});

module.exports = router;
