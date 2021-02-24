const mongoose = require("mongoose");

const ProjectCharacteristicSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    lowercase: true
  },
  weight: {
    type: Number
  },
  ref: {
    type: String,
    required: true,
    lowercase: true
  },
  rule: {
    type: String,
    enum: ["maximum", "minimum", "exact", "preference_list"],
    required: true,
    lowercase: true
  },
  value: {
    type: [String],
    lowercase: true
  }
});

const ProjectSchema = mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    provider: {
      type: String,
      required: true,
      lowercase: true
    },
    project: {
      type: String,
      required: true,
      lowercase: true
    },
    characteristics: [ProjectCharacteristicSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
