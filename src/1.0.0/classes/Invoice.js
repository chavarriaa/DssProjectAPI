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
    this.queryGet=`
      SELECT 
      I.[id],
      I.[branch],
      B.[name] as 'branchName',
      I.[client],
      C.[name] as 'clientName',
      I.[date],
      I.[seller],
      S.[name] as 'sellerName',
      I.[subtotal],
      I.[discount],
      I.[isv],
      I.[total],
      I.[isprinted],
      I.[createdat]
      FROM INVOICE I
      INNER JOIN BRANCH B ON I.branch = B.id
      INNER JOIN CLIENT C ON I.client = C.id
      INNER JOIN SELLER S ON I.seller = S.id
      WHERE I.[branch] =@branch
    `
    this.queryGetByID=`${this.queryGet} AND i.id = @id `
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