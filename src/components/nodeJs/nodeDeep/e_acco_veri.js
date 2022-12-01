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


const schems = `
const userSchema = new Schems({
  name:{type:String, trim:true, required: true, max: 64},
  email:{type:String, trim:true, required: true, unique: true, lowercase: true},
  password:{type:String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);`.trim();

const auths = `
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxf26a5c38b52e4da68cd059e6c4d2daba.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

//create user without email account activation
exports.signup = (req, res) => {
const { name, email, password } = req.body;

User.findOne({email}).exec((err, user) => {
    if(user){
        return res.status(400).json({error:"User with this email is already exist"});
    }

const token = jwt.sign({name, email, password}, process.env.JWT_ACC_ACTIVATE, { expiresIn: '20m'});

const data = {
    from: 'noreply@hello.com',
    to: email,
    subject: 'Account Activation Link',
    html: '
    <h2>Please click on given link to activate you account</h2>
    <p>'$;{process.env.CLIENT_URL}/authentication/activate/'$'{token}'
};
mg.messages().send(data, function(error, body) {
    if(error){
        return res.json({error: error.message})
    }
    return res.json({message: 'email has been sent, Kindly activate your account'})
    console.log(body)
        });
    })
}


exports.activateAccount = (req, res) => {
    const { token } = req.body;
    if(token){
        jwt.verify(token, process.env.JWT_ACC_ACTIVATE, function(err, decodedToken){
            if(err){
                return res.status(400).json({error: 'Incorrect or Expired link'})
            }

            const { name, email, password } = decodedToken;
            User.findOne({email}).exec((err, user) => {
                if(user){
                    return res.status(400).json({error:"User with this email is already exist"});
                }
        
                let newUser = new User({name, email, password});
                newUser.save((err, success) => {
                    if(err){
                        return res.status(400).json({error: 'error activating account'})
                    }
                    res.json({message: "SignUp Success"})
                })
            })
        })
    }
    else{
        return res.json({error: 'Something goes wrong!'})
    }
}`.trim();

const routes = `
const { signup, activateAccount } = require('../controllers/auth');

router.post('/signup', signup);
router.post('/email-activate', activateAccount);

module.exports = router;`.trim();

const servers = `
require("./config/db");
const authRoutes = require('./routes/auth');`.trim();


class EmailAcco extends Component {
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
              <h3>Email_Account_Verification</h3>
              <b>models/user.js</b>
              <div style={titles}>
                <PrismCode
                  code={schems}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>controllers/auth.js</b>
              <div style={titles}>
                <PrismCode
                  code={auths}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>routes/auth.js</b>
              <div style={titles}>
                <PrismCode
                  code={routes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>server.js</b>
              <div style={titles}>
                <PrismCode
                  code={servers}
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

export default (withStyles(styles)(EmailAcco));
