const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");



    //res.send("The server is running!!!<h6>Hautor: Mangazie</h6>");
});

app.post("/", function(req, res){

    //console.log(req.body.cityName);

    const querry = req.body.cityName;
    const apiKey = "2518a54900f09864095ccb17c9fdb22f";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ querry + "&appid=" + apiKey + "&units="+ unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            //or --> console.log(data);
            const weatherdata = JSON.parse(data);
            // or --> console.log(weatherdata);
            // const object = {
            //     name: "Mangazie",
            //     favouriteFood: "Spaguety"
            // }
            // console.log(JSON.stringify(object));
            const temp = weatherdata.main.temp
            const weatherDescription = weatherdata.weather[0].description
            const icon = weatherdata.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(weatherDescription);
            res.write("<p>The weather is currently " + weatherDescription + "!!!</p>");
            res.write("<h2>The temperature in " + querry +" is " + temp+ " degrees Celcius.</h2>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    });
    //console.log("Post request recieved!!");
});



app.listen(2000, function(){
    console.log("The server is running on port 2000.");
});