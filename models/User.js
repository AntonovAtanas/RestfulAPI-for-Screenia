const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Password must be at least 5 characters long']
    },
});

userSchema.pre('save', async function (){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;