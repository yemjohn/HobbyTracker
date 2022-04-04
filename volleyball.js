require("dotenv").config();
require("./api/data/db")
const express= require("express")
const path= require("path");
const routes= require("./api/routes")

const app= express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
})

app.use(express.static(path.join(__dirname, process.env.PUBLIC_FOLDER)))

app.use("/api", routes)

const server= app.listen(process.env.PORT, function(req, res){
    const port= process.env.PORT;
    console.log("Server connected to port ", server.address().port);
})