import { BadRequestError, UnprocessableEntityError } from 'restify-errors';

const buildJoiSchemaError = (message: string) =>
  (message.includes('required')
    ? new BadRequestError(message)
    : new UnprocessableEntityError(message));

export default buildJoiSchemaError;
