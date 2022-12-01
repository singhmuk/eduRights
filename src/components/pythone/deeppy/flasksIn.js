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


const defaults = `
from flask import Flask
app = Flask(__name__)
 
@app.route("/")
def index():
    return "Hello, World!"
 
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
`.trim();

const emails = `
from flask_mail import Mail, Message
from flask import Flask
 
app = Flask(__name__)
mail = Mail(app)
 
@app.route(“/mail”)
def email():
    msg = Message( “Hello Message”, sender=”admin@test.com”, recipients=[“to@test.com”])
   mail.send(msg)
`.trim();

// const emails = ``.trim();

// const emails = ``.trim();

// const emails = ``.trim();

// const emails = ``.trim();




class FlaskIns extends Component {
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
              <h3>What is Flask?</h3>
              This Framework is based on the robust foundation of Jinja2 templates engine and Werkzeug comprehensive WSGI web application library.
              <br />

              <h3>What is WSGI?</h3>
              It is a specification that describes how a web server communicates with a web application.
              <br />

              <h3>How to change default host and port in Flask?</h3>
              Flask default host and port can be changed by passing the values to host and port parameters while calling run method on the app.
              <div style={titles}>
                <PrismCode
                  code={defaults}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Which Flask extension can be used to create an Ajax application?</h3>
              <ul>
                <li>We can use Flask-Sijax to create an Ajax application.</li>
                <li>Sijax stands for Simple Ajax. Once configured and initialized, it enables the use of @flask_sijax decorator, which we can use
                  for making Ajax aware of the views in a Flask Application.</li>
              </ul>

              <br />

              <h3>How to create an Admin interface in Flask?</h3>
              We can create an Admin interface in Flask using the Flask-Admin extension. It helps in grouping individual views together in classes.
              We can use the Flask-Appbuilder extension too. Flask-Appbuilder already comes with an Admin interface.
              <br />

              <h3>How to integrate Twitter or Similar API with the Flask Application?</h3>
              To integrate with Flask, we can make use of a Flask extension called Flask-Social. It not only helps in authenticating users from
              Twitter but also other social platforms or accounts such as Facebook and Google. We need to use Flask-Social along with Flask-Security.
              <br />

              <h3>Why is Flask called a Microframework?</h3>
              Flask is called a microframework because Flask only provides core features such as request, routing, and blueprints. For other
              features, such as Caching, ORM, forms, etc., we need to make use of Flask-Extensions.
              <br />

              <h3>What are the benefits of using the Flask framework?</h3>
              <ul>
                <li>It has an inbuilt development server.</li>
                <li>It has vast third-party extensions.</li>
                <li>It has a tiny API and can be quickly learned by a web developer.</li>
                <li>It is WSGI compliant.</li>
                <li>It supports Unicode.</li>
              </ul>
              <br />

              <h3>What do you mean by template engines in the Flask framework?</h3>
              <ul>
                <li>A template is a file that contains two types of data (static and dynamic). Dynamic data in a template is populated during
                  run time. Flask makes use of Jinja2 template engine to let developers create HTML templates with placeholders for dynamic data.</li>
                <li>These placeholders can be filled during run time by using Flask’s render_template method with required parameters and values.</li>
              </ul>
              <br />

              <h3>What do you mean by Thread local object in Flask?</h3>
              <ul>
                <li>In Flask, thread-safety has been provided out of the box. We can use objects such as current_app, g, and request without
                  worrying about problems related to locking and concurrency. Moreover, we need not pass objects from methods to methods, and
                  these objects are generally available within a valid request context.</li>
                <li>This attribute of Flask makes it a bit unique and provides a lot of convenience to the Flask developers while keeping Flask
                  application thread-safe.</li>
              </ul>
              <br />

              <h3>Describe the features of Forms extension for Flask.</h3>
              <ul>
                <li>Forms in Flask can be implemented by using an extension called Flask-WTF. Flask-WTF is created by integrating Flask with
                  WTForms. WTForms is a python-based form rendering and validation library. It supports data validation, internationalization,
                  and CSRF protection.</li>
                <li>Flask-WTF also provides reCAPTCHA support along with file uploads when tied with Flask-Uploads. You also can handle JavaScript
                  requests, and customize the error response.</li>
              </ul>
              <br />

              <h3>What is the g object in Flask? How does it differ from the session object?</h3>
              Flask’s g object is used as a global namespace for holding any data during the application context. g object is not appropriate for storing
              the data between requests.
              <br />

              <h3>What is the application context in Flask?</h3>
              <ul>
                <li>The application context in Flask relates to the idea of a complete request/response cycle. It keeps a track of application-level data
                  during a request or a CLI command. We make use of g and current_app proxies to achieve the same.</li>
                <li>There are situations when it is difficult to directly import the Flask app, such as in the case of a Flask extension or a
                  Blueprint. Moreover, introducing applications may raise the problem of circular imports.</li>
                <li>Flask pushes the application context with each request. Therefore, during a request, functions have access to g and
                  current_app to overcome the problem highlighted above.</li>
              </ul>
              <br />

              <h3>In what ways can you connect to a database in Flask?</h3>
              <ul>
                <li>connect with databases, we must make use of the Flask-SQLAlchemy extension.</li>
                <li>with No-SQL data stores such as MongoDB, we can make use of the Flask-MongoEngine extension.</li>
              </ul>
              <br />

              <h3>How to create a RESTful application in Flask?</h3>
              A RESTful application can be created in Flask with extensions.
              <ul>
                <li>Flask-API</li>
                <li>Flask-RESTful</li>
                <li>Flask-RESTX</li>
                <li>Connexion</li>
              </ul>
              <br />

              <h3>What type of Applications can we create with Flask?</h3>
              With Flask, we can create almost all types of web applications. We can create Single Page Application, RESTful API based Applications, SAS
              applications, Small to medium size websites, static websites, Microservices, and serverless apps.
              <br />

              <h3>How to add the mailing feature in the Flask Application?</h3>
              <ul>
                <li>To send emails, we need to install the Flask-Mail flask extension</li>
                <b>pip install Flask-Mail</b>
                <br />
                <li>Once installed, then we need to use Flask Config API to configure MAIL-SERVER, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, etc.
                  Then we need to import Message Class, instantiate it and form a message object before sending the email by using the mail.send() method.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={emails}
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

export default (withStyles(styles)(FlaskIns));
