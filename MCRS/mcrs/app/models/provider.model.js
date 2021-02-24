const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const INDUSTRIES = require("../industries.js");

const ProviderUrlSchema = mongoose.Schema({
  name: String,
  url: {
    type: String,
    required: true
  }
});

const ProviderContactValidator = [
  {
    validator: v =>
      !v.filter(e => !e.name && !e.description && !e.role && !e.phone && !e.email && !e.address)
        .length,
    message: "Contact object can not be all empty."
  },
  {
    validator: v => !v.filter(e => !e.phone && !e.email && !e.address).length,
    message: "For each contact object at least one of address/email/phone must be filled."
  }
];

const ProviderContactSchema = mongoose.Schema({
  name: String,
  role: String,
  description: String,
  address: String,
  email: {
    type: String,
    lowercase: true
  },
  phone: String
});

const ProviderSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      validate: {
        validator: email =>
          /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email),
        message: "Email must be valid."
      }
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    industry: {
      type: String,
      enum: INDUSTRIES.map(e => e.id.toLowerCase()),
      lowercase: true
    },
    urls: [ProviderUrlSchema],
    contacts: {
      type: [ProviderContactSchema],
      validate: ProviderContactValidator
    },
    relatedProviders: {
      type: [String],
      validate: {
        validator: v => !v.includes(""),
        message: "Array element must be valid."
      }
    }
  },
  {
    timestamps: true
  }
);

ProviderSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

ProviderSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("Provider", ProviderSchema);
