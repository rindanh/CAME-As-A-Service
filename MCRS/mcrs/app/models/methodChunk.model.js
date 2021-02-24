const mongoose = require("mongoose");

const MethodChunkCharacteristicSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    lowercase: true
  },
  ref: {
    type: String,
    required: true,
    lowercase: true
  },
  value: {
    type: String,
    required: true,
    lowercase: true
  }
});

const MethodChunkSchema = mongoose.Schema(
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
    description: String,
    provider: {
      type: String,
      required: true,
      lowercase: true
    },
    url: {
      type: String,
      required: true
    },
    characteristics: [MethodChunkCharacteristicSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MethodChunk", MethodChunkSchema);
