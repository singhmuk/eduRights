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


const flasks = `
To check python: cmd => python --version
py -m pip install flask
flask.__version__

pip install vertualenv or py -m venv env
activate environment: (project name)env\Scripts\activate 
pip install flask
created file set to flask: set FLASK_APP=app.py
flask run
not required to run every time: set FLASK_DEBUG=1


//2
pip install vertualenv or pip install virtualenvwrapper-win
virtualenv env
.\env\Scripts/activate.ps1
pip install flask
python .\app.py

Set-ExecutionPolicy unrestricted


`.trim();

const appy = `from flask import Flask, render_template, flash, redirect, url_for, session, request, logging
#from data import Articles
from flask_mysqldb import MySQL
from wtforms import Form, StringField, TextAreaField, PasswordField, validators
from passlib.hash import sha256_crypt
from functools import wraps

app = Flask(__name__)

# Config MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'myflaskapp'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
# init MYSQL
mysql = MySQL(app)

#Articles = Articles()

# Index
@app.route('/')
def index():
    return render_template('home.html')


# About
@app.route('/about')
def about():
    return render_template('about.html')


# Articles
@app.route('/articles')
def articles():
    # Create cursor
    cur = mysql.connection.cursor()

    # Get articles
    result = cur.execute("SELECT * FROM articles")

    articles = cur.fetchall()

    if result > 0:
        return render_template('articles.html', articles=articles)
    else:
        msg = 'No Articles Found'
        return render_template('articles.html', msg=msg)
    # Close connection
    cur.close()


#Single Article
@app.route('/article/<string:id>/')
def article(id):
    # Create cursor
    cur = mysql.connection.cursor()

    # Get article
    result = cur.execute("SELECT * FROM articles WHERE id = %s", [id])

    article = cur.fetchone()

    return render_template('article.html', article=article)


# Register Form Class
class RegisterForm(Form):
    name = StringField('Name', [validators.Length(min=1, max=50)])
    username = StringField('Username', [validators.Length(min=4, max=25)])
    email = StringField('Email', [validators.Length(min=6, max=50)])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords do not match')
    ])
    confirm = PasswordField('Confirm Password')


# User Register
@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate():
        name = form.name.data
        email = form.email.data
        username = form.username.data
        password = sha256_crypt.encrypt(str(form.password.data))

        # Create cursor
        cur = mysql.connection.cursor()

        # Execute query
        cur.execute("INSERT INTO users(name, email, username, password) VALUES(%s, %s, %s, %s)", (name, email, 
                                        username, password))

        # Commit to DB
        mysql.connection.commit()

        # Close connection
        cur.close()

        flash('You are now registered and can log in', 'success')

        return redirect(url_for('login'))
    return render_template('register.html', form=form)


# User login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Get Form Fields
        username = request.form['username']
        password_candidate = request.form['password']

        # Create cursor
        cur = mysql.connection.cursor()

        # Get user by username
        result = cur.execute("SELECT * FROM users WHERE username = %s", [username])

        if result > 0:
            # Get stored hash
            data = cur.fetchone()
            password = data['password']

            # Compare Passwords
            if sha256_crypt.verify(password_candidate, password):
                # Passed
                session['logged_in'] = True
                session['username'] = username

                flash('You are now logged in', 'success')
                return redirect(url_for('dashboard'))
            else:
                error = 'Invalid login'
                return render_template('login.html', error=error)
            # Close connection
            cur.close()
        else:
            error = 'Username not found'
            return render_template('login.html', error=error)

    return render_template('login.html')

# Check if user logged in
def is_logged_in(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('Unauthorized, Please login', 'danger')
            return redirect(url_for('login'))
    return wrap

# Logout
@app.route('/logout')
@is_logged_in
def logout():
    session.clear()
    flash('You are now logged out', 'success')
    return redirect(url_for('login'))

# Dashboard
@app.route('/dashboard')
@is_logged_in
def dashboard():
    # Create cursor
    cur = mysql.connection.cursor()

    # Get articles
    #result = cur.execute("SELECT * FROM articles")
    # Show articles only from the user logged in 
    result = cur.execute("SELECT * FROM articles WHERE author = %s", [session['username']])

    articles = cur.fetchall()

    if result > 0:
        return render_template('dashboard.html', articles=articles)
    else:
        msg = 'No Articles Found'
        return render_template('dashboard.html', msg=msg)
    # Close connection
    cur.close()

# Article Form Class
class ArticleForm(Form):
    title = StringField('Title', [validators.Length(min=1, max=200)])
    body = TextAreaField('Body', [validators.Length(min=30)])

# Add Article
@app.route('/add_article', methods=['GET', 'POST'])
@is_logged_in
def add_article():
    form = ArticleForm(request.form)
    if request.method == 'POST' and form.validate():
        title = form.title.data
        body = form.body.data

        # Create Cursor
        cur = mysql.connection.cursor()

        # Execute
        cur.execute("INSERT INTO articles(title, body, author) VALUES(%s, %s, %s)",(title, body, session['username']))

        # Commit to DB
        mysql.connection.commit()

        #Close connection
        cur.close()

        flash('Article Created', 'success')

        return redirect(url_for('dashboard'))

    return render_template('add_article.html', form=form)


# Edit Article
@app.route('/edit_article/<string:id>', methods=['GET', 'POST'])
@is_logged_in
def edit_article(id):
    # Create cursor
    cur = mysql.connection.cursor()

    # Get article by id
    result = cur.execute("SELECT * FROM articles WHERE id = %s", [id])

    article = cur.fetchone()
    cur.close()
    # Get form
    form = ArticleForm(request.form)

    # Populate article form fields
    form.title.data = article['title']
    form.body.data = article['body']

    if request.method == 'POST' and form.validate():
        title = request.form['title']
        body = request.form['body']

        # Create Cursor
        cur = mysql.connection.cursor()
        app.logger.info(title)
        # Execute
        cur.execute ("UPDATE articles SET title=%s, body=%s WHERE id=%s",(title, body, id))
        # Commit to DB
        mysql.connection.commit()

        #Close connection
        cur.close()

        flash('Article Updated', 'success')

        return redirect(url_for('dashboard'))

    return render_template('edit_article.html', form=form)

# Delete Article
@app.route('/delete_article/<string:id>', methods=['POST'])
@is_logged_in
def delete_article(id):
    # Create cursor
    cur = mysql.connection.cursor()

    # Execute
    cur.execute("DELETE FROM articles WHERE id = %s", [id])

    # Commit to DB
    mysql.connection.commit()

    #Close connection
    cur.close()

    flash('Article Deleted', 'success')

    return redirect(url_for('dashboard'))

if __name__ == '__main__':
    app.secret_key='secret123'
    app.run(debug=True)
`.trim();

const about = `
{% extends 'layout.html' %}

{% block body %}
  <h1>About Us</h1>
  <p>Lorem culpa qui officia deserunt mollit anim id est laborum.</p>
{% endblock %}
`.trim();

const article = `
{% extends 'layout.html' %}

{% block body %}
  <h1>Add Article</h1>
  {% from "includes/_formhelpers.html" import render_field %}
  <form method="POST" action="">
    <div class="form-group">
      {{ render_field(form.title, class_="form-control") }}
    </div>
    <div class="form-group">
      {{ render_field(form.body, class_="form-control", id="editor") }}
    </div>
    <p><input class="btn btn-primary" type="submit" value="Submit">
  </form>
{% endblock %}
`.trim();

const articles = `
{% extends 'layout.html' %}

{% block body %}
  <h1>{{article.title}}</h1>
  <small>Written by {{article.author}} on {{article.create_date}}</small>
  <hr>
  <div>
    {{article.body | safe}}
  </div>
{% endblock %}
`.trim();

const articless = `
{% extends 'layout.html' %}

{% block body %}
  <h1>Articles</h1>
  <ul class="list-group">
    {% for article in articles %}
      <li class="list-group-item"><a href="article/{{article.id}}">{{article.title}}</a></li>
    {% endfor %}
  </ul>
{% endblock %}
`.trim();

const dashboard = `
{% extends 'layout.html' %}

{% block body %}
  <h1>Dashboard <small> Welcome {{session.username}}</small></h1>
  <a class="btn btn-success" href="/add_article"> Add Article</a>
  <hr>
  <table class="table table-striped">
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Author</th>
      <th>Date</th>
      <th></th>
      <th></th>
    </tr>
    {% for article in articles %}
      <tr>
        <td>{{article.id}}</td>
        <td>{{article.title}}</td>
        <td>{{article.author}}</td>
        <td>{{article.create_date}}</td>
        <td><a href="edit_article/{{article.id}}" class="btn btn-default pull-right">Edit</a></td>
        <td>
          <form action="{{url_for('delete_article', id=article.id)}}" method="post">
            <input type="hidden" name="_method" value="DELETE">
            <input type="submit" value="Delete" class="btn btn-danger">
          </form>
        </td>
      </tr>
    {% endfor %}
  </table>
{% endblock %}
`.trim();

const edit = `
{% extends 'layout.html' %}

{% block body %}
  <h1>Edit Article</h1>
  {% from "includes/_formhelpers.html" import render_field %}
  <form method="POST" action="">
    <div class="form-group">
      {{ render_field(form.title, class_="form-control") }}
    </div>
    <div class="form-group">
      {{ render_field(form.body, class_="form-control", id="editor") }}
    </div>
    <p><input class="btn btn-primary" type="submit" value="Submit">
  </form>
{% endblock %}
`.trim();

const home = `
{% extends 'layout.html' %}

{% block body %}
  <div class="jumbotron text-center">
    <h1>Welcome To FlaskApp</h1>
    <p class="lead">This application YouTube series</p>
    {% if session.logged_in == NULL %}
      <a href="/register" class="btn btn-primary btn-lg">Register</a>
      <a href="/login" class="btn btn-success btn-lg">Login</a>
    {% endif %}
  </div>
{% endblock %}
`.trim();

const layout = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>MyFlaskApp</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  </head>
  <body>
    {% include 'includes/_navbar.html' %}
    <div class="container">
      {% include 'includes/_messages.html' %}
      {% block body %}{% endblock %}
    </div>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="//cdn.ckeditor.com/4.6.2/basic/ckeditor.js"></script>
    <script type="text/javascript">
      CKEDITOR.replace('editor')
    </script>
  </body>
</html>
`.trim();

const login = `
{% extends 'layout.html' %}

{% block body %}
  <h1>Login</h1>
  <form action="" method="POST">
    <div class="form-group">
      <label>Username</label>
      <input type="text" name="username" class="form-control" value={{request.form.username}}>
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" name="password" class="form-control" value={{request.form.password}}>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
{% endblock %}
`.trim();

const register = `
{% extends 'layout.html' %}

{% block body %}
  <h1>Register</h1>
  {% from "includes/_formhelpers.html" import render_field %}
  <form method="POST" action="">
    <div class="form-group">
      {{render_field(form.name, class_="form-control")}}
    </div>
    <div class="form-group">
      {{render_field(form.email, class_="form-control")}}
    </div>
    <div class="form-group">
      {{render_field(form.username, class_="form-control")}}
    </div>
    <div class="form-group">
      {{render_field(form.password, class_="form-control")}}
    </div>
    <div class="form-group">
      {{render_field(form.confirm, class_="form-control")}}
    </div>
    <p><input type="submit" class="btn btn-primary" value="Submit"></p>
  </form>
{% endblock %}
`.trim();

const formhelpers = `
{% macro render_field(field) %}
  {{ field.label }}
  {{ field(**kwargs)|safe }}
  {% if field.errors %}
    {% for error in field.errors %}
      <span class="help-inline">{{ error }}</span>
    {% endfor %}
  {% endif %}
{% endmacro %}
`.trim();

const messages = `
{% with messages = get_flashed_messages(with_categories=true) %}
  {% if messages %}
    {% for category, message in messages %}
      <div class="alert alert-{{ category }}">{{ message }}</div>
    {% endfor %}
  {% endif %}
{% endwith %}

{% if error %}
  <div class="alert alert-danger">{{error}}</div>
{% endif %}

{% if msg %}
  <div class="alert alert-success">{{msg}}</div>
{% endif %}
`.trim();

const navbar = `
<nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" 
                        aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">MyFlaskApp</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/articles">Articles</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            {% if session.logged_in %}
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/logout">Logout</a></li>
            {% else %}
              <li><a href="/register">Register</a></li>
              <li><a href="/login">Login</a></li>
            {% endif %}

          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
`.trim();


class FlaskSignUp extends Component {
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
              <h3>SetUp</h3>
              <div style={titles}>
                <PrismCode
                  code={flasks}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>app.py</b>
              <div style={titles}>
                <PrismCode
                  code={appy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>templates/about.html</b>
              <div style={titles}>
                <PrismCode
                  code={about}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />


              <b>templates/add_article.html</b>
              <div style={titles}>
                <PrismCode
                  code={article}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />


              <b>templates/article.html</b>
              <div style={titles}>
                <PrismCode
                  code={articles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>templates/articles.html</b>
              <div style={titles}>
                <PrismCode
                  code={articless}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>templates/dashboard.html</b>
              <div style={titles}>
                <PrismCode
                  code={dashboard}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>templates/edit_article.html</b>
              <div style={titles}>
                <PrismCode
                  code={edit}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>templates/home.html</b>
              <div style={titles}>
                <PrismCode
                  code={home}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>templates/layout.html</b>
              <div style={titles}>
                <PrismCode
                  code={layout}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>templates/login.html</b>
              <div style={titles}>
                <PrismCode
                  code={login}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>templates/register.html</b>
              <div style={titles}>
                <PrismCode
                  code={register}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>templates/includes/_formhelpers.html</b>
              <div style={titles}>
                <PrismCode
                  code={formhelpers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>templates/includes/_messages.html</b>
              <div style={titles}>
                <PrismCode
                  code={messages}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>templates/includes/_navbar.html</b>
              <div style={titles}>
                <PrismCode
                  code={navbar}
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

export default (withStyles(styles)(FlaskSignUp));
