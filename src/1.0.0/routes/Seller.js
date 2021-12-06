const express = require('express');
const router = express.Router();
var sql = require("mssql");
const debug = require('debug')('api:error')
const config = require('../lib/config')
const controllerName = 'Seller'
const Seller = require('../classes/Seller')
const {
  successMessage,
  failMessage
} = require('../lib/handleEvents.js'); 

//EVENTO GET PARA RECIBIR TODAS LOS DATOS 
router.get('/seller',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let seller = new Seller(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .query(seller.queryGet);
  
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 

  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    console.log(e)
    debug(e)
  }
})

//EVENTO GET PARA RECIBIR DATO SEGÚN ID
router.get('/seller/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let seller = new Seller(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,seller.id)
    .query(seller.queryGetByID);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO POST PARA MANDAR A GUARDAR DATOS
router.post('/seller',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let seller = new Seller(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('name',sql.NVarChar(50),seller.name)
    .query(seller.queryPost);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO PUT PARA MANDAR A ACTUALIZAR DATOS POR ID
router.put('/seller/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let seller = new Seller(data,req.query);
    let pool = await sql.connect(config);
 
    let response = await pool.request()
    .input('id',sql.Int ,seller.id)
    .input('name',sql.NVarChar(50),seller.name)
    .query(seller.queryUpdateByID);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO DELETE PARA BORRAR UN DATO POR ID
router.delete('/seller/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let seller = new Seller(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,seller.id)
    .query(seller.queryDeleteByID );
    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})



module.exports = router;