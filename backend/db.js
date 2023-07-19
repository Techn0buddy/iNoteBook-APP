const mongoose = require('mongoose');
const mongoUri = "mongodb://127.0.0.1:27017/inotebook";
const connectToMongo = async () => {

    mongoose.connect(mongoUri)
        .then(() => console.log('Connected SuccessFully'));
}
module.exports = connectToMongo;