DataDefault = {}
module.exports=class Brand{
  constructor(data=DataDefault){
    this.db = 'BRAND';
    this.id = data.id;
    this.name = data.name;
    this.queryGet=`SELECT * FROM ${this.db}`
    this.queryGetByID=`${this.queryGet} WHERE id = @id `
    this.queryPost=`INSERT INTO ${this.db} ([name]) VALUES (@name)`
   
    this.queryUpdateByID=`UPDATE ${this.db} 
    SET 
      [name] = @name
      WHERE [id] = @id`
    this.queryDeleteByID=`DELETE FROM ${this.db} WHERE id=@id`
  
  }
};