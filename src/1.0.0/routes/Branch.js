const express = require('express');
const router = express.Router();
const sql = require('mssql');
const debug = require('debug')('api:error')
const config = require('../lib/config')
const controllerName = 'Branch'
const Branch = require('../classes/Branch')
const {
  successMessage,
  failMessage
} = require('../lib/handleEvents.js'); 

//EVENTO GET PARA RECIBIR TODAS LOS DATOS 
router.get('/branch',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let branch = new Branch(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .query(branch.queryGet);
  
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 

  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    console.log(e)
    debug(e)
  }
})

//EVENTO GET PARA RECIBIR DATO SEGÚN ID
router.get('/branch/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let branch = new Branch(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,branch.id)
    .query(branch.queryGetByID);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO POST PARA MANDAR A GUARDAR DATOS
router.post('/branch',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let branch = new Branch(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.NVarChar(10),branch.id)
    .input('name',sql.NVarChar(100),branch.name)
    .input('address',sql.NVarChar(100),branch.address)
    .input('country',sql.NVarChar(20),branch.country)
    .input('city',sql.NVarChar(30),branch.city)
    .query(branch.queryPost);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO PUT PARA MANDAR A ACTUALIZAR DATOS POR ID

router.put('/branch/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let branch = new Branch(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int ,branch.id)
    .input('name',sql.NVarChar(100),branch.name)
    .input('address',sql.NVarChar(100),branch.address)
    .input('country',sql.NVarChar(20),branch.country)
    .input('city',sql.NVarChar(30),branch.city)
    .query(branch.queryUpdateByID);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO DELETE PARA BORRAR UN DATO POR ID
router.delete('/branch/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let branch = new Branch(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,branch.id)
    .query(branch.queryDeleteByID );
    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})



module.exports = router;