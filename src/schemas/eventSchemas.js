export const eventTitleSchema = {
  type: 'string',
  minLength: 2,
  maxLength: 30,
};

export const eventPlannedDateSchema = {
  type: 'string',
  format: 'date',
};

export const eventAuthSchema = {
  type: 'string',
};
