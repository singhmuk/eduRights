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


const appy = `
#login.html
<html>
   <body>
      <form action = "http://localhost:5000/login" method = "post">
         <p>Enter Name:</p>
         <p><input type = "text" name = "nm" /></p>
         <p><input type = "submit" value = "submit" /></p>
      </form>
   </body>
</html>


#python
from flask import Flask, redirect, url_for, request
app = Flask(__name__)

@app.route('/success/<name>')
def success(name):
   return 'welcome %s' % name

@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      user = request.form['nm']
      return redirect(url_for('success',name = user))
   else:
      user = request.args.get('nm')
      return redirect(url_for('success',name = user))

if __name__ == '__main__':
   app.run(debug = True)
`.trim();

// const appy = ``.trim();



class HttpsMethods extends Component {
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
              <h3>Https</h3>
              <ul>
                <li>By default, the Flask route responds to the GET requests. However, this preference can be altered by providing methods
                  argument to route() decorator.</li>
                <li>In order to demonstrate the use of POST method in URL routing, first let us create an HTML form and use the POST method to send
                  form data to a URL.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={appy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>http://localhost/login</i>
              <br />

              <h3>Message Flashing</h3>
              <ul>
                <li>Flashing system of Flask framework makes it possible to create a message in one view and render it in a view function
                  called next.</li>
                <li>A Flask module contains flash() method. It passes a message to the next request, which generally is a template.</li>
              </ul>
              <br />

              <b>flash(message, category)</b>
              <ul>
                <li><b>message: </b>parameter is the actual message to be flashed.</li>
                <li><b>category: </b>parameter is optional. It can be either ‘error’, ‘info’ or ‘warning’.</li>
              </ul>
              <br />
              <br />
              In order to remove message from session, template calls get_flashed_messages().
              <br />
              <b>get_flashed_messages(with_categories, category_filter)</b>
              <br />

              <h3>Extensions</h3>
              FA Flask extension is a Python module, which adds specific type of support to the Flask application.
              <br />
              Flask core functionality includes WSGI and routing based on Werkzeug and template engine based on Jinja2.
              <br />
              <br />
              Important Flask extensions.
              <ul>
                <li><b>Flask Mail: </b>Provides SMTP interface to Flask application.</li>
                <li><b>Flask WTF: </b>Adds rendering and validation of WTForms.</li>
                <li><b>Flask SQLAlchemy: </b>Adds SQLAlchemy support to Flask application.</li>
                <li><b>Flask Sijax: </b>Interface for Sijax - Python/jQuery library that makes AJAX easy to use in web applications.</li>
              </ul>
              <br />
              Flask extensions are generally named as flask-foo. To import,
              <i>from flask.ext import foo</i>
              <br />

              <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={appy}
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

export default (withStyles(styles)(HttpsMethods));
