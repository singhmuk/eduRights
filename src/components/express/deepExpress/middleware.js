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

const middleware = `var app = express();
// middleware
  var stack = middleware();
  
Then you can add layers to the middleware stack by calling .use
  app.use(express.static(..));
  
// middleware
  stack.use(function(data, next) {
   next();
  });
`.trim()

const middleware_2 = `var middleware = require("../src/middleware.js");
var stack = middleware((data, next) => {
   data.foo = data.data*2;
   next();
  }, 
  
  function(data, next) {
     setTimeout(() => {
     data.async = true;
     next();
     }, 100)
    }, 
    
  function(data) {
     console.log(data);
    });
    
  stack.handle({
   "data": 42
  })`.trim()

const middleware_3 = `var stack = middleware((req, res, next) => {
  users.getAll((err, users) => {
    if (err) next(err);
    req.users = users;
    next();
    });
 }, 
 
 function(req, res, next) {
    posts.getAll((err, posts) => {
      if (err) next(err);
        req.posts = posts;
        next();
    })
 }, 
 
 function(req, res, next) {
        req.posts.forEach((post) => {
        post.user = req.users[post.userId];
      });
        res.render("blog/posts", {
        "posts": req.posts
        });
   });
   
   var app = express.createServer();
   app.get("/posts", function(req, res) {
   stack.handle(req, res);
 });
 
 
 // express
 var app = express.createServer();
 app.get("/posts", [
    function(req, res, next) {
      users.getAll(function(err, users) {
        if (err) next(err);
        req.users = users;
        next();
  });
}, 

function(req, res, next) {
  posts.getAll((err, posts) => {
      if (err) next(err);
      req.posts = posts;
      next();
    })
  }, 
  
  function(req, res, next) {
      req.posts.forEach((post) => {
      post.user = req.users[post.userId];
    });
      res.render("blog/posts", {
      "posts": req.posts
    });
  }
 ], 
 
 function(req, res) {
     stack.handle(req, res);
 });`.trim()

const Mustache = `var Mustache = require("mustache");
var result = Mustache.render("Hi, {{first}} {{last}}!", {
   first: "Nicolas",
   last: "Cage" });
  console.log(result);
`.trim()

const encoding = `var fs = require("fs");
var options = { encoding: "utf-8" };
 fs.readFile("myfile.txt", options, function(err, data) {
   if (err) {
     console.error("Error reading file!");
     return;
   }
     console.log(data.match(/x/gi).length + " letter X's");
 });
 
var fs = require("fs");
vra options = { encoding: "utf-8" };
fs.readFile("myfile.txt", options, function(err, data) { // ...});
console.log("Hello world!");`.trim()

const encoding_2 = `var express = require("express");
var http = require("http");
var app = express();

app.use((request, response, next) => {
   console.log("In comes a " + request.method + " to " + request.url);
   next();});
   
   app.use((request, response) => {
     response.writeHead(200, { "Content-Type": "text/plain" });
     response.end("Hello, world!");
   });
   
http.createServer(app).listen(3000);`.trim()

const authentication = `app.use((request, response, next) => {
  console.log("In comes a " + request.method + " to " + request.url);
  next();});
  
 app.use((request, response, next) => {
    var minute = (new Date()).getMinutes();
        if ((minute % 2) === 0) {
        next();
      } 
        else {
        response.statusCode = 403;
        response.end("Not authorized.");
    }});
    
    app.use((request, response) => {
    response.end('Secret info: the password is "swordfish"!');
  });`.trim()

const logger = `
var express = require("express");
var logger = require("morgan");
var http = require("http");
var app = express();
app.use(logger("short"));

app.use((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, world!");
  });
  
http.createServer(app).listen(3000);


EXPRESS S STATIC MIDDLEWARE
var express = require("express");
var path = require("path");
var http = require("http");
var app = express();
var publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

app.use((request, response) => {
     response.writeHead(200, { "Content-Type": "text/plain" });
     response.end("Looks like you didn't find a static file.");
  });
  
http.createServer(app).listen(3000);`.trim()

const userid = `value, you’ll look inside the params property of the request.
  app.get("/users/:userid", function(req, res) {
  var userId = parseInt(req.params.userid, 10);
   // ...
   });`.trim()

const params = `app.get(/^\/users\/(\d+)$/, function(req, res) {
  var userId = parseInt(req.params[0], 10);
  // ...
  });
 `.trim()

const horribleRegexp = `var horribleRegexp = /^([0-9a-f]{8}-[0-9a-f]{4}-➥ 4[0-9a-f]{3}-[89ab][0-9af]{3}-[0-9a-f]{12})$/i;
    app.get(horribleRegexp, function(req, res) {
     var uuid = req.params[0];
     // ...
});
`.trim()

const EVIL_IP = `var express = require("express");
var app = express();
var EVIL_IP = "123.45.67.89";

app.use((request, response, next) => {
     if (request.ip === EVIL_IP) {
     response.status(401).send("Not allowed!");
   } 
   else {
     next();
 }});
 
 // ... the rest of your app ...
`.trim()

const publicPath = `var publicPath = path.resolve(__dirname, "public");
var userUploadsPath = path.resolve(__dirname, "user_uploads");
app.use(express.static(publicPath));
app.use(express.static(userUploadsPath));
`.trim()

const uploads = `app.use("/public", express.static(publicPath));
app.use("/uploads", express.static(userUploadsPath));`.trim()

const staticFiles = `var express = require("express");
var path = require("path");
var http = require("http");
var app = express();

//Sets up the public path, using Node’s path module
var publicPath = path.resolve(__dirname, "public");

//Sends static files from the publicPath directory
app.use(express.static(publicPath));

app.use((request, response) => {
     response.writeHead(200, { "Content-Type": "text/plain" });
     response.end("Looks like you didn't find a static file.");
   });
   
http.createServer(app).listen(4000);
`.trim()

const scaffold = `var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Welcome to JavaTpoint!');
});

app.listen(8000, function () {
   console.log('Example app listening on port 8000!');
}); `.trim()

const cookies = `
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());
app.get('/cookieset', (req, res) => {
   res.cookie('cookie_name', 'cookie_value');
   res.cookie('company', 'javatpoint');
   res.cookie('name', 'sonoo');
   res.status(200).send('Cookie is set');
});

app.get('/cookieget', (req, res) => {
   res.status(200).send(req.cookies);
});

app.get('/', (req, res) => {
   res.status(200).send('Welcome to JavaTpoint!');
});

 var server = app.listen(8000, () => {
 var host = server.address().address;
 var port = server.address().port;
 console.log('Example app listening at http://%s:%s', host, port);
});`.trim()


class Middleware extends Component {
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
              <h3>How Middleware works? Where Middleware fits in API?</h3>
              <p>Middleware allows you to define a stack of actions that you should flow through. Express servers themselves
                are a stack of middlewares.</p>
              <div style={titles}>
                <PrismCode
                  code={middleware}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>A layer in the middleware stack is a function, which takes n parameters (req & res) and a next
                function.
                Middleware expects the layer to do some computation, augment the parameters and then call next.
                A stack doesn't do anything unless you handle it. Express will handle the stack every time an
                incoming HTTP request is caught on the server. With middleware you handle the stack manually.
                // express, you need to do nothing middleware
                stack.handle(someData);</i>
              <br />
              <br />
              <h3>more complex example :</h3>
              <div style={titles}>
                <PrismCode
                  code={middleware_2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>In express terms you just define a stack of operations you want express to handle for every incoming
                HTTP request.
                In terms of express (rather than connect) you have global middleware and route specific
                middleware. This means you can attach a middleware stack to every incoming HTTP requests or only
                attach it to HTTP requests that interact with a certain route.
              </i>
              <br />
              <br />
              <h3>Advanced examples of express & middleware </h3>
              <div style={titles}>
                <PrismCode
                  code={middleware_3}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>What Express is used for</h3>
              Express could be used to build any web application. It can process incoming requests and respond to
              them
              @ Middleware which is a way to break your app into smaller bits of behavior.Generally,
              middleware is called one by one, in a sequence.
              @Routing similarly breaks your app up into smaller functions that are executed when the
              user visits a particular resource.
              @Routers can further break up large applications into smaller, composable sub applications.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={Mustache}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>The two most common external resources you’ll deal with in Express are</h3>
               1.Anything involving the filesystem—Like reading and writing files from your harddrive<br />
               2.Anything involving a network—Like receiving requests, sending responses, or sending
              your own requests over the internet.
              <div style={titles}>
                <PrismCode
                  code={encoding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>middleware</h3>
              <div style={titles}>
                <PrismCode
                  code={encoding_2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>middleware can also change the request or response objects
                Adding fake authentication middleware</h3>
              <div style={titles}>
                <PrismCode
                  code={authentication}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>Third-party middleware libraries
                MORGAN LOGGING MIDDLEWARE</h3>
              <div style={titles}>
                <PrismCode
                  code={logger}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Routing</h3>
              Routing is a mapping of an HTTP verb (like GET or POST) and a URI (like/users/123).
              Routing is a way to map requests to specific handlers depending on their URL and HTTP verb.
              Simple and pattern-matching routing Using middleware with routing Serving static files with
              express.static, Express’s built-in static file middleware Using Express with Node’s built-in HTTPS
              module.
              One of Express’s big features, allowing you to map different requests to different request handler.
              The features of routing The simplest way to grab a parameter is by putting it in your route with
              a colon infront of it. To grab the
              <div style={titles}>
                <PrismCode
                  code={userid}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <p>Using regular expressions to match routes. This gives you more control over the routes you specify.
                You can also use regular expressions to match parameters.
                Let’s imagine that you want to match things like /users/123 or /users/456 but not/users/olivia. You
                can code this into a regular expression and grab the number toboot.</p>
              <div style={titles}>
                <PrismCode
                  code={params}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>This is one way to enforce the “the user ID must be an integer” constraint. it’s passed in as
                a string, so you have to convert it to a number.</i>
              <h3>@UUID-matching routes with a regexp</h3>
              <div style={titles}>
                <PrismCode
                  code={horribleRegexp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Extending request and response</i>
              Express augments the request and response objects that you’re passed in every request
              handler.
              One nicety Express offers is the redirect method.
              <h3> Using redirect:</h3>
              response.redirect("/hello/world");
              response.redirect("http://expressjs.com");
              <h3>sendFile</h3>
              response.sendFile("/path/to/cool_song.mp3");
              <h3>Let’s use some of these things to build middleware that blocks an evil IP address.</h3>
              <div style={titles}>
                <PrismCode
                  code={EVIL_IP}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Mounting static file middleware</h3>
              var photoPath = path.resolve(__dirname, "offensive-photos-folder");
              app.use("/offensive", express.static(photoPath));
              <h3>ROUTING WITH MULTIPLE STATIC FILE DIRECTORIES</h3>
              I frequently find myself with static files in multiple directories. For example, I sometimes have static
              files in a folder called public and another in a folder called user_uploads.How can you do this
              with Express?
              Express solves this problem with the built-in middleware feature, and becaus eexpress.static is
              middleware, you can just apply it multiple times.
              <div style={titles}>
                <PrismCode
                  code={publicPath}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>.Now, let’s imagine four scenarios and see how this code deals with them</h3>
              1.The user requests a resource that isn’t in the public folder or the user_uploads folder. Both static
              middleware functions will continue on to the next routes and middleware.<br />
              2.The user requests a resource that’s in the public folder. The first middleware will send the file and
              no following routes or middleware functions will be called.<br />
              3.The user requests a resource that’s in the user_uploads folder but not the public folder.The
              first
              middleware will continue on (it’s not in public), so the second middle-ware will pick it up. After that,
              no other
              middleware or route will be called.<br />
              4.The user requests a resource that’s in both the public folder and the user_uploads folder.Because
              the
              public-serving middleware is first, users will get the file in public and users will never be able to
              reach
              the matching file in the user_uploads folder.
              <h3>Serving static files from multiple directories without conflict</h3>
              <div style={titles}>
                <PrismCode
                  code={uploads}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>static Files</h3>
              <div style={titles}>
                <PrismCode
                  code={staticFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Scaffold</h3>
              npm install express-scaffold
              After this step, execute the following command to install express generator:
              npm install -g express-generator
              Now, you can use express to scaffold a web-app.
              <br />
              <div style={titles}>
                <PrismCode
                  code={scaffold}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Open Node.js command prompt, go to myapp and run npm init command
                Fill the entries and press enter.
                It will create a package.json file in myapp folder and the data is shown in JSON format.</i>
              <br />
              <br />

              <b>Cookies</b>
              <div style={titles}>
                <PrismCode
                  code={cookies}
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

export default (withStyles(styles)(Middleware));
