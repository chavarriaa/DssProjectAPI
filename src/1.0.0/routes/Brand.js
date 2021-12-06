const express = require('express');
const router = express.Router();
var sql = require("mssql");
const debug = require('debug')('api:error')
const config = require('../lib/config')
const controllerName = 'Brand'
const Brand = require('../classes/Brand')
const {
  successMessage,
  failMessage
} = require('../lib/handleEvents.js'); 

//EVENTO GET PARA RECIBIR TODAS LOS DATOS 
router.get('/brand',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let brand = new Brand(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .query(brand.queryGet);
  
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 

  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    console.log(e)
    debug(e)
  }
})

//EVENTO GET PARA RECIBIR DATO SEGÚN ID
router.get('/brand/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let brand = new Brand(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,brand.id)
    .query(brand.queryGetByID);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO POST PARA MANDAR A GUARDAR DATOS
router.post('/brand',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let brand = new Brand(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('name',sql.NVarChar(50),brand.name)
    .query(brand.queryPost);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO PUT PARA MANDAR A ACTUALIZAR DATOS POR ID
router.put('/brand/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let brand = new Brand(data,req.query);
    let pool = await sql.connect(config);
 
    let response = await pool.request()
    .input('id',sql.Int ,brand.id)
    .input('name',sql.NVarChar(50),brand.name)
    .query(brand.queryUpdateByID);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO DELETE PARA BORRAR UN DATO POR ID
router.delete('/brand/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let brand = new Brand(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,brand.id)
    .query(brand.queryDeleteByID );
    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})



module.exports = router;