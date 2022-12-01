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


const myDataBase = `
{"user":{"19aff1ae-35b2-407e-87bc-1b76b2ca54f7":{
  "id":"19aff1ae-35b2-407e-87bc-1b76b2ca54f7",
  "temp_secret":{"ascii":"[&JnaKh]&Wt9>6Z}Cc1]X$ZMDtIVMH2I",
    "hex":"5b264a6e614b685d265774393e365a7d4363315d58245a4d447449564d483249",
    "base32":"LMTEU3TBJNUF2JSXOQ4T4NS2PVBWGMK5LASFUTKEOREVMTKIGJEQ",
    "otpauth_url":"otpauth://totp/SecretKey?secret=LMTEU3TBJNUF2JSXOQ4T4NS2PVBWGMK5LASFUTKEOREVMTKIGJEQ"}},
    "96ae4a35-98a2-48ed-84dd-829c8e882117":{"id":"96ae4a35-98a2-48ed-84dd-829c8e882117",
"temp_secret":{"ascii":"7(Jv}W/1i9}J6at0ci)y}m{*I9Xd5I{%",
  "hex":"37284a767d572f3169397d4a36617430636929797d6d7b2a4939586435497b25",
  "base32":"G4UEU5T5K4XTC2JZPVFDMYLUGBRWSKLZPVWXWKSJHFMGINKJPMSQ",
  "otpauth_url":"otpauth://totp/SecretKey?secret=G4UEU5T5K4XTC2JZPVFDMYLUGBRWSKLZPVWXWKSJHFMGINKJPMSQ"}},
  "93c92864-8297-40b6-8550-4e7d4666742d":{"id":"93c92864-8297-40b6-8550-4e7d4666742d",
    "temp_secret":{"ascii":"OPCeDKax((p;q2Sm[Gny1p!nAChR86HE",
      "hex":"4f504365444b61782828703b7132536d5b476e793170216e4143685238364845",
      "base32":"J5IEGZKEJNQXQKBIOA5XCMSTNVNUO3TZGFYCC3SBINUFEOBWJBCQ",
      "otpauth_url":"otpauth://totp/SecretKey?secret=J5IEGZKEJNQXQKBIOA5XCMSTNVNUO3TZGFYCC3SBINUFEOBWJBCQ"}},
      "fa6f9da6-f9db-4caf-8e47-2f9309a11e6d":{"id":"fa6f9da6-f9db-4caf-8e47-2f9309a11e6d",
        "temp_secret":{"ascii":"qhRSFJy.;}MM&csaA$5PcaFg}X)LNuoQ",
          "hex":"71685253464a792e3b7d4d4d2663736141243550636146677d58294c4e756f51",
          "base32":"OFUFEU2GJJ4S4O35JVGSMY3TMFASINKQMNQUMZ35LAUUYTTVN5IQ",
          "otpauth_url":"otpauth://totp/SecretKey?secret=OFUFEU2GJJ4S4O35JVGSMY3TMFASINKQMNQUMZ35LAUUYTTVN5IQ"}
          }
        }
      }`.trim();

const server = `

const express = require("express");
const bodyParser = require('body-parser');
const JsonDB = require('node-json-db').JsonDB;
const Config = require('node-json-db/dist/lib/JsonDBConfig').Config;
const uuid = require("uuid");
const speakeasy = require("speakeasy");
const app = express();


var db = new JsonDB(new Config("myDataBase", true, false, '/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/register", (req, res) => {
  const id = uuid.v4();
  try {
    const path = '/user/'$'{id}';
    const temp_secret = speakeasy.generateSecret();     // Create temporary secret until it verified
    
    db.push(path, { id, temp_secret });                 // Create user in the database
    res.json({ id, secret: temp_secret.base32 })        // Send user id and base32 key to user
  } catch(e) {
    console.log(e);
    res.status(500).json({ message: 'Error generating secret key'})
  }
})

app.post("/api/verify", (req,res) => {
  const { userId, token } = req.body;
  try {
    const path = '/user/'$'{userId}';                       // Retrieve user from database
    const user = db.getData(path);
    console.log({ user })
    const { base32: secret } = user.temp_secret;
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token
    });
    if (verified) {
      db.push(path, { id: userId, secret: user.temp_secret });      // Update user data
      res.json({ verified: true })
    } else {
      res.json({ verified: false})
    }
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user'})
  };
})

app.post("/api/validate", (req,res) => {
  const { userId, token } = req.body;
  try {
    const path = '/user/'$'{userId}';                 // Retrieve user from database
    const user = db.getData(path);
    console.log({ user })
    const { base32: secret } = user.secret;
    const tokenValidates = speakeasy.totp.verify({  // Returns true if the token matches
      secret,
      encoding: 'base32',
      token,
      window: 1
    });
    if (tokenValidates) {
      res.json({ validated: true })
    } else {
      res.json({ validated: false})
    }
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user'})
  };
})

const port = 5000;

app.listen(port, () => console.log('App is running on PORT.'));`.trim();

const awaitPat = `
GET: localhost:5000/api
POST: localhost:5000/api/register

POST: localhost:5000/api/verify
      {
        "userid":"fa6f9da6-f9db-4caf-8e47-2f9309a11e6d",
         "token":"132276"
      }`.trim();


class TwoFA extends Component {
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
              <h3>2fa-speakeasy-example-master</h3>
              <b>myDataBase.json</b>
              <div style={titles}>
                <PrismCode
                  code={myDataBase}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>server.js</b><br/>
              The second argument is used to tell the DB to save after each push
              If you put false, you'll have to call the save() method.<br/>
              The third argument is to ask JsonDB to save the database in an human readable format. (default false)
              The last argument is the separator. By default it's slash (/).
              <div style={titles}>
                <PrismCode
                  code={server}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>notes</b>
              <div style={titles}>
                <PrismCode
                  code={awaitPat}
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

export default (withStyles(styles)(TwoFA));
