

const errorHandler = ((error, req, res, next) => {
    return res.status(500).json({ error: error.toString() });
  })

  export default errorHandler