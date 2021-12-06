const express = require('express');
const router = express.Router();
var sql = require("mssql");
const debug = require('debug')('api:error')
const config = require('../lib/config')
const controllerName = 'Price'
const Price = require('../classes/Price')
const {
  successMessage,
  failMessage
} = require('../lib/handleEvents.js'); 

//EVENTO GET PARA RECIBIR TODAS LOS DATOS 
router.get('/branch/:branch/product/:product/price',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let price = new Price(data,req.query);
    let pool = await sql.connect(config);

    let response = await pool.request()
    .input('branch',sql.Int,price.branch)
    .input('product',sql.Int,price.product)    
    .query(price.queryGet);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordset)) 

  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));

    debug(e)
  }
})

//EVENTO GET PARA RECIBIR DATO SEGÚN ID
router.get('/branch/:branch/product/:product/price/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let price = new Price(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,price.id)
    .input('branch',sql.Int,price.branch)
    .query(price.queryGetByID);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO POST PARA MANDAR A GUARDAR DATOS
router.post('/branch/:branch/product/:product/price',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let price = new Price(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,price.id)
    .input('branch',sql.Int,price.branch)
    .input('price',sql.Decimal(18,2),price.price)
    .query(price.queryPost);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO PUT PARA MANDAR A ACTUALIZAR DATOS POR ID
router.put('/branch/:branch/product/:product/price/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let price = new Price(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,price.id)
    .input('branch',sql.Int,price.branch)
    .input('price',sql.Decimal(18,2),price.price)
    .query(price.queryUpdateByID);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO DELETE PARA BORRAR UN DATO POR ID
router.delete('/branch/:branch/product/:product/price/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let price = new Price(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,price.id)
    .input('branch',sql.Int,price.branch)
    .query(price.queryDeleteByID );
    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

module.exports = router;