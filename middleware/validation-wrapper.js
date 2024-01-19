const { validationResult } = require('express-validator')

const validationWrapper = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    throw new Error('Validation error')
  }
}

module.exports = validationWrapper
