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

const preferred = `
process.on('uncaughtException', (err) => { 
  console.log('Caught exception: '$'{err}');
});
`.trim();


const readable = `
const fs = require("fs");

var data = "";
const readerStream = fs.createReadStream("index.txt");                          //Create a readable stream
readerStream.setEncoding("UTF8");                                             //Set the encoding to be utf8.

readerStream.on("data", (chunk) => {                                 //Handle stream events --> data, end, error
  data += chunk;
});

readerStream.on("end", () => {
  console.log(data);
});

readerStream.on("error", (err) => {
  console.log(err.stack);
});
`.trim();

const writable = `
const data = "Simply Easy Learning";
const writerStream = fs.createWriteStream("output.txt");                        // Create a writable stream

writerStream.write(data, "UTF8");
writerStream.end();

writerStream.on("finish", () => {
  console.log("Write completed.");
});

writerStream.on("error", (err) => {
  console.log(err.stack);
});`.trim();

const chaningStrems = `
var zlib = require("zlib");

fs.createReadStream("input.txt")                                  //Compress the file input.txt to input.txt.gz
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("input.txt.gz"));

console.log("File Compressed.");


//2
var fs = require("fs");
var zlib = require("zlib");

fs.createReadStream("input.txt.gz")                               //Decompress the file input.txt.gz to input.txt
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream("input.txt"));

console.log("File Decompressed.");
`.trim();

const piping = `
var readerStream = fs.createReadStream("index.txt");
var writerStream = fs.createWriteStream("output.txt");

readerStream.pipe(writerStream);  // Pipe the read and write operations read input.txt and write data to output.txt
`.trim();

const argument = `
console.log(process.argv);
console.log(process.argv.slice(2));
`.trim();

const speci = `console.log(process.env["HOME"]);`.trim();

const readscli = `
const args = process.argv.slice(2);
console.log(process.env[args[0]]);
`.trim();

const multi = `
const args = process.argv.slice(2);

args.forEach(arg => {
console.log(process.env[arg]);
});
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

const globalsObj = `
var x = global                                                                  //list of global objects
x = __dirname
x = __filename
x = process.env                                                                 //Accessing Environment Variables
x = process.argv                                                                 /Arguments
x = process.argv[0]
x = process.argv.slice(2)
x = process.env["HOME"]                                                          //Secified Environment Variable


console.log(process.argv[0])
process.on('Befor exit', () => {
  console.log('Close')
})
console.log('Second codes')
`.trim();

const eventLoops = `
const events = require("events");
const eventEmitter = new events.EventEmitter();                        // Create an eventEmitter object.

const connectHandler = (connected = () => {                             // Create an event handler as follows.
  console.log("connection succesful.");
  eventEmitter.emit("data_received");                                   // Fire the data_received event.
});


eventEmitter.on("connection", connectHandler);                     // Bind the connection event with the handler.

eventEmitter.on("data_received", () => {                     // Bind data_received event with anonymous function.
  console.log("data received succesfully.");
});

eventEmitter.emit("connection");                                               // Fire the connection event.
`.trim();

const fourSourceOfTrurt = `
const fs = require('fs');
const EventEmitter = require('events').EventEmitter;
var pos = 0;
const messenger = new EventEmitter();

messenger.on("message", (msg) => {
  console.log(++pos + " MESSAGE: " + msg);
});
console.log(++pos + " FIRST");

process.nextTick(() => {
  console.log(++pos + " NEXT")
})

setTimeout(() => {
  console.log(++pos + " QUICK TIMER")
}, 0)

setImmediate(() => {
  console.log(++pos + " IMMEDIATE")
})

messenger.emit("message", "Hello!");                                            // (G) FIRST STAT.
fs.stat(__filename, () => {
  console.log(++pos + " FIRST STAT");
});

fs.stat(__filename, () => {
  console.log(++pos + " LAST STAT");
});
console.log(++pos + " LAST");
`.trim();

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

const ProcessObjects = `
const size = process.argv[2];
const totl = process.argv[3] || 100;
const buff = [];
for (var i = 0; i < totl; i++) {
    buff.push(new Buffer(size));
    process.stdout.write(process.memoryUsage().heapTotal + "nL")
}`.trim();

const setIntervals = `
const intervalId = setInterval(() => {
  console.log('Polling a data source every few seconds and pushing')
}, 100);

intervalId


//2
setTimeout(a, 1000);
setTimeout(b, 1001);

setTimeout(a, 1000);
setTimeout(b, 1000);
`.trim();

const nextTicks = `
let count = 0;
const cb = () => {
  console.log('Processing nextTick cb '$'{++count}');
  process.nextTick(cb);
};

setImmediate(() => console.log("setImmediate is called"));
setTimeout(() => console.log("setTimeout executed"), 100);

process.nextTick(cb);
console.log("Start");
`.trim();

const setImmediate = `
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));

console.log("current event loop");
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


class IntroNodeJs extends Component {
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
              <h3>1. What is Node.js?</h3>
              <p>
                Node.js is a web application framework built on Google Chrome's JavaScript Engine (V8 Engine). Node.js comes with
                runtime environment on which a Javascript based script can be interpreted and executed (byte code). This runtime
                allows to execute a JavaScript code on any machine outside a browser or on server.
                <ul>
                  <li>Node.js = Runtime Environment + JavaScript Library </li>
                </ul>
                <p><i>A common task for a web server can be to open a file on the server and return the content to the client.</i></p>
                <ul>
                  <li>Single-threaded </li>
                  <li>Non-blocking</li>
                  <li>Asynchronously programming, which is very memory efficient.</li>
                </ul>
                <br/>
                <b>Major benefits of using Node.js: </b>
                <ul>
                  <li>Fast</li>
                  <li>Asynchronous</li>
                  <li><b>Scalable: </b>Take fewer resources for the application to accept concurrent connections.</li>
                  <li>No Buffering</li>
                </ul>
              </p>
              <br />

              <h3>2. What Can Node.js Do?</h3>
              <p>
                <ul>
                  <li>Can generate dynamic page content such as create, open, read, write, delete, and close files on the server.</li>
                  <li>Can collect form data Can add, delete, modify data in our database.</li>
                </ul>
              </p>
              <br />

              <h3>3. What are the two types of API functions in Node.js?</h3>
              <ul>
                <li><b>Asynchronous, non-blocking functions: </b>Means server never waits for a API to return data. Server moves to next API after
                  calling it.</li>
                <li>Synchronous, blocking functions</li>
              </ul>
              <br />

              <h3>4. Node.js Process Model.</h3>
              Node.js runs in a single process and the application code runs in a single thread and thereby needs less resources than other platforms. All the user requests
              to your web application will be handled by a single thread and all the I/O work or long running job is performed asynchronously for a particular request.
              <br />

              <h3>5. Node.js Global Objects.</h3>
              Node.js Global Objects are the objects that are available in all modules. Global Objects are built-in objects that are part of the JavaScript and can be used
              directly in the application without importing any particular module. The Node.js Global Objects are listed below:
              <br />
              Buffer, console, process.
              And  <b>global:</b> It is a global namespace. Defining a variable within this namespace makes it globally accessible.
              <br />

              <h3>6. Nodejs Global Objects</h3>
              <ul>
                <li><b>Global Varriables: </b></li>
                <ul>
                  <li>__dirname</li>
                  <li>__filename</li>
                </ul>
                <br />
                <li><b>Global Object: </b></li>
                <ul>
                  <li><b>Process Object: </b>contains current node.js process detail & also give control over it.</li>
                  <li>P.O has an <b>on</b> where we can excuite events, related to the going process.</li>
                </ul>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={globalsObj}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>node server.js hello</i>
              <br />

              <h3>7. Multiple Environment Verriables</h3>
              <div style={titles}>
                <PrismCode
                  code={multi}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>node echo.js HOME PWD</i>
              <br />

              <h3>8. Why Node.js is single threaded?</h3>
              <p>
                Node.js uses a single threaded model in order to support async processing. With async processing, an application can
                perform better and is more scalable under web loads. Thus, Node.js makes use of a single-threaded model approach
                rather than typical thread-based implementation.
              </p>
              <br />
              <br />

              <b>Benefits of single threaded programming</b>
              <ul>
                It is very difficult to build high concurrency using the thread model, especially models in which the
                state is shared. Anticipating every way that an action taken in one thread might affect all the others is nearly
                impossible once an application grows. Entanglements and collisions multiply rapidly,
                sometimes corrupting shared memory, sometimes creating bugs nearly impossible to track down.
                <br />
                <br />
                <li>The ability to scale up quickly.</li>
                <li>Speed and Performance.</li>
                <li>Flexibility.</li>
                <li>Efficient caching.</li>
                <li>Easy Scalability for Modern Applications.</li>
              </ul>
              <br />

              <h3>9.Since the node is a single-threaded process, how to make use of all CPUs?</h3>
              <p>
                Use of node topology, node achieve internal communication
                between two nodes. This communication between the two nodes makes use of all CPUs.
              </p>
              <br />
              <br />

              <b>If Node.js is single threaded then how it handles concurrency?</b>
              <p>
                It follows the Single-Threaded with Event Loop Model.
              </p>
              <br />
              <div style={titles}>
                <PrismCode
                  code={eventLoops}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. What's the event loop?</h3>
              <ul>
                <li>
                  With the help of event loop allows Node.js to perform non-blocking I/O operations.
                </li>
                <li>
                  Every I/O requires a callback - once they are done they are pushed onto the event loop for execution.
                  When one of these
                  operations completes, the appropriate callback may be added to the poll queue to
                  eventually be executed.
                </li>
                <li>By providing callback function Node prevents blocking code.</li>
              </ul>
              <br />

              <h3>11. How you can monitor a file for modifications in Node.js ?</h3>
              <p>With the help of <b>File System watch()</b> function which watches the changes of the file.</p>
              <br />

              <h3>12. What does emitter do and what is dispatcher?</h3>
              <p>
                The emitter is one which makes communication between two nodes. When the job of the scheduler is completed in a
                program than dispatched takes the task to the desired status.
              </p>
              <br />

              <h3>13.What is REPL?</h3>
              <p>
                REPL stands for Read Eval Print Loop and it represents a computer environment like a Windows console or Unix/Linux shell where a command is entered and the system responds
                with an output in an interactive mode. Node.js comes bundled with a REPL environment. It performs the following tasks −
                <ul>
                  <li><b>Read :</b> Reads user's input, parses the input into JavaScript data-structure, and stores in memory.</li>
                  <li><b>Eval :</b>Takes and evaluates the data structure.</li>
                  <li><b>Print :</b>Prints the result.</li>
                  <li><b>Loop :</b>Loops the above command until the user presses ctrl-c twice.</li>
                </ul>
              </p>
              <br />

              <h3>14. What is a child_process module in Node.js?</h3>
              <ul>
                <li>Node.js supports the creation of child processes to help in parallel processing along with the event-driven model.</li>
                <li>The Child processes always have three streams <b>child.stdin, child.stdout, and child.stderr</b>.</li>
                <li><b>stdio: </b>stream of the parent process shares the streams of the child process. Node.js provides a <b>child_process</b>
                  module which supports following three methods to create a child process. exec – <b>child_process.exec</b> method runs a
                  command in a shell/console and buffers the output.</li>
                <li><b>spawn: </b><b>bchild_process.spawn</b> launches a new process with a given command.</li>
                <li><b>fork: </b><b>child_process.fork</b> is a case of the spawn() method to create child processes.</li>
              </ul>
              <br />

              <h3>15. Difference between the cluster and child_process modules?</h3>
              <p>
                <ul>
                  <li>Cluster is when one master programme is running two/ more nodes at a single running time. </li>
                  <li>A child process starts a new script on the system, it is quite similar to the cluster.</li>
                </ul>
              </p>
              <br />

              <h3>16. Explain what is Reactor Pattern in Node.js?</h3>
              <ul>
                <li>
                  Reactor Pattern is an idea of non-blocking I/O operations in Node.js.
                </li>
                <li>
                  This pattern provides a handler that is associated with each I/O operation. When an I/O request is generated, it is
                  submitted to a demultiplexer. This demultiplexer is a notification interface that is used to handle concurrency in
                  non-blocking I/O mode and collects every request in form of an event and queues each event in a queue.
                </li>
                <li>
                  Thus, the demultiplexer provides the Event Queue. At the same time, there is an Event Loop which iterates over the
                  items in the Event Queue. Every event has a callback function associated with it, and that callback function is
                  invoked when the Event Loop iterates.
                </li>
              </ul>
              <br />

              <h3>17. How to avoid callback hell in Node.js?</h3>
              <p>
                Node.js internally uses a single-threaded event loop to process queued events. But this approach may lead to blocking
                the entire process if there is a task running longer than expected. Node.js addresses this problem by incorporating
                callbacks. So whenever a long-running process finishes its execution, it triggers the callback associated. But
                sometimes, it could lead to complex and unreadable code. More the no. of callbacks, longer the chain of returning
                callbacks would be. With such an unprecedented complexity, it’s hard to debug the code and can cause a lot
                of time. 
                <br/>
                <br/>
                <b>To avoid callback hell by: </b>
                <ul>
                <li>modularization: break callbacks into independent functions.</li>
                <li>use Promises.</li>
                <li>use yield with Generators and/or Promises.</li>
              </ul>
              </p>
              <br />

              <h3>18. Event Loop</h3>
              <ul>
                <li>Node.js support concurrency via the concept of event and callbacks.
                  Node thread keeps an event loop and whenever a task gets completed, it fires the corresponding event for
                  function to execute.</li>
                <li>Node.js uses events heavily and couse of it Node.js is pretty fast. As soon as Node starts its server, it simply initiates its
                  variables, declares functions and then simply waits for the event to occur.</li>
                <li>In an event-driven application, there is generally a main loop that listens for events, and then triggers a callback function when one of those events is detected.</li>
              </ul>
              <br />
              <br />

              The difference between events and callbacks is.
              <ul>
                <li>callback functions are called when an asynchronous function returns its result.</li>
                <li>event handling works on the observer pattern. The functions that listen to events act as Observers. Whenever an event gets
                  fired, its listener function starts executing.</li>
              </ul>
              Node.js has multiple in-built events available through events module and EventEmitter class which are used to bind events and event-listeners.
              <br />

              <h3>19. What are the timing features of Node.js?</h3>
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
              <br />

              <b>Four Source Of Trurt</b>
              <div style={titles}>
                <PrismCode
                  code={fourSourceOfTrurt}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>ipc</b>
              <div style={titles}>
                <PrismCode
                  code={ipc}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>nextTick </b>
              This code set up a simple transaction when an instance  of
              <div style={titles}>
                <PrismCode
                  code={nextTick}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Process Objects </b>
              <ul>
                <li>it would be executed like so:</li>
                <ul><li><b>node ProcessObjects.js 1000000 100</b></li></ul>
              </ul>
              <br />

              This execution context first fetches the two command-line arguments via process. argv, builds a looping construct that
              grows memory usage depending on these arguments, and emits memory usage data as each new allocation is made. The program
              sends output to stdout, but could alternatively stream output to other processes, or even a file.
              <br />
              <br />

              - node ProcessObjects.js 1000000 100 - out.file
              <div style={titles}>
                <PrismCode
                  code={ProcessObjects}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>setInterval </b>
              Polling a data source every few seconds and pushing updates is a common pattern. Running the next step in an animation
              every few milliseconds, as is collecting garbage
              <div style={titles}>
                <PrismCode
                  code={setIntervals}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>nextTick</b>
              <div style={titles}>
                <PrismCode
                  code={nextTicks}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>setImmediate</b>
              <div style={titles}>
                <PrismCode
                  code={setImmediate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Timers</b>
              <div style={titles}>
                <PrismCode
                  code={timers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>20. What is the preferred method of resolving unhandled exceptions in Node.js?</h3>
              <p>
                Unhandled exceptions in Node.js can be caught at the Process level by attaching a handler for uncaughtException
                event.
              </p>
              <div style={titles}>
                <PrismCode
                  code={preferred}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>
                The preferred way is to add another layer between our application and the Node.js process is called
                the domain. Domains provide a way to handle multiple different I/O operations as a single group. So, by having our
                application, or part of it, running in a separate domain, we can safely handle exceptions at the domain level,
                before they reach the Process level.
              </p>
              <br />

              <h3>21. Disconnect()</h3>
              <p>
                Disconnects all workers exited After Disconnect-Returns true if a worker was exited after disconnect,
                or the kill method fork() Creates a new worker.
              </p>
              <ul>
                <li>
                  <b>from a master id - </b>A unique id for a worker isConnected - Returns true if the worker is connected to its
                  master, otherwise false.
                </li>
                <li><b>isDead - </b>Returns true if the worker's process is dead, otherwise false.</li>
                <li><b>isMaster - </b>Returns true if the current process is master, otherwise false.</li>
                <li><b>isWorker - </b>Returns true if the current process is worker, otherwise false.</li>
                <li><b>kill() - </b>Kills the current worker</li>
                <li><b>process - </b>Returns the global Child Process</li>
                <li><b>schedulingPolicy - </b>Sets or gets the schedulingPolicy</li>
                <li><b>send() - </b>sends a message to a master or a worker</li>
              </ul>
              <br />

              <h3>22. How to stop the master process without suspending all of its child processes?</h3>
              <p>
              With the help of the <b>Upstart process management system</b>, you can stop the master process without suspending all of its child processes.
              </p>
              <br />

              <h3>23. Stream</h3>
              Streams are objects that read data from a source or write data to a destination in a continuous fashion. In Node.js, there are
              four types of streams. –
              <br />
              <ul>
                <li><b>Readable : </b>Stream used for a read operation.</li>
                <li><b>Writable : </b>Stream used for a write operation.</li>
                <li><b>Duplex : </b>Stream can be used for both reading and write operation.</li>
                <li><b>Transform : </b>A type of duplex stream where the output is computed based on input.</li>
              </ul>
              <br />
              <br />
              Each type of Stream is an EventEmitter instance and throws several events at a different instance of times. Some of the commonly used events are –
              <br />
              <ul>
                <li><b>data :</b>This event is fired when there is data is available to read.</li>
                <li><b>end :</b>This event is fired when there is no more data to read.</li>
                <li><b>error :</b>This event is fired when there is an error receiving/ writing data.</li>
                <li><b>finish :</b>This event is fired when all the data has been flushed to the underlying system.</li>
              </ul>
              <i>Streaming means listening to music or watching a video in ‘real-time’, instead of downloading a file to your computer and watching it later.</i>
              <br />
              <br />

              <b>Readable Stream</b>
              <div style={titles}>
                <PrismCode
                  code={readable}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Writable Stream</b>
              <div style={titles}>
                <PrismCode
                  code={writable}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Chaning Strems</b>
              <ul>
                <li><b>Chaning Process: </b>It’s an approach to connect the output of one stream to the input of another stream,
                  thus creating a chain of multiple stream operations.</li>
                <li><b>Chaning Strems: </b>Chaining is a mechanism to connect the output of one stream to another stream and create a chain of multiple stream operations. It
                  is normally used with piping operations.</li>
              </ul>
              <br />
              input.txt has been compressed and it created a file input.txt.gz in the current directory. Now let's try to
              decompress the same file.
              <div style={titles}>
                <PrismCode
                  code={chaningStrems}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>24. Piping the Streams</h3>
              Piping is a mechanism where we provide the output of one stream as the input to another stream. It is normally used to get data
              from one stream and to pass the output of that stream to another stream. There is no limit on piping operations.
              <br />
              <div style={titles}>
                <PrismCode
                  code={piping}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>25. Server Port</h3>
              <b>100 - Information</b>
              <br />
              <ul>
                <li>
                  <b>(i) 100 Continue : </b>Only a part of the request has been received by the server, but as long as it has not been rejected,
                  the client should continue with the request.
                </li>

                <li><b>(ii) 101 Switching Protocols :</b> The server switches protocol.</li>
              </ul>
              <br />
              <br />

              <b>200 - Successful</b>
              <br />
              <ul>
                <li><b>(i) 200 OK :</b> The request is OK.</li>
                <br />

                <li><b>(ii) 201 Created :</b> The request is complete, and a new resource is created.</li>
                <br />

                <li><b>(iii) 202 Accepted :</b> The request is accepted for processing, but the processing is not complete.</li>
                <br />

                <li>
                  <b>(iv) 203 Non- authoritative Information :</b> The information in the entity header is from a local or third-party copy, not
                  from the original server.
                </li>
                <br />

                <li><b>(v) 204 No Content : </b>A status code and a header are given in the response, but there is no entity-body in the reply.</li>
                <br />

                <li><b>(vi) 205 Reset Content :</b> The browser should clear the form used for this transaction for additional input.</li>
                <br />

                <li>
                  <b>(vii) 206 Partial Content :</b> The server is returning partial data of the sizerequested. Used in response to a request
                  specifying a Range header. The server must specify the range included in the response with the Content-Range header.
                </li>
              </ul>
              <br />
              <br />

              <b>300 - Redirection</b>
              <br />
              <ul>
                <li><b>(i) 300 Multiple Choices : </b>A link list. The user can select a link and go to that location. Maximum five addresses</li>
                <br />

                <li><b>(ii) 301 Moved Permanently : </b>The requested page has moved to a new url</li>
                <br />

                <li><b>(iii) 302 Found : </b>The requested page has moved temporarily to a new url</li>
                <br />

                <li><b>(iv) 303 See Other : </b>The requested page can be found under a different url</li>
                <br />

                <li>
                  <b>(v) 304 Not Modified : </b>This is the response code to an If-ModifiedSince or If-None-Match header, where the URL has not
                  been modified since the specified date.
                </li>
                <br />

                <li><b>(vi) 305 Use Proxy : </b>The requested URL must be accessed through the proxy mentioned in the Location header</li>
                <br />

                <li><b>(vii) 306 Unused : </b>This code was used in a previous version. It is no longerused, but the code is reserved</li>
                <br />

                <li><b>(viii) 307 Temporary Redirect : </b>The requested page has moved temporarily to a new url`.trim()</li>
              </ul>
              <br />
              <br />

              <b>400 - Client Error</b>
              <br />
              <ul>
                <li><b>(i) 400 Bad Request : </b>The server did not understand the request</li>
                <br />

                <li><b>(ii) 401 Unauthorized : </b>The requested page needs a username and a password</li>
                <br />

                <li><b>(iii) 402 Payment Required : </b>You can not use this code yet</li>
                <br />

                <li><b>(iv) 403 Forbidden : </b>Access is forbidden to the requested page</li>
                <br />

                <li><b>(v) 404 Not Found : </b>The server can not find the requested page</li>
              </ul>
              <br />

              <h3>26. Handling Undefined Input</h3>
              <div style={titles}>
                <PrismCode
                  code={handles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>node echo.js HOME PWD NOT_DEFINED</i>
              <br />

              <h3>27. Node.js on Browser</h3>
              <b> Render HTML</b>
              <div style={titles}>
                <PrismCode
                  code={Render_HTML}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Date time main</b>
              <div style={titles}>
                <PrismCode
                  code={Date_time_main}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>28. What is error first callback.</h3>
              Error-First Callback in Node. js is a function which either returns an error object or any successful data returned by the function. The first argument in
              the function is reserved for the error object. If any error has occurred during the execution of the function, it will be returned by the first argument.
              <br />

              <h3>29. What is stub node js.</h3>
              <ul>
                <li>Stubs are functions or programs that affect the behavior of components or modules.</li>
                <li>Stubs are dummy objects for testing. Stubs implement a pre-programmed response.</li>
                <li>This isn’t a node.js, or a js-specific thing. Stubbing is the process of creating fake endpoints in code so that you can delay writing complex code, or to
                  isolate what you are testing.</li>
              </ul>
              <br />

              <h3>30. Difference Between Promise and Async/Await.</h3>
              <b>Promise:</b>
              <ol>
                <li>Promise is an object representing intermediate state of operation which is guaranteed to complete its execution at some point in future.</li>
                <li>Promise has 3 states – resolved, rejected and pending.</li>
                <li>If the function “fxn1” is to executed after the promise, then promise.then(fxn1) continues execution of the current function after adding the fxn1 call to
                  the callback chain.</li>
                <li>Error handling is done using .then() and .catch() methods.</li>
                <li>Promise chains can become difficult to understand sometimes.</li>
              </ol>
              <br />

              <b>Async/Await:</b>
              <ol>
                <li>Async/ Await is a syntactic sugar for promises, a wrapper making the code execute more asynchronously.</li>
                <li>It does not have any states. It returns a promise either resolved or rejected.</li>
                <li>If the function “fxn1” is to executed after await, then await X() suspends execution of the current function and then fxn1 is executed.</li>
                <li>Error handling is done using .try() and .catch() methods.</li>
                <li>Using Async/ Await makes it easier to read and understand the flow of the program as compared to promise chains.</li>
              </ol>
              <br/>

              <h3>31. Read CLArguments</h3>
              <div style={titles}>
                <PrismCode
                  code={readscli}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>node echo.js HOME</i>
              <br />

              <h3>32. Provide some example of config file separation for dev and prod environments.</h3>
              <p>A perfect and flawless configuration setup should ensure:</p>
              <ul>
                <li>Keys can be read from file and from environment variable.</li>
                <li>Secrets are kept outside committed code.</li>
              </ul>
              <br />

              <h3>33. Explain usage of NODE_ENV .</h3>
              <p>
              NODE_ENV allows components to provide better diagnostics during development, for example by disabling
                caching or emitting verbose log statements. Setting NODE_ENV to production makes our application 3 times faster.
              </p>
              <br />

              <h3>34. Why should you separate Express 'app' and 'server'?</h3>
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

              <h3>35. OS - Provides information about the operation system</h3>
            </List>
          </Paper>
        </Grid>
      </Grid >
    )
  }
}

export default (withStyles(styles)(IntroNodeJs));
