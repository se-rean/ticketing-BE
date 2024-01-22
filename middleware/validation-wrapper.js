const { validationResult } = require('express-validator')

const validationWrapper = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    return res.send(errors)
  }
}

module.exports = validationWrapper
