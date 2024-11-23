const http=require('http')
const PORT= 8080
const server=http.createServer((req,res) => {
if(req.url==='/' && req.method==='GET'){
res.end("HELLO")
}
else{
    res.end("404 not found")
}
});
server.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
})