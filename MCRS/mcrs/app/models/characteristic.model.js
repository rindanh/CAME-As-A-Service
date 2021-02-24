const mongoose = require("mongoose");
const DIMENSIONS = require("../dimensions.js");

const noEmptyArray = v => v.length && !v.includes("");

const CharacteristicValueSchema = mongoose.Schema({
  ref: {
    type: String,
    lowercase: true,
    required: true
  },
  values: {
    type: [String],
    validate: {
      validator: noEmptyArray,
      message: "Array must have at least 1 element"
    },
    lowercase: true
  },
  isQuantifiable: {
    type: Boolean,
    required: true
  }
});

const CharacteristicSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    name: {
      type: String,
      unique: true,
      required: true
    },
    characteristicValues: {
      type: [CharacteristicValueSchema],
      validate: {
        validator: noEmptyArray,
        message: "Array must have at least 1 element"
      }
    },
    dimension: {
      type: String,
      enum: DIMENSIONS.map(e => e.id.toLowerCase()),
      lowercase: true
    },
    description: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Characteristic", CharacteristicSchema);
