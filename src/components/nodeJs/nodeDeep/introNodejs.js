import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../../ReactJs/styles.css";
import Sidebar from "../sidebar";
import PrismCode from "../../ReactJs/prismCode";

const titles = { backgroundColor: "#F0F8FF", padding: "1px", fontSize: "16px" };

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
});

const preferred = `
process.on('uncaughtException', (err) => { 
  console.log('Caught exception: '$'{err}');
});
`.trim();

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

const clusters = `
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  
  console.log('Master', process.pid);             // If we're in the master process, fork workers for each CPU

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  
  cluster.on("exit", (worker, code, signal) => {      // Log when a worker exits and fork a new one to replace it
    console.log('Worker', worker.process.pid,' died');
    cluster.fork();
  });
} else {
                                // If we're in a worker process, create an HTTP server and listen on a port
  console.log('Worker', process.pid, 'started');

  http.createServer((req, res) => {
      res.writeHead(200);
      res.end("Hello");
    }).listen(5000);
}
`.trim();

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

class IntroNodeJs extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4>
              <Sidebar />
            </h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>1. What is Node.js?</h3>
              <p>
                Node.js is a web application framework built on Google Chrome's
                JavaScript Engine (V8 Engine). Node.js comes with runtime
                environment on which a Javascript based script can be
                interpreted and executed (byte code). This runtime allows to
                execute a JavaScript code on any machine outside a browser or on
                server.
                <ul>
                  <li>Node.js = Runtime Environment + JavaScript Library </li>
                </ul>
                <p>
                  <i>
                    A common task for a web server can be to open a file on the
                    server and return the content to the client.
                  </i>
                </p>
                <ul>
                  <li>Single-threaded </li>
                  <li>Non-blocking</li>
                  <li>
                    Asynchronously programming, which is very memory efficient.
                  </li>
                </ul>
                <br />
                <b>Major benefits of using Node.js: </b>
                <ul>
                  <li>Fast</li>
                  <li>Asynchronous</li>
                  <li>
                    <b>Scalable: </b>Take fewer resources for the application to
                    accept concurrent connections.
                  </li>
                  <li>No Buffering</li>
                  <li>Event Loop</li>
                </ul>
              </p>
              <br />
              <h3>2. What Can Node.js Do?</h3>
              <p>
                <ul>
                  <li>
                    Can generate dynamic page content such as create, open,
                    read, write, delete, and close files on the server.
                  </li>
                  <li>
                    Can collect form data Can add, delete, modify data in our
                    database.
                  </li>
                </ul>
              </p>
              <h3>3. What are the two types of API functions in Node.js?</h3>
              <ul>
                <li>
                  <b>Asynchronous, non-blocking functions: </b>Means server
                  never waits for a API to return data. Server moves to next API
                  after calling it.
                </li>
                <li>
                  <b>Synchronous, blocking functions: </b>
                </li>
              </ul>
              <br />
              <br />
              <b>4 different ways to create a child process in Node.js:</b>
              <br />
              <ul>
                <li>spawn() method</li>
                <li>fork() method</li>
                <li>exec() method</li>
                <li>execFile() method</li>
              </ul>
              <br />
              <h3>5. Cluster Module</h3>
              Cluster module allows to create child processes that each runs on
              their own single thread, to handle the load.
              <br />
              <br />
              <ul>
                <li>
                  Cluster is a process to handle thread execution load while
                  working with multi-core systems.
                </li>
                <li>
                  To split a single Node process into multiple processes. The
                  cluster module provides a way of creating child processes that
                  runs simultaneously and share the same server port.
                </li>
                <li>
                  But to take advantage of computers multi-core systems, the
                  Cluster module allows you to easily create child processes
                  that each runs on their own single thread, to handle the load.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={clusters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>6. Scaling node js using cluster</h3>
              <ul>
                <li>
                  Cluster manages with two methods of distributing incoming
                  connections.
                </li>
                <ul>
                  <li>
                    1. Round-robin approach, where the master process listens on
                    a port, accepts new connections and distributes them across
                    the workers in a round-robin fashion, with some built-in
                    smarts to avoid overloading a worker process.
                  </li>
                  <li>
                    2. In the master process creates the listen socket and sends
                    it to interested workers. The workers then accept incoming
                    connections directly. But the issue with that is load is not
                    evenly distributed among all the processes.
                  </li>
                </ul>
              </ul>
              <br />
              <h3>7. Node.js Process Model.</h3>
              <ul>
                <li>
                  he Node.js process model is single-threaded, event-driven, and
                  non-blocking, which means that a single thread can handle
                  multiple requests at the same time. The Node.js runtime
                  consists of a single thread, called the "event loop", which is
                  responsible for managing all incoming events and executing
                  callbacks.
                </li>
                <br />
                <li>
                  When a Node.js application is started, a process is created
                  and the event loop begins running. As incoming events are
                  received, they are placed in an event queue, and the event
                  loop executes any callbacks associated with these events.
                </li>
                <br />
                <li>
                  Node.js uses an event-driven architecture to handle I/O
                  operations. When an I/O operation is initiated, such as
                  reading from a file or making a network request, Node.js
                  registers a callback function to be executed when the
                  operation completes. The event loop continues running while
                  the I/O operation is in progress, allowing other events to be
                  processed.
                </li>
                <br />
                <li>
                  Because Node.js is single-threaded, it can only handle one
                  CPU-intensive task at a time. However, because I/O operations
                  are non-blocking, the event loop can continue to process
                  incoming events while waiting for I/O operations to complete.
                  This allows Node.js to handle a large number of concurrent
                  connections efficiently.
                </li>
                <br />
                <li>
                  To take advantage of multiple CPU cores, Node.js provides a
                  cluster module that allows a single Node.js process to spawn
                  multiple worker processes. Each worker process runs in its own
                  thread and can handle incoming requests independently. The
                  master process manages the worker processes and distributes
                  incoming requests among them.
                </li>
              </ul>
              <br />
              <br />
              <h3>8. Node.js Global Objects.</h3>
              Node.js Global Objects are the objects that are available in all
              modules. Global Objects are built-in objects that are part of the
              JavaScript and can be used directly in the application without
              importing any particular module. The Node.js Global Objects are
              listed below:
              <br />
              Buffer, console, process. And <b>global:</b> It is a global
              namespace. Defining a variable within this namespace makes it
              globally accessible.
              <br />
              <h3>9. Nodejs Global Objects</h3>
              <ul>
                <li>
                  <b>Global Varriables: </b>
                </li>
                <ul>
                  <li>__dirname</li>
                  <li>__filename</li>
                </ul>
                <br />
                <li>
                  <b>Global Object: </b>
                </li>
                <ul>
                  <li>
                    <b>Process Object: </b>contains current node.js process
                    detail & also give control over it.
                  </li>
                  <li>
                    P.O has an <b>on</b> where we can excuite events, related to
                    the going process.
                  </li>
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
              <h3>10. Multiple Environment Verriables</h3>
              <div style={titles}>
                <PrismCode
                  code={multi}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>node echo.js HOME PWD</i>
              <br />
              <h3>11. Why Node.js is single threaded?</h3>
              Node.js is single threaded for several reasons:
              <p>
                <ul>
                  <li>
                    <b>Simplicity: </b>Node.js is designed to be a lightweight
                    and easy-to-use platform for building scalable network
                    applications. By using a single thread to handle all
                    incoming requests, Node.js makes it easier for developers to
                    write and maintain their code.
                  </li>
                  <br />
                  <li>
                    <b>Performance: </b>Node.js is built on top of Google's V8
                    engine, which is designed to run JavaScript code very
                    quickly. By using a single thread, Node.js can make better
                    use of the available system resources, which can help to
                    improve overall performance.
                  </li>
                  <br />
                  <li>
                    <b>Event-driven architecture: </b>Node.js uses an
                    event-driven architecture to handle incoming requests. When
                    a new request comes in, Node.js adds it to a queue and
                    continues processing other requests. Once the request has
                    been processed, Node.js sends a response back to the client.
                    This approach allows Node.js to handle large numbers of
                    requests without using a lot of resources.
                  </li>
                  <br />
                  <li>
                    <b>Asynchronous I/O: </b>Node.js uses asynchronous I/O to
                    handle incoming requests. This means that when a request
                    comes in, Node.js doesn't wait for the request to complete
                    before moving on to the next request. Instead, it continues
                    processing other requests while waiting for the I/O
                    operation to complete. This approach allows Node.js to
                    handle many concurrent connections without blocking the
                    event loop.
                  </li>
                  <br />
                  Overall, the single-threaded nature of Node.js allows it to be
                  a lightweight, efficient, and easy-to-use platform for
                  building scalable network applications.
                </ul>
              </p>
              <b>Benefits of single threaded programming</b>
              <ul>
                It is very difficult to build high concurrency using the thread
                model, especially models in which the state is shared.
                Anticipating every way that an action taken in one thread might
                affect all the others is nearly impossible once an application
                grows. Entanglements and collisions multiply rapidly, sometimes
                corrupting shared memory, sometimes creating bugs nearly
                impossible to track down.
                <br />
                <br />
                <li>The ability to scale up quickly.</li>
                <li>Speed and Performance.</li>
                <li>Flexibility.</li>
                <li>Efficient caching.</li>
                <li>Easy Scalability for Modern Applications.</li>
              </ul>
              <br />
              <h3>
                12. Since the node is a single-threaded process, how to make use
                of all CPUs?
              </h3>
              <p>
                Although Node.js is single-threaded, it can still take advantage
                of multiple CPU cores through a technique called clustering.
                Clustering involves creating child processes to handle incoming
                requests, with each child process running on its own CPU core.
              </p>
              <br />
              <b>
                If Node.js is single threaded then how it handles concurrency?
              </b>
              <p>It follows the Single-Threaded with Event Loop Model.</p>
              <div style={titles}>
                <PrismCode
                  code={eventLoops}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>
                13. How you can monitor a file for modifications in Node.js ?
              </h3>
              <p>
                With the help of <b>File System watch()</b> function which
                watches the changes of the file.
              </p>
              <h3>14. What does emitter do and what is dispatcher?</h3>
              <p>
                <ul>
                  <li>
                    In Node.js, the term "emitter" usually refers to an object
                    that emits events. An emitter is an instance of the
                    EventEmitter class, which provides a mechanism for
                    registering and triggering events.
                  </li>
                  <br />
                  <li>
                    The EventEmitter class is one of the core modules of Node.js
                    and provides the ability to listen for and emit events in a
                    Node.js application. It enables communication between
                    different parts of an application by providing a way for one
                    part to emit an event and another part to listen for and
                    handle that event.
                  </li>
                  <br />
                  <li>
                    In some cases, the term "dispatcher" can also be used to
                    refer to an object that handles events in a Node.js
                    application. A dispatcher is responsible for receiving
                    events from emitters and routing them to the appropriate
                    handlers.
                  </li>
                  <br />
                  <li>
                    Overall, emitters and dispatchers play important roles in
                    event-driven programming in Node.js, allowing applications
                    to respond to events and provide a more interactive and
                    responsive user experience.
                  </li>
                </ul>
              </p>
              <h3>15. What is REPL?</h3>
              <p>
                <ul>
                  <li>
                    REPL stands for Read-Eval-Print-Loop. It is a built-in
                    feature of Node.js that allows developers to interact with
                    the Node.js environment in a command-line interface. With
                    REPL, you can write and execute code, test algorithms, and
                    debug applications without the need for a separate text
                    editor or IDE.
                  </li>
                  <br />
                  <li>
                    When you start a Node.js application, you can open the REPL
                    console by typing node in the command line. This will launch
                    the Node.js interpreter and provide you with a prompt where
                    you can enter JavaScript code. When you press enter, the
                    code will be evaluated, and the result will be displayed on
                    the console.
                  </li>
                  <br />
                  <li>
                    REPL is especially useful for testing small code snippets
                    and experimenting with new features. It can also be used for
                    debugging applications by allowing you to inspect variables
                    and execute functions on the fly.
                  </li>
                </ul>
              </p>
              <h3>16. What is a child_process module in Node.js?</h3>
              In Node.js, the child_process module is used to spawn a new child
              process from the parent process. This module provides a way to
              execute other programs or scripts in a separate process, allowing
              Node.js applications to take advantage of the multi-core
              processors on the computer.
              <br />
              <br />
              The child_process module has four different methods for spawning
              new processes, each with its own set of features:
              <ul>
                <li>
                  <b>spawn(): </b>This method launches a new process with a
                  specified command and arguments.
                </li>
                <br />
                <li>
                  <b>exec(): </b>This method launches a new process with a
                  specified command and runs it in a shell.
                </li>
                <br />
                <li>
                  <b>execFile(): </b>This method launches a new process with a
                  specified command and arguments, without using a shell.
                </li>
                <br />
                <li>
                  <b>fork(): </b>This method is a variation of the spawn()
                  method, specifically designed for creating child processes
                  that communicate using IPC.
                </li>
                <br />
                Once a child process is spawned, the parent process can
                communicate with it using standard input and output streams, as
                well as using message passing for more complex communication.
                The child_process module is useful for running CPU-intensive
                tasks or long-running scripts in a separate process to prevent
                blocking the main Node.js event loop.
              </ul>
              <br />
              <h3>
                17. Difference between the cluster and child_process modules?
              </h3>
              cluster and child_process modules are used for creating child
              processes, but they have different purposes and use cases:
              <p>
                <ul>
                  <li>
                    <b>child_process: </b>This module is used to create new
                    processes with the ability to communicate with the parent
                    process using standard input/output streams. It is typically
                    used to perform tasks that are CPU-intensive or blocking,
                    such as running external commands, scripts, or executables.
                    Each child process created using the child_process module
                    has its own memory space and can run in parallel with the
                    parent process.
                  </li>
                  <br />
                  <li>
                    <b>cluster: </b>Is used to create a cluster of Node.js
                    processes that can share the same port and handle incoming
                    requests in a load-balanced manner. The cluster module
                    creates multiple instances of the same application, and each
                    instance runs in a separate process, communicating with each
                    other using inter-process communication (IPC). This enables
                    the Node.js application to utilize all available CPU cores,
                    thereby improving the performance and scalability of the
                    application.
                  </li>
                  <br />
                  In summary, the child_process module is used for creating new
                  processes to perform tasks that are CPU-intensive or blocking,
                  while the cluster module is used for creating a cluster of
                  Node.js processes to improve the performance and scalability
                  of the application.
                </ul>
              </p>
              <h3>18. Explain what is Reactor Pattern in Node.js?</h3>
              <ul>
                <li>
                  The Reactor Pattern is a design pattern used in Node.js for
                  building highly scalable and efficient network applications.
                  It is based on the event-driven programming model, where the
                  application's main loop waits for events to occur and then
                  reacts to those events by invoking the appropriate callback
                  functions.
                </li>
                <br />
                <li>
                  In the Reactor Pattern, a single event loop is used to monitor
                  multiple connections or sockets for events, such as data being
                  available to read or a connection being closed. When an event
                  occurs, the event loop notifies the associated callback
                  function, which can then perform the necessary processing.
                </li>
                <br />
                <li>
                  The Reactor Pattern is used extensively in Node.js to build
                  server-side applications that require high levels of
                  concurrency and scalability, such as web servers and real-time
                  communication applications. It allows Node.js to handle large
                  numbers of connections simultaneously with low overhead,
                  making it a popular choice for building network applications.
                </li>
              </ul>
              <br />
              <h3>
                19. What is a control flow function? What are the steps does it
                execute?
              </h3>
              <p>
                Control flow function runs in between several asynchronous
                function calls.
                <ul>
                  <li>Control the order of execution. </li>
                  <li>Collect data.</li>
                  <li>Limit concurrency. </li>
                  <li>Call the next step in the program.</li>
                </ul>
              </p>
              <br />
              <h3>
                20. Explain the working mechanism of control flow function?
              </h3>
              <i>
                Control flow function is the sequence in which statements or
                functions are executed. Since I/O operations are non-blocking in
                Node.js, control flow cannot be linear. Therefore, it registers
                a callback to the event loop and passes the control back to the
                node, so that the next lines of code can run without
                interruption. <b>Ex: </b>Read File
              </i>
              <br />
              <ul>
                <li>
                  <b>fs.state(): </b>It helps to get various statistic of a
                  file.
                </li>
                <br />
                To deal with directories here are 2 methods.
                <li>
                  <b>opendir(): </b>readfile()/ writefile()
                </li>
                <li>
                  <b>opendirSync(): </b>readfileSync()/ writefileSync()
                </li>
              </ul>
              <br />
              <h3>21. Four Source Of Trurt</h3>
              <div style={titles}>
                <PrismCode
                  code={fourSourceOfTrurt}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>22. Process Objects </h3>
              <ul>
                <li>it would be executed like so:</li>
                <ul>
                  <li>
                    <b>node ProcessObjects.js 1000000 100</b>
                  </li>
                </ul>
              </ul>
              <br />
              This execution context first fetches the two command-line
              arguments via process. argv, builds a looping construct that grows
              memory usage depending on these arguments, and emits memory usage
              data as each new allocation is made. The program sends output to
              stdout, but could alternatively stream output to other processes,
              or even a file.
              <br />
              <br />- node ProcessObjects.js 1000000 100 - out.file
              <div style={titles}>
                <PrismCode
                  code={ProcessObjects}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>23. setInterval </h3>
              Polling a data source every few seconds and pushing updates is a
              common pattern. Running the next step in an animation every few
              milliseconds, as is collecting garbage
              <div style={titles}>
                <PrismCode
                  code={setIntervals}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>24. nextTick</h3>
              process.nextTick() is a method that allows you to defer the
              execution of a function until the next iteration of the event
              loop. It is a way to ensure that a function is executed as soon as
              possible, after the current code block has been executed.
              <div style={titles}>
                <PrismCode
                  code={nextTicks}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>25. setImmediate</h3>
              Is a built-in Node.js function that is used to schedule a function
              to be executed immediately after the current event loop iteration
              completes. It allows you to execute a function asynchronously,
              without blocking the event loop or waiting for any I/O operations
              to complete.
              <div style={titles}>
                <PrismCode
                  code={setImmediate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>
                26. What is the preferred method of resolving unhandled
                exceptions in Node.js?
              </h3>
              <p>
                Unhandled exceptions in Node.js can be caught at the Process
                level by attaching a handler for uncaughtException event.
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
                The preferred way is to add another layer between our
                application and the Node.js process is called the domain.
                Domains provide a way to handle multiple different I/O
                operations as a single group. So, by having our application, or
                part of it, running in a separate domain, we can safely handle
                exceptions at the domain level, before they reach the Process
                level.
              </p>
              <br />
              <h3>27. Disconnect()</h3>
              <p>
                Disconnects all workers exited After Disconnect-Returns true if
                a worker was exited after disconnect, or the kill method fork()
                Creates a new worker.
              </p>
              <ul>
                <li>
                  <b>from a master id - </b>A unique id for a worker isConnected
                  - Returns true if the worker is connected to its master,
                  otherwise false.
                </li>
                <li>
                  <b>isDead - </b>Returns true if the worker's process is dead,
                  otherwise false.
                </li>
                <li>
                  <b>isMaster - </b>Returns true if the current process is
                  master, otherwise false.
                </li>
                <li>
                  <b>isWorker - </b>Returns true if the current process is
                  worker, otherwise false.
                </li>
                <li>
                  <b>kill() - </b>Kills the current worker
                </li>
                <li>
                  <b>process - </b>Returns the global Child Process
                </li>
                <li>
                  <b>schedulingPolicy - </b>Sets or gets the schedulingPolicy
                </li>
                <li>
                  <b>send() - </b>sends a message to a master or a worker
                </li>
              </ul>
              <br />
              <h3>
                28. How to stop the master process without suspending all of its
                child processes?
              </h3>
              <p>
                With the help of the <b>Upstart process management system</b>,
                you can stop the master process without suspending all of its
                child processes.
              </p>
              <h3>29. Stream</h3>
              Streams are objects that read data from a source or write data to
              a destination in a continuous fashion. In Node.js, there are four
              types of streams. –
              <br />
              <ul>
                <li>
                  <b>Readable : </b>Stream used for a read operation.
                </li>
                <li>
                  <b>Writable : </b>Stream used for a write operation.
                </li>
                <li>
                  <b>Duplex : </b>Stream can be used for both reading and write
                  operation.
                </li>
                <li>
                  <b>Transform : </b>A type of duplex stream where the output is
                  computed based on input.
                </li>
              </ul>
              <br />
              <br />
              Each type of Stream is an EventEmitter instance and throws several
              events at a different instance of times. Some of the commonly used
              events are –
              <br />
              <ul>
                <li>
                  <b>data :</b>This event is fired when there is data is
                  available to read.
                </li>
                <li>
                  <b>end :</b>This event is fired when there is no more data to
                  read.
                </li>
                <li>
                  <b>error :</b>This event is fired when there is an error
                  receiving/ writing data.
                </li>
                <li>
                  <b>finish :</b>This event is fired when all the data has been
                  flushed to the underlying system.
                </li>
              </ul>
              <i>
                Streaming means listening to music or watching a video in
                ‘real-time’, instead of downloading a file to your computer and
                watching it later.
              </i>
              <br />
              <br />
              <b>Chaning Strems</b>
              <ul>
                <li>
                  <b>Chaning Process: </b>It’s an approach to connect the output
                  of one stream to the input of another stream, thus creating a
                  chain of multiple stream operations.
                </li>
                <li>
                  <b>Chaning Strems: </b>Chaining is a mechanism to connect the
                  output of one stream to another stream and create a chain of
                  multiple stream operations. It is normally used with piping
                  operations.
                </li>
              </ul>
              <br />
              input.txt has been compressed and it created a file input.txt.gz
              in the current directory. Now let's try to decompress the same
              file.
              <div style={titles}>
                <PrismCode
                  code={chaningStrems}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>30. Piping the Streams</h3>
              Piping is a mechanism where we provide the output of one stream as
              the input to another stream. It is normally used to get data from
              one stream and to pass the output of that stream to another
              stream. There is no limit on piping operations.
              <br />
              <div style={titles}>
                <PrismCode
                  code={piping}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>31. Server Port</h3>
              <b>100 - Information</b>
              <br />
              <ul>
                <li>
                  <b>(i) 100 Continue : </b>Only a part of the request has been
                  received by the server, but as long as it has not been
                  rejected, the client should continue with the request.
                </li>

                <li>
                  <b>(ii) 101 Switching Protocols :</b> The server switches
                  protocol.
                </li>
              </ul>
              <br />
              <br />
              <b>200 - Successful</b>
              <br />
              <ul>
                <li>
                  <b>(i) 200 OK :</b> The request is OK.
                </li>
                <br />

                <li>
                  <b>(ii) 201 Created :</b> The request is complete, and a new
                  resource is created.
                </li>
                <br />

                <li>
                  <b>(iii) 202 Accepted :</b> The request is accepted for
                  processing, but the processing is not complete.
                </li>
                <br />

                <li>
                  <b>(iv) 203 Non- authoritative Information :</b> The
                  information in the entity header is from a local or
                  third-party copy, not from the original server.
                </li>
                <br />

                <li>
                  <b>(v) 204 No Content : </b>A status code and a header are
                  given in the response, but there is no entity-body in the
                  reply.
                </li>
                <br />

                <li>
                  <b>(vi) 205 Reset Content :</b> The browser should clear the
                  form used for this transaction for additional input.
                </li>
                <br />

                <li>
                  <b>(vii) 206 Partial Content :</b> The server is returning
                  partial data of the sizerequested. Used in response to a
                  request specifying a Range header. The server must specify the
                  range included in the response with the Content-Range header.
                </li>
              </ul>
              <br />
              <br />
              <b>300 - Redirection</b>
              <br />
              <ul>
                <li>
                  <b>(i) 300 Multiple Choices : </b>A link list. The user can
                  select a link and go to that location. Maximum five addresses
                </li>
                <br />

                <li>
                  <b>(ii) 301 Moved Permanently : </b>The requested page has
                  moved to a new url
                </li>
                <br />

                <li>
                  <b>(iii) 302 Found : </b>The requested page has moved
                  temporarily to a new url
                </li>
                <br />

                <li>
                  <b>(iv) 303 See Other : </b>The requested page can be found
                  under a different url
                </li>
                <br />

                <li>
                  <b>(v) 304 Not Modified : </b>This is the response code to an
                  If-ModifiedSince or If-None-Match header, where the URL has
                  not been modified since the specified date.
                </li>
                <br />

                <li>
                  <b>(vi) 305 Use Proxy : </b>The requested URL must be accessed
                  through the proxy mentioned in the Location header
                </li>
                <br />

                <li>
                  <b>(vii) 306 Unused : </b>This code was used in a previous
                  version. It is no longerused, but the code is reserved
                </li>
                <br />

                <li>
                  <b>(viii) 307 Temporary Redirect : </b>The requested page has
                  moved temporarily to a new url`.trim()
                </li>
              </ul>
              <br />
              <br />
              <b>400 - Client Error</b>
              <br />
              <ul>
                <li>
                  <b>(i) 400 Bad Request : </b>The server did not understand the
                  request
                </li>
                <br />

                <li>
                  <b>(ii) 401 Unauthorized : </b>The requested page needs a
                  username and a password
                </li>
                <br />

                <li>
                  <b>(iii) 402 Payment Required : </b>You can not use this code
                  yet
                </li>
                <br />

                <li>
                  <b>(iv) 403 Forbidden : </b>Access is forbidden to the
                  requested page
                </li>
                <br />

                <li>
                  <b>(v) 404 Not Found : </b>The server can not find the
                  requested page
                </li>
              </ul>
              <br />
              <h3>32. What is error first callback.</h3>
              Error-First Callback in Node. js is a function which either
              returns an error object or any successful data returned by the
              function. The first argument in the function is reserved for the
              error object. If any error has occurred during the execution of
              the function, it will be returned by the first argument.
              <br />
              <h3>33. What is stub node js.</h3>
              In the context of Node.js testing, a stub is a function or a piece
              of code that replaces a real implementation of a module or a
              dependency. The purpose of using stubs is to isolate the unit
              under test and remove any external dependencies.
              <br />
              <br />
              <h3>34. Read CLArguments</h3>
              <div style={titles}>
                <PrismCode
                  code={readscli}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>node echo.js HOME</i>
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(IntroNodeJs);
