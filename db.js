const {Client}=require('pg');
const conn = new Client({
host:"localhost",
user:"postgres",
port:"5433",
password:"1234",
database:"BookStore"
})

conn.connect()
.then(()=>console.log("Connected"))
.catch(err=>console.error("Got an error while connecting:", err.stack))

module.exports=Client;