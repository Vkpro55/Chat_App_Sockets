const mongoose = require('mongoose');
const { MONGO_USERNAME, MONGO_PASS } = require('./server-config');

const connectDB = async () => {
    try {
        const URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASS}@cluster0.rkdaw.mongodb.net/Chat_App_Test?retryWrites=true&w=majority&appName=Cluster0`
        const connect = await mongoose.connect(URI);
        if (connect) {
            console.log('Success: Mongo connected');
        }
    } catch (error) {
        console.log('Error: Mongoose connection', error);
    }
}

module.exports = {
    connectDB
}