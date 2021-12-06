DataDefault = {}
module.exports=class Client{
  constructor(data=DataDefault){
    this.db = 'CLIENT';
    this.id = data.id;
    this.name = data.name;


    this.queryGet=`SELECT * FROM ${this.db}`
    this.queryGetByID=`${this.queryGet} WHERE id = @id `
    this.queryPost=`INSERT INTO ${this.db} ([id],[name]) VALUES (@id,@name)`
    this.queryUpdateByID=`UPDATE ${this.db} 
    SET 
      [name] = @name,
      WHERE id = @id
    `
    this.queryDeleteByID=`DELETE FROM ${this.db} WHERE id=@id`
  
  }
};