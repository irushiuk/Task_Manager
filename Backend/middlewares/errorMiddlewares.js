const routeNotFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`)
    res.status(404)
    next(error)
}