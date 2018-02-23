'use strict'


const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
  if(err) {
    return console.log(`Error al conectar la base de datos : ${err}`)
  }
    console.log('Base de datos lista')

    app.listen(config.port, () => {
      console.log(`Api rest corriendo en http://localhost:${config.port} `)
    })

})
