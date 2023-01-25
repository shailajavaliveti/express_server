// Require application dependencies
// These are express, body-parser, and request

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

// Configure dotenv package

require("dotenv").config();


const apiKey = '295deb568f5bd78970815a7d996ab72e';

// Setup your express app and body-parser configurations
// Setup your javascript template view engine
// we will serve your static pages from the public directory, it will act as your root directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get('/', function(req, res){
    res.render('index', {weather: null, error: null});
})
app.post('/', function(req, res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    console.log(city);
    request(url, function(err, body){
        if(err){
            res.render('index', { weather: null, error: 'Error, please try again' });
        }
        else{
            let weather = JSON.parse(JSON.stringify(body));
            let result = JSON.parse(weather.body);
            console.log(result.weather[0].main);
            console.log(result.main.temp, result.name);
            if(result.weather[0].main === undefined){
                res.render('index', {weather:null, error:'Please try again'});
            }
            else{
                let weatherText = `It's ${result.main.temp} degrees with ${result.weather[0].main} in ${result.name}`
                res.render('index', {weather: weatherText, error: null});
               // console.log(body);
            }
        }
    })
})
app.listen(3000,function(){
    console.log("Weatherly app listening on port 3000");
})
