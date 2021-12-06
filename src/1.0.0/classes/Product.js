DataDefault = {}
module.exports=class Product{
  constructor(data=DataDefault){
    this.db = 'PRODUCT';
    this.id = data.id;
    this.name = data.name;
    this.brand = data.brand;
    this.category = data.category;
    this.state = data.state;
    this.gender = data.gender;
    

    this.queryGet=`SELECT * FROM ${this.db} `
    this.queryGetByID=`${this.queryGet} WHERE id = @id `
    this.queryPost=`INSERT INTO ${this.db}  VALUES (@name,@brand,@category,@state,@gender)`
    this.queryUpdateByID=`UPDATE ${this.db} 
    SET 
      [name] = @name,
      [brand] = @brand,
      [category] = @category,
      [state] = @state,
      [gender]=@gender
      WHERE id = @id
    `
    this.queryDeleteByID=`DELETE FROM ${this.db} WHERE id=@id`
  
  }
};