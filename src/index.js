import express from 'express'
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World! 123456')
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})
