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

const convertJson = `
import json

employee = '{"id":"09", "name": "Nitin", "department":"Finance"}'

employee_dict = json.loads(employee)                               
json_object = json.dumps(employee_dict, indent=4)  

print(json_object)
print(employee_dict)


# 2
f = open('data.json',)                                
data = json.load(f)                                   

for i in data['emp_details']:
	print(i)

f.close()
 `.trim();


const update = `
x = '{ "organization":"GeeksForGeeks", "city":"Noida", "country":"India"}'
y = {"pin":110096}
z = json.loads(x)                                                                     

z.update(y)                                                                           # appending the data
print(json.dumps(z))
`.trim();

const jsonformat = `
{
  "firstName": "Jane",
  "lastName": "Doe",
  "hobbies": ["running", "swimming", "singing"],
  "age": 28,
  "children": [
      {
          "firstName": "Alex",
          "age": 5
      },
      {
          "firstName": "Bob",
          "age": 7
      }
  ]
}`.trim();


const decoding = `
z = json.loads(zJSON)
print(type(z))
print(z)

def decode_complex(dct):
    if complex.__name__ in dct:
        return complex(dct["real"], dct["imag"])
    return dct

z = json.loads(zJSON, object_hook=decode_complex)                   # Now the object is of type complex after decoding
print(type(z))
print(z)`.trim();

const instance = `
import json

class User:
    def __init__(self, name, age, active, balance, friends):
        self.name = name
        self.age = age
        self.active = active
        self.balance = balance
        self.friends = friends
        
class Player:
    def __init__(self, name, nickname, level):
        self.name = name
        self.nickname = nickname
        self.level = level
          
            
def encode_obj(obj):
    """Takes in a custom object and returns a dictionary representation of the object."""
  
    obj_dict = {                                              #  Populate the dictionary with object meta data 
      "__class__": obj.__class__.__name__,
      "__module__": obj.__module__
    }
  
    obj_dict.update(obj.__dict__)                             #  Populate the dictionary with object properties
    return obj_dict

def decode_dct(dct):
    if "__class__" in dct:
        class_name = dct.pop("__class__")
        
        module_name = dct.pop("__module__")                    # Get the module name from the dict and import it
        module = __import__(module_name)
        class_ = getattr(module,class_name)                       
        obj = class_(**dct)
    else:
        obj = dct
    return obj

    
# User class works with our encoding and decoding methods
user = User(name = "John",age = 28, friends = ["Jane", "Tom"], balance = 20.70, active = True)

userJSON = json.dumps(user,default=encode_obj, sort_keys=True)
print(userJSON)

user_decoded = json.loads(userJSON, object_hook=decode_dct)
print(type(user_decoded))


player = Player('Max', 'max1234', 5)         
playerJSON = json.dumps(player,default=encode_obj, sort_keys=True)
print(playerJSON)

player_decoded = json.loads(playerJSON, object_hook=decode_dct)
print(type(player_decoded))
`.trim();

const create = `
#1
fr = open("test.txt", "r")
print(fr.read())

fr.close()


#2
with open('./notes.txt','r') as fr:
    print(fr.read())

#3
with open('./notes.txt','w') as fw:
    data = 'some data to be written to the file'
    print(fw.write(data))
`.trim();

const openFiles = `
#1
with open('data.txt', 'r+') as fr:
  data = 'some data to be written to the file'
  print(fr.write(data))


#2
file1 = open("myfile.txt", "w")
L = ["This is Delhi ", "This is Paris ", "This is London"]

file1.writelines(L)
file1.close()

file1 = open("myfile.txt", "r+")

print(file1.read())
print()


#3 
f = open("myfile.txt", "r")
f.seek(4)
print(f.readline())


#4 Difference between read and readline
file1 = open("myfile.txt", "r")
print(file1.read(8))

print("Output of Readline(9) function is ")
print(file1.readline(9))             

file1.close()


#5 Appending to a file
file1 = open("myfile.txt", "w")
L = ["This is Delhi", "This is Paris", "This is London"]
file1.writelines(L)
file1.close()


#6 Append-adds at last
file1 = open("myfile.txt", "a")
file1.write("Today")
file1.close()

file1 = open("myfile.txt", "r")
print("Output of Readlines after appending")
print(file1.read())
file1.close()


#7 Write-Overwrites
file1 = open("myfile.txt", "w")
file1.write("Tomorrow")
file1.close()

file1 = open("myfile.txt", "r")
print(file1.read())
file1.close()`.trim();

const deletes = `
import os
if os.path.exists("demofile.txt"):
  os.remove("demofile.txt")
else:
  print("The file does not exist")
`.trim();


class Json extends Component {
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
              <h3>Convert from Python to JSON</h3>
              <ul>
                <li><b>json.loads(): </b>Convert string to Python dict.</li>
                <ul>
                  <li>json.load() method can read a file which contains a JSON object.</li>
                  <li>returns JSON object as a dictionary</li>
                  <li>parsing JSON string</li>
                  <li>Serialization (From Python to JSON)</li>
                  <li>The Python module json converts a Python dictionary object into JSON object, and list and tuple
                    are converted into JSON array, and int and float converted as JSON number, None converted as JSON
                    null.</li>
                </ul>
                <br />

                <li><b>json.dump() : </b>method can be used for conversion to JSON.</li>
                It takes 2 parameters:
                <ul>
                  <li><b>dictionary – </b>name of dictionary which should be converted to JSON object.</li>
                  <li><b>file pointer – </b>pointer of the file opened in write or append mode.</li>
                  <li>Deserialization (FROM JSON to Python)</li>
                  <li><b>loads(): </b>To deserialize a JSON document to a Python object.</li>
                  <li><b>load(): </b>To deserialize a JSON formatted stream to a Python object.</li>
                </ul>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={convertJson}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>update() / append</h3>
              This method update the dictionary with elements from another dictionary object.
              <br />
              <div style={titles}>
                <PrismCode
                  code={update}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>JSON format</h3>
              <div style={titles}>
                <PrismCode
                  code={jsonformat}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Decoding</h3>
              Decoding a custom object with the defaut JSONDecoder, but it will be decoded into a dictionary. It write a custom decode
              function that take a dictionary as input, and creates custom object.
              Use this function for the object_hook argument in the json.load() method.
              <div style={titles}>
                <PrismCode
                  code={decoding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Template encode and decode functions</h3>
              This works for all custom classes if all instance variables are given in the __init__ method.
              <div style={titles}>
                <PrismCode
                  code={instance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>What do file-related modules in Python do? </h3>
              Python comes with some file-related modules that have functions to manipulate text files and binary files in a file system. These modules can be used to create text or binary files, update their content, copy, delete, and more.
              Some file-related modules are os, os.path, and shutil.os. The os.path module has functions to access the file system, while the shutil.os module can be used to copy or delete files.

              <br />
              <br />
              <br />
              <b>Explain the use of the 'with' statement and its syntax.</b>
              <br />
              Using the ‘with’ statement, we can open a file and close it as soon as the block of code, where ‘with’ is used, exits.
              <br />
              <br />
              “With” statement, you get better syntax and exceptions handling.
              In addition, it will automatically close the file.

              <h3>Create File</h3>
              <div style={titles}>
                <PrismCode
                  code={create}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Open File</h3>
              <ul>
                <li><b>Text files :</b>Each line of text is terminated with a special character called EOL (End of Line), which is the new line character (‘\n’) in Python by default.</li>
                <li><b>Binary files :</b>There is no terminator for a line and the data is stored after converting it into machine-understandable binary language.</li>
                <li><b>Read Only (‘r’) :</b>Open text file for reading. The handle is positioned at the beginning of the file. If the file does not exist, raises I/O error. This is also the default mode in which the file is opened.</li>
                <li><b>Read and Write (‘r+’) :</b>Open the file for reading and writing. The handle is positioned at the beginning of the file. Raises I/O error if the file does not exist.</li>
                <li><b>Write Only (‘w’) :</b>Open the file for writing. For existing file, the data is truncated and over-written. The handle is positioned at the beginning of the file. Creates the file if the file does not exist.</li>
                <li><b>Write and Read (‘w+’) :</b>Open the file for reading and writing. For existing file, data is truncated and over-written. The handle is positioned at the beginning of the file.</li>
                <li><b>Append Only (‘a’) :</b>Open the file for writing. The file is created if it does not exist. The handle is positioned at the end of the file. The data being written will be inserted at the end, after the existing data.</li>
                <li><b>Append and Read (‘a+’) :</b>Open the file for reading and writing. The file is created if it does not exist. The handle is positioned at the end of the file. The data being written will be inserted at the end, after the existing data.</li>
              </ul>
              <br />

              <ul>
                <li><b>seek(n): </b>Takes the file handle to the nth bite from the beginning.</li>
                <li><b>readlines(): </b>returns a list containing each line in the file as a list item.</li>
                <li>When the file is opened in append mode, the handle is positioned at the end of the file. The data being written
                  will be inserted at the end, after the existing data.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={openFiles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Delete a file</h3>
              <div style={titles}>
                <PrismCode
                  code={deletes}
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

export default (withStyles(styles)(Json));
