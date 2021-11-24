DataDefault = {}
module.exports=class Branch{
  constructor(data=DataDefault){
    this.db = 'BRANCH';
    this.id = data.id;
    this.name = data.name;
    this.address = data.address;
    this.country = data.country;
    this.city = data.city

    this.queryGet=`SELECT * FROM ${this.db}`
    this.queryGetByID=`${this.queryGet} WHERE id = @id `
    this.queryPost=`INSERT INTO ${this.db} ([name],[address],[country],[city]) VALUES (@name,@address,@country,@city)`
    this.queryUpdateByID=`UPDATE ${this.db} 
    SET 
      [name] = @name,
      [address] = @address,
      [country] = @country,
      [city] = @city
      WHERE id = @id
    `
    this.queryDeleteByID=`DELETE FROM ${this.db} WHERE id=@id`
  
  }
};