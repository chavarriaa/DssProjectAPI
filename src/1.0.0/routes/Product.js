
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const debug = require('debug')('api:error')
const config = require('../lib/config')
const controllerName = 'Product'
const Product = require('../classes/Product')
const {
  successMessage,
  failMessage
} = require('../lib/handleEvents.js'); 

//EVENTO GET PARA RECIBIR TODAS LOS DATOS 
router.get('/product',async(req,res)=>{
  try{

    let data = Object.assign(req.body,req.params)
    let product = new Product(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('branch',sql.Int,product.branch)
    .query(product.queryGet);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 

  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    console.log(e)
    debug(e)
  }
})

//EVENTO GET PARA RECIBIR DATO SEGÚN ID
router.get('product/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let product = new Product(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,product.id)
    .query(invoice.queryGetByID);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO POST PARA MANDAR A GUARDAR DATOS
router.post('/product',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let product = new Product(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.int,product.id)
    .input('name',sql.NVarChar(100),product.name)
    .input('brand',sql.int,product.brand)
    .input('category',sql.int,product.category)
    .input('state',sql.int,product.state)
    .input('gender',sql.NVarChar(10),product,gender)
    .query(product.queryPost);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO PUT PARA MANDAR A ACTUALIZAR DATOS POR ID

router.put('/product/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let product = new Product(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.int,product.id)
    .input('name',sql.NVarChar(100),product.name)
    .input('brand',sql.int,product.brand)
    .input('category',sql.int,product.category)
    .input('state',sql.int,product.state)
    .input('gender',sql.NVarChar(10),product,gender)
    .input('id',sql.Int,product.id)
    .query(product.queryUpdateByID);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO DELETE PARA BORRAR UN DATO POR ID
router.delete('/product/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let product = new Product(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,product.id)
    .query(product.queryDeleteByID );
    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})



module.exports = router;