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


const buffer = `
var buf = Buffer.alloc(10);
var buf = new Buffer([10, 20, 30, 40, 50]);
var buf = Buffer.from('abc');
var buf = Buffer.from("Simply Easy Learning", "utf-8");

console.log(buf);
`.trim();

const firstBuf = `
const firstBuf = Buffer.alloc(1024);
const filledBuf = Buffer.alloc(1024, 1);
const asciiBuf = Buffer.alloc(5, 'a', 'ascii');          //create a buffer five bytes long and stores only ASCII characters

console.log(asciiBuf);
`.trim();

const stringBuf = ``.trim();

const code = `
const stringBuf = Buffer.from('My name is Paul');
console.log(stringBuf);

const asciiBuf = Buffer.alloc(5, 'a', 'ascii');
const asciiCopy = Buffer.from(asciiBuf);
console.log(asciiCopy);

const tenZeroes = Buffer.alloc(10);
console.log(tenZeroes.toString());
`.trim();

const hiBuf = `
const hiBuf = Buffer.from('Hi!');
console.log(hiBuf[0]);
console.log(hiBuf.toString());
console.log(hiBuf.toString('hex'));
console.log(hiBuf.toJSON());


//2
buf = new Buffer.alloc(26);
for (var i = 0; i < 26; i++) {
  buf[i] = i + 97;
}

console.log(buf.toString("ascii"));                                           // abcdefghijklmnopqrstuvwxyz.
console.log(buf.toString("ascii", 0, 5));                                     // abcde.
console.log(buf.toString("utf8", 0, 5));                                      // abcde.
console.log(buf.toString(undefined, 0, 5));
`.trim();

const hiBufs = `
const hiBuf = Buffer.from('Hi!');
hiBuf[1] = 'e';
console.log(hiBuf.toString());

hiBuf[1] = 101;
console.log(hiBuf.toString());

const petBuf = Buffer.alloc(3);
petBuf.write('Cats');
console.log(petBuf.toString());

//first two characters are overwritten, but the rest of the buffer is untouched.
const petBuf2 = Buffer.alloc(4);
petBuf2.write('Cats');
petBuf2.write('Hi');
console.log(petBuf2.toString());
`.trim();

const buff = `
buf = new Buffer.alloc(256);
len = buf.write("Simply Easy Learning");

console.log("Octets written : " + len);


//
var buffer1 = new Buffer.from("ABC");
var buffer2 = new Buffer.from("ABCD");
var result = buffer1.compare(buffer2);

if (result < 0) {
  console.log(buffer1 + " comes before " + buffer2);
} else if (result === 0) {
  console.log(buffer1 + " is same as " + buffer2);
} else {
  console.log(buffer1 + " comes after " + buffer2);
}


//
var buffer1 = new Buffer.from("TutorialsPoint ");
var buffer2 = new Buffer.from("Simply Easy Learning");
var buffer3 = Buffer.concat([buffer1, buffer2]);

console.log("buffer3 content: " + buffer3);


//copy a buffer
var buffer1 = new Buffer.from("ABC");

var buffer2 = new Buffer.alloc(3);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());`.trim();

const buffJson = `
const data = [
  { name: "John Doe", age: 23 },
  { name: "John Doe", age: 2 },
  { name: "John Doe", age: 3 },
  { name: "John Doe", age: 4 },
];

const buff = Buffer.from(data);

let bufferOne = Buffer.from(data);

let json = bufferOne.toJSON();
// let json = JSON.stringify(bufferOne);
console.log(json);
`.trim();


class BufferNode extends Component {
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
              <h3>Buffer</h3>
              <ul>
                <li>
                  Pure JavaScript is Unicode friendly, but it is not so for binary data. While dealing with TCP streams or the file system, it's
                  necessary to handle octet streams. Node provides Buffer class which help to store raw data 
                  to a raw memory allocation outside the V8 heap.
                </li>
                <div style={titles}>
                  <PrismCode
                    code={buffer}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <i>This method returns the number of octets written. If there is not enough space in the buffer to fit the entire string, it will write a part of the string.</i>
                <br />
                <br />

                <li><b>alloc() - </b>Creates a Buffer object of the specified length.</li>
                <li><b>allocUnsafe() - </b>Creates a non-zero-filled Buffer of the specified length.</li>
                <li><b>compare() - </b>Compares two Buffer objects.</li>
                <li><b>concat() - </b>Concatenates an array of Buffer objects into one Buffer object.</li>
                <li><b>copy() - </b>Copies the specified number of bytes of a Buffer object</li>
                <li><b>entries() - </b>Returns an iterator of "index" "byte" pairs of a Buffer object</li>
                <li><b>equals() - </b>Compares two Buffer objects, and returns true if it is a match, otherwise false</li>
                <li><b>fill() - </b>Fills a Buffer object with the specified values</li>
                <li><b>from() - </b>Creates a Buffer object from an object (string/array/buffer)</li>
                <li>
                  <b>includes() - </b>Checks if the Buffer object contains the specified value. Returns true if there is a match, otherwise
                  false
                </li>
                <li><b>indexOf() - </b>Checks if the Buffer object contains the specified value. Returns the first occurrence, otherwise -1</li>
                <li><b>keys() - </b>Returns an array of keys in a Buffer object length - Returns the length of a Buffer object, in bytes</li>
                <li><b>slice() - </b>Slices a Buffer object into a new Buffer objects starting and ending at the specified positions</li>
                <li><b>swap16()- </b>Swaps the byte-order of a 16 bit Buffer object</li>
                <li><b>toString()- </b>Returns a string version of a Buffer object</li>
                <li><b>toJSON()- </b>Returns a JSON version of a Buffer object</li>
                <li><b>values()- </b>Returns an array of values in a Buffer object</li>
                <li><b>write() - </b>Writes a specified string to a Buffer object</li>
              </ul>
              <br />

              <h3>Buffering process output</h3>
              <p>In cases where the complete buffered output of a child process is sufficient, with no need to manage data through events,
                child_process offers the exec method. The method takes three arguments: </p>
              command: A command-line string. Unlike spawn and fork, which pass arguments to a command via an array, this first
              argument accepts a full command string, such as ps aux | grep node.
              <br />
              <br />
              <ul>
                <b>options: This is an optional argument.</b>
                <li>cwd (String): This sets the working directory for the command process.</li>
                <li>env (Object): This is a map of key-value pairs that will be exposed  to the child process.</li>
                <li>encoding (String): This is the encoding of the child's data stream.  The default value is 'utf8'.</li>
                <li>timeout (Number): This specifies the milliseconds to wait for the process to complete, at which point the child process
                  will be sent  the killSignal.maxBuffer value.</li>
                <li>killSignal.maxBuffer (Number): This is the maximum number  of bytes allowed on stdout or stderr. When this number is
                  exceeded, the process is killed. This default is 200 KB.</li>
                <li>killSignal (String): The child process receives this signal after  a timeout. This default is SIGTERM.</li>
              </ul>
              <br />

              When you want the buffering behavior of exec but are targeting a Node file, use execFile. Importantly, execFile does not
              spawn a new subshell, which makes  it slightly less expensive to run.
              <br />
              <br />

              <b>Create Buffer</b>
              <p>
                If we store data in memory that we receive, then create a new buffer. In Node.js we use the alloc().
              </p>
              <p>
                The alloc() function takes the size of the buffer as its first and only required argument. The
                size is an integer representing how many bytes of memory the buffer object will use.
              </p>
              <div style={titles}>
                <PrismCode
                  code={firstBuf}
                  la nguage="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <div style={titles}>
                <PrismCode
                  code={buff}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>2 Ways to create buffer</b>
              <p>
                Create a buffer from data that already exists, like a string or array.
              </p>
              To create a buffer from pre-existing data, we use the from() method. We can use that function to
              create buffers from:
              <ul>
                <li><b>An array of integers :</b> The integer values can be between 0 and 255.</li>
                <li><b>An ArrayBuffer :</b> This is a JavaScript object that stores a fixed length of bytes.</li>
                <ul>
                  <li>A string</li>
                  <li>Another buffer</li>
                </ul>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={stringBuf}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Reading from buffer</b>
              <p>
                To access one byte of a buffer, we pass the index or location
                of the byte we want. Buffers store data sequentially like arrays.
              </p>
              <div style={titles}>
                <PrismCode
                  code={hiBuf}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Modify buffer</b>
              <p>
                <ul>
                  <li>Buffer can only accept an integer value. We can’t assign it to the letter.</li>
                  <li>If try to write more bytes than a buffer’s size, the buffer object will only accept what bytes fit.</li>
                </ul>
              </p>
              <div style={titles}>
                <PrismCode
                  code={hiBufs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />



              <h3>Buffer to JSON</h3>
              <div style={titles}>
                <PrismCode
                  code={buffJson}
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

export default (withStyles(styles)(BufferNode));
