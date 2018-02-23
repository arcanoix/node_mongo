'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//models
const Product = require('./models/product.js')

const app = express()
const port = process.env.PORT || 3000

// middleware
app.use(bodyParser.urlencoded({ extend: false } ))
app.use(bodyParser.json())

/*app.get('/hola/:name', (req, res) => {
  res.send({ message: `Hola ${req.params.name}` })
})*/
// rutas
app.get('/api/product', (req, res) => {
  Product.find({}, (err, product) => {
    if(err) return res.status(500).send({ message: `error al realizar la peticion: ${err}`})
    if(!product) return res.status(404).send({ message: `no existen productos`})

    res.status(200).send({ product })
  })
})

app.get('/api/product/:productId', (req, res) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
      if(err) return res.status(500).send({ message: `error al realizar la peticion: ${err}`})
      if(!product) return res.status(404).send({ message: `el producto no existe`})

      res.status(200).send({ product })
    })
})

app.post('/api/product', (req, res) => {
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()
      product.name =req.body.name
      product.picture = req.body.picture
      product.price = req.body.price
      product.category = req.body.category
      product.description = req.body.description

      product.save((err, productStored) => {
        if(err) res.status(500).send({message: `error al salvar en la base de datos: ${err}`})

        res.status(200).send({ product: productStored })
      })
})

app.put('/api/product/:productId', (req, res) => {
      let productId = req.params.productId
      let update = req.body
        // para ver el cambio que se hace en tiempo real hay que agregar el parametro {new: true} ya que es
        //una caracteristica de mongoose que lo desactivaron por defecto para hacerlo mas consistente con la API
        //
      Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdated) => {
        if(err) res.status(500).send({message: `error al actualizar producto: ${err}`})

        res.status(200).send({ product: productUpdated})
      })
})

app.delete('/api/product/:productId', (req, res) => {
      let productId = req.params.productId
      Product.findById(productId, (err, product) => {
        if(err) res.status(500).send({message: `error al borrar producto: ${err}`})
        product.remove(err =>{
          if(err) res.status(500).send({message: `error al borrar producto: ${err}`})
          res.status(200).send({message: `el producto a sido eliminado`})
        })
      })
})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if(err) {
    return console.log(`Error al conectar la base de datos : ${err}`)
  }
    console.log('Base de datos lista')

    app.listen(port, () => {
      console.log(`Api rest corriendo en http://localhost:${port} `)
    })

})
