// Yhteydenotto mongodb-kantaan mongoose-kirjaston avulla
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function conn() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Yhteys MongoDB-kantaan toimii!');
  } catch (err) {
    console.error('MongoDB yhteysvirhe ' + err);
  }
}

// conn(); // Remove '//' if need to test dbconnection.mjs
export default conn;
