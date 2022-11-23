import addFormats from 'ajv-formats';
import Ajv, { AnySchema, DefinedError } from 'ajv';

const ajv = addFormats(new Ajv({}), [
  'date-time',
  'time',
  'date',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex'
])
  .addKeyword('kind')
  .addKeyword('modifier');

function generateValidationErrorMessage(err: DefinedError[]) {
  for (const error of err) {
    switch (error.keyword) {
      case 'required':
        return `Payload missing required property "${error.params.missingProperty}".`;
      case 'format':
        return `"${error.instancePath.replace('/', '.')}" is not a valid ${error.params.format}`;
      case 'minLength':
      case 'maxLength':
      case 'type':
        return `"${error.instancePath.replace('/', '.')}" ${error.message}`;
      default:
        break;
    }
  }

  return 'Invalid payload.';
}

export function validator(
  schema: AnySchema,
  payload: unknown
): { isValid: false; error: string } | { isValid: true; error: null } {
  const validate = ajv.compile(schema);
  const isValid = validate(payload);

  if (!isValid) {
    return { isValid, error: generateValidationErrorMessage(validate.errors as DefinedError[]) };
  }

  return { isValid: true, error: null };
}
