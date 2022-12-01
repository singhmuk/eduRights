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
const express = require("express");
const app = express();
const webpush = require("web-push");
const path = require("path");



app.use(express.static(path.join(__dirname, "client")));
app.use(express.json());

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

app.post("/subscribe", (req, res) => {                  // Get pushSubscription object
  const subscription = req.body;

  res.status(201).json({});                               // Send 201 - resource created
  const payload = JSON.stringify({ title: "Push Test" });  // Create payload

  webpush                                                   // Pass object into sendNotification
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5000;
app.listen(port, () => console.log('Server started on port.'));
`.trim();


class PushNotifications extends Component {
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
              <h3>Push Notifications</h3>
              <b>server.js</b>
              <div style={titles}>
                <PrismCode
                  code={modules}
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

export default (withStyles(styles)(PushNotifications));
