const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

const TenantSettingsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    capabilities: [String]
  },
  { collection: 'tenantSettings' }
);

TenantSettingsSchema.plugin(timestamps);

module.exports = mongoose.model('TenantSettings', TenantSettingsSchema);