const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000,function(){

console.log("running");

})

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");

})

app.post("/",function(req,res){
  const query =req.body.cityName;
  const api_key = ""; //goes here
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api_key+"&units="+unit+"";
  https.get(url,function(response){
    console.log(response);

    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      console.log(weatherData)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
      res.write("<p>The weather is currently "+ weatherDescription + "</p>")
      res.write("<h1>The temperature in "+query+" is " + temp + " degrees Celsius.</h1>");
      res.write("<img src="+imageURL+">");

      res.send()
    })

  })


})
