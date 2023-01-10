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

const ipc = `
setInterval(() => {}, 1e6);
process.on('SIGINT', () => {
    console.log('SIGINT signal received');
    process.exit(1);
})
`.trim();

const nextTick = `
const events = require('events').EventEmitter;
const emitter = new events();

const getEmitter = () => {
  process.nextTick(() => {
    emitter.emit('start');
  });
  return emitter;
}

const myEmitter = getEmitter();
myEmitter.on('start', () => {
  console.log('Started');
})
`.trim();

const timers = `
console.log("Foo: Start", new Date().toLocaleTimeString());

setTimeout(() => {
  console.log("Poo", new Date().toLocaleTimeString());
}, 5000);

const waitlogForNseconds = (seconds) => {
  const startTime = new Date().getTime();
  const milliseconds = 1000;
  const endTime = startTime + seconds * milliseconds;
  let currTime = new Date().getTime();

  while (endTime > currTime) {
    currTime = new Date().getTime();
  }
  console.log('Goo: To be called after '$'{seconds} End ', new Date().toLocaleTimeString());
};

waitlogForNseconds(10);
`.trim();

const handles = `
const args = process.argv.slice(2);

args.forEach(arg => {
let envVar = process.env[arg];
if (envVar === undefined) {
 console.error(Could not find "'$'{arg}" in environment);
} else {
 console.log(envVar);
}
});
`.trim();

const Render_HTML = `var http = require('http').createServer(onRequest);
  var fs = require('fs');
    function onRequest(request, response) {
       response.writeHead(200, { 'Content-Type': 'text/html' });
         fs.readFile('./index.html', null, ((error, data) => {
           if (error) {
               response.writeHead(404);
               response.write('File not found!');
             } 
             else {
               response.write(data);
           }
         response.end();
      })
    );
  }
  
http.listen(8000);
`.trim()

const Date_time_main = `var http = require('http').createServer(onRequest);
  var dt = require('./date_time');
    function onRequest(req, res) {
       res.writeHead(200, { 'Content-Type': 'text/html' });
       res.write("The date and time currently" + dt.myDateTime());
     res.end();
  }
  
http.listen(4000);
`.trim()


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
              <h3>1. modules</h3>
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

              <h3>2. Async-Patterns</h3>
              <div style={titles}>
                <PrismCode
                  code={patterns}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Await-Pattern</h3>
              <div style={titles}>
                <PrismCode
                  code={awaitPat}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. fs-sync</h3>
              <div style={titles}>
                <PrismCode
                  code={fSync}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. fs-async</h3>
              <div style={titles}>
                <PrismCode
                  code={fsAsync}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Http</h3>
              <div style={titles}>
                <PrismCode
                  code={http}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. EventEmitter</h3>
              <div style={titles}>
                <PrismCode
                  code={EventEmitter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Request-Event</h3>
              Emits request event subcribe to it / listen for it / respond to it.
              <div style={titles}>
                <PrismCode
                  code={requestEvent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. create Big File</h3>
              <div style={titles}>
                <PrismCode
                  code={createBigFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Streams</h3>
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

              <h3>11. http-stream</h3>
              <div style={titles}>
                <PrismCode
                  code={httpStream}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>12. What are the timing features of Node.js?</h3>
              <p>The Timers module in Node.js contains functions that execute code after a set period of time.</p>
              <ul>
                <li><b>setTimeout/ clearTimeout -</b> Can be used to schedule code execution after a designated amount of milliseconds.</li>
                <li><b>setInterval/ clearInterval -</b> Can be used to execute a block of code multiple times.</li>
                <li><b>setImmediate/ clearImmediate -</b> Will execute code at the end of the current event loop cycle.</li>
                <li><b>process.nextTick -</b> Used to schedule a callback function to be invoked in the next iteration of the Event Loop.</li>
              </ul>
              <i>On any given context process.nextTick() has higher priority over setImmediate().</i>
              <br />
              <br />
              <ul>
                <li><b>timers: </b>This phase executes callbacks scheduled by setTimeout() and setInterval().</li>
                <li><b>pending callbacks: </b>executes I/O callbacks deferred to the next loop iteration.</li>
                <li><b>idle prepare: </b>only used internally.</li>
                <li><b>poll: </b>retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.</li>
                <li><b>check: </b>setImmediate() callbacks are invoked here.</li>
                <li><b>close callbacks: </b>some close callbacks, e.g. socket.on('close', ...)</li>
                setImmediate() is processed in the Check handlers phase, while process.nextTick() is processed at the starting of the event
                loop and between each phase of the event loop.
              </ul>
              <br />

              <h3>13. ipc</h3>
              <div style={titles}>
                <PrismCode
                  code={ipc}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>14. nextTick </h3>
              This code set up a simple transaction when an instance  of
              <div style={titles}>
                <PrismCode
                  code={nextTick}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>15. Timers</h3>
              <div style={titles}>
                <PrismCode
                  code={timers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>16. Handling Undefined Input</h3>
              <div style={titles}>
                <PrismCode
                  code={handles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>node echo.js HOME PWD NOT_DEFINED</i>
              <br />

              <h3>17. Node.js on Browser</h3>
              <b> Render HTML</b>
              <div style={titles}>
                <PrismCode
                  code={Render_HTML}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>18. Date time main</h3>
              <div style={titles}>
                <PrismCode
                  code={Date_time_main}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>19. Provide some example of config file separation for dev and prod environments.</h3>
              <p>A perfect and flawless configuration setup should ensure:</p>
              <ul>
                <li>Keys can be read from file and from environment variable.</li>
                <li>Secrets are kept outside committed code.</li>
              </ul>
              <br />

              <h3>20. Explain usage of NODE_ENV .</h3>
              <p>
              NODE_ENV allows components to provide better diagnostics during development, for example by disabling
                caching or emitting verbose log statements. Setting NODE_ENV to production makes our application 3 times faster.
              </p>
              <br />

              <h3>21. Why should you separate Express 'app' and 'server'?</h3>
              <ul>
                <li>
                  Keeping the API declaration separated from the network related configuration (port, protocol, etc) allows testing the
                  API in-process, without performing network calls.
                </li>
                <li>
                  fast testing execution and getting coverage metrics of the code. It also allows deploying the same API under flexible
                  and different network conditions.
                </li>
                <li>
                  Better separation of concerns and cleaner code. API declaration.
                </li>
              </ul>
              <br />

              <h3>22. OS - Provides information about the operating system</h3>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Ejs));
