const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/screenia'
// const uri = 'mongodb+srv://atanasantonov1:aJWBoLpp4jckWp6G@screenia.hmyhgfr.mongodb.net/?retryWrites=true&w=majority'

async function dbConnect () {
  try {
      await mongoose.connect(uri);
      console.log('Successfully connected to database.')
  } catch (error) {
      console.log(`Database connection error - ${error}`)
  }
}

module.exports = dbConnect;