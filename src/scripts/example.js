const mongoose = require('mongoose');


const run = async () => {
    const uri = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.nzcot.mongodb.net/sample_training?retryWrites=true&w=majority';
    await mongoose.connect(uri);

    const zips = await mongoose.connection.db.collection('zips').find({}).toArray();

    const schema = new mongoose.Schema({
        city: String,
        zip: String,
        loc: { y: Number, x: Number },
        pop: Number,
        state: String,
    })

    const ZipModel = mongoose.model('Zip', schema);

    // ZipModel.findById('zip-001');    // Get by id 
    // ZipModel.find({});  // Get all
    // ZipModel.create(); // Create
    // ZipModel.updateMany({ city: 'ALPINE' },
    //     { pop: { $inc: 10 } });  // Update
    // ZipModel.deleteMany({ city: 'ALPINE' }); // Dalate

    const newZip = new ZipModel ({
        city: 'Hi',
        zip: 'Hi1',
        loc: { y: 2, x: 3 },
        pop: 4,
        state: 'String',
    })

    await newZip.save();
    console.log(zips[0]);
};

run().then(() => {
    console.log('Done');
    process.exit(0);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});