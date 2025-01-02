// module.exports = (sequelize, Sequelize) => {
//     const Slot = sequelize.define('Slot', {
//       time: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       isBooked: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false,
//       },
//     });

//     return Slot;
//   };

const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Slot', SlotSchema);
