export class AppError extends Error {
  public readonly code?: string;
  public readonly statusCode: number = 500;

  constructor(
    public readonly message: string,
    public readonly code?: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleGlobalError = (error: unknown, context: string): void => {
  if (error instanceof AppError) {
    console.error(`[${context}] ${error.name}: ${error.message}`);
    if (error.code) {
      console.error(`Code: ${error.code}`);
    }
  } else {
    console.error(`[${context}] Unexpected error: ${error}`);
  }
};

export const validateStringInput = (
  input: unknown,
  fieldName: string,
  maxLength?: number
): string => {
  if (input === null || input === undefined) {
    throw new AppError(`Missing required field: ${fieldName}`, 'MISSING_FIELD');
  }

  const stringValue = String(input).trim();

  if (stringValue.length === 0) {
    throw new AppError(`Empty field not allowed: ${fieldName}`, 'EMPTY_FIELD');
  }

  if (maxLength && stringValue.length > maxLength) {
    throw new AppError(
      `Field too long: ${fieldName}. Maximum length is ${maxLength} characters`,
      'FIELD_TOO_LONG'
    );
  }

  return stringValue;
};

export const validateStatusInput = (
  status: unknown,
  fieldName: string
): string => {
  const validStatuses = ['To Do', 'In Progress', 'Done'];

  if (status === null || status === undefined) {
    throw new AppError(`Missing required field: ${fieldName}`, 'MISSING_FIELD');
  }

  const statusValue = String(status).trim();

  if (!validStatuses.includes(statusValue)) {
    throw new AppError(
      `Invalid status value: ${statusValue}. Valid values are: ${validStatuses.join(', ')}`,
      'INVALID_STATUS'
    );
  }

  return statusValue;
};