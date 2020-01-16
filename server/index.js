const express = require('express');
const request = require('request');
const schedule = require('node-schedule');

const Api = require('../Api.js');
const db = require('../database-mongo');

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

const resorts = [
  {name: 'Sierra at Tahoe', latitude: 38.8009, longitude: -120.0809, snowReportUrl: 'https://www.sierraattahoe.com/weather-snow-report/', webcamUrl: 'https://www.sierraattahoe.com/live-cams/'},
  {name: 'Squaw Valley', latitude: 39.1970, longitude: -120.2357, snowReportUrl: 'https://squawalpine.com/mountain-information/snow-weather-reports-lake-tahoe#squaw', webcamUrl: 'https://squawalpine.com/mountain-information/lake-tahoe-webcams'},
  {name:'Northstar', latitude: 39.2746, longitude: -120.1211, snowReportUrl: 'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx', webcamUrl: 'https://www.northstarcalifornia.com/the-mountain/mountain-conditions/mountain-cams.aspx'},
  {name:'Sugar Bowl', latitude: 39.3004, longitude: -120.3334, snowReportUrl: 'https://www.sugarbowl.com/conditions', webcamUrl: 'https://www.sugarbowl.com/webcams'},
  {name: 'Kirkwood', latitude: 38.6848, longitude: -120.0652, snowReportUrl: 'https://www.kirkwood.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx', webcamUrl: 'https://www.kirkwood.com/the-mountain/mountain-conditions/mountain-cams.aspx'},
  {name: 'Heavenly', latitude: 38.9569, longitude: -119.9427, snowReportUrl: 'https://www.skiheavenly.com/the-mountain/mountain-conditions/snow-and-weather-report.aspx', webcamUrl: 'https://www.skiheavenly.com/the-mountain/mountain-conditions/mountain-cams.aspx'},
  {name: 'Mt. Rose', latitude: 39.3284, longitude: -119.8854, snowReportUrl: 'https://skirose.com/snow-report/', webcamUrl: 'https://skirose.com/the-mountain-web-cams/'},
  {name: 'Homewood', latitude: 39.0856, longitude: -120.1605, snowReportUrl: 'https://www.skihomewood.com/mountain/snow-report/', webcamUrl: 'https://www.skihomewood.com/mountain/homewood-webcam/'},
  {name: 'Boreal', latitude: 39.3365, longitude: -120.3498, snowReportUrl: 'https://www.rideboreal.com/the-mountain/conditions-weather/recent-snowfall', webcamUrl: 'https://www.rideboreal.com/the-mountain/webcams/mountain/base-area-cam'}
];


schedule.scheduleJob({hour: 0, minute: 01}, () => {
  const recurse = (index) => {
    if (index === resorts.length) {
      console.log('Done! ')
      return;
    }
    const url = `http://api.worldweatheronline.com/premium/v1/ski.ashx?key=${Api.weatherKey}&q=${resorts[index].latitude},${resorts[index].longitude}&format=json&num_of_days=3`;
  
    request(url, (err, response, body) => {
      if (err) console.log('Error: ', err);
      console.log('StatusCode: ', response && response.statusCode);
      var results = JSON.parse(body).data.weather[0];
      var snowReport = {
        _id: index + 1,
        name: resorts[index].name,
        chanceOfSnow: parseInt(results.chanceofsnow),
        totalSnowfall: parseFloat(results.totalSnowfall_cm),
        latitude: resorts[index].latitude,
        longitude: resorts[index].longitude,
        snowReportUrl: resorts[index].snowReportUrl,
        webcamUrl: resorts[index].webcamUrl,
      }
      db.insert(snowReport);
      recurse(index + 1);
    });
  }
  recurse(0);
})



app.get('/snow/report', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

