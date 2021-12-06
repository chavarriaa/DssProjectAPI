DataDefault = {}
module.exports=class Price{
  constructor(data=DataDefault){
    this.db = 'PRICE';
    this.id = data.id
    this.product = data.product;
    this.branch = data.branch;
    this.price = data.price;
    this.queryGet=`
    SELECT * FROM ${this.db} 
    WHERE branch=@branch 
    AND product = @product
    `    
    this.queryGetByID=`${this.queryGetByBranch} AND id = @id `
    this.queryPost=`INSERT INTO ${this.db} ([product],[branch],[price]) VALUES (@product,@branch,@price)`
    this.queryUpdateByID=`UPDATE ${this.db} 
    SET 
      [product] = @product,
      [branch] = @branch,
      [price] = @price,
      WHERE [branch] = @branch
      AND id = @id
    `
    this.queryDeleteByID=` DELETE FROM ${this.db} 
    WHERE [branch] = @branch
    AND id = @id`
  
  }
};