const { validationResult } = require('express-validator')
const { apiResponse } = require('../api-helpers/ResponseController')

const validationWrapper = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    return res.send(apiResponse({ isSuccess: false, errors: errors }))
  }
}

module.exports = validationWrapper
