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

const loadUser = `router.all('*', requireAuthentication, loadUser)`.trim();

const paremRoutes = `
router.param('user', function (req, res, next, id) {
  User.find(id, function (err, user) {
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

const paramCallback = `
router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE')
  next()
})

router.get('/user/:id', function (req, res, next) {
  console.log('although this matches')
  next()
})

router.get('/user/:id', function (req, res) {
  console.log('and this matches too')
  res.end()
})
`.trim();

const firstParam = `
var express = require('express')
var app = express()
var router = express.Router()

router.param(function (param, option) {                                       // customizing the behavior of router.param()
  return function (req, res, next, val) {
    if (val === option) {
      next()
    } else {
      res.sendStatus(403)
    }
  }
})


router.param('id', '1337')                                                    // using the customized router.param()

router.get('/user/:id', function (req, res) {                                 // route to trigger the capture
  res.send('OK')
})

app.use(router)

app.listen(3000, function () {
  console.log('Ready')
})
`.trim();

const routerParams = `
router.param(function (param, validator) {
  return function (req, res, next, val) {
    if (validator(val)) {
      next()
    } else {
      res.sendStatus(403)
    }
  }
})

router.param('id', function (candidate) {
  return !isNaN(parseFloat(candidate)) && isFinite(candidate)
})
`.trim();

const routerVal = `
var router = express.Router()

router.param('user_id', function (req, res, next, id) {
  req.user = {
    id: id,
    name: 'TJ'
  }
  next()
})

router.route('/users/:user_id')
  .all(function (req, res, next) {
    next()
  })
  
  .get(function (req, res, next) {
    res.json(req.user)
  })
  
  .put(function (req, res, next) {
    req.user.name = req.params.name
    res.json(req.user)
  })
  
  .post(function (req, res, next) {
    next(new Error('not implemented'))
  })
  
  .delete(function (req, res, next) {
    next(new Error('not implemented'))
  })
`.trim();

const routerUse = `
var express = require('express')
var app = express()
var router = express.Router()

router.use(function (req, res, next) {                        // all requests to this router will first hit this middleware
  console.log('%s %s %s', req.method, req.url, req.path)
  next()
})

router.use('/bar', function (req, res, next) {
  // ... maybe some additional /bar logging ...
  next()
})

router.use(function (req, res, next) {
  res.send('Hello World')
})

app.use('/foo', router)

app.listen(3000)
`.trim();

const defRoutes = `
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})
`.trim();

const singleCallback = `
app.get('/example/a', function (req, res) {
  res.send('Hello from A!')
})

app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

var cb0 = function (req, res, next) {                                 //An array of callback functions can handle a route.
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])




var cb0 = function (req, res, next) {     //Combination of independent functions and arrays of functions can handle a route. 
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})
`.trim();

const appRoutes = `
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
`.trim();

const exRouters = `
var express = require('express')
var router = express.Router()


router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function (req, res) {
  res.send('Birds home page')
  
  router.get('/about', function (req, res) {
    res.send('About birds')
  })
  
  module.exports = router
  `.trim();

const middlewareRoutes = ``.trim();



class IntroAlgo extends Component {
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
              <h3>Router</h3>
              <p>Routing refers to how an application’s endpoints (URIs) respond to client requests.</p>
              <p>
                These routing methods specify a callback function called when the application receives a request
                to the specified route (endpoint) and HTTP method.
              </p>
              <p>
                In fact, the routing methods can have more than one callback function as arguments. With multiple
                callback functions, it is important to provide next as an argument to the callback function and
                then call next() within the body of the function to hand off control to the next callback.
              </p>
              <p>
                A router object is an isolated instance of middleware and routes. You can think of it as a
                “mini-application,” capable only of performing middleware and routing functions. Every Express
                application has a built-in app router.
              </p>
              <p>The top-level express object has a Router() method that creates a new router object.</p>
              <br />

              <h3>router.all(path, [callback, ...] callback):</h3>
              <p>
                This method is just like the router.METHOD() methods, except that it matches all HTTP methods (verbs).
              </p>
              <p>
                This method is extremely useful for mapping “global” logic for specific path prefixes or
                arbitrary matches. For example, if you placed the following route at the top of all other route
                definitions, it would require that all routes from that point on would require authentication,
                and automatically load a user. Keep in mind that these callbacks do not have to act as end points;
                loadUser can perform a task, then call next() to continue matching subsequent routes.
              </p>
              <div style={titles}>
                <PrismCode
                  code={loadUser}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>router.param(name, callback):</h3>
              The parameters of the callback function are:
              <ul>
                <li>req, the request object.</li>
                <li>res, the response object.</li>
                <li>next, indicating the next middleware function.</li>
                <li>The value of the name parameter.</li>
                <li>The name of the parameter.</li>
              </ul>
              <b>Unlike app.param(), router.param() does not accept an array of route parameters.</b>
              <br />
              <p>
                For example, when :user is present in a route path, you may map user loading logic to
                automatically provide req.user to the route, or perform validations on the parameter input.
              </p>
              <div style={titles}>
                <PrismCode
                  code={paremRoutes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>
                Param callback functions are local to the router on which they are defined. They are not
                inherited by mounted apps or routers. Hence, param callbacks defined on router will be triggered
                only by route parameters defined on router routes.
              </p>
              <p>
                A param callback will be called only once in a request-response cycle, even if the parameter is
                matched in multiple routes, as shown in the following examples.
              </p>
              <div style={titles}>
                <PrismCode
                  code={paramCallback}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <p>
                The behavior of the router.param(name, callback) method can be altered entirely by passing only a
                function to router.param(). This function is a custom implementation of how router.param(name,
                callback) should behave - it accepts two parameters and must return a middleware.
              </p>
              <p>
                The first parameter of this function is the name of the URL parameter that should be captured,
                the second parameter can be any JavaScript object which might be used for returning the
                middleware implementation.
              </p>
              <p>
                The middleware returned by the function decides the behavior of what happens when a URL parameter
                is captured.
              </p>
              <p>
                In this example, the router.param(name, callback) signature is modified to router.param(name,
                accessId). Instead of accepting a name and a callback, router.param() will now accept a name and
                a number.
              </p>
              <div style={titles}>
                <PrismCode
                  code={firstParam}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>
                In this example, the router.param(name, callback) signature remains the same, but instead of a
                middleware callback, a custom data type checking function has been defined to validate the data
                type of the user id.
              </i>
              <div style={titles}>
                <PrismCode
                  code={routerParams}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>router.route(path):</h3>
              <p>
                Returns an instance of a single route which you can then use to handle HTTP verbs with optional
                middleware. Use router.route() to avoid duplicate route naming and thus typing errors.
              </p>
              <div style={titles}>
                <PrismCode
                  code={routerVal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>router.use([path], [function, ...] function):</h3>
              <p>
                Uses the specified middleware function or functions, with optional mount path path, that defaults to “/”.
              </p>
              <p>
                Middleware is like a plumbing pipe: requests start at the first middleware function defined and
                work their way “down” the middleware stack processing for each path they match.
              </p>
              <div style={titles}>
                <PrismCode
                  code={routerUse}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>
                The “mount” path is stripped and is not visible to the middleware function. The main effect of
                this feature is that a mounted middleware function may operate without code changes regardless of
                its “prefix” pathname.
              </p>
              <i>
                The order in which you define middleware with router.use() is very important. They are invoked
                sequentially, thus the order defines middleware precedence.
              </i>

              <h3>Route paths:</h3>
              <p>
                Route paths, in combination with a request method, define the endpoints at which requests can be
                made. Route paths can be strings, string patterns, or regular expressions.
              </p>
              <p>
                The characters ?, +, *, and () are subsets of their regular expression counterparts. The hyphen
                (-) and the dot (.) are interpreted literally by string-based paths.
              </p>
              <p>
                If you need to use the dollar character ($) in a path string, enclose it escaped within ([ and ]).
                For example, the path string for requests at “/data/$book”, would be “/data/([\$])book”.
              </p>
              <br />

              <h3>Route parameters:</h3>
              <p>
                Route parameters are named URL segments that are used to capture the values specified at their
                position in the URL. The captured values are populated in the req.params object, with the name of
                the route parameter specified in the path as their respective keys.
              </p>
              <p>
                To define routes with route parameters, simply specify the route parameters in the path of the route
                as shown below.
              </p>
              <div style={titles}>
                <PrismCode
                  code={defRoutes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Route handlers:</h3>
              <p>
                You can provide multiple callback functions that behave like middleware to handle a request. The
                only exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks.
                You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if
                there’s no reason to proceed with the current route.
              </p>
              <p>
                Route handlers can be in the form of a function, an array of functions, or combinations of both, as shown
                in the following examples.
              </p>
              <p>A single callback function can handle a route. For example:</p>
              <div style={titles}>
                <PrismCode
                  code={singleCallback}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>app.route():</h3>
              <p>
                You can create chainable route handlers for a route path by using app.route(). Because the path
                is specified at a single location, creating modular routes is helpful, as is reducing redundancy
                and typos.
              </p>
              <div style={titles}>
                <PrismCode
                  code={appRoutes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>express.Router:</h3>
              <p>Use the express.Router class to create modular, mountable route handlers.</p>
              <p>
                A Router instance is a complete middleware and routing system; for this reason, it is often
                referred to as a “mini-app”.
              </p>
              <p>
                The following example creates a router as a module, loads a middleware function in it, defines
                some routes, and mounts the router module on a path in the main app.
                <br />
                Create a router file named birds.js in the app directory, with the following content:
              </p>
              <div style={titles}>
                <PrismCode
                  code={exRouters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Writing middleware for use in Express apps</h3>
              <p>
                Middleware functions are functions that have access to the request object (req), the response
                object (res), and the next function in the application’s request-response cycle. The next
                function is a function in the Express router which, when invoked, executes the middleware
                succeeding the current middleware.
              </p>
              Middleware functions can perform the following tasks:
              <ul>
                <li>Execute any code.</li>
                <li>Make changes to the request and the response objects.</li>
                <li>End the request-response cycle.</li>
                <li>Call the next middleware in the stack.</li>
              </ul>
              <p>
                If the current middleware function does not end the request-response cycle, it must call next()
                to pass control to the next middleware function. Otherwise, the request will be left hanging.
              </p>
              <div style={titles}>
                <PrismCode
                  code={middlewareRoutes}
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

export default (withStyles(styles)(IntroAlgo));
