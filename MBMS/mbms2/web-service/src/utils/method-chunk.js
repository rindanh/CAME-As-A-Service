import Joi from '@hapi/joi';

const joiText = Joi.string().min(3).max(100).required();
const joiLongText = Joi.string().min(3).max(1500).required();
const joiArrayOfString = Joi.array().items(Joi.string());

const schema = Joi.object().keys({
  'nameId': joiText,
  'name': joiText,
  'description': joiLongText,
  'intention': joiArrayOfString,
  'characteristics': Joi.array().required().items(Joi.object()),
  'activitySpaces': Joi.array().required().items(
    Joi.object().keys({
      'nameId': joiText,
      'name': joiText,
      'description': joiLongText,
      'activities': Joi.array().required().items(
        Joi.object().keys({
          'nameId': joiText,
          'name': joiText,
          'description': joiLongText,
          'completionCriterions': Joi.object().required().keys({
            'alphas': joiArrayOfString,
            'workProducts': joiArrayOfString,
          }),
          'entryCriterions': Joi.object().required().keys({
            'alphas': joiArrayOfString,
            'workProducts': joiArrayOfString,
          }),
          'competencies': joiArrayOfString,
        })
      ),
    }),
  ),
  'alphas': Joi.array().required().items(
    Joi.object().keys({
      'nameId': joiText,
      'name': joiText,
      'description': joiLongText,
      'workProducts': Joi.array().items(
        Joi.object().keys({
          'nameId': joiText,
          'name': joiText,
          'description': joiLongText,
          'levelOfDetails': joiArrayOfString,
        }),
      ),
      'states': Joi.array().required().items(
        Joi.object().keys({
          'nameId': joiText,
          'name': joiText,
          'description': joiLongText,
          'checklists': joiArrayOfString,
        }),
      ),
      'subAlphas': Joi.array().required().items(
        Joi.object().keys({
          'nameId': joiText,
          'name': joiText,
          'parent_name_id': joiText,
          'description': joiLongText,
          'workProducts': Joi.array().items(
            Joi.object().keys({
              'nameId': joiText,
              'name': joiText,
              'description': joiLongText,
              'levelOfDetails': joiArrayOfString,
            }),
          ),
          'states': Joi.array().required().items(
            Joi.object().keys({
              'nameId': joiText,
              'name': joiText,
              'description': joiLongText,
              'checklists': joiArrayOfString,
            }),
          )
        })
      ),
    })
  ),
  'competencies': Joi.array().required().items(
    Joi.object().keys({
      'nameId': joiText,
      'name': joiText,
      'description': joiLongText,
      'levels': joiArrayOfString,
    }),
  ),
  'patterns': Joi.array().required().items(
    Joi.object().keys({
      'name': joiText,
      'nameId': joiText,
      'description': joiLongText,
      'alphas': joiArrayOfString,
      'activities': joiArrayOfString,
      'competencies': joiArrayOfString,
      'pattern': Joi.array().required().items(
        Joi.object().keys({
          'name': joiText,
          'nameId': joiText,
          'description': joiLongText,
          'alphas': joiArrayOfString,
          'activities': joiArrayOfString,
          'competencies': joiArrayOfString,
        })
      ),
    }),
  ),
  'extensionElements': Joi.array().items(
    Joi.object().keys({
      'identifier': Joi.number(),
      'elementGroup': joiText,
      'type':  joiText,
      'targetElement': joiText,
      'targetAttribute': joiText,
      'value': joiText
    })
  )
});

export const isMethodChunkValid = (methodChunk) => {
  const result = Joi.validate(methodChunk, schema);
  console.log(result.error);
  const message = result.error && result.error.details[0].message;
  return message;
};
