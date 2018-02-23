'use strict'
const Product = require('../models/product')

function getProduct(req, res) {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: `error al realizar la peticion: ${err}`})
    if(!product) return res.status(404).send({ message: `el producto no existe`})

    res.status(200).send({ product })
  })
}

function getProducts(req, res){
  Product.find({}, (err, product) => {
    if(err) return res.status(500).send({ message: `error al realizar la peticion: ${err}`})
    if(!product) return res.status(404).send({ message: `no existen productos`})

    res.status(200).send({ product })
  })
}

function saveProduct(req, res){
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
}

function updateProduct(req, res){
  let productId = req.params.productId
  let update = req.body
    // para ver el cambio que se hace en tiempo real hay que agregar el parametro {new: true} ya que es
    //una caracteristica de mongoose que lo desactivaron por defecto para hacerlo mas consistente con la API
    //
  Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdated) => {
    if(err) res.status(500).send({message: `error al actualizar producto: ${err}`})

    res.status(200).send({ product: productUpdated})
  })
}

function deleteProduct(req, res)
{
  let productId = req.params.productId
  Product.findById(productId, (err, product) => {
    if(err) res.status(500).send({message: `error al borrar producto: ${err}`})
    product.remove(err =>{
      if(err) res.status(500).send({message: `error al borrar producto: ${err}`})
      res.status(200).send({message: `el producto a sido eliminado`})
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
