const VALIDATION_MESSAGE = Object.freeze({
  REQUIRED: 'This field is required',
  FN_REQUIRED: (name) => `${name} is required`,
  NUMERIC: 'This field only accepts numeric value',
  POSITIVE_NUMBER: 'This field only accepts positive numeric value',
  NOT_EMPTY: 'This field cannot be empty',
  ALPHA_NUMERIC: 'This field only accepts alphanumeric value',
  FN_NOT_EMPTY: (name) => `${name} cannot be empty`,
  INVALID_EMAIL: 'Invalid email address',
  INVALID_DATE: 'Invalid date format',
  BILLING_CYCLE: 'This field must be a number between 1-28',
  IDS: 'Passport, NRIC, Army ID, or Business Registration Number only.',
  INVALID_MSISDN: 'Invalid msisdn',
  INVALID_STATUS: 'Invalid status',
  EXISTING_MSISDN: 'MSISDN already exists',
  NOT_EXISTING_MSISDN: 'MSISDN does not exists',
  FN_IS_INTEGER: (name) => `${name} must be a whole number`,
  ZERO_ROUNDED_OFF_VALUE:
    'The value provided is equal to 0 after rounding to 2 decimal places',
  GREATER_THAN_ZERO: 'This field only accepts numeric value greater than 0',
  INVALID_MSISDN_LENGTH: 'Invalid MSISDN length',
  INVALID_IMSI_LENGTH: 'Invalid IMSI length',
  INVALID_ICCID_LENGTH: 'Invalid ICCID length',
  INVALID_PIN: 'Must be 4-digit numeric',
  INVALID_NAME:
    'Text only. Accepted special characters: dash, period, spaces, apostrophe, comma, forward-slash, open and close parenthesis, asterisk, number sign, underscore, ampersand and at-rate(@).',
  INVALID_ADDRESS:
    'Text only. Accepted special characters: dash, period, spaces, apostrophe, comma, forward-slash, open and close parenthesis, asterisk, number sign, underscore, ampersand and at-rate(@).',
  INVALID_COUNTRY: 'Fixed to Malaysia',
  INVALID_ZIPCODE: 'Must be 5-digit numeric',
  INVALID_CITY: 'Text only',
  INVALID_LANGUAGE: 'MLY or ENG only',
  INVALID_ID_VALUE: 'Invalid id_value',
  INVALID_ID_VALUE_LENGTH: 'Invalid id value length',
  INVALID_ACCOUNT: 'Invalid account',
  INVALID_DEPOSIT: 'Invalid deposit type',
  INVALID_PAYMENT_METHOD: 'Invalid payment method',
})

module.exports = {
  VALIDATION_MESSAGE,
}
