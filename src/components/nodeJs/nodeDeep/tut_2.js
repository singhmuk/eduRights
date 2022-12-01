import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const styles = theme => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
  smMargin: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    textAlign: "center"
  }
})


const geocode = `
const request = require('request')

const url = 'https://api.darksky.net/forecast/5d82708dedf7f790ac891b3ce2a9c50a/37.8267,-122.4233'

request({ url: url, json: true }, (error, response) => {
    // console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + 
        ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
    console.log(response.body.daily)
})

// Geocoding
// Address -> Lat/Long -> Weather

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.
      eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

request({ url: geocodeURL, json: true }, (error, response) => {
    const latitude = response.body.features[0].center[0]
    const longitude = response.body.features[0].center[1]
    console.log(latitude, longitude)
})`.trim()

const errors = `
const request = require('request')


const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=pk.
          eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to location services!')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try another search.')
    } else {
        const latitude = response.body.features[0].center[0]
        const longitude = response.body.features[0].center[1]
        console.log(latitude, longitude)
    }
})`.trim()

const geocode_2 = `const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.
              eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode`.trim()

const callBackAbs = `
const request = require('request')
const geocode = require('./utils/geocode')


geocode('Boston', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})`.trim()

const forecast = `
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.
            temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast`.trim()

const callBacksAbs_2 = `
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geocode('Boston', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})

forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})`.trim()

const chainingCall = `
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, data) => {
        if (error) {
            return console.log(error)
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(data.location)
            console.log(forecastData)
        })
    })
}
`.trim();

const npmPackages = `
var http = require('http');
var uc = require('upper-case');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(uc("Text convert to upper case"));
  res.end();
}).listen(4000);`.trim();

const UploadFilesServer = `
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);`.trim();


class Tut2 extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4><Sidebar /></h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>Geocode</h3>
      Server.js
      <div style={titles}>
                <PrismCode
                  code={geocode}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Errors</h3>
      Server.js
      <div style={titles}>
                <PrismCode
                  code={errors}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>CallBack Abstraction</h3>
      geocode_2.js
      <div style={titles}>
                <PrismCode
                  code={geocode_2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
      Server.js
      <div style={titles}>
                <PrismCode
                  code={callBackAbs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>CallBack Abstraction_2</h3>
      forecast.js
      <div style={titles}>
                <PrismCode
                  code={forecast}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
      Server.js
      <div style={titles}>
                <PrismCode
                  code={callBacksAbs_2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Chaining Callback</h3>
      Server.js
      <div style={titles}>
                <PrismCode
                  code={chainingCall}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>NPM Packages</h3>
      Server.js
      <div style={titles}>
                <PrismCode
                  code={npmPackages}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Upload Files On Server</h3>
              <hl>
                <li>When a file is successfully uploaded to the server, it is placed on a temporary folder.</li>
                <li>The path to this directory can be found in the "files" object, passed as the third argument in the parse() method's callback function.</li>
                <li>To move the file to the folder of your choice, use the File System module, and rename the file:</li>
              </hl>
              <div style={titles}>
                <PrismCode
                  code={UploadFilesServer}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Tut2));
