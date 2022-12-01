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

const weakMap = `
let owners = new WeakMap();
let task = { title: "Big Project" };
owners.set(task, 'John');

function owner(task) {
    if (owners.has(task)) {
        return console.log(owners.get(task));
    }
    console.log("No owner for this task.");
}
owner(task);                                                            // "John" 
owner({});                                                              // "No owner for this task".
`.trim();

const async = `
const add = (a, b) => {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (a < 0 || b < 0) {
              return reject('Numbers must be non-negative')
          }

          resolve(a + b)
      }, 2000)
  })
}

const doWork = async () => {
  const sum = await add(1, -99)
  const sum2 = await add(sum, 50)
  const sum3 = await add(sum2, -3)
  return sum3
}

doWork().then((result) => {
  console.log('result', result)
}).catch((e) => {
  console.log('e', e)
})`.trim();


const addNum = `
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var num = Number(req.body.num);
  var num2 = Number(req.body.num2);

  var result = num + num2;

  res.send("Sum is" + result);
});

app.listen(4000, () => console.log('server running on port 4000'));


//index.html
<head>
    <body>
      <form action="/" method="post">
        <input type="text" name="num" placeholder="num">
        <input type="text" name="num2" placeholder="num2">
        <button type="submit" name="submit">sum</button>
      </form>
    </body>
  </head>
`.trim();

const promises = `
const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("Promise 1")
  }, 2000)
})

const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    res("Promise 2")
  }, 2000)
})

const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    res("Promise 3")
  }, 2000)
})

Promise.all([p1, p2, p3]).then((prMSG) => {
  console.log(prMSG)
}).catch((err) => {
  console.log(err)
})

Promise.allSettled([p1, p2, p3]).then((prMSG) => {
  console.log(prMSG)
}).catch((err) => {
  console.log(err)
})

Promise.race([p1, p2, p3]).then((prMSG) => {
  console.log(prMSG)
}).catch((err) => {
  console.log(err)
})
`.trim();



class Tur1 extends Component {
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
              <h3>1. WeakMap</h3>
              ES6's weakMap allows the use of non-strings as keys in a HashMap:
              <div style={titles}>
                <PrismCode
                  code={weakMap}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>2. Async-Await</h3>
              <ul>
                <li>It's an easier way to deal with Promises.</li>
                <li>Promises is an easier way to deal with CB.</li>
                <li>To handle an asynchronous process, we return a Promis object from a function.</li>
                <li>By default any function without <b>return</b> statement return <b>undefined</b> in javascript.</li>
                <li>By writing async function don't need to write return statement.</li>
                <li>await make sure to wait till a Promise is settled, be resolved/ rejected.</li>
                <li>The way we write then() for handling promise, now in await we can remove than() and replace it with await.</li>
              </ul>
              server.js
              <div style={titles}>
                <PrismCode
                  code={async}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <ul>
                <li><b>promise.all(): </b>When we have multiple promises as i/p it should return a single promise after all promises are resolved,
                  then use the all() method.</li>
                <li>all() is settled with only resolve promises, so if any promise returns error then it won't work.</li>
                <br />
                <li><b>allSettled(): </b>Waits for all promises regardless of their state & returns promises at the end.</li>
                <li><b>race(): </b>Return a promise as soon as  any of the promise returns the state from the iterable list.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={promises}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Add two numbers</h3>
              <div style={titles}>
                <PrismCode
                  code={addNum}
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

export default (withStyles(styles)(Tur1));
