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


const modules = `
const express = require('express');
const app = express();
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

// Init Nexmo
const nexmo = new Nexmo({
  apiKey: 'YOURAPIKEY',
  apiSecret: 'YOURAPISECRET'
}, { debug: true });

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
  res.render('index');
});

// Catch form submit
app.post('/', (req, res) => {
  // res.send(req.body);
  const { number, text } = req.body;

  nexmo.message.sendSms(
    'YOURVURTUALNUMBER', number, text, { type: 'unicode' },
    (err, responseData) => {
      if(err) {
        console.log(err);
      } else {
        const { messages } = responseData;
        const { ['message-id']: id, ['to']: number, ['error-text']: error  } = messages[0];
        console.dir(responseData);
        // Get data from response
        const data = {
          id,
          number,
          error
        };

        // Emit to the client
        io.emit('smsStatus', data);
      }
    }
  );
});


const port = 5000;
const server = app.listen(port, () => console.log('Server started on port.'));

// Connect to socket.io
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('Connected');
  io.on('disconnect', () => {
    console.log('Disconnected');
  })
});
`.trim();

const views = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css" />
  <title>Node SMS Texting</title>
</head>
<body>
  <div class="container">
    <h2>Send SMS Message</h2>
    <input type="tel" name="number" id="number" placeholder="Enter Phone Number...">
    <input type="text" name="msg" id="msg" placeholder="Enter Text Message...">
    <select name="schedule" id="schedule">
      <option value="0">Schedule time to send a message</option>
      <option value="1">After 1 minutes</option>
      <option value="3">After 3 minutes</option>
      <option value="5">After 5 minutes</option>
    </select>
    <input type="button" id="button" value="Send Text" class="button button-primary">
    <p class="response"></p>
  </div>

  <script src="/socket.io/socket.io.js"></script>
  <script src="js/main.js"></script>
</body>
</html>`.trim();


class Nodetext extends Component {
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
              <h3>Nodetext App</h3>
              <b>server.js</b>
              <div style={titles}>
                <PrismCode
                  code={modules}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>views/index.html</b>
              <div style={titles}>
                <PrismCode
                  code={views}
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

export default (withStyles(styles)(Nodetext));
