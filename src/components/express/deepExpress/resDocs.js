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

const headersSent = `
app.get('/', function (req, res) {
  console.dir(res.headersSent)                                                            // false
  res.send('OK')
  console.dir(res.headersSent)                                                            // true
})
`.trim();

const append = `
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
res.append('Warning', '199 Miscellaneous warning')
`.trim();

const sendFile = `
app.get('/file/:name', function (req, res, next) {
  var options = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.name
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})
`.trim();

const resType = `
res.type('.html')
// => 'text/html'

res.type('html')
// => 'text/html'

res.type('json')
// => 'application/json'

res.type('application/json')
// => 'application/json'
res.type('png')
`.trim();

const reqApp = `app.get('/viewdirectory', require('./mymiddleware.js'))`.trim();

const baseUrl = `
var greet = express.Router()

greet.get('/jp', function (req, res) {
  console.log(req.baseUrl)                                                            // greet
  res.send('Konichiwa!')
})

app.use('/greet', greet)                                                              // load the router on '/greet'
`.trim();

const reqBody = `
var express = require('express')

var app = express()

app.use(express.json())                                                               // for parsing application/json.
app.use(express.urlencoded({ extended: true }))                         // for parsing application/x-www-form-urlencoded.

app.post('/profile', function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
})`.trim();

const reqCookies = `console.dir(req.cookies.name)`.trim();

const hostname = `console.dir(req.hostname)`.trim();

class ResDocs extends Component {
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
              <h3>Response</h3>
              <p>
                The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
              </p>
              <b>res.headersSent: </b>Boolean property that indicates if the app sent HTTP headers for the response.
              <div style={titles}>
                <PrismCode
                  code={headersSent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>res.append(field [, value]):</h3>
              <p>
                Appends the specified value to the HTTP response header field. If the header is not already set,
                it creates the header with the specified value. The value parameter can be a string or an array.
              </p>
              <b>N: </b>calling res.set() after res.append() will reset the previously-set header value.
              <div style={titles}>
                <PrismCode
                  code={append}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>
                Sets the HTTP response Content-Disposition header field to “attachment”. If a filename is given,
                then it sets the Content-Type based on the extension name via res.type(), and sets the
                Content-Disposition “filename=” parameter.
              </i>
              <br />

              <h3>res.sendFile(path [, options] [, fn]):</h3>
              <p>
                Transfers the file at the given path. Sets the Content-Type response HTTP header field based on
                the filename’s extension. Unless the root option is set in the options object, path must be an
                absolute path to the file.
              </p>
              <b>Property: </b>maxAge, root, lastModified, headers, dotfiles, acceptRanges, cacheControl, immutable.
              <p>
                The method invokes the callback function fn(err) when the transfer is complete or when an error
                occurs. If the callback function is specified and an error occurs, the callback function must
                explicitly handle the response process either by ending the request-response cycle, or by passing
                control to the next route.
              </p>
              Example of using res.sendFile with all its arguments.
              <div style={titles}>
                <PrismCode
                  code={sendFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>res.type(type):</h3>
              <p>
                Sets the Content-Type HTTP header to the MIME type as determined by mime.lookup() for the
                specified type. If type contains the “/” character, then it sets the Content-Type to type.
              </p>
              <div style={titles}>
                <PrismCode
                  code={resType}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Request</h3>
              <p>
                The req object represents the HTTP request and has properties for the request query string,
                parameters, body, HTTP headers, and so on.
              </p>
              <b>req.app: </b>Property holds a reference to the instance of the Express application that is
              using the middleware.
              <div style={titles}>
                <PrismCode
                  code={reqApp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>baseUrl:</h3>
              <p>
                The URL path on which a router instance was mounted.
              </p>
              <p>
                The req.baseUrl property is similar to the mountpath property of the app object, except
                app.mountpath returns the matched path pattern(s).
              </p>
              <div style={titles}>
                <PrismCode
                  code={baseUrl}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>req.body:</h3>
              Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when
              you use body-parsing middleware such as express.json() or express.urlencoded().
              <div style={titles}>
                <PrismCode
                  code={reqBody}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>req.cookies:</h3>
              <p>
                When using cookie-parser middleware, this property is an object that contains cookies sent by the
                request. If the request contains no cookies, it defaults to { }.
              </p>
              <div style={titles}>
                <PrismCode
                  code={reqCookies}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>If the cookie has been signed, you have to use req.signedCookies.</i>
              <br />

              <h3>req.hostname:</h3>
              <p>Contains the hostname derived from the Host HTTP header.</p>
              <div style={titles}>
                <PrismCode
                  code={hostname}
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

export default (withStyles(styles)(ResDocs));
