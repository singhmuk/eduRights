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

const fsdir = `
fs.stat('filename.js', (err, stats) => {
  if (err) {
    return console.log(err)
  }
  console.log(stats)
  console.log(stats.isFile())
  console.log(stats.isDirectory())
  console.log(stats.size)
})

fs.opendir('filename.js', (err, dir) => {
  if (err) {
    return console.log(err)
  }
  console.log(dir.path)
})
`.trim();

const read = `
const fs = require("fs"); 

fs.readFile('input.txt', (err, data) => {                                         // Asynchronous read 
   if (err) { 
      return console.error(err); 
   } 
   console.log("Asynchronous read: " + data.toString()); 
});


const data = fs.readFileSync('input.txt');                                        // Synchronous read 
console.log("Synchronous read: " + data.toString()); 
`.trim();

const opens = `
const fs = require("fs"); 
  
console.log("opening file!"); 
fs.open('input.txt', 'r+', function(err, fd) { 
   if (err) { 
      return console.error(err); 
   } 
   console.log("File open successfully");      
}); 


//2
var fs = require("fs"); 
var buf = new Buffer(1024); 
  
console.log("opening an existing file"); 
fs.open('input.txt', 'r+', (err, fd) => { 
   if (err) { 
      return console.error(err); 
   } 
   console.log("File opened successfully!"); 
   console.log("reading the file"); 
     
   fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => { 
      if (err){ 
         console.log(err); 
      } 
      console.log(bytes + " bytes read"); 
      
      if(bytes > 0){                                                        // Print only read bytes to avoid junk. 
         console.log(buf.slice(0, bytes).toString()); 
      } 
   }); 
}); `.trim();

const writeFiles = `
var fs = require("fs"); 

console.log("writing into existing file"); 
fs.writeFile('input.txt', 'Geeks For Geeks', (err) => { 
if (err) { 
	return console.error(err); 
} 
	
console.log("Data written successfully!"); 
console.log("Let's read newly written data"); 
	
fs.readFile('input.txt', (err, data) => { 
	if (err) { 
		return console.error(err); 
	} 
	console.log("Asynchronous read: " + data.toString()); 
}); 
}); 
`.trim();

const appendFiles = `
var fs = require('fs'); 

var data = "\nLearn Node.js"; 

// Append data to file 
fs.appendFile('input.txt', data, 'utf8', 

	// Callback function 
	function(err) { 
		if (err) throw err; 
		console.log("Data is appended to file successfully.") 
}); `.trim();

const rename = `
var fs = require('fs');

fs.rename('input.txt', 'myrenamedfile.txt',  (err) => {
  if (err) throw err;
  console.log('File Renamed!');
});`.trim();

const delFiles = `
var fs = require("fs"); 

console.log("deleting an existing file"); 
fs.unlink('input.txt', (err) => { 
if (err) { 
	return console.error(err); 
} 
console.log("File deleted successfully!"); 
}); 
`.trim();

const watch = `
var fs = require('fs');
fs.watch(__filename, { persistent: false }, (event, filename) => {
    console.log(event);
    console.log(filename);
})

setImmediate(function() {
    fs.rename(__filename, __filename + '.new', () => {});
});`.trim();

const CreateFiles = `
var fs = require('fs');

fs.appendFile('demo.txt', 'Hello content!', (err) => {
    if (err) throw err;
    console.log('Saved!');
});`.trim();

const ReadFiles = `
//index.html
<html>
<body>
<h1>My Header</h1>
<p>My paragraph.</p>
</body>
</html>


//index.js
var http = require('http');
var fs = require('fs');
http.createServer(function(req, res) {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });
}).listen(4000);`.trim();

const RenameFiles = `
var fs = require('fs');

fs.rename('demo.txt', 'text.txt', (err) => {
    if (err) throw err;
    console.log('File Renamed!');
});`.trim();

const OpenFiles = `
var fs = require('fs');

fs.open('read.txt', 'w', (err, file) => {
    if (err) throw err;
    console.log('Saved!');
});`.trim();

const deleteFiles = `
var fs = require('fs');

fs.unlink('will_delete.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});`.trim();

const writeFile = `
var fs = require('fs');

fs.writeFile('write.html', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});`.trim();

const UpdateFiles = `
//append.txt
This is my text.


//append_file.js
var fs = require('fs');

fs.appendFile('append.txt', ' This is my text.', function (err) {
  if (err) throw err;
  console.log('Updated!');
});`.trim();


class FileSys extends Component {
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
              <h3>What is a control flow function? What are the steps does it execute?</h3>
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

              <h3>Explain the working mechanism of control flow function?</h3>
              <i>
                Control flow function is the sequence in which statements or functions are executed. Since I/O operations are non-blocking in Node.js, control flow cannot be linear. Therefore, it registers a callback to the event loop and passes the control back to the node, so that the next lines of code can run without interruption. Ex:Read File
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
              <div style={titles}>
                <PrismCode
                  code={fsdir}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Read File</b>
              <p>fs method read the entire file into buffer.</p>
              <div style={titles}>
                <PrismCode
                  code={read}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Open File</b>
              <p>The fs.open() method is used to create, read, or write a file. </p>
              <div style={titles}>
                <PrismCode
                  code={opens}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Write</b>
              <div style={titles}>
                <PrismCode
                  code={writeFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <p>
                <ul>
                  <li><b>fs.appendFile(): </b>method appends specified content to a file. If the file does not exist, the file will be created.</li>
                  <ul><li><b>fs.appendFile(filepath, data, options, callback);</b></li></ul>
                  <br />
                  <li><b>fs.appendFile(): </b>method is used to synchronously append/Update the data to the file or Create a file.</li>
                  <ul><li><b>fs.appendFileSync(filepath, data, options);</b></li></ul>
                </ul>
              </p>
              <div style={titles}>
                <PrismCode
                  code={appendFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Rename File</b>
              <div style={titles}>
                <PrismCode
                  code={rename}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Delete File</b>
              <div style={titles}>
                <PrismCode
                  code={delFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Watch File</b>
              <p>
                <ul>
                  <li>This will set up a watcher on itself, change its own filename, and exit.</li>
                  <li>Watcher channels can be closed at any time using the following code snippet.</li>
                  <ul><li><b>const w = fs.watch('file', function(){ }) w.close();</b></li></ul>
                </ul>
              </p>
              <div style={titles}>
                <PrismCode
                  code={watch}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>File System2</h3>
              <b>Create Files</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={CreateFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Write File</b>
              <div style={titles}>
                <PrismCode
                  code={writeFile}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Open File</b>
              A text.txt file create in same the folter.
              <div style={titles}>
                <PrismCode
                  code={OpenFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Read Files</b>
              <div style={titles}>
                <PrismCode
                  code={ReadFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Rename Files</b>
              A text.txt file create without any data in same the folter.
              <div style={titles}>
                <PrismCode
                  code={RenameFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Delete Files</b>
              <div style={titles}>
                <PrismCode
                  code={deleteFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Update Files</b>
              <b></b>
              <div style={titles}>
                <PrismCode
                  code={UpdateFiles}
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

export default (withStyles(styles)(FileSys));
