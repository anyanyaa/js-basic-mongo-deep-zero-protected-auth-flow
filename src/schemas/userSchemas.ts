export const userEmailSchema = {
  type: 'string',
  format: 'email',
  minLength: 6,
  maxLength: 40,
};

export const userUsernameSchema = {
  type: 'string',
  minLength: 2,
  maxLength: 40,
};

export const userPasswordSchema = {
  type: 'string',
  minLength: 8,
  maxLength: 20,
};
