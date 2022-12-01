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
from flask import Flask, render_template, request
import mysql.connector
  
app = Flask(__name__) #creating the Flask class object   
 
@app.route('/')   
def student():  
    return render_template('test.html'); 
    
@app.route('/result', methods=['POST', 'GET']) 
def result():
  mydb=mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="myflaskapp"
  )
  
  mycursor=mydb.cursor()
  if request.method=='POST':
    result=request.form
    title=result['title']
    mycursor.execute("select id, title, body, author, create_date from articles where title='"+title+"'")
    r=mycursor.fetchone()
    mydb.commit()
    mycursor.close()
    return render_template('index.html',r=r)
    
app.run(debug=True)
  
if __name__ =='__main__':  
    app.run(debug = True)  `.trim();

const test = `
<html>
  <body>
    <form action = "http://127.0.0.1:5000/result" method="POST">
    <p>Name <input type="text" name="title" /></p>
    <p>Name <input type="submit" value="submit" /></p>
    </form>
  </body>
</html>`.trim();

const index = `
<html>
  <body>
<form action = "http://127.0.0.1:5000/result" method="POST">
  
  <p>Id <input type="text" value="{{r[0]}}" name="id" /></p>
  <p>Title <input type="text" value="{{r[1]}}" name="title" /></p>
  <p>Body <input type="text" value="{{r[2]}}" name="body" /></p>
  <p>Author <input type="text" value="{{r[3]}}" name="author" /></p>
  <p>create_date <input type="text" value="{{r[4]}}" name="create_date" /></p>
  
  <p><input type="submit" name="submit" /></p>
  
</form>
</body>
</html>`.trim();


class LoadSearch extends Component {
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
              <h3>Load Search</h3>
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

              <b>templates/test.html</b>
              <div style={titles}>
                <PrismCode
                  code={test}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
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

export default (withStyles(styles)(LoadSearch));
