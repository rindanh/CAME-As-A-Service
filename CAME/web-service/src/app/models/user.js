const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');
const mongoTenant = require('mongo-tenant');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
  },
  { collection: 'users' }
);

UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamps);
UserSchema.plugin(mongoTenant)

module.exports = mongoose.model('User', UserSchema);