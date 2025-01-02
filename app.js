// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const db = require('./models');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Import Routes
// const slotRoutes = require('./routes/slots');
// const bookingRoutes = require('./routes/bookings');

// app.use('/slots', slotRoutes);
// app.use('/bookings', bookingRoutes);

// // Sync Database and Start Server
// db.sequelize.sync({ force: true }).then(async () => {
//   console.log('Database synced');

//   // Seed Slots
//   const slots = [];
//   for (let hour = 10; hour <= 16; hour++) {
//     for (let minute of [0, 30]) {
//       if (hour === 13) continue;
//       slots.push({ time: `${hour}:${minute === 0 ? '00' : '30'}` });
//     }
//   }
//   await db.Slot.bulkCreate(slots);

//   app.listen(3000, () => console.log('Server running on http://localhost:3000'));
// });

// Import required modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const Slot = require('./models/slot');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Import Routes
// const slotRoutes = require('./routes/slots');
// const bookingRoutes = require('./routes/bookings');

// app.use('/slots', slotRoutes);
// app.use('/bookings', bookingRoutes);

// // Connect to MongoDB and Start Server
// mongoose.connect('mongodb://localhost:27017/appointment_booking', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(async () => {
//     console.log('MongoDB connected');

//     // Seed Slots
//     const existingSlots = await Slot.find();
//     if (existingSlots.length === 0) {
//       const slots = [];
//       for (let hour = 10; hour <= 16; hour++) {
//         for (let minute of [0, 30]) {
//           if (hour === 13) continue;
//           slots.push({ time: `${hour}:${minute === 0 ? '00' : '30'}`, isBooked: false });
//         }
//       }
//       await Slot.insertMany(slots);
//       console.log('Slots seeded');
//     }

//     app.listen(3000, () => console.log('Server running on http://localhost:3000'));
//   })
//   .catch(err => console.error('MongoDB connection error:', err));

// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const Slot = require('./models/slot');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Logging Middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// // // Import Routes
// const slotRoutes = require('./routes/slots');
// const bookingRoutes = require('./routes/bookings');

// app.use('/slots', slotRoutes);
// app.use('/bookings', bookingRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('MongoDB connected');

//     // Seed Slots
//     const seedSlots = async () => {
//       const existingSlots = await Slot.countDocuments();
//       if (existingSlots === 0) {
//         const slots = [];
//         for (let hour = 10; hour <= 16; hour++) {
//           for (let minute of [0, 30]) {
//             if (hour === 13) continue;
//             slots.push({ time: `${hour}:${minute === 0 ? '00' : '30'}`, isBooked: false });
//           }
//         }
//         await Slot.insertMany(slots);
//         console.log('Slots seeded');
//       }
//     };
//     seedSlots();

//     app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`));
//   })
//   .catch(err => console.error('MongoDB connection error:', err));

// // Graceful Shutdown
// process.on('SIGINT', async () => {
//   console.log('Shutting down gracefully...');
//   await mongoose.connection.close();
//   console.log('MongoDB connection closed');
//   process.exit(0);
// });

// // Uncaught Exception and Rejection Handling
// process.on('uncaughtException', (err) => {
//   console.error('There was an uncaught error:', err);
//   process.exit(1);
// });

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// });

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Slot = require('./models/slot');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Import Routes
const slotRoutes = require('./routes/slots');
const bookingRoutes = require('./routes/bookings');

// Use Routes
app.use('/slots', slotRoutes);
app.use('/bookings', bookingRoutes);

// Default Route for '/'
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Appointment Booking App API!');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');

    // Seed Slots
    const seedSlots = async () => {
      const existingSlots = await Slot.countDocuments();
      if (existingSlots === 0) {
        const slots = [];
        for (let hour = 10; hour <= 16; hour++) {
          for (let minute of [0, 30]) {
            if (hour === 13) continue; // Skip 1:00 PM
            slots.push({
              time: `${hour}:${minute === 0 ? '00' : '30'}`,
              isBooked: false,
            });
          }
        }
        await Slot.insertMany(slots);
        console.log('Slots seeded');
      }
    };
    seedSlots();

    // Start the Server
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server running on http://localhost:${process.env.PORT || 3000}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error:', err));


process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

// Uncaught Exception and Rejection Handling
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const Slot = require('./models/slot');
// const slotRoutes = require('./routes/slots');
// const bookingRoutes = require('./routes/bookings');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/appointment_booking', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/slots', slotRoutes);
// app.use('/bookings', bookingRoutes);

// // Default Route for `/`
// app.get('/', (req, res) => {
//   res.send('Welcome to the Appointment Booking System API!');
// });

// // Catch-all for undefined routes
// app.use((req, res) => {
//   res.status(404).send('Route not found');
// });

// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
