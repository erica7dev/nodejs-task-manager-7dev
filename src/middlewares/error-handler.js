const { CustomAPIError } = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ msg: err.message })
  } else {
    res.status(500).json({ msg: 'Internal server error' })
  }
}

module.exports = errorHandlerMiddleware
