import Twitter from 'twitter'
var config
try {
  // load it like this in test/debug/local mode
  config = require('../configs/twitter.js').default
} catch (err) {
  // load it like this when deployed (heroku)
  config = {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
  }
}

var client = new Twitter(config)

// extended mode to get full_text instead of truncated text
var params = {screen_name: 'cmichelio', tweet_mode: 'extended', count: 1, include_rts: true}

var cacheDuration = 1000 * 60   // one minute
var cachedLatestTweet
var cachedLatestTweetTime
export function getLatestTweet (onLastTweet, onError) {
  if (!cachedLatestTweet || Date.now() > cachedLatestTweetTime + cacheDuration) {
    // console.log(`REUTRN REQUEST ${cachedLatestTweetTime + cacheDuration} ${Date.now()} ${Date.now() > cachedLatestTweetTime + cacheDuration}`)
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (!error) {
        cachedLatestTweet = tweets[0]
        cachedLatestTweetTime = Date.now()
        onLastTweet(cachedLatestTweet)
      } else {
        cachedLatestTweet = undefined
        cachedLatestTweetTime = undefined
        onError(error)
      }
    })
  } else {
    // console.log('RETURN CACHED')
    onLastTweet(cachedLatestTweet, true)
  }
}
