// module.exports = (sequelize, Sequelize) => {
//     const Booking = sequelize.define('Booking', {
//       name: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       phone: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       date: {
//         type: Sequelize.DATEONLY,
//         allowNull: false,
//       },
//     });

//     return Booking;
//   };

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);
