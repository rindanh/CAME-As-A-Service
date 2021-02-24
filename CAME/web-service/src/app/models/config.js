const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const ConfigSchema = new Schema(
  {
    tenantId: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    }
  },
  { collection: 'configs' }
);

ConfigSchema.plugin(timestamps);

module.exports = mongoose.model('Config', ConfigSchema);