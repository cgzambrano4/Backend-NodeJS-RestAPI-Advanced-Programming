const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'Roles', required: true },
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Login', LoginSchema);