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
                  <li>Event Loop</li>
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

              <h3>3. What are the two types of API functions in Node.js?</h3>
              <ul>
                <li><b>Asynchronous, non-blocking functions: </b>Means server never waits for a API to return data. Server moves to next API after
                  calling it.</li>
                <li><b>Synchronous, blocking functions: </b></li>
              </ul>
              <br />
              <br />

              <b>4 different ways to create a child process in Node.js:</b>
              <br/>
              <ul>
                <li>spawn() method</li>
                <li>fork() method</li>
                <li>exec() method</li>
                <li>execFile() method</li>
              </ul>
              <br />

              <h3>5. Cluster Module</h3>
              Cluster module allows to create child processes that each runs on their own single thread, to handle the load.
              <br />
              <br />
              <ul>
                <li>
                  Cluster is a process to handle thread execution load while working with multi-core systems.
                </li>
                <li>
                  To split a single Node process into multiple processes. The cluster module provides a way of creating child processes
                  that runs simultaneously and share the same server port.
                </li>
                <li>
                  But to take advantage of computers multi-core systems, the Cluster module allows you to easily create child processes
                  that each runs on their own single thread, to handle the load.
                </li>
              </ul>
              <br />

              <h3>6. Scaling node js using cluster</h3>
              <ul>
                <li>Cluster manages with two methods of distributing incoming connections.</li>
                <ul>
                  <li>1. Round-robin approach, where the master process listens on a port, accepts new connections and distributes them across the workers in a round-robin fashion, with some built-in smarts to avoid overloading a worker process.</li>
                  <li>2. In the master process creates the listen socket and sends it to interested workers. The workers then accept incoming connections directly. But the issue with that is load is not evenly distributed among all the processes.</li>
                </ul>
              </ul>
              <br />

              <h3>7. Node.js Process Model.</h3>
              Node.js runs in a single process and the application code runs in a single thread and thereby needs less resources than other platforms. All the user requests
              to our web application will be handled by a single thread and all the I/O work or long running job is performed asynchronously for a particular request.
              <br />

              <h3>8. Node.js Global Objects.</h3>
              Node.js Global Objects are the objects that are available in all modules. Global Objects are built-in objects that are part of the JavaScript and can be used
              directly in the application without importing any particular module. The Node.js Global Objects are listed below:
              <br />
              Buffer, console, process.
              And  <b>global:</b> It is a global namespace. Defining a variable within this namespace makes it globally accessible.
              <br />

              <h3>9. Nodejs Global Objects</h3>
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
              <p>
                Node.js uses a single threaded model in order to support async processing. With async processing, an application can
                perform better and is more scalable under web loads. Thus, Node.js makes use of a single-threaded model approach
                rather than typical thread-based implementation.
              </p>

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

              <h3>12. Since the node is a single-threaded process, how to make use of all CPUs?</h3>
              <p>
                Use of node topology, node achieve internal communication
                between two nodes. This communication between the two nodes makes use of all CPUs.
              </p>
              <br />

              <b>If Node.js is single threaded then how it handles concurrency?</b>
              <p>
                It follows the Single-Threaded with Event Loop Model.
              </p>
              <div style={titles}>
                <PrismCode
                  code={eventLoops}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>13. How you can monitor a file for modifications in Node.js ?</h3>
              <p>With the help of <b>File System watch()</b> function which watches the changes of the file.</p>

              <h3>14. What does emitter do and what is dispatcher?</h3>
              <p>
                The emitter is one which makes communication between two nodes. When the job of the scheduler is completed in a
                program than dispatched takes the task to the desired status.
              </p>

              <h3>15. What is REPL?</h3>
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

              <h3>16. What is a child_process module in Node.js?</h3>
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

              <h3>17. Difference between the cluster and child_process modules?</h3>
              <p>
                <ul>
                  <li>Cluster is when one master programme is running two/ more nodes at a single running time. </li>
                  <li>A child process starts a new script on the system, it is quite similar to the cluster.</li>
                </ul>
              </p>

              <h3>18. Explain what is Reactor Pattern in Node.js?</h3>
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

              <h3>19. What is a control flow function? What are the steps does it execute?</h3>
              <p>
                Control flow function runs in between several asynchronous function calls.
                <ul>
                  <li>Control the order of execution. </li>
                  <li>Collect data.</li>
                  <li>Limit concurrency. </li>
                  <li>Call the next step in the program.</li>
                </ul>
              </p>
              <br />

              <h3>20. Explain the working mechanism of control flow function?</h3>
              <i>
                Control flow function is the sequence in which statements or functions are executed. Since I/O operations are 
                non-blocking in Node.js, control flow cannot be linear. Therefore, it registers a callback to the event loop and 
                passes the control back to the node, so that the next lines of code can run without interruption. <b>Ex: </b>Read File
              </i>
              <br />
              <ul>
                <li><b>fs.state(): </b>It helps to get various statistic of a file.</li>
                <br />
                To deal with directories here are 2 methods.
                <li><b>opendir(): </b>readfile()/ writefile()</li>
                <li><b>opendirSync(): </b>readfileSync()/ writefileSync()</li>
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

              <h3>23. setInterval </h3>
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

              <h3>24. nextTick</h3>
              <div style={titles}>
                <PrismCode
                  code={nextTicks}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>25. setImmediate</h3>
              <div style={titles}>
                <PrismCode
                  code={setImmediate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>26. What is the preferred method of resolving unhandled exceptions in Node.js?</h3>
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

              <h3>27. Disconnect()</h3>
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

              <h3>28. How to stop the master process without suspending all of its child processes?</h3>
              <p>
              With the help of the <b>Upstart process management system</b>, you can stop the master process without suspending all of its child processes.
              </p>

              <h3>29. Stream</h3>
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

              <h3>30. Piping the Streams</h3>
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

              <h3>31. Server Port</h3>
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

              <h3>32. What is error first callback.</h3>
              Error-First Callback in Node. js is a function which either returns an error object or any successful data returned by the function. The first argument in
              the function is reserved for the error object. If any error has occurred during the execution of the function, it will be returned by the first argument.
              <br />

              <h3>33. What is stub node js.</h3>
              <ul>
                <li>Stubs are functions or programs that affect the behavior of components or modules.</li>
                <li>Stubs are dummy objects for testing. Stubs implement a pre-programmed response.</li>
                <li>This isn’t a node.js, or a js-specific thing. Stubbing is the process of creating fake endpoints in code so that you can delay writing complex code, or to
                  isolate what you are testing.</li>
              </ul>
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
      </Grid >
    )
  }
}

export default (withStyles(styles)(IntroNodeJs));
