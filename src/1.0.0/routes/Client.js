const express = require('express');
const router = express.Router();
var sql = require("mssql");
const debug = require('debug')('api:error')
const config = require('../lib/config')
const controllerName = 'Client'
const Client = require('../classes/Client')
const {
  successMessage,
  failMessage
} = require('../lib/handleEvents.js'); 

//EVENTO GET PARA RECIBIR TODAS LOS DATOS 
router.get('/client',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let client = new Client(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .query(client.queryGet);
  
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 

  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));

    debug(e)
  }
})

//EVENTO GET PARA RECIBIR DATO SEGÚN ID
router.get('/client/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let client = new Client(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,client.id)
    .query(client.queryGetByID);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO POST PARA MANDAR A GUARDAR DATOS
router.post('/client',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let client = new Client(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('name',sql.NVarChar(50),client.name)
    .query(client.queryPost);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO PUT PARA MANDAR A ACTUALIZAR DATOS POR ID
router.put('/client/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let client = new Client(data,req.query);
    let pool = await sql.connect(config);
 
    let response = await pool.request()
    .input('id',sql.Int ,client.id)
    .input('name',sql.NVarChar(50),client.name)
    .query(client.queryUpdateByID);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO DELETE PARA BORRAR UN DATO POR ID
router.delete('/client/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let client = new Client(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,client.id)
    .query(client.queryDeleteByID );
    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})



module.exports = router;