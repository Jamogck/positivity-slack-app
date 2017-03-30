'use strict'

const express = require('express')
const Slapp = require('slapp')
const ConvoStore = require('slapp-convo-beepboop')
const Context = require('slapp-context-beepboop')

// use `PORT` env var on Beep Boop - default to 3000 locally
var port = process.env.PORT || 3000

var slapp = Slapp({
  // Beep Boop sets the SLACK_VERIFY_TOKEN env var
  verify_token: process.env.SLACK_VERIFY_TOKEN,
  convo_store: ConvoStore(),
  context: Context()
})


//*********************************************
// Setup different handlers for messages
//*********************************************

// response to the user typing "inspire me"
slapp.message('inspire me', ['mention', 'direct_message'], (msg) => {
  msg.say([
    "Shoot for the moon, for if you miss you'll land among the stars. :pray:", 
    "You miss 100% of the shots you don't take.",
    "To see a rainbow, you have to look through the rain. :rainbow:",
    "It's not the number of breaths we take, but the number of moments that take our breath away. :pray:",
    "Sing like no one is listening. Love like you've never been hurt. Dance like nobody is watching. :dance:",
    "Live, laugh, love.",
    "Yesterday is history, tomorrow a mystery and today is a gift. That's why we call it the present. :smile:"
  ])
})

// Can use a regex as well
slapp.message(/^(thanks|thank you)/i, ['mention', 'direct_message'], (msg) => {
  // You can provide a list of responses, and a random one will be chosen
  // You can also include slack emoji in your responses
  msg.say([
    "You're welcome :smile:",
    'You bet',
    ':+1: Of course',
    'Anytime :sun_with_face: :full_moon_with_face:'
  ])
})

// Catch-all for any other responses not handled above
slapp.message('.*', ['direct_mention', 'direct_message'], (msg) => {
  // respond only 40% of the time
  if (Math.random() < 0.4) {
    msg.say([':wave:', ':pray:', ':raised_hands:'])
  }
})

// attach Slapp to express server
var server = slapp.attachToExpress(express())

// start http server
server.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on port ${port}`)
})
