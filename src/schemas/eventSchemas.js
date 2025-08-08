export const eventTitleSchema = {
  type: 'string',
  minLength: 2,
  maxLength: 30,
};

export const eventPlannedDateSchema = {
  type: 'string',
  format: 'iso-date-time',
};

export const eventAuthSchema = {
  type: 'string',
};

export const eventQueryLimitSchema = {
  type: 'number',
  minimum: 1,
  maximum: 30,
};

export const eventQueryOffsetSchema = {
  type: 'number',
  minimum: 0,
};

export const eventParamsIdSchema = {
  type: 'string',
};
