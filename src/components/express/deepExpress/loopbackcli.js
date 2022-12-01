import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = {backgroundColor:'#F0F8FF', padding:'1px', fontSize:'16px'}

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

const loopback = `
1.Install CLI
$ npm install loopback-cli

2.Create app
$ lb

$ cd lbapp

3.Run server
$ node .
"dev": "nodemon server/server.js --watch common --watch server",

4.Install Mongo connector
$ npm install --save loopback-connector-mongodb

5.Setup datasource
$ lb datasource mongoDS --connector mongoDB

-host: localhost
-port: 27017
-database: dbname


6.Create model
$ lb model

Enter modal name: meetup
    db (mongodb)
    Select model's base class: PersistedModel
    Expose meetup via the REST API ? Y
    common model or server only ? common
    Property name: name
    Property type: String
    Required ? Y
 
if want continue add more Property name tha add otherwise without enter name press enter to quite


7.see data from database on browser: http://localhost:3000/api/meetups

8.inside db
  show dbs
  use meetups
  show collections
  db.meetup.find()
  

  9.Add auth
$ lb acl

all existing model
     meetup  -- select
  all method and properties
  All (match all types)
  Select access type
     All (match all types)  --select
  Any unauthenticated user
  Select the permission to apply
  Explicitly deny access  --select
  

  10.Pass token with verb
  inside user create user (post)
   {
     "email":"mukesh7@gmail.com",
     "password":"mukesh@123"
    }

go inside user login route after login get id tokens
and put id inside set Access Token


11.Add angularjs 
inside server/middleware.json

"files": {
    "loopback#static": {
      "params": "$!../client"
    }
  }


12.connect api over angular app(All api available for app).
lb-ng server/server.js client/js/lb-services.js
if above command not run then first run: npm install -g loopback-sdk-angular-cli`.trim()


class LoopbackCli extends Component {
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
                 <h3>Loopbac cli</h3>
                   <div style={titles}>
                      <PrismCode
                        code={loopback}
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

export default (withStyles(styles)(LoopbackCli));
