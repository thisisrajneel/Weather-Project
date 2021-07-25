const { response } = require('express');
const express = require('express');
const https = require('https');

const app = express();
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res)=>{

    
    res.sendFile(__dirname + '\\index.html')
});

app.post('/', (req, res)=>{
    const query = req.body.city;
    const appid = "20cd217a84bd738639ad80b5978515ba";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + appid;

    https.get(url, response=>{

        response.on("data", data=>{
            const weatherData = JSON.parse(data);
            const name = weatherData.name;
            const min = weatherData.main.temp_min;
            const max = weatherData.main.temp_max;
            const desc = weatherData.weather[0].description;

            res.set("Content-Type", "text/html");
            res.write("<h2>Weather in " + name + "</h2>");
            res.write('<p>The weather is <span><strong>' + desc + "</strong></span> with a high of <span><strong>" + max + " C</strong></span> and a low of <span><strong>" + min + " C</strong></span>.</p>");
            res.send();
        })
    })
})


app.listen(3000, ()=>{
    console.log('server running on port 3000');
});