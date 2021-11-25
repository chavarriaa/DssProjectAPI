DataDefault = {}
module.exports=class Branch{
  constructor(data=DataDefault){
    this.db = 'INVOICE';
    this.id = data.id;
    this.branch = data.branch;
    this.client = data.client;
    this.date = data.date;
    this.seller = data.seller;
    this.subtotal = data.subtotal;
    this.discount = data.discount;
    this.isv = data.isv;
    this.total = data.total;
    this.isprinted = data.discount;
    this.createdat = data.createdat;
    
    this.queryGet=`SELECT * FROM ${this.db} WHERE branch=@branch`
    this.queryGetByID=`${this.queryGet} WHERE id = @id `
    this.queryPost=`INSERT INTO ${this.db} VALUES (@branch,@client,@date,@seller,@subtotal,@discount,@isv,@total,@isprinted,@createdat)`
    this.queryUpdateByID=`UPDATE ${this.db} 
      SET 
      [branch] = @branch,
      [client] = @client,
      [date] = @date,
      [seller] = @seller,
      [subtotal] = @subtotal,
      [discount] = @discount,
      [isv] = @isv,
      [total] = @total,
      [isprinted] = @isprinted,
      [createdat] = @createdat
      WHERE id = @id
    `
    this.queryDeleteByID=`DELETE FROM ${this.db} WHERE id=@id`
  
  }
};