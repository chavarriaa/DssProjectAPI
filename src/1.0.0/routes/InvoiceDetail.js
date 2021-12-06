const express = require('express');
const router = express.Router();
const sql = require('mssql');
const debug = require('debug')('api:error')
const config = require('../lib/config')
const controllerName = 'InvoiceDetail'
const InvoiceDetail = require('../classes/InvoiceDetail')
const {
  successMessage,
  failMessage
} = require('../lib/handleEvents.js'); 

//EVENTO GET PARA RECIBIR TODAS LOS DATOS 
router.get('/branch/:branch/invoice/:invoice/detail',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let invoiceDetail = new InvoiceDetail(data,req.query);
    let pool = await sql.connect(config);

    let response = await pool.request()
    .input('branch',sql.Int,invoiceDetail.branch)
    .input('invoice',sql.Int,invoiceDetail.invoice)
    .query(invoiceDetail.queryGet);

    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 

  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));

    debug(e)
  }
})

//EVENTO GET PARA RECIBIR DATO SEGÚN ID
router.get('/branch/:branch/invoice/:invoice/detail/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let invoiceDetail = new InvoiceDetail(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('branch',sql.Int,invoiceDetail.branch)
    .input('invoice',sql.Int,invoiceDetail.invoice)
    .input('id',sql.Int,invoiceDetail.id)
    .query(invoiceDetail.queryGetByID);
    if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO POST PARA MANDAR A GUARDAR DATOS
router.post('/branch/:branch/invoice/:invoice/detail',async(req,res)=>{
  try{

    let data = Object.assign(req.body,req.params)
    let invoiceDetail = new InvoiceDetail(data,req.query);
    let pool = await sql.connect(config);

    let response = await pool.request()
    .input('invoice',sql.Int,invoiceDetail.invoice)
    .input('branch',sql.Int,invoiceDetail.branch)
    .input('product',sql.Int,invoiceDetail.product)
    .input('price',sql.Decimal(18,2),invoiceDetail.price)
    .input('qty',sql.Decimal(18,2),invoiceDetail.qty)
    .input('freetax',sql.Int,invoiceDetail.freetax)
    .input('subtotal',sql.Decimal(18,2),invoiceDetail.subtotal)
    .input('discount',sql.Decimal(18,2),invoiceDetail.discount)
    .input('isv',sql.Decimal(18,2),invoiceDetail.isv)
    .input('total',sql.Decimal(18,2),invoiceDetail.total)
    .query(invoiceDetail.queryPost);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO PUT PARA MANDAR A ACTUALIZAR DATOS POR ID

router.put('/branch/:branch/invoice/:invoice/detail/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let invoiceDetail = new InvoiceDetail(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('branch',sql.Int,invoiceDetail.branch)
    .input('invoice',sql.Int,invoiceDetail.invoice)
    .input('product',sql.Int,invoiceDetail.product)
    .input('qty',sql.Decimal(18,2),invoiceDetail.qty)
    .input('freetax',sql.Int,invoiceDetail.freetax)
    .input('subtotal',sql.Decimal(18,2),invoiceDetail.subtotal)
    .input('discount',sql.Decimal(18,2),invoiceDetail.discount)
    .input('isv',sql.Decimal(18,2),invoiceDetail.isv)
    .input('total',sql.Decimal(18,2),invoiceDetail.total)
    .input('id',sql.Int,invoiceDetail.id)
    .query(invoiceDetail.queryUpdateByID);

    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

//EVENTO DELETE PARA BORRAR UN DATO POR ID
router.delete('/branch/:branch/invoice/:invoice/detail/:id',async(req,res)=>{
  try{
    let data = Object.assign(req.body,req.params)
    let invoiceDetail = new InvoiceDetail(data,req.query);
    let pool = await sql.connect(config);
    let response = await pool.request()
    .input('id',sql.Int,invoiceDetail.id)
    .query(invoiceDetail.queryDeleteByID );
    //if (response.rowsAffected <= 0) { throw "No existe datos con esos parámetros"};
    res.json(successMessage(`${req.method} ${controllerName}` ,response.recordsets)) 
  } catch (e) {
    res.status(404).json(failMessage(`${req.method} ${controllerName}` ,e));
    debug(e)
  }
})

module.exports = router;