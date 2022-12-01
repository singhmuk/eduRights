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
from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL,MySQLdb #pip install flask-mysqldb https://github.com/alexferl/flask-mysqldb
 
app = Flask(__name__)
         
app.secret_key = "caircocoders-ednalan"
         
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'myflaskapp'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app) 
         
@app.route('/')
def index():
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cur.execute("SELECT DISTINCT office FROM employee ORDER BY office ASC")
    employee = cur.fetchall()  
    return render_template('index.html', employee = employee)
 
@app.route("/fetchrecords",methods=["POST","GET"])
def fetchrecords():
    cur = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    if request.method == 'POST':
        query = request.form['query']
        #print(query)
        if query == '':
            cur.execute("SELECT * FROM employee ORDER BY id DESC")
            employeelist = cur.fetchall()
            print('all list')
        else:
            search_text = request.form['query']
            print(search_text)
            cur.execute("SELECT * FROM employee WHERE office IN (%s) ORDER BY id DESC", [search_text])
            employeelist = cur.fetchall()  
    return jsonify({'htmlresponse': render_template('response.html', employeelist=employeelist)})
 
if __name__ == "__main__":
    app.run(debug=True)`.trim();

const response = `
{% for row in employeelist %}  
<tr>
    <td>{{row.name}}</td>
    <td>{{row.position}}</td>
    <td>{{row.age}}</td>
    <td>{{ "$%.2f"|format(row.salary) }}</td>
    <td>{{row.office}}</td>
</tr>
{% endfor %} `.trim();

const index = `
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Python Flask Jquery Ajax Live Data Search Select Dropdown</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <br />
            <h2 align="center">Python Flask Jquery Ajax Live Data Search Select Dropdown</h2><br />
            <select name="search_filter" id="search_filter" class="form-control">
            <option value="">Select Option</option>';
            {% for row in employee %}
                <option value="{{row.office}}">{{row.office}}</option>';    
            {% endfor %}
            </select>
            <input type="hidden" name="hidden_value" id="hidden_value" />
            <div style="clear:both"></div>
            <br />
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Age</th>
                            <th>Salary</th>
                            <th>Office</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <br />
            <br />
            <br />
        </div>
<script>
$(document).ready(function(){
    load_data();
    function load_data(query='')
    {
        $.ajax({
            url:"/fetchrecords",
            method:"POST",
            data:{query:query},
            success:function(data)
            { 
                $('tbody').html(data);
                $('tbody').append(data.htmlresponse);
            }
        })
    }
 
    $('#search_filter').change(function(){
        $('#hidden_value').val($('#search_filter').val());
        var query = $('#hidden_value').val(); 
        load_data(query);
    });
     
});
</script>
</body>
</html>`.trim();


class GetSearch extends Component {
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
              <h3>Get Search</h3>
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

              <b>templates/response.html</b>
              <div style={titles}>
                <PrismCode
                  code={response}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>templates/index.html</b>
              <div style={titles}>
                <PrismCode
                  code={index}
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

export default (withStyles(styles)(GetSearch));
