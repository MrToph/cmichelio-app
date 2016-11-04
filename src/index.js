import express from 'express'
// Heroku dynamically assigns your app a port, so you can't set the port to a fixed number. Heroku adds the port to the env, so you can pull it from there. 
const port = process.env.PORT || 5000
var app = express()

let now = new Date()
app.get('/', function (req, res) {
  res.send(`Hello World! Started at ${now.toISOString()}`)
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
