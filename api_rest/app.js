'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')

// middleware
app.use(bodyParser.urlencoded({ extend: false } ))
app.use(bodyParser.json())
app.use('/api', api)




module.exports = app
