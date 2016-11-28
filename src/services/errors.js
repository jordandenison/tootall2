export default {
  serverExceptionHandler (err, req, res, next) {
    console.log(`server uncaught exception: ${err && err.stack || err}`)
    res.status(500).end(err)
  },
  uncaughtExceptionHandler (err) {
    console.log(`uncaught exception: ${err && err.stack || err}`)
    process.exit(1)
  }
}
