// const express = require('express');
// const router = express.Router();
// const db = require('../models');

// // API to fetch available slots for a specific date
// router.get('/:date', async (req, res) => {
//   const { date } = req.params;
//   try {
//     const slots = await db.Slot.findAll({
//       where: { isBooked: false },
//       include: [{ model: db.Booking, where: { date }, required: false }],
//     });
//     res.json(slots);
//   } catch (err) {
//     console.error('Error fetching slots:', err); // Log errors if any
//     res.status(500).send('Error fetching slots');
//   }
// });


// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Slot = require('../models/slot');
// const Booking = require('../models/booking');

// // API to fetch available slots for a specific date
// router.get('/:date', async (req, res) => {
//   const { date } = req.params;

//   // Validate date format
//   if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
//     return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
//   }

//   try {
//     const slots = await Slot.find({ isBooked: false });
//     const availableSlots = await Promise.all(
//       slots.filter(async (slot) => {
//         const booking = await Booking.findOne({ slotId: slot._id, date });
//         return !booking;
//       })
//     );

//     res.json(availableSlots);
//   } catch (err) {
//     console.error('Error fetching slots:', err);
//     res.status(500).send('Error fetching slots');
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Slot = require('../models/slot');
const Booking = require('../models/booking');

// API to fetch available slots for a specific date
router.get('/:date', async (req, res) => {
  const { date } = req.params;

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
  }

  try {
    // Fetch all slots
    const slots = await Slot.find();

    // Filter available slots
    const availableSlots = [];
    for (const slot of slots) {
      // Check if the slot is booked for the specified date
      const booking = await Booking.findOne({ slotId: slot._id, date });
      if (!booking && !slot.isBooked) {
        availableSlots.push(slot);
      }
    }

    res.json(availableSlots);
  } catch (err) {
    console.error('Error fetching slots:', err);
    res.status(500).json({ error: 'Error fetching slots' });
  }
});

module.exports = router;
