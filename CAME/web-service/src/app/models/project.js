const mongoose = require("mongoose");
const mongoTenant = require('mongo-tenant');

const StringAndRequired = {
  type: String,
  required: true,
};

const StringRequiredUnique = {
  ...StringAndRequired,
  uniqute: true,
};

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

const MethodChunkSchema = mongoose.Schema({
  nameId: StringAndRequired,
  name: StringAndRequired,
  description: StringAndRequired,
  intention: [String],
  source: {
    name: StringAndRequired,
    url: StringAndRequired
  },
  characteristics: [{
    characteristic: StringAndRequired,
    value: StringAndRequired
  }],
  activitySpaces: [
    {
      nameId: StringAndRequired,
      name: StringAndRequired,
      description: StringAndRequired,
      activities: [
        {
          nameId: StringRequiredUnique,
          name: StringAndRequired,
          description: StringAndRequired,
          completionCriterions: {
            alphas: [String],
            workProducts: [String],
          },
          entryCriterions: {
            alphas: [String],
            workProducts: [String],
          },
          competencies: [String],
        },
      ],
    },
  ],
  alphas: [
    {
      nameId: StringRequiredUnique,
      name: StringAndRequired,
      description: StringAndRequired,
      workProducts: [
        {
          nameId: StringRequiredUnique,
          name: StringAndRequired,
          description: StringAndRequired,
          levelOfDetails: [String],
        },
      ],
      states: [
        {
          nameId: StringRequiredUnique,
          name: StringAndRequired,
          description: StringAndRequired,
          checklists: [String],
        },
      ],
      subAlphas: [
        {
          nameId: StringRequiredUnique,
          name: StringAndRequired,
          parent_name_id: StringAndRequired,
          description: StringAndRequired,
          workProducts: [
            {
              nameId: StringRequiredUnique,
              name: StringAndRequired,
              description: StringAndRequired,
              levelOfDetails: [String],
            },
          ],
          states: [
            {
              nameId: StringRequiredUnique,
              name: StringAndRequired,
              description: StringAndRequired,
              checklists: [String],
            },
          ]
        }
      ],
    },
  ],
  competencies: [
    {
      nameId: StringRequiredUnique,
      name: StringAndRequired,
      description: StringAndRequired,
      levels: [
        String
      ],
    },
  ],
  patterns: [
    {
      name: StringAndRequired,
      nameId: StringRequiredUnique,
      description: StringAndRequired,
      alphas: [String],
      activities: [String],
      competencies: [String],
      pattern: [
        {
          name: StringAndRequired,
          nameId: StringRequiredUnique,
          description: StringAndRequired,
          alphas: [String],
          activities: [String],
          competencies: [String]
        }
      ],
    },
  ],
  extensionElements:[
    {
      identifier: {type: Number},
      elementGroup: {type: String},
      type: {type: String},
      targetElement: {type: String},
      targetAttribute: {type: String},
      value: {type: String}
    }
  ]
})

const MethodSchema = mongoose.Schema({
  nameId: StringAndRequired,
  name: StringAndRequired,
  description: StringAndRequired,
  creator: StringAndRequired,
  intention: [String],
  characteristics: [{
    characteristic: StringAndRequired,
    value: StringAndRequired
  }],
  activitySpaces: [
    {
      nameId: StringAndRequired,
      name: StringAndRequired,
      description: StringAndRequired,
      activities: [
        {
          nameId: StringRequiredUnique,
          name: StringAndRequired,
          description: StringAndRequired,
          completionCriterions: {
            alphas: [String],
            workProducts: [String],
          },
          entryCriterions: {
            alphas: [String],
            workProducts: [String],
          },
          competencies: [String],
        },
      ],
    },
  ],
  alphas: [
    {
      nameId: StringRequiredUnique,
      name: StringAndRequired,
      description: StringAndRequired,
      workProducts: [
        {
          nameId: StringRequiredUnique,
          name: StringAndRequired,
          description: StringAndRequired,
          levelOfDetails: [String],
        },
      ],
      states: [
        {
          nameId: StringRequiredUnique,
          name: StringAndRequired,
          description: StringAndRequired,
          checklists: [String],
        },
      ],
      subAlphas: [
        {
          nameId: StringRequiredUnique,
          name: StringAndRequired,
          parent_name_id: StringAndRequired,
          description: StringAndRequired,
          workProducts: [
            {
              nameId: StringRequiredUnique,
              name: StringAndRequired,
              description: StringAndRequired,
              levelOfDetails: [String],
            },
          ],
          states: [
            {
              nameId: StringRequiredUnique,
              name: StringAndRequired,
              description: StringAndRequired,
              checklists: [String],
            },
          ]
        }
      ],
    },
  ],
  competencies: [
    {
      nameId: StringRequiredUnique,
      name: StringAndRequired,
      description: StringAndRequired,
      levels: [
        String
      ],
    },
  ],
  patterns: [
    {
      name: StringAndRequired,
      nameId: StringRequiredUnique,
      description: StringAndRequired,
      alphas: [String],
      activities: [String],
      competencies: [String],
      pattern: [
        {
          name: StringAndRequired,
          nameId: StringRequiredUnique,
          description: StringAndRequired,
          alphas: [String],
          activities: [String],
          competencies: [String]
        }
      ],
    },
  ],
  extensionElements:[
    {
      identifier: {type: Number},
      elementGroup: {type: String},
      type: {type: String},
      targetElement: {type: String},
      targetAttribute: {type: String},
      value: {type: String}
    }
  ]
})

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
    user: {
      type: String,
      required: true,
      lowercase: true
    },
    project: {
      type: String,
      required: true,
      lowercase: true
    },
    characteristics: [ProjectCharacteristicSchema],
    method_chunks: [MethodChunkSchema],
    method: MethodSchema
  },
  {
    timestamps: true
  }
);

ProjectSchema.plugin(mongoTenant)

module.exports = mongoose.model("Project", ProjectSchema);
