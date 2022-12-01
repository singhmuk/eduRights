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

const UDP_server = `
var dgram = require('dgram');
var client = dgram.createSocket("udp4");
var server = dgram.createSocket("udp4");
var message = process.argv[2] || "message";
message = new Buffer(message);
server.on("message", function(msg) {
    process.stdout.write("Got message: " + msg + "\n");
    process.exit();
}).bind(41234);

client.send(message, 0, message.length, 41234, "localhost");
`.trim();

const assert = `var assert = require('assert');
    assert(5 > 7);
`.trim()

const http = `var http = require('http');
http.createServer(function (req, res) {
 res.writeHead(200, { 'Content-Type': 'text/html' });
   //res.write('write name in url to see o/p');
     res.write(req.url);
     res.end();
}).listen(4000);
`.trim()

const https = `var https = require('https');
https.createServer(function (req, res) {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.write('Hello World!');
     res.end();
}).listen(8080);
`.trim()

const HTTPWithoutLibrary = `const https = require('https')
const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026
/40,-75'
const request = https.request(url, (response) => {
 let data = ''
   response.on('data', (chunk) => {
   data = data + chunk.toString()
 })
 
 response.on('end', () => {
   const body = JSON.parse(data) 
   console.log(body) 
  })
})

request.on('error', (error) => {
   console.log('An error', error)
})
request.end()
`.trim()

const nets = `var net = require('net');
`.trim()

const URL = `var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);
  console.log(q.host);
  console.log(q.pathname);
  console.log(q.search);
  
var qdata = q.query;
  console.log(qdata.month);
`.trim()

const sendEmail = `var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
   service: 'gmail',
     auth: {
     user: 'youremail@gmail.com',
     pass: 'yourpassword'
     }
});

var mailOptions = {
     from: 'youremail@gmail.com',
     to: 'myfriend@yahoo.com',
     subject: 'Sending Email using Node.js',
     text: 'That was easy!'
    };
    
transporter.sendMail(mailOptions, function(error, info){
 if (error) {
   console.log(error);
   } 
   else {
   console.log('Email sent: ' + info.response);
 }
});
`.trim()

const crypto = `
const crypto = require("crypto");

//.createHash('sha1')md5,sha1

const hash = crypto.createHash("sha256").update("password").digest("hex");
console.log(hash);`.trim();

const decrypo = `
const crypto = require("crypto");

const algorithm = "aes-192-cbc";
const password = "password used to generate key";
const key = crypto.scryptSync(password, "salt", 24);
const decipher = crypto.createDecipher(algorithm, key);

let decrypted = "";
decipher.on("readable", () => {
  let chunk;
  while (null !== (chunk = decipher.read())) {
    encrypted += chunk.toString("utf8");
  }
});

decipher.on("end", () => console.log(decrypted));

const encrypted = "";
decipher.write(encrypted, "hex");
decipher.end();`.trim();

const encrde = `
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

function decrypt(text) {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
var hw = encrypt("Some serious stuff");
console.log(hw);
console.log(decrypt(hw));`.trim();

const encrypt = `
const crypto = require("crypto");

const algorithm = "aes-192-cbc";
const password = "password used to generate key";
const key = crypto.scryptSync(password, "salt", 24);
const cipher = crypto.createCipher(algorithm, key);

let encrypted = "";
cipher.on("readable", () => {
  let chunk;
  while (null !== (chunk = cipher.read())) {
    encrypted += chunk.toString("hex");
  }
});

cipher.on("end", () => console.log(encrypted));

cipher.write("some clear text data");

cipher.end();`.trim();

const dns = `
const dns = require("dns");

dns.lookup("edurights.herokuapp.com", (err, value) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(value);
});`.trim();

const net = `
const net = require("net");

const server = net.createServer();

server.listen({
  host: "localhost",
  port: 5000,
});

server.on("connection", (client) => {
  console.log("Client connected");
});


//
//run in another cli

const net = require("net");
const client = net.createConnection({
  port: 5000,
});
`.trim();

const os = `
const os = require("os");

console.log(os.arch());

console.log(os.cpus());

console.log(os.freemem());

console.log(os.getPriority(13512));

console.log(os.homedir());

console.log(os.hostname());

console.log(os.networkInterfaces());

console.log(os.platform());

console.log(os.totalmem());

console.log(os.userInfo());`.trim();

const path = `
const path = require("path");

const pathObj = path.parse(__filename);
const pathDit = path.dirname("/path/path.js");
const pathBasename = path.basename("/path/path.js");
const pathExtname = path.extname("/path/path.js");
const pathNormalize = path.normalize("/path/path.js");
const pathJoin = path.join("path", "os", "...", "output.txt");

console.log(pathJoin);
`.trim();


class NodeJsCodes extends Component {
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
              <h3>1. UDP Server</h3>
              Let's create a simple program that allows the user to send data between two  UDP servers:
              <br />
              <br />
              node udp.js "my message" <br />
              Which will result in the following output:<br />
              Got message: my message
              <div style={titles}>
                <PrismCode
                  code={UDP_server}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Crypto</h3>
              crypto module to perform cryptographic operations on data. <br />
              can do cryptographic operations on strings, buffer, and streams.
              <div style={titles}>
                <PrismCode
                  code={crypto}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Decrypo</h3>
              <div style={titles}>
                <PrismCode
                  code={decrypo}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Encrypt</h3>
              <div style={titles}>
                <PrismCode
                  code={encrypt}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Encrypt-Decrypt</b>
              <div style={titles}>
                <PrismCode
                  code={encrde}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. DNS</h3>
              DNS module use to find out information about domain names and IP addresses.<br />
              reverse function to find any reverse DNS records that are configured for IP addresses.
              <div style={titles}>
                <PrismCode
                  code={dns}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Net</h3>
              how to make a server / client pair of programs using the low level Net module and also how to create a simple web
              server using the NodeJS HTTP module.
              <div style={titles}>
                <PrismCode
                  code={net}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. OS</h3>
              The os module provides API for getting information about hardware related like CPU, memory, directories, IP address
              and many more.
              <br />
              <ul>
                <li><b>os.arch(): </b>Return the architecture of the processor.</li>
                <li><b>os.cpus(): </b>Returns an array of the object which contains information of logical CPUs.</li>
                <li><b>os.freemem(): </b>Returns free main memory bytes in integer.</li>
                <li><b>os.getPriority(pid): </b>Returns the scheduling priority of the process.</li>
                <li><b>os.homedir(): </b>Method current user’s home directory as a string.</li>
                <li><b>os.hostname(): </b>Returns the hostname of the operating system.</li>
                <li><b>os.networkInterfaces():: </b>Method returns objects containing information about network interfacing devices.</li>
                <li><b>os.platform(): </b>Return information about platform.</li>
                <li><b>os.totalmem(): </b>Returns total system memory in bytes as a string.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={os}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Path</h3>
              The path module provides a way to work with files and directory path.
              <br />
              <ul>
                <li><b>path.dirname(): </b>This method allows you to get the directory name of a given path. It does not return the last part of the given path.</li>
                <li><b>path.basename(): </b>Method returns the last part of a given path.</li>
                <li><b>path.extname(): </b>Method returns the extension of the path from the last part of the path.</li>
                <ul>
                  <li>If there is no . (period) in the last portion of the path, then an empty string is returned.</li>
                </ul>
                <br />
                <li><b>path.normalize(): </b>Method normalize the given path, by resolving ‘..’, ‘.’ etc.</li>
                <ul>
                  <li>If multiple slashes are found they are replaced by a single slash.</li>
                </ul>
                <li><b>path.join(): </b>Joins all the given path segments together. All the arguments must be string.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={path}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Node.js HTTP Module</b>
              <br />
              <p>A set of functions you want to include in your application.</p>
              <br />
              <ul>
                <li>Node.js has a set of built-in modules which you can use without any further installation.</li>
                <br />

                <li>
                  assert - Provides a set of assertion tests The assert module provides a way of testing expressions. If
                  the expression evaluates to 0, or false, an assertion failure is being caused, and the program is
                  terminated.
                </li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={assert}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <b>o/p: </b>AssertionError: false == true
              <br />
              <br />
              <b>Method -</b>
              <br />
              <ul>
                <li>assert() - Checks if a value is true. Same as assert.ok()</li>
                <li>deepEqual() - Checks if two values are equal</li>
                <li>deepStrictEqual() - Checks if two values are equal, using the strict equal operator (===)</li>
              </ul>
              <br />
              <br />

              <b>http - To make Node.js act as an HTTP server</b>
              <br />
              The HTTP module provides a way of making Node.js transfer data over HTTP
              <div style={titles}>
                <PrismCode
                  code={http}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>https - To make Node.js act as an HTTPS server.</b>
              <br />
              The HTTPS module provides a way of making Node.js transfer data over HTTP TLS/SSL protocol,
              which is the secure HTTP protocol.
              <div style={titles}>
                <PrismCode
                  code={https}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <ul>
                <li>createServer() -Creates an HTTPS server</li>
                <li>get() - Sets the method to GET, and returns an object containing the users request</li>
                <li>globalAgent - Returns the HTTPS Agent</li>
                <li>request - Makes a request to a secure web server</li>
              </ul>
              <br />
              <br />

              <b>HTTP Requests Without a Library</b>
              <div style={titles}>
                <PrismCode
                  code={HTTPWithoutLibrary}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>net - To create servers and clients</b>
              <div style={titles}>
                <PrismCode
                  code={nets}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <ul>
                <li>connect() - Creates a new connection to the server, and returns a new Socket</li>
                <li>createConnection() - Creates a new connection to the server, and returns a new Socket</li>
                <li>createServer() -Creates a new server</li>
                <li>isIP - Checks if the specified value is an IP address</li>
                <li>isIPv4 - Checks if the specified value is an IPv4 address</li>
                <li>isIPv6 - Checks if the specified value is an IPv6 address</li>
              </ul>
              <br />
              <br />

              <b>HTTP Requests Without a Library</b>
              <div style={titles}>
                <PrismCode
                  code={HTTPWithoutLibrary}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Node.js URL Module</b>
              <br />
              The URL module splits up a web address into readable parts.
              Parse an address with the url.parse() method, and it will return a URL object with each part of the
              address as properties:
              <div style={titles}>
                <PrismCode
                  code={URL}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              o/p - localhost:8080
              /default
              <br />
              ?year=2017&month=february
              <br />
              february
              <br />
              <br />

              <b>Node.js Send an Email</b>
              <br />
              The Nodemailer Module
              The Nodemailer module makes it easy to send emails from your computer.
              <br />
              <i>Send an Email</i>
              <br />
              Use the username and password from your selected email provider to send an email. This tutorial wi
              ll show you how to use
              your Gmail account to send an email:
              <br />
              <div style={titles}>
                <PrismCode
                  code={sendEmail}
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

export default (withStyles(styles)(NodeJsCodes));
