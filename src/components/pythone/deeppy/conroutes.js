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


const constructor = `
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
   return 'Flask'

if __name__ == '__main__':
   app.run()
`.trim();

const route = `
from flask import Flask
app = Flask(__name__)

@app.route('/home')
def hello_world():
   return 'Flask'

if __name__ == '__main__':
   app.run()
`.trim();

const templates = `
from flask import Flask
app = Flask(__name__)

def hello():
   return 'hello'
app.add_url_rule('/', 'hello', hello)
`.trim();

const possible = `
from flask import Flask
app = Flask(__name__)

@app.route('/hello/<name>')
def hello_name(name):
   return 'Hello %s!' % name

if __name__ == '__main__':
   app.run(debug = True)
`.trim();

const blog = `
from flask import Flask
app = Flask(__name__)

@app.route('/blog/<int:postID>')
def show_blog(postID):
   return 'Blog Number %d' % postID

@app.route('/rev/<float:revNo>')
def revision(revNo):
   return 'Revision Number %f' % revNo

if __name__ == '__main__':
   app.run()
`.trim();

const building = `
from flask import Flask, redirect, url_for
app = Flask(__name__)

@app.route('/admin')
def hello_admin():
   return 'Hello Admin'

@app.route('/guest/<guest>')
def hello_guest(guest):
   return 'Hello %s as Guest' % guest

@app.route('/user/<name>')
def hello_user(name):
   if name =='admin':
      return redirect(url_for('hello_admin'))
   else:
      return redirect(url_for('hello_guest',guest = name))

if __name__ == '__main__':
   app.run(debug = True)
`.trim();

const attached = `
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
   return '<html><body><h1>Hello World</h1></body></html>'

if __name__ == '__main__':
   app.run(debug = True)
`.trim();

const jinja2 = `
<!doctype html>
<html>
   <body>
      <h1>Hello {{ name }}!</h1>
   </body>
</html>


#main.py
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/hello/<user>')
def hello_name(user):
   return render_template('hello.html', name = user)

if __name__ == '__main__':
   app.run(debug = True)
`.trim();

const endpoint = `
from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
   return render_template("index.html")

if __name__ == '__main__':
   app.run(debug = True)
   

#index.html
<html>
   <head>
      <script type = "text/javascript" 
         src = "{{ url_for('static', filename = 'hello.js') }}" ></script>
   </head>
   
   <body>
      <input type = "button" onclick = "sayHello()" value = "Say Hello" />
   </body>
</html>


#index.js
function sayHello() {
  alert("Hello World")
}
`.trim();

const redirect = `
from flask import Flask, redirect, url_for, render_template, request

# Initialize the Flask application
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('log_in.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST' and request.form['username'] == 'admin':
        return redirect(url_for('success'))
    else:
        return redirect(url_for('index'))


@app.route('/success')
def success():
    return 'logged in successfully'


if __name__ == '__main__':
    app.run(debug=True)
`.trim();

class Conroures extends Component {
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
              <div style={titles}>
                <PrismCode
                  code={constructor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Flask constructor takes the name of current module (__name__) as argument.</i>
              <br />

              <h3>route() function</h3>
              The route() of the Flask class is a decorator, which tells the application which URL should call the associated function.
              <br />
              <br />
              <b>app.route(rule, options)</b>
              <ul>
                <li><b>rule: </b>Parameter represents URL binding with the function.</li>
                <li><b>options: </b>Is a list of parameters to be forwarded to the underlying Rule object.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={route}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={templates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Variable Rules</h3>
              It is possible to build a URL dynamically, by adding variable parts to the rule parameter. This variable part is marked as 'variable-name'.
              It is passed as a keyword argument to the function with which the rule is associated.
              <div style={titles}>
                <PrismCode
                  code={possible}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>127.0.0.1:5000//hello/TutorialsPoint</i>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={blog}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>http://localhost:5000/blog/11</i>
              <br />

              <h3>URL Building</h3>
              The url_for() is very useful for dynamically building a URL for a specific function. The function accepts the name of a function as
              first argument, and one or more keyword arguments, each corresponding to the variable part of URL.
              <div style={titles}>
                <PrismCode
                  code={building}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>http://localhost:5000/admin</i>
              <ul>
                <li>Script has a function user(name) which accepts a value to its argument from the URL.</li>
                <li>User() checks if an argument received matches ‘admin’ or not. If it matches, the application is redirected to the hello_admin()
                  using url_for(), otherwise to the hello_guest() passing the received argument as guest parameter to it.</li>
              </ul>
              <br />

              <h3>Templates</h3>
              It is possible to return the output of a function bound to a certain URL in the form of HTML. In the following script, hello()
              will render ‘Hello’ with <b>h1</b> tag attached to it.
              <div style={titles}>
                <PrismCode
                  code={attached}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Flask uses jinja2 template engine</h3>
              A web template contains HTML syntax interspersed placeholders for variables and expressions which are replaced values when the
              template is rendered.
              <div style={titles}>
                <PrismCode
                  code={jinja2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Static Files</h3>
              <ul>
                <li>A web application requires a static file such as a javascript/ CSS file supporting the display of a web page. Usually, the
                  web server is
                  configured to serve them for you, but during the development, these files are served from static folder in your package or next to your module
                  and it will be available at /static on the application.</li>
                <li>A special endpoint ‘static’ is used to generate URL for static files.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={endpoint}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Request Object</h3>
              Important attributes of request object are given.
              <ul>
                <li><b>Form: </b>It is a dictionary object containing key and value pairs of form parameters and their values.</li>
                <li><b>args: </b>parsed contents of query string which is part of URL after question mark (?).</li>
                <li><b>Cookies: </b>dictionary object holding Cookie names and values.</li>
                <li><b>files: </b>data pertaining to uploaded file.</li>
                <li><b>method: </b>current request method.</li>
              </ul>
              <br />

              <h3>Cookies</h3>
              A cookie is stored on a client’s computer in the form of a text file. Its purpose is to remember and track data pertaining to a
              client’s usage for better visitor experience and site statistics.
              <br />

              <h3>Sessions</h3>
              <ul>
                <li>Like Cookie, Session data is stored on client. Session is the time interval when a client logs into a server and logs out of it. The data, which
                  is needed to be held across this session, is stored in the client browser.</li>
                <li>A session with each client is assigned a Session ID. The Session data is stored on top of cookies and the server signs them cryptographically.
                  For this encryption, a Flask application needs a defined SECRET_KEY.</li>
                <li>Session object is also a dictionary object containing key-value pairs of session variables and associated values.</li>
                <br />
                <li>To release a session variable use pop() method.</li>
                <b>session.pop('username', None)</b>
              </ul>
              <br />

              <h3>Redirect & Errors</h3>
              When called, redirect() returns a response object and redirects the user to another target location with specified status code.
              <br />
              <br />
              <b>Flask.redirect(location, statuscode, response)</b>

              <br />
              <div style={titles}>
                <PrismCode
                  code={redirect}
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

export default (withStyles(styles)(Conroures));
