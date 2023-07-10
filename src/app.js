const express = require("express");
const path = require("path");
require("./db/conn");
const User = require("./models/user")
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 8000;

const staticpath = path.join(__dirname,);
const templatespath = path.join(__dirname,"../template/views");
const partialpath = path.join(__dirname,"../template/partial");
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist/")));
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));
app.set("view engine","hbs");
app.set("views", templatespath);
hbs.registerPartials(partialpath);

// routing 
// app.get(path, callback)
app.get("/",(req,res)=>{
    res.render("index");
})

// app.get("/contact",(req,res)=>{
//     res.render("contact");
// })
app.post("/contact", async(req, res) => {
    try{
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch(error){
        res.status(500).send(error);
    }
})

// server create 
app.listen(port, ()=>{
    console.log(`As site is runnig port number ${port}`)
})


