const express = require('express');
const router = express.Router();
const sql = require('mssql');
const debug = require('debug')('api:error')
const config = require('../lib/config')
const controllerName = 'Invoice'
const Invoice = require('../classes/Invoice')
const {
  successMessage,
  failMessage
} = require('../lib/handleEvents.js'); 

//EVENTO GET PARA RECIBIR TODAS LOS DATOS 
router.get('/branch/:branch/invoice',async(req,res)=>{
  try{

    let data = Object.assign(req.body,req.params)
    let invoice = new Invoice(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('branch',sql.NVarChar(10),invoice.branch)
    .query(invoice.queryGet);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 

  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    console.log(e)
    debug(e)
  }
})

//EVENTO GET PARA RECIBIR DATO SEGÚN ID
router.get('/branch/:branch/invoice/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let invoice = new Invoice(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,invoice.id)
    .query(invoice.queryGetByID);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO POST PARA MANDAR A GUARDAR DATOS
router.post('/branch/:branch/invoice',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let invoice = new Invoice(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('branch',sql.NVarChar(100),invoice.branch)
    .input('client',sql.NVarChar(10),invoice.client)
    .input('date',sql.Date,invoice.date)
    .input('seller',sql.NVarChar(20),invoice.seller)
    .input('subtotal',sql.Decimal(18,2),invoice.subtotal)
    .input('discount',sql.Decimal(18,2),invoice.discount)
    .input('isv',sql.Decimal(18,2),invoice.isv)
    .input('total',sql.Decimal(18,2),invoice.total)
    .input('isprinted',sql.SmallInt,invoice.isprinted)
    .input('createdat',sql.Date,invoice.createdat)
    .query(invoice.queryPost);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO PUT PARA MANDAR A ACTUALIZAR DATOS POR ID

router.put('/branch/:branch/invoice/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let invoice = new Invoice(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('branch',sql.NVarChar(100),invoice.branch)
    .input('client',sql.NVarChar(10),invoice.client)
    .input('date',sql.Date,invoice.date)
    .input('seller',sql.NVarChar(20),invoice.seller)
    .input('subtotal',sql.Decimal(18,2),invoice.subtotal)
    .input('discount',sql.Decimal(18,2),invoice.discount)
    .input('isv',sql.Decimal(18,2),invoice.isv)
    .input('total',sql.Decimal(18,2),invoice.total)
    .input('isprinted',sql.SmallInt,invoice.isprinted)
    .input('createdat',sql.Date,invoice.createdat)
    .input('id',sql.Int,invoice.id)
    .query(invoice.queryUpdateByID);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO DELETE PARA BORRAR UN DATO POR ID
router.delete('/branch/:branch/invoice/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let invoice = new Invoice(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,invoice.id)
    .query(invoice.queryDeleteByID );
    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})



module.exports = router;