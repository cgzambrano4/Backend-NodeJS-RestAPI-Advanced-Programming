const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RolesSchema = new Schema({
    _id: { type: Number, required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('Roles', RolesSchema);