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


const Authentications = `
require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

app.use(express.static("public"));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Some Secret",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/credentials", {
  useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

// From passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  function (accessToken, refreshToken, profile, cb) {

    User.findOrCreate({
      googleId: profile.id
    }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function (req, res) {
  res.render('home');
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  }));

app.get('/auth/google/secrets',
  passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

app.get("/secrets", function (req, res) {
  User.find({ "secret": { $ne: null } }, function (err, foundUsers) {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("secrets", { usersWithSecrets: foundUsers });
      }
    }
  });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.route("/submit")
  .get(function (req, res) {
    if (req.isAuthenticated()) {
      res.render("submit");
    } else {
      res.redirect("/login");
    }
  }).post(function (req, res) {
    const submittedSecret = req.body.secret

    console.log(req.user.id);

    User.findById(req.user.id, function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.secret = submittedSecret;
          foundUser.save(function () {
            res.redirect("/secrets");
          });
        }
      }
    });
  });

app.route("/login")
  .get(function (req, res) {
    res.render('login');
  })
  .post(function (req, res) {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    req.login(user, function (err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        })
      }
    })
  });

app.route("/register")
  .get(function (req, res) {
    res.render('register');
  })
  .post(function (req, res) {

    User.register({
      username: req.body.username
    }, req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    })
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
})
`.trim();

const views = `
//views/home.ejs
<%- include('partials/header') %>


<div class="jumbotron centered">
  <div class="container">
    <i class="fas fa-key fa-6x"></i>
    <h1 class="display-3">Secrets</h1>
    <p class="lead">Don't keep your secrets, share them anonymously!</p>
    <hr>
    <a class="btn btn-light btn-lg" href="/register" role="button">Register</a>
    <a class="btn btn-dark btn-lg" href="/login" role="button">Login</a>

  </div>
</div>

<%- include('partials/footer') %>


//views/login.ejs
 <form action="/login" method="POST">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" name="username">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" name="password">
            </div>
            <button type="submit" class="btn btn-dark">Login</button>
          </form>

          
//views/register.ejs
 <form action="/register" method="POST">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" name="username">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" name="password">
            </div>
            <button type="submit" class="btn btn-dark">Register</button>
          </form>

          
//views/secret.ejs
<%- include('partials/header') %>

<div class="jumbotron text-center">
  <div class="container">
    <i class="fas fa-key fa-6x"></i>
    <h1 class="display-3">You've Discovered the Secret!</h1>

    <% usersWithSecrets.forEach(function(user){ %>
      <p class="secret-text"><%=user.secret%></p>
    <% }); %>

    <hr>
    <a class="btn btn-light btn-lg" href="/logout" role="button">Log Out</a>
    <a class="btn btn-dark btn-lg" href="/submit" role="button">Submit a Secret</a>
  </div>
</div>

<%- include('partials/footer') %>



//views/submit.ejs
<%- include('partials/header') %>

<div class="container">
  <div class="jumbotron centered">
    <i class="fas fa-key fa-6x"></i>
    <h1 class="display-3">Secrets</h1>
    <p class="secret-text">Don't keep your secrets, share them anonymously!</p>

    <form action="/submit" method="POST">

      <div class="form-group">
        <input type="text" class="form-control text-center" name="secret" placeholder="What's your secret?">
      </div>
      <button type="submit" class="btn btn-dark">Submit</button>
    </form>


  </div>
</div>
<%- include('partials/footer') %>
`.trim();

const partials = `
//views/partials/header.ejs
<head>
  <meta charset="utf-8">
  <title>Secrets</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com">
  <link rel="stylesheet" href="css/bootstrap-social.css"
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>


//views/partials/footer.ejs
</body>
</html>
`.trim();


class SignUps extends Component {
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
              <h3>Authentications</h3>
              server.js
              <div style={titles}>
                <PrismCode
                  code={Authentications}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>views</h3>
              <div style={titles}>
                <PrismCode
                  code={views}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>/views/partials</h3>
              <div style={titles}>
                <PrismCode
                  code={partials}
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

export default (withStyles(styles)(SignUps));
