const {Client}=require('pg');
const conn = new Client({
host:"localhost",
user:"postgres",
port:"5433",
password:"1234",
database:"BookStore"
})

conn.connect()
.then(()=>console.log("Connected to the database"))
.catch(err=>console.error("An error while connecting with the database", err.stack))

module.exports=conn;