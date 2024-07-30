const { MongoClient } = require('mongodb');

//agregado cz
require('dotenv').config();

let db;

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MONGO_URI:', process.env.MONGO_URI);
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db();
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err.message);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
