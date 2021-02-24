import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const StringAndRequired = {
  type: String,
  required: true,
};

const StringRequiredUnique = {
  ...StringAndRequired,
  uniqute: true,
};

export const MethodChunkSchema = new Schema(
  {
    'nameId': StringAndRequired,
    'name': StringAndRequired,
    'description': StringAndRequired,
    'intention': [String],
    'published': {
      type: Boolean,
      required: true,
    },
    'characteristics': [{
      type: Schema.Types.Mixed,
      required: true,
    }],
    'creator': StringAndRequired,
    'activitySpaces': [
      {
        'nameId': StringAndRequired,
        'name': StringAndRequired,
        'description': StringAndRequired,
        'activities': [
          {
            'nameId': StringRequiredUnique,
            'name': StringAndRequired,
            'description': StringAndRequired,
            'completionCriterions': {
              'alphas': [String],
              'workProducts': [String],
            },
            'entryCriterions': {
              'alphas': [String],
              'workProducts': [String],
            },
            'competencies': [String],
          },
        ],
      },
    ],
    'alphas': [
      {
        'nameId': StringRequiredUnique,
        'name': StringAndRequired,
        'description': StringAndRequired,
        'workProducts': [
          {
            'nameId': StringRequiredUnique,
            'name': StringAndRequired,
            'description': StringAndRequired,
            'levelOfDetails': [String],
          },
        ],
        'states': [
          {
            'nameId': StringRequiredUnique,
            'name': StringAndRequired,
            'description': StringAndRequired,
            'checklists': [String],
          },
        ],
        'subAlphas': [{
          'nameId': StringRequiredUnique,
          'name': StringAndRequired,
          'parent_name_id': StringAndRequired,
          'description': StringAndRequired,
          'workProducts': [
            {
              'nameId': StringRequiredUnique,
              'name': StringAndRequired,
              'description': StringAndRequired,
              'levelOfDetails': [String],
            },
          ],
          'states': [
            {
              'nameId': StringRequiredUnique,
              'name': StringAndRequired,
              'description': StringAndRequired,
              'checklists': [String],
            },
          ],
        }],
      },
    ],
    'competencies': [
      {
        'nameId': StringRequiredUnique,
        'name': StringAndRequired,
        'description': StringAndRequired,
        'levels': [
          String
        ],
      },
    ],
    'patterns': [
      {
        'name': StringAndRequired,
        'nameId': StringRequiredUnique,
        'description': StringAndRequired,
        'alphas': [String],
        'activities': [String],
        'competencies': [String],
        'pattern': [{
          'name': StringAndRequired,
          'nameId': StringRequiredUnique,
          'description': StringAndRequired,
          'alphas': [String],
          'activities': [String],
          'competencies': [String],
        }],
      },
    ],
    'extensionElements':[
      {
        'identifier': {type: Number},
        'elementGroup': {type: String},
        'type': {type: String},
        'targetElement': {type: String},
        'targetAttribute': {type: String},
        'value': {type: String}
      }
    ]
  },
  { collection: 'method-chunk' }
);

MethodChunkSchema.plugin(timestamps);

MethodChunkSchema.index({ nameId: 1 });

export default mongoose.model('MethodChunk', MethodChunkSchema);
