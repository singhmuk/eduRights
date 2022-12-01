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

const spawns = `
const { spawn } = require("child_process");

const child = spawn("find", ["/"]);

child.stdout.on("data", (data) => {
  console.log('stdout: '$'{ data }');
});

child.stderr.on("data", (data) => {
  console.log('stderr: '$'{ data } ');
});

child.on("error", (error) => console.log('error: '$'{ error.message }'));

child.on("exit", (code, signal) => {
  if (code) console.log('Process exit with code: '$'{ code } ');
  if (signal) console.log('Process killed with signal: '$'{ signal }');
  console.log('Done ✅');
});
`.trim();

const forkChild = `
//lovechild.js
process.on('message', (msg) => {
  console.log('Parent said: ', msg);
  process.send("I love you too");
});

const cp = require('child_process');
const child = cp.fork(__dirname + '/lovechild.js');

child.on('message', (msg) => {
    console.log('Child said: ', msg);
});

child.send("I love you");


//2
//child.js
process.on('message', function(msg, server) {
  console.log(msg);

  server.on('connection', function(socket) {
      socket.end('Child handled connection');
  });
});

var child = require('child_process').fork('./child.js');
var server = require('net').createServer();

server.on('connection', function(socket) {
    socket.end('Parent handled connection');
});

server.listen(8080, function() {
    child.send("The parent message", server);
});`.trim();

const execs = `
const { exec, execFile } = require("child_process");

//dir generate code human readable byte formate
exec("dir", (error, stdout, stderr) => {
  // exec("/find /", (error, stdout, stderr) => {
  // execFile("./somefile.sh", (error, stdout, stderr) => {
  // exec("pwd", (error, stdout, stderr) => {
  if (error) {
    console.log('error: '$'{error.message}');
    return;
  }
  if (stderr) {
    console.log('stderr: '$'{stderr}');
    return;
  }
  console.log('stdout: '$'{stdout}');
});
`.trim();

const execFile = `
//child_process.execFile(file[, args][, options][, callback])


const { execFile } = require('child_process'); 

// Executes the exec.js file 
const child = execFile('node', ['exec.js'], 
		(error, stdout, stderr) => { 
if (error) { 
	throw error; 
} 
console.log(stdout); 
}); 
`.trim();

const childsFile = `
//1
var id = process.argv[2];
process.on('message', function(n, socket) {
    socket.write('child ' + id + ' was your server today.\r\n');
    socket.end();
});


//2
var spawn = require('child_process').spawn;
var php = spawn("php", ['-r', 'print "Hello from PHP!";']);

php.stdout.on('readable', function() {
    var d;
    while (d = this.read()) {
        console.log(d.toString());
    }
});`.trim();

const clusterModule = `
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
}

if (cluster.isWorker) {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("Hello from " + cluster.worker.id);
    }).listen(8080);
}`.trim();

const spawning_processes = `
var writer = fs.createWriteStream("./a.out");
writer.on('open', function() {
    var cp = spawn("node", ['./reader.js'], { stdio: [null, writer, null] });
});`.trim();

const forkFiles = `
const { fork } = require("child_process");

app.get("/one", (req, res) => {
  const sum = longComputation();
  res.send({ sum: sum });
});

app.get("/two", async (req, res) => {
  const sum = await longComputePromise();
  res.send({ sum: sum });
});

//this uses child process
app.get("/three", (req, res) => {
  const child = fork("./longtask.js");
  child.send("start");
  child.on("message", (sum) => {
    res.send({ sum: sum });
  });
});


function longComputation() {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }
  return sum;
}

function longComputePromise() {
  return new Promise((resolve, reject) => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
      sum += i;
    }
    resolve(sum);
  });
}`.trim();

const spawnFiles = `
`.trim();

const clusting = `
const cluster = require("cluster");
const os = require("os");

const numCpu = os.cpus().length;

app.get("/", (req, res) => {
  for (let i = 0; i < 1000; i++) {}
  res.send('OK '$'{process.pid}');
  cluster.worker.kill();
});

if (cluster.isMaster) {
  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
  }
  cluster.on("exit", (Worker, code, signal) => {
    console.log('worker '$'{Worker.process.pid} died');
    cluster.fork();
  });
} else {
  app.listen(5000, () =>
    console.log('Server running on port 5000')
  );
}`.trim();

const cpus = `
const os = require('os')
const cluster = require('cluster')

//check own cpu
console.log(os.cpus())

//master, worker
if (cluster.isMaster) {
  let noOcCups = os.cpus().length;
  console.log('Master Process is running', process.pid)
  for (let i = 0; i < noOcCups; i++) {
    cluster.fork()
  }
  cluster.on('exit', () => {
    console.log('One worker destroyed')
    cluster.fork()
  })
}
`.trim();

class ChildsPros extends Component {
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
              <h3>Communicating with your child</h3>
              <ul>
                All ChildProcess object extend EventEmitter.
                ChildProcess objects expose some useful methods for interacting with children directly.
                <li><b>child.connected :</b> When a child is disconnected from its parent via  child.disconnect(), this flag will be set to false.
                </li>
                <li><b>child.stdin :</b> Is a WritableStream.</li>
                <li><b>child.stdout :</b> Is a ReadableStream.</li>
                <li><b>child.stderr :</b> Is a ReadableStream corresponding to the child's standard error.</li>
                <li><b>child.pid :</b> Is an integer representing the process ID (PID) assigned  to the child process.</li>
                <li><b>child.kill :</b> Tries to terminate a child process, sending it an optional signal. If no signal is specified, the
                  default is SIGTERM. While the terminal method, it is not guaranteed to kill a process—it only sends  a signal
                  to a process.</li>
                <li><b>child.disconnect() :</b> This command severs the IPC connection between the child and its parent. The child will then die
                  gracefully, as it has no IPC channel to keep it alive. You may also call process.disconnect() from within the child
                  itself. Once a child has disconnected, the connected flag  on that child reference will be set to false.</li>
              </ul>
              <br />

              <h3>Create Child</h3>
              <p>
                Creating a Child Process with exec().
                The exec() function in Node.js creates a new shell process and executes a command in
                that shell. The output of the command is kept in a buffer in memory, which
                you can accept via a callback function passed into exec().
              </p>
              <p>
                In Node.js CPU
                cannot handle increasing workload so, the child_process module can be used to spawn child
                processes. The child processes communicate with each other using a built-in messaging system.
              </p>
              The following are the four different ways to create a child process in Node.js:
              <ul>
                <li>spawn() method</li>
                <li>fork() method</li>
                <li>exec() method</li>
                <li>execFile() method</li>
              </ul>
              <br />

              <h3>Spawning Processes</h3>
              <ul>
              it creates a streaming interface between the parent and child process.
              <br/>
                The method takes three arguments:
                <li><b>command :</b> A command to be executed by the OS shell.</li>
                <li><b>arguments (optional) :</b> These are command-line arguments, sent as an array.</li>
                <li><b>options :</b> An optional map of settings for spawn.</li>
                <br />
                <br />
                <b>The options for spawn allow its behavior to be carefully customized:</b>
                <li><b>cwd (String) :</b> By default, the command will understand its current working directory to be the same as that of the Node
                  process calling spawn. Change that setting using this directive.</li>
                <li><b>env (Object) :</b> This is used to pass environment variables to a child process.</li>
                <li><b>detached (Boolean) :</b> When a parent spawns a child, both processes form  a group, and the parent is normally the leader
                  of that group. To make a child the group leader, use detached. This will allow the child to continue running even after
                  the parent exits. This is because the parent will wait for the child to exit by default. You can call child.unref() to
                  tell the parent's event loop that it should not count the child reference, and exit if no other work exists.
                </li>
                <li><b>uid (Number) :</b> Set the uid (user identity) directive for the child process, in terms of standard system permissions,
                  such as a UID that has execute privileges on the child process.</li>
                <li><b>gid (Number) :</b> Set the gid (group identity) directive for the child process, in terms of standard system permissions,
                  such as a GID that has execute privileges on the child process.</li>
                <li><b>stdio (String or Array) :</b> Child processes have file descriptors, the first three being the standard I/O descriptors
                  process.stdin, process.stdout and process.stderr, in order (fds = 0,1,2). This directive allows those descriptors to be
                  redefined, inherited, and so forth. Consider the output of the following child process program:
                  <br />
                  process.stdout.write(new Buffer("Hello!"));</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={spawning_processes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <p>
                <b>1. spawn() method: </b>This method spawns a new process using the given command and the command line
                arguments in args. The ChildProcess instance implements EventEmitterAPI which enables us to
                register handlers for events on child object directly. Some events that can be registered for
                handling with the ChildProcess are exit, disconnect, error, close and message.
              </p>
              <br />
              <div style={titles}>
                <PrismCode
                  code={spawns}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>2. fork() method</b>
              <p>
                The child_process.fork() is a special case of child_process.spawn() where the parent and the
                child process can communicate with each other via send(). 
                <br/>
                It creates a communication channel between the parent and child process.
              </p>
              <ul>
                <li>first synchronous</li>
                <li>npm install loadtest -g</li>
                <li>loadtest -n 10 -c 10 http://localhost:5000/first</li>
                <li>and see time took to handle total request</li>
                <br />
                <li>second async</li>
                <li>fork method in child-process and do inter-process communication.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={forkFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <br />

              <b>fork() method2</b>
              <p>To create a child process one need simply call the fork method of the child_process module, passing it the name of a
                program file to execute within the new process:
                <br />
                In this way any number of subprocesses can be kept running.</p>
              <p>
                Another very powerful idea is to pass a network server an object to a child. This technique allows multiple processes,
                including the parent, to share the responsibility for servicing connection requests, spreading load across cores.
                <br />
                In addition to passing a message to a child process as the first argument to send, the preceding code also sends the
                server handle to itself as a second argument. Our child server can now help out with the family's service business:

              </p>
              <div style={titles}>
                <PrismCode
                  code={forkChild}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>3. exec() method</b>
              <p>This method creates a shell first and then executes the command.</p>
              <div style={titles}>
                <PrismCode
                  code={execs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>4. execFile() method</b>
              <p>
                The child_process.execFile() function is does not spawn a shell by default. It is slightly more
                efficient than child_process.exec() as the specified executable file is spawned directly as a new
                process.
              </p>
              <div style={titles}>
                <PrismCode
                  code={execFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Child</h3>
              It should be noted that the ability to spawn any system process means that one can use Node to run other application
              environments installed on the OS. If one had the popular PHP language installed, the following would be possible:
              <div style={titles}>
                <PrismCode
                  code={childsFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Cluster Module</h3>
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
              <div style={titles}>
                <PrismCode
                  code={cpus}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <ul>
                The following code creates a cluster of worker processes all sharing  the same HTTP connection.
                <li><b>cluster.isMaster :</b> This is the Boolean value indicating whether the process is a master.</li>
                <li><b>cluster.isWorker :</b> This is the Boolean value indicating whether the process was forked from a master.</li>
                <li><b>cluster.worker :</b> This will bear a reference to the current worker object, only available to a child process.</li>
                <li><b>cluster.workers :</b> This is a hash containing references to all active worker objects, keyed by the worker ID. Use this to
                  loop through all worker objects. This only exists within the master process.</li>
                <li><b>cluster.fork([env] ) :</b> This creates a new worker process. Only the master process may call this method. To expose a map
                  of key-value pairs to the child's process environment, send an object to env. </li>
                <li><b>cluster.disconnect([callback]) :</b> This is used to terminate all workers  in a cluster. Once all the workers have died
                  gracefully, the cluster process will itself terminate if it has no further events to wait on. To be notified  when all
                  children have expired, pass callback.</li>
              </ul>
              <ul>
                cluster.setupMaster([settings]): This is a convenient way of passing a map of default arguments to be used when a child
                is forked. If all children are going to fork the same file, you will save time by setting it here. The available defaults
                are as follows:
                <li><b>exec (String) :</b> This is the file path to the process file, defaulting  to __filename.</li>
                <li><b>args (Array) :</b> This contains Strings sent as arguments to the child process. The default is to fetch arguments with
                  process.argv. slice(2). </li>
                <li><b>silent (Boolean) :</b> This specifies whether or not to send output  to the master's stdio, defaulting to false.
                </li>
                <li></li><b>silent (Boolean) :</b> This specifies whether or not to send output  to the master's stdio, defaulting to false.
              </ul>
              <br />
              <b>Cluster events:</b>
              <ul>
                <li><b>fork :</b> This is fired when the master tries to fork a new child. This is not the same as online. This receives a worker
                  object. </li>
                <li><b>online :</b> This is fired when the master receives notification that a child is fully bound. This differs from the fork
                  event and receives a worker object. • listening: When the worker performs an action that requires a listen() call
                  (such as starting an HTTP server), this event will be fired in the master. The event emits two arguments: a worker object,
                  and the address object containing the address, port, and addressType values of the connection.
                </li>
                <li><b>disconnect :</b> This is called whenever a child disconnects, which can happen either through process exit events or after
                  calling child.kill(). This will fire prior to the exit event—they are not the same. This receives a worker object.
                </li>
                <li><b>exit :</b> Whenever a child dies this event is emitted. The event receives three arguments: a worker object, the exit code
                  number, and the signal string, such as SIGNUP, which caused the process to be killed.
                </li>
                <li><b>setup :</b> This is called after cluster.setupMaster has executed.</li>
              </ul>
              <ul>
                <br />
                <b>Worker object properties:</b>
                <li><b>worker.id :</b> This is the unique ID assigned to a worker, also representing the worker's key in the cluster.workers index.
                </li>
                <li><b>worker.process :</b> This specifies a ChildProcess object referencing a worker.
                </li>
                <li><b>worker.suicide :</b> The workers that have recently had kill or disconnect called on them will have their suicide attribute
                  set to true.</li>
                <li><b>worker.send(message, [sendHandle]) :</b> Refer to child_process.fork(), which is previously mentioned.
                </li>
                <li><b>worker.kill([signal]) :</b> This kills a worker. The master can check this worker's suicide property in order to determine
                  if the death was intentional or accidental. The default signal value that is sent is SIGTERM.
                </li>
                <li><b>worker.disconnect() :</b> This instructs a worker to disconnect. Importantly, existing connections to the worker are not
                  immediately terminated (as with kill), but are allowed to exit normally prior to the worker fully disconnecting. This is
                  because existing connections may stay in existence for a very long time. It is a good pattern to regularly check if the
                  worker has actually disconnected, perhaps using timeouts.</li>
              </ul>
              <ul>
                <br />
                <b>Worker events:</b>
                <li><b>message :</b> See child_process.fork.</li>
                <li><b>online :</b> This is identical to cluster.online, except that the check is against only the specified worker
                </li>
                <li><b>listening :</b> This is identical to cluster.listening, except that the check  is against only the specified worker
                </li>
                <li><b>disconnect :</b> This is identical to cluster.disconnect, except that the check is against only the specified worker
                </li>
                <li><b>exit :</b> See the exit event for child_process.</li>
                <li><b>setup :</b> This is called after cluster.setupMaster has executed.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={clusterModule}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={clusting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Scaling node js using cluster</h3>
              <ul>
                <li>To handle large loads we cant take the advantage of multi-core systems, so we can use a cluster of Node.js processes to handle the load.</li>
                <li>Cluster creates the copies of our programme and distributes among the process available which means if have four core machine then it will create the four copies of the programme and provides to each core. The cluster module allows easy creation of child processes that all share server ports.</li>
                <li>Cluster manages with two methods of distributing incoming connections.</li>
                <ul>
                  <li>1. Round-robin approach, where the master process listens on a port, accepts new connections and distributes them across the workers in a round-robin fashion, with some built-in smarts to avoid overloading a worker process.</li>
                  <li>2. In the master process creates the listen socket and sends it to interested workers. The workers then accept incoming connections directly. But the issue with that is load is not evenly distributed among all the processes.</li>
                </ul>
              </ul>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(ChildsPros));
