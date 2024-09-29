const express=require("express");
const {v4:uuidv4}=require('uuid');
const app = express();
var methodOverride = require('method-override');

const port=8080;
const path=require("path");
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.set("public",path.join(__dirname,"public"));
app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {
        id:uuidv4(),
        username:"Swarnima",
        content:"I am learning rest api",

    },
    {
        id:uuidv4(),
        username:"Sahil",
        content:"I am preparing for govt exams",

    },
    {
        id:uuidv4(),
        username:"Ranjana",
        content:"I have cracked my dream job!!",

    }
];
app.get("/posts",(req,res)=>{
  res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
  
   res.render("new.ejs");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
    
});
app.patch("/posts/:id",(req,res)=>{
   let {id}=req.params;
   let newContent=req.body.content;
   let post=posts.find((p)=>id===p.id);
   post.content=newContent;
//    res.send("patch request working");
   res.redirect("/posts");
   
});
app.get("/posts/:id/edit",(req,res)=>{
   let {id}=req.params;
   let post=posts.find((p)=>id===p.id);
   res.render("edit.ejs",{post});
   
});
app.delete("/posts/:id",(req,res)=>{
       let {id}=req.params;
       posts=posts.filter((p)=>(id)!==p.id);
       res.redirect("/posts");
});
app.post("/posts",(req,res)=>{
  let {username,content}=req.body;
  let id=uuidv4();
  posts.push({id,username,content});
  res.redirect("/posts");

});
app.listen(port,()=>{
    console.log("server is running");
});