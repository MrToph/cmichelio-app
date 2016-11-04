import express from 'express'
// Heroku dynamically assigns your app a port, so you can't set the port to a fixed number. Heroku adds the port to the env, so you can pull it from there. 
const port = process.env.PORT || 5000
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World! 123456')
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
