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


const bitcoin = `
//server.js
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ba = require('bitcoinaverage');

const app = express();

var publicKey = 'YOURKEYHERE';
var secretKey = 'YOURKEYHERE';
var restClient = ba.restfulClient(publicKey, secretKey);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.cryptoSelection);
  console.log(req.body.currencySelection);

  var cryptoFiat = req.body.cryptoSelection + req.body.currencySelection

  restClient.getTickerDataPerSymbol('global', req.body.cryptoSelection + req.body.currencySelection, function (response) {
    console.log(response);

    var data = JSON.parse(response);
    var currentData = data.display_timestamp;
    var price = data.last;
integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymou
    console.log(price);

    res.write("<p>The current data is " + currentData + "</p>");
    res.write("<h1>The price of " + req.body.cryptoSelection + " is " + price + " " + 
              req.body.currencySelection + "</h1>");

    res.send();

  }, function (error) {
    console.log(error);
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});

// Utility Methods
var getBitcoinURLFromSelection = function (crypto, currency) {
  return "https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto=" + crypto + "&fiat=" + currency;
}


//config.js

var config = {
  PUBLIC_KEY : 'OWVjMzEwZTk3MWQxNDU5NTljZjZhM2Q0ZWVkZDRkZDU',
  SECRET_KEY : 'ZjQ0NjljM2UwZTYzNGFlN2E3OTY5MWJmYmNmZTIyY2FiYTM5NDZlNzc0MGU0NDY0YjA1YzA2YWJjODk1NGU1Mg'
};



//index.html
<form action="/" method="post">
    <select name="cryptoSelection">
      <option value="BTC">BitCoin</option>
      <option value="ETH">Ethereum</option>
      <option value="LTH">LiteCoin</option>
    </select>

    <select name="currencySelection">
      <option value="USD">US Dollar</option>
      <option value="GBP">GB Pound</option>
      <option value="EUR">EU Euros</option>
    </select>

    <button type="submit" name="submitButton">Submit</button>
  </form>

  <script type='text/javascript' src='config.js'></script>
  <script type='text/javascript' src='index.js'></script>`.trim();

const newsletter = `
//server.js
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    'members': [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ],
  }

  var jsonData = JSON.stringify(data)

  console.log(firstName, lastName, email);

  // The API KEY BELOW HAS BEEN DISABLED ON MAILCHIMP

  var options = {
    url: 'https://us3.api.mailchimp.com/3.0/lists/c88fb2ef24',
    method: 'POST',
    headers: {
      'Authorization': "anand1 8a8caf31357e4496e62d3e3690b8797b-us3"
    },
    body: jsonData
  }

  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure.html", function (req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running");
});

// 8a8caf31357e4496e62d3e3690b8797b-us3

// ID for List/Audience:
// c88fb2ef24



//signup.html
   <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/sign-in/">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" 
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

    <link href="css/signin.css" rel="stylesheet">
  </head>

  <body class="text-center">
    <form class="form-signin" method="POST" action="/">
      <img class="mb-4" src="imgs/email-newsletter.jpeg" alt="" width="144" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Sign Up to Our Newsletter</h1>

      <input type="text" id="inputFirstName" name="fName" class="form-control top" placeholder="First 
          Name" required autofocus>
      <input type="text" id="inputLastName" name="lName" class="form-control middle" placeholder="Last Name" 
          required autofocus>
      <input type="email" id="inputEmail" name="email" class="form-control bottom" placeholder="Email address" 
          required autofocus>

      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2019</p>
    </form>
  </body>
  
  
  
  //success.html
  <div class="container">
      <h1 class="display-4">Awesome!!</h1>
      <p class="lead">You have successfully signed up to the newsletter, look forward to lots of awesome content!</p>
    </div>
    
    
  //failure.html
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" 
  integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</head>

<body>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Uh Oh!</h1>
      <p class="lead">Looks like there was an error signing up! Please try again</p>

      <form action="/failure.html" method="post">
        <button class="btn btn-large btn-warning" type="submit" name="button">Try again</button>
      </form>
    </div>`.trim();

const wikiapi = `
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  userNewUrlParser: true
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

// // GET all articles
// app.get("/articles", function(req, res){
//   Article.find(function(err, foundArticles){
//     if(!err){
//       console.log(foundArticles);
//
//       res.send(foundArticles);
//     }else{
//       res.send(err);
//     }
//   });
// });
//
// // POST a New Article
// app.post("/articles", function(req, res) {
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });
//
//   newArticle.save(function(err){
//     if(!err){
//       res.send("Successfully added a new article.");
//     } else{
//       res.send(err);
//     }
//   });
// });
//
// // DELETE All Articles
// app.delete("/articles", function(req, res){
//   Article.deleteMany(function(err){
//     if(!err){
//       res.send("Successfully deleted all articles.");
//     }else{
//       res.send(err);
//     }
//   });
// });

app.route("/articles").get(function (req, res) {
  Article.find(function (err, foundArticles) {
    if (!err) {
      console.log(foundArticles);

      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
}).post(function (req, res) {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save(function (err) {
    if (!err) {
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
}).delete(function (req, res) {
  Article.deleteMany(function (err) {
    if (!err) {
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
});

app.route("/articles/:articleTitle")

  .get(function (req, res) {
    Article.findOne({
      title: req.params.articleTitle
    }, function (err, foundArticle) {
      if (!err) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title was found");
      }
    })
  })

  .put(function (req, res) {
    Article.update({
      title: req.params.articleTitle
    }, {
      title: req.body.title,
      content: req.body.content
    }, {
      overwrite: true
    },
      function (err) {
        if (!err) {
          res.send("Successfully updated article.")
        }
      });
  })

  .patch(function (req, res) {
    Article.update({
      title: req.params.articleTitle
    }, {
      $set: req.body
    },
      function (err) {
        if (!err) {
          res.send("Successfully updated article.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .delete(function (req, res) {
    Article.deleteOne({
      title: req.params.articleTitle
    }, function (err) {
      if (!err) {
        res.send("Successfully deleted article.");
      } else {
        res.send(err);
      }
    })
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
`.trim();


class Udemy extends Component {
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
              <h3>Bitcoin-Ticker</h3>
              <div style={titles}>
                <PrismCode
                  code={bitcoin}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Newsletter-Signup</h3>
              <div style={titles}>
                <PrismCode
                  code={newsletter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Wiki-API</h3>
              <div style={titles}>
                <PrismCode
                  code={wikiapi}
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

export default (withStyles(styles)(Udemy));
