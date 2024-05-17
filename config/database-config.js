const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect("mongodb+srv://user200:pfoDyqawdFGvnJR2@cluster0.euybszc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
}

module.exports = connect;