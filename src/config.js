
module.exports = {
    mongoUri: 'mongodb+srv://sandbox.nzcot.mongodb.net',
    mongoOptions: {
        user: 'm001-student',
        pass: 'm001-mongodb-basics',
        dbName: 'records', 
        retryWrites: true,
        w: 'majority',
    }
};
