const express = require('express');
const router = express.Router();
var sql = require("mssql");
const debug = require('debug')('api:error')
const config = require('../lib/config')
const controllerName = 'Category'
const Category = require('../classes/Category')
const {
  successMessage,
  failMessage
} = require('../lib/handleEvents.js'); 

//EVENTO GET PARA RECIBIR TODAS LOS DATOS 
//localhost:3333/1.0.0/
router.get('/category',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let category = new Category(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .query(category.queryGet);
  
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 

  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    console.log(e)
    debug(e)
  }
})

//EVENTO GET PARA RECIBIR DATO SEGÚN ID
router.get('/category/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let category = new Category(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,category.id)
    .query(category.queryGetByID);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO POST PARA MANDAR A GUARDAR DATOS
router.post('/category',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let category = new Category(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('name',sql.NVarChar(50),category.name)
    .query(category.queryPost);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO PUT PARA MANDAR A ACTUALIZAR DATOS POR ID

router.put('/category/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let category = new Category(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int ,category.id)
    .input('name',sql.NVarChar(100),category.name)
    .query(category.queryUpdateByID);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO DELETE PARA BORRAR UN DATO POR ID
router.delete('/category/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let category = new Category(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,category.id)
    .query(category.queryDeleteByID );
    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})



module.exports = router;