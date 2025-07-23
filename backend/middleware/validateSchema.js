const Ajv = require('ajv').default;
const ajv = new Ajv({ allErrors: true });
const { BadRequestError } = require('../expressError');

function validateSchema(data, schema) {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    const errors = validate.errors.map(e => ({
      field: e.instancePath.slice(1),
      message: e.message,
    }));
    throw new BadRequestError(`Invalid request data: ${JSON.stringify(errors)}`);
  }
}

module.exports = {
    validateSchema,
};
