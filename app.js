const { response } = require('express');
const express = require('express');
const https = require('https');

const app = express();

app.get('/', (req, res)=>{

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&appid=20cd217a84bd738639ad80b5978515ba";

    https.get(url, response=>{
        console.log(response.statusCode);

        response.on("data", data=>{
            const weatherData = JSON.parse(data);

            console.log(weatherData);
        })
    })

    res.send('server is up and running.')
});

app.listen(3000, ()=>{
    console.log('server running on port 3000');
});