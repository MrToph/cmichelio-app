import express from 'express'
import { getLatestTweet } from './services/twitter'

// Heroku dynamically assigns your app a port, so you can't set the port to a fixed number. Heroku adds the port to the env, so you can pull it from there.
const port = process.env.PORT || 5000
var app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', function (req, res) {
  // res.send(`Hello World! Started at ${now.toISOString()}`)
  getLatestTweet((tweet) => {
    let tweetJSON
    try {
      tweetJSON = JSON.stringify(tweet)
    } catch (ex) {
      res.send(`Error: ${ex.message}`)
    }
    res.send(tweetJSON)
  },
  error => res.send(`Error: ${error[0] ? error[0].message : error}`))
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
