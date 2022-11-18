const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});


app.post("/",function(req,res){


   var crypto = req.body.crypto;
   var fiat = req.body.fiat;
   var amount = req.body.amount;


   var otptions = {
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method:"GET",
    qs:{
        from:crypto,
        to:fiat,
        amount:amount
    }

   };


    request(otptions,function(error,response,body){
   var data = JSON.parse(body);
   var price  =  data.price;
   var date = data.time;
   res.write("<p> the current date is : " + date + "</p>");
   res.write("<h1>" + amount + crypto + " is currently worth " + price + fiat +"</h1>");


   res.send();


    });
});

app.listen("3000",function(){
    console.log("server has been started ...");
});