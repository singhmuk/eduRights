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

const exRouter = `Const router = express.Router([options])`.trim();

const setHeaders = `fn(res, path, stat)`.trim();

const exStatics = `
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options))
`.trim();

const locals = `console.dir(app.locals.title)`.trim();

const localsCodes = `
app.locals.title = 'My App'
app.locals.strftime = require('strftime')
app.locals.email = 'me@myapp.com'
`.trim();

const appAll = `
app.all('/secret', function (req, res, next) {
  console.log('Accessing ...')
  next()                                                                // pass control to the next handler.
})

app.all('*', requireAuthentication, loadUser)                             


//Or the equivalent:
app.all('*', requireAuthentication)
app.all('*', loadUser)

app.all('/api/*', requireAuthentication)                               //Restricts paths that start with “/api”.
`.trim();

const engine = `
app.engine('pug', require('pug').__express)

app.engine('html', require('ejs').renderFile)                         //To map the EJS template engine to “.html” files.
`.trim();

const paramName = `
app.param('user', function (req, res, next, id) {
                                                        
  User.find(id, function (err, user) {                    //get user details from User model and attach to the request object
    if (err) {
      next(err)
    } else if (user) {
      req.user = user
      next()
    } else {
      next(new Error('failed to load user'))
    }
  })
})
`.trim();

const handling = `
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
`.trim();

const pathCode = `
app.use('/abcd', function (req, res, next) {                    //Match paths starting with /abcd.
  next();
});

app.use('/abc?d', function (req, res, next) {                  //Match paths starting with /abcd and /abd:
  next();
});

app.use('/ab+cd', function (req, res, next) {                 //Match paths starting with /abcd, /abbcd, /abbbbbcd, so on.
  next();
});

app.use('/ab\*cd', function (req, res, next) {                //Match paths starting /abcd, /abxcd, /abFOOcd, /abbArcd, ...
  next();
});

app.use('/a(bc)?d', function (req, res, next) {               //Match paths starting with /ad and /abcd.
  next();
});

//Regular Expression
app.use(/\/abc|\/xyz/, function (req, res, next) {            //Match paths starting with /abc and /xyz.
  next();
});

//Array
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res, next) {
  next();                                                     //Match paths /abcd, /xyza, /lmn, and /pqr.
});
`.trim();

const middlewareCode = `
//Single Middleware
app.use(function (req, res, next) {
  next();
});


//A router is valid middleware.
var router = express.Router();
router.get('/', function (req, res, next) {
  next();
});
app.use(router);


//An Express app is valid middleware.
var subApp = express();
subApp.get('/', function (req, res, next) {
  next();
});
app.use(subApp);



//Series of Middleware
//We can specify more than one middleware function at the same mount path.
var r1 = express.Router();
r1.get('/', function (req, res, next) {
  next();
});

var r2 = express.Router();
r2.get('/', function (req, res, next) {
  next();
});

app.use(r1, r2);



//Array
Use an array to group middleware logically. If you pass an array of middleware as the first or only middleware 
parameters, then you must specify the mount path.
var r1 = express.Router();
r1.get('/', function (req, res, next) {
  next();
});

var r2 = express.Router();
r2.get('/', function (req, res, next) {
  next();
});

app.use('/', [r1, r2]);



//Combination: Can combine all the above ways of mounting middleware.
function mw1(req, res, next) { next(); }
function mw2(req, res, next) { next(); }

var r1 = express.Router();
r1.get('/', function (req, res, next) { next(); });

var r2 = express.Router();
r2.get('/', function (req, res, next) { next(); });

var subApp = express();
subApp.get('/', function (req, res, next) { next(); });

app.use(mw1, [mw2, r1, r2], subApp);
`.trim();


class IntroExpress extends Component {
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
              <h3>1.How to configure middleware using ExpressJS?</h3>
              <p>
                @Express, a framework that sits on top of Node.js’s web server and makes it easier to use.Middleware and routing, two
                features of Express Request handler functions.
              </p>

              <h3>3. What is Express?</h3>
              <p>
                Express is a small framework that sits on top of Node.js’s web server functionality to simplify its APIs.
                <br />
                <ul>
                  <li>It makes easier to organize our application’s functionality with middleware and routing.</li>
                  <li>It adds helpful utilities to Node HTTP objects.</li>
                  <li>It facilitates the rendering of dynamic HTML views.</li>
                </ul>
                <br />
                The functionality is listens to a web browser’s requests. When a request comes in, this
                function will look at the request and determine how to respond.
              </p>
              <br />

              <h3>4.What Express adds to Node.js</h3>
              <p>
                <ul>
                  <li>
                    Abstracting implemented codes to handle HTTP server request/ response.</li>
                  <b>Ex. </b> Sending a single JPEG file is fairly complex in raw Node.js Express reduces it to one line.
                  <br />

                  <li>
                    Rather than one large request handler function, Express has you writing many smaller functions. Some functions are
                    executed for every request and other functions are only executed some-times.
                  </li>
                </ul>
                <br />

                <b>Express has just four major features: </b>
                <ul>
                  <li>Middleware</li>
                  <li>Routing</li>
                  <li>Subapplications</li>
                  <li>Conveniences</li>
                </ul>
              </p>

              <h3>5.HTTPS adds a secure layer to HTTP. This secure layer is called TLS (Transport Layer Security) SSL (Secure Sockets Layer).</h3>
              <p>
                Every peer has a public key that they share with every-body and a private key that they share with nobody. If I want
                to send something to you,I encrypt the message with my private key and your public key. I can then send you messages that look
                like garbage to any eaver droppers, and you decrypt them with your private key and my public key.
              </p>
              <br />

              <h3>6. Methods</h3>
              <b>express.json([options])</b>
              <p>It parses incoming requests with JSON payloads. Returns middleware
                that only parses JSON and only looks at requests where the Content-Type header matches the type
                option. This parser accepts any Unicode encoding of the body and supports automatic inflation of
                gzip and deflate encodings.</p>
              <p>A new body object containing the parsed data is populated on the request object after the
                middleware (i.e. req.body), or an empty object ({ }) if there was no body to parse, the
                Content-Type was not matched an error occurred.</p>
              <b>Options:</b>inflate(Boolean), limit, reviver(Function), strict, type, verify(Function).

              <br />
              <br />
              <b>1. express.raw([options])</b>
              <p>It parses incoming request payloads into a Buffer and is based on body-parser.</p>
              <b>Options:</b>inflate, limit, type, verify

              <br />
              <br />
              <b>2. express.Router([options])</b>
              <p>Creates a new router object.</p>
              <b>Property:</b>caseSensitive, mergeParams, strict
              <div style={titles}>
                <PrismCode
                  code={exRouter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>
                We can add middleware and HTTP method routes (get, put, post, ...) to router like an application.
              </i>
              <br />
              <br />
              <b>3. express.static(root, [options])</b>
              <p>It serves static files and is based on serve-static.</p>
              <p>
                The root argument specifies the root directory from which to serve static assets. The function
                determines the file to serve by combining req.url with the provided root directory. When a file
                is not found, instead of sending a 404 response, it instead calls next() to move on to the next
                middleware, allowing for stacking and fall-backs.
              </p>
              <b>Property:</b>dotfiles(String), etag(Boolean), extensions, fallthrough, immutable, index,
              lastModified, maxAge, redirect, setHeaders.
              <br />
              <br />
              <b>Dotfiles: </b>Possible values for this option are:
              <ul>
                <li><b>allow -</b> No special treatment for dotfiles.</li>
                <li><b>deny -</b> Deny a request for a dotfile, respond with 403, then call next().</li>
                <li><b>ignore -</b> Act as if the dotfile does not exist, respond with 404, then call next().</li>
              </ul>
              <br />
              <b>N: </b>With the default value, it will not ignore files in a directory that begins with a dot.

              <br />
              <br />
              <b>Fallthrough:</b>
              <p>
                <ul>
                  <li>When Fallthrough is true, client errors such as a bad request or a request to a non-existent file
                    will cause this middleware to simply call next() to invoke the next middleware in the stack.</li>
                  <li>When false, these errors (even 404s), will invoke next(err).</li>
                </ul>
              </p>

              <p>
                <ul>
                  <li>Set this option to true so can map multiple physical directories to the same web address or
                    for routes to fill in non-existent files.</li>
                  <li>Use false if mounted this middleware at a path designed to be strictly a single file
                    system directory, which allows for short-circuiting 404s for less overhead. This middleware will
                    also reply to all methods.</li>
                </ul>
              </p>

              <br />
              <b>4. setHeaders:</b>
              Specify a function to set custom response headers. Alterations to the headers must occur synchronously.
              <div style={titles}>
                <PrismCode
                  code={setHeaders}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />
              <b>Example of express.static</b>
              <div style={titles}>
                <PrismCode
                  code={exStatics}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />
              <b>5. express.text([options])</b>
              <p>
                It parses incoming request payloads into a string. Returns middleware
                that parses all bodies as a string and only looks at requests where the Content-Type header matches
                the type option.
              </p>
              <b>Property:</b>defaultCharset, inflate, limit, type, verify

              <br />
              <br />
              <b>6. express.urlencoded([options])</b>
              <p>
                It parses incoming requests with urlencoded payloads.
                Returns middleware that only parses urlencoded bodies and only looks at requests where the
                Content-Type header matches the type option.
              </p>
              <b>Property:</b>extended, inflate, limit, parameterLimit, type, verify.
              <br />
              <br />

              <b>The app object has methods for:</b>
              <ul>
                <li><b>Routing HTTP requests: </b>for example, app.METHOD and app.param.</li>
                <li><b>Configuring middleware: </b>app.route.</li>
                <li><b>Rendering HTML views: </b>app.render.</li>
                <li><b>Registering a template engine: </b>app.engine.</li>
              </ul>
              <br />
              <br />
              <b>7. app.locals: </b>
              Object has properties that are local variables within the application.
              <div style={titles}>
                <PrismCode
                  code={locals}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>
                Once set, the value of app.locals properties persist throughout the life of the application, in
                contrast with res.locals properties that are valid only for the lifetime of the request.
              </i>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={localsCodes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. app.all(path, callback [, callback ...]):</h3>
              app.all() use for mapping “global” logic for specific path prefixes/ arbitrary matches.
              <div style={titles}>
                <PrismCode
                  code={appAll}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>app.engine(ext, callback):</h3>
              <p>
                <ul>
                  <li>Registers the given template engine callback as ext.</li>
                  <li>By default, Express will require() the engine based on the file extension.</li>
                  <ul>
                    <li><b>Ex. </b> if you try to render a “foo.pug” file, Express invokes the following internally, and caches the require()
                      on subsequent calls to increase performance.</li>
                  </ul>
                </ul>
              </p>
              <div style={titles}>
                <PrismCode
                  code={engine}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Routing methods:</b>
              <br />
              Express supports the following routing methods corresponding to the HTTP methods of the same names:
              <ul>
                <li>Checkout</li>
                <li>copy</li>
                <li>delete</li>
                <li>get</li>
                <li>head</li>
                <li>lock</li>
                <li>merge</li>
                <li>mkactivity</li>
                <li>mkcol</li>
                <li>move</li>
                <li>m-search</li>
                <li>notify</li>
                <li>options</li>
                <li>patch</li>
                <li>post</li>
                <li>purge</li>
                <li>put</li>
                <li>report</li>
                <li>search</li>
                <li>subscribe</li>
                <li>trace</li>
                <li>unlock</li>
                <li>unsubscribe</li>
              </ul>
              <br />

              <h3>app.param([name], callback):</h3>
              <p>
                Add callback triggers to route parameters, where name is the name of the parameter or an array of
                them, and callback is the callback function. The parameters of the callback function are in order.
                <ul>
                  <li>request object</li>
                  <li>response object</li>
                  <li>next middleware</li>
                  <li>value of the parameter</li>
                  <li>name of the parameter</li>
                </ul>
              </p>

              <p>
                If name is an array, the callback trigger is registered for each parameter declared in it, in the
                order in which they are declared. Furthermore, for each declared parameter except the last one, a
                call to next inside the callback will call the callback for the next declared parameter. For the
                last parameter, a call to next will call the next middleware in place for the route currently being
                processed, just like it would if name were just a string.
              </p>
              <p>
                <b>Ex.: </b>User is present in a route path, you may map user loading logic to
                automatically provide req.user to the route, or perform validations on the parameter input.
              </p>
              <div style={titles}>
                <PrismCode
                  code={paramName}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Error-handling middleware:</h3>
              <p>
                Error-handling middleware always takes four arguments. Even if you don’t need to use the next
                object, you must specify it to maintain the signature. Otherwise, the next object will be
                interpreted as regular middleware and will fail to handle errors.
              </p>
              <div style={titles}>
                <PrismCode
                  code={handling}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Path</h3>
              <div style={titles}>
                <PrismCode
                  code={pathCode}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Middleware callback function examples:</h3>
              We can define and mount a middleware function locally.
              <div style={titles}>
                <PrismCode
                  code={middlewareCode}
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

export default (withStyles(styles)(IntroExpress));
