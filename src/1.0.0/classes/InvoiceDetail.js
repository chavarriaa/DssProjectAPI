DataDefault = {}
module.exports=class InvoiceDetail{
  constructor(data=DataDefault){
    this.db = 'INVOICEDETAIL';
    this.branch = data.branch;
    this.invoice = data.invoice;
    this.product = data.product;
    this.qty = data.qty;
    this.freetax = data.freetax;
    this.price = data.price;
    this.subtotal = data.subtotal;
    this.discount = data.discount;
    this.isv = data.isv;
    this.total = data.total;
    
    this.queryGet=` SELECT 
      ID.[id],
      ID.[invoice],
      ID.[branch],
      ID.[product],
      P.[name] as 'productName',
      ID.[qty],
      ID.freetax,
      ID.price,
      ID.subtotal,
      ID.discount,
      ID.isv,
      ID.total
      FROM ${this.db} ID
      INNER JOIN PRODUCT P ON ID.product = P.id
      WHERE ID.invoice = @invoice
      AND ID.branch = @branch
    `

    this.queryGetByID=`${this.queryGet} WHERE ID.id = @id `

    this.queryPost=`INSERT INTO ${this.db} (branch,invoice,product,qty,freetax,price,subtotal,discount,isv,total) VALUES (@branch,@invoice,@product,@qty,@freetax,@price,@subtotal,@discount,@isv,@total)`
    
    this.queryUpdateByID=`UPDATE ${this.db} 
      SET 
      [invoice] = @invoice,
      [product] = @product,
      [qty] = @qty,
      [freetax] = @freetax,
      [subtotal] = @subtotal,
      [discount] = @discount,
      [isv] = @isv,
      [total] = @total,
      WHERE id = @id
    `
    this.queryDeleteByID=`DELETE FROM ${this.db} WHERE id=@id`
  
  }
};