const express = require('express');
const path = require('path');

const request = require('request');
const app=express()
app.use(express.urlencoded({extended: true}))




app.set('view engine',"ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static("public"))


 

app.get("/search",(req,res)=>{
    res.render("search")
})

app.get("/results",(req,res)=>{


    let query= req.query.search

    
    request("https://api.themoviedb.org/3/search/movie?api_key=d850f9e58471cfd0041fb30a691cc804&query="+query,(error,response,body)=>{
        if(error){
            console.log(error);
        }

        let data= JSON.parse(body)
        res.render("movies",{data:data,searchQuery:query})



    })




})


app.listen(3000,()=>{
    console.log("the server is listening");
})