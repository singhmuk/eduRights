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

const crypto = `var crypto = require('crypto');
var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
var mystr = mykey.update('abc', 'utf8', 'hex')

mystr += mykey.update.final('hex');
`.trim()

const deCrypto = `var crypto = require('crypto');
var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
var mystr = mykey.update('34feb914c099df25794bf9ccb85bea72', 'hex', 'utf8')

mystr += mykey.update.final('utf8');
`.trim()

const dgram = `(i) var dgram = require('dgram');
var s = dgram.createSocket('udp4');
  s.on('message', function(msg, rinfo) {
  console.log('I got this message: ' + msg);
  });
  
s.bind(8080);`.trim()

const dgram_2 = `(ii) var dgram = require('dgram');
  var s = dgram.createSocket('udp4');
  s.send(Buffer.from('abc'), 8080, 'localhost');
`.trim()

const dns = `var dns = require('dns');
    var w3 = dns.lookup('www.w3schools.com', function (err, addresses, family) {
     console.log(addresses);
    });
`.trim()

const querystring = `var querystring = require('querystring');
  var q = querystring.parse('year=2017&month=february');
  console.log(q.year);`.trim()

const GettingInPut = `const command = process.argv[2]
if (command === 'add') {
   console.log('Adding note!')
 }
 else if (command === 'remove') {
   console.log('Removing note!')
 }
`.trim()

const tls = `var tls = require('tls');`.trim()

const tty = ` url - The URL module provides a way of parsing the URL string.
var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var q = url.parse(req.url, true);
  res.write(q.href);
  res.end();
}).listen(8080);
`.trim()

const util = `var util = require('util');
var txt = 'Congratulate %s on his %dth birthday!';
var result = util.format(txt, 'Linus', 6);

console.log(result);
`.trim()

const vm = `var vm = require('vm');
var myObj = { name: 'John', age: 38 };
vm.createContext(myObj);
vm.runInContext('age += 1;', myObj);

console.log(myObj);
`.trim()



const Write = `const fs = require('fs')
fs.writeFileSync('notes.txt', 'I live in Philadelphia')
`.trim()

const Delete = `const path='D:\Concepts\NodeJs\demo\text.txt';
console.log(fs.unlinkSync(path))
`.trim()

const appendFile = `var fs = require('fs');
fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
 if (err) throw err;
   console.log('Saved!');
});`.trim()

const open = `var fs = require('fs');
fs.open('mynewfile2.txt', 'w', function (err, file) {
 if (err) throw err;
   console.log('Saved!');
});
`.trim()

const writeFile = `var fs = require('fs');
fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
 if (err) throw err;
   console.log('Saved!');
});
`.trim()

const Rename = `var fs = require('fs');
fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
   if (err) throw err;
   console.log('File Renamed!');
});
`.trim()


class ServerSide extends Component {
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
              <b>crypto</b>
              <br />
              <i>To handle OpenSSL cryptographic functions
                The crypto module provides a way of handling encrypted data.</i>
              <br />
              <b>(i) Encrypt the text 'abc'</b>
              <div style={titles}>
                <PrismCode
                  code={crypto}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              console.log(mystr);
              <br />
              o/p - 34feb914c099df25794bf9ccb85bea72
              <br />
              <br />
              <b>(ii) Decrypt back to 'abc'</b>
              <div style={titles}>
                <PrismCode
                  code={deCrypto}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              console.log(mystr);
              <br />
              o/p - abc
              <br />
              <br />
              <b>dgram</b>
              <br />
              Provides implementation of UDP datagram sockets
              It can be used to send messages from one computer/server to another.
              <div style={titles}>
                <PrismCode
                  code={dgram}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>dgram_2</b>
              <div style={titles}>
                <PrismCode
                  code={dgram_2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              When initiating the second file, the first Command window will now look like this:
              <br />
              o/p - I got this message: abc
              <br />
              <br />
              <b>dns - To do DNS lookups and name resolution functions</b>
              <div style={titles}>
                <PrismCode
                  code={dns}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              o/p - 192.229.133.221
              <br />
              getServers() - Returns an array containing all IP addresses belonging to the current server
              <br />lookup() - Looks up a hostname. A callback function contains information about the hostname,
              <br />including it's IP address
              <br />lookupService() - Looks up a address and port. A callback function contains information about
              the address, such as the hostname
              <br />resolve() - Returns an array of record types belonging to the specified hostname
              <br />resolve4() - Looks up an IPv4 address. The callback function includes an array of IPv4 addresses
              <br />resolve6() - Looks up an IPv6 address. The callback function includes an array of IPv6 addresses
              <br />resolveTxt() - Looks up text query records for the specified hostname.
              <br />reverse() - Reverses an IP address into an array of hostnames
              <br />setServers() - Sets the IP addresses of the servers
              <br />
              <br />
              <b>querystring</b>
              <br />
              <i>To handle URL query strings. The Query String module provides a way of parsing
                the URL query string.</i>
              <div style={titles}>
                <PrismCode
                  code={querystring}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              o/p - 2018
              <br />
              escape() - Returns an escaped querystring<br />
              parse() - Parses the querystring and returns an object<br />
              stringify() - Stringifies an object, and returns a query string<br />
              unescape() -
              <br />
              <br />

              ``              <b>Getting Input from Users</b>
              <div style={titles}>
                <PrismCode
                  code={GettingInPut}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              $ node server.js add
              <br />
              <br />

              <b>tls</b>
              <br />
              To implement TLS and SSL protocols<br />
              The TLS module provides a way of implementing TLS (Transport Layer Security) and SSL (Secure
              Socket Layer).<br />
              connect() - Returns a Socket object<br />
              createSecureContext() - Creates an object containing security details<br />
              createServer() -Creates a Server object<br />
              getCiphers() - Returns an array containing the supported SSL ciphers<br />
              <div style={titles}>
                <PrismCode
                  code={tls}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>. tty - Provides classes used by a text terminal</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={tty}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              o/p - default.htm
              <br />
              url.format() - Returns a formatted URL string<br />
              url.parse() - Returns a URL object<br />
              url.resolve() - Resolves a URL
              <br />
              <br />
              <b>util - The Util module provides access to some utility functions</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={util}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              o/p - Congratulate Linus on his 6th birthday!<br />
              debuglog() - Writes debug messages to the error object<br />
              deprecate() - Marks the specified function as deprecated<br />
              format() - Formats the specified string, using the specified arguments<br />
              inherits() - Inherits methods from one function into another<br />
              inspect() - Inspects the specified object and returns the object as a string
              <br />
              <br />
              <b>vm</b>
              <br />
              The VM module provides a way of executing JavaScript on a virtual machine, almost like
              eval() in JavaScript.

              <div style={titles}>
                <PrismCode
                  code={vm}
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

export default (withStyles(styles)(ServerSide));
