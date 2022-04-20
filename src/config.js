require('dotenv').config();

// module.exports = {
//     mongoUri: 'mongodb+srv://sandbox.nzcot.mongodb.net',
//     mongoOptions: {
//         user: 'm001-student',
//         pass: 'm001-mongodb-basics',
//         dbName: 'records',
//         retryWrites: true,
//         w: 'majority',
//     },
//     port: process.env.PORT || 4000
// };


// module.exports = {
//     mongoUri: 'mongodb+srv://sandbox.nzcot.mongodb.net',
//     mongoOptions: {
//         user: 'm001-student',
//         pass: 'm001-mongodb-basics',
//         dbName: 'records',
//         retryWrites: true,
//         w: 'majority',
//     },
//     port: process.env.PORT || 4000
//   };
module.exports = {
    isVercel: process.env.IS_VERCEL || false,
    port: process.env.PORT || 4000,
    mongoUri: process.env.MONGO_URI,
    mongoOptions: {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      dbName: process.env.MONGO_DATABASE,
      retryWrites: true,
      w: 'majority',
    },
  };