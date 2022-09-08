import addFormats from 'ajv-formats';
import Ajv, { AnySchema } from 'ajv';

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

export function validator(schema: AnySchema, payload: unknown) {
  const validate = ajv.compile(schema);
  const isValid = validate(payload);

  return { isValid, errors: validate.errors };
}
