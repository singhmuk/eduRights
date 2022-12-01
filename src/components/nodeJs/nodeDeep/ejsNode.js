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


const modules = `
//names.js
const john = 'john'
const peter = 'peter'
module.exports = { john, peter }


//utils.js
const sayHi = (name) => {
  console.log('Hello there '$'{name}')
}
module.exports = sayHi


//mind-grenade.js
const num1 = 5
const num2 = 10

function addValues() {
  console.log('the sum is : '$'{num1 + num2}')
}
addValues()


//app.js
const fun=()=>{
  const names = require('./modules/04-names')
  const sayHi = require('./modules/05-utils')
  require('./modules/07-mind-grenade')
  sayHi('susan')
  sayHi(names.john)
  sayHi(names.peter)
  }
  module.exports={fun}


  //server.js
  const {fun} = require('app.js');
`.trim();

const patterns = `
const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Home Page')
  }
  if (req.url === '/about') {
    for (let i = 0; i < 1000; i++) {
      for (let j = 0; j < 1000; j++) {
        console.log('$'{i} '$'{j}')
      }
    }
    res.end('About Page')
  }
  res.end('Error Page')
})

server.listen(5000, () => console.log('Server listening on port : 5000....'))
`.trim();

const awaitPat = `
const { readFile, writeFile } = require('fs').promises

const start = async () => {
  try {
    const first = await readFile('./content/first.txt', 'utf8')
    const second = await readFile('./content/second.txt', 'utf8')
    await writeFile(
      './content/result-mind-grenade.txt',
      'THIS IS AWESOME : '$'{first} '$'{second}',
      { flag: 'a' }
    )
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}

start();`.trim();

const fSync = `
const { readFileSync, writeFileSync } = require('fs')
const first = readFileSync('./first.txt', 'utf8')
const second = readFileSync('./second.txt', 'utf8')

const fun=()=>{
    writeFileSync(
        './result-sync.txt',
        'Here is the result : '$'{first}, '$'{second}',
        { flag: 'a' }
      )
      console.log('done with this task')
      console.log('starting the next one')
}

module.exports={fun}`.trim();

const fsAsync = `
const { readFile, writeFile } = require('fs')

const fun=()=>{
readFile('./first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  const first = result
  readFile('./second.txt', 'utf8', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    const second = result
    writeFile(
      './result-async.txt',
      'Here is the result : '$'{first}, '$'{second}',
      (err, result) => {
        if (err) {
          console.log(err)
          return
        }
        console.log('done with this task')
      }
    )
  })
})
}

module.exports={fun}`.trim();

const http = `
const http = require('http')

const fun=()=>{
    const server = http.createServer((req, res) => {
          if (req.url === '/') {
            res.end('Welcome to our home page')
          }
          if (req.url === '/about') {
            res.end('Here is our short history')
          }
          res.end('
          <h1>Oops!</h1>
        <p>We can't seem to find the page you are looking for</p>
        <a href="/">back home</a>
          ')
          
        if (req.url === '/') {
          res.end('Welcome to our home page')
        } else if (req.url === '/about') {
          res.end('Here is our short history')
        } else {
          res.end('
          <h1>Oops!</h1>
          <p>We can't seem to find the page you are looking for</p>
          <a href="/">back home</a>
          ')
        }
      })
      server;
}

module.exports={fun}`.trim();

const EventEmitter = `
const EventEmitter = require('events')
const customEmitter = new EventEmitter()

customEmitter.on('response', (name, id) => {
  console.log('data recieved user '$'{name} with id:'$'{id}')
})

customEmitter.on('response', () => {
  console.log('some other logic here')
})

customEmitter.emit('response', 'john', 34)
`.trim();

const requestEvent = `
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  res.end('Welcome')
})

server.listen(5000)
`.trim();

const createBigFile = `
const { writeFileSync } = require('fs')

const fun=()=>{
    for (let i = 0; i < 10000; i++) {
        writeFileSync('./big.txt', 'hello world '$'{i}\n', { flag: 'a' })
      }
}

module.exports={fun}`.trim();

const streams = `
const { createReadStream } = require('fs')
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
const stream = createReadStream('./big.txt')


const fun=()=>{
    stream.on('data', (result) => {
        console.log(result)
      })
      stream.on('error', (err) => console.log(err))
}

module.exports={fun}`.trim();

const httpStream = `
var http = require('http')
var fs = require('fs')

const fun=()=>{
    http
    .createServer(function (req, res) {
      // const text = fs.readFileSync('./content/big.txt', 'utf8')
      // res.end(text)
      const fileStream = fs.createReadStream('./content/big.txt', 'utf8')
      fileStream.on('open', () => {
        fileStream.pipe(res)
      })
      fileStream.on('error', (err) => {
        res.end(err)
      })
    })
    .listen(5001)
}

module.exports={fun}`.trim();


class Ejs extends Component {
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
              <h3>modules</h3>
              Every file is module by default.<br/>
              Modules - Encapsulated Code (only share minimum)
              <div style={titles}>
                <PrismCode
                  code={modules}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Async-Patterns</h3>
              <div style={titles}>
                <PrismCode
                  code={patterns}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Await-Pattern</h3>
              <div style={titles}>
                <PrismCode
                  code={awaitPat}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>fs-sync</h3>
              <div style={titles}>
                <PrismCode
                  code={fSync}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <h3>fs-async</h3>
              <div style={titles}>
                <PrismCode
                  code={fsAsync}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Http</h3>
              <div style={titles}>
                <PrismCode
                  code={http}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>EventEmitter</h3>
              <div style={titles}>
                <PrismCode
                  code={EventEmitter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Request-Event</h3>
              Emits request event subcribe to it / listen for it / respond to it.
              <div style={titles}>
                <PrismCode
                  code={requestEvent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>create Big File</h3>
              <div style={titles}>
                <PrismCode
                  code={createBigFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Streams</h3>
              default 64kb<br/>
              last buffer - remainder<br/>
              highWaterMark - control size<br/>
              <div style={titles}>
                <PrismCode
                  code={streams}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>http-stream</h3>
              <div style={titles}>
                <PrismCode
                  code={httpStream}
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

export default (withStyles(styles)(Ejs));
