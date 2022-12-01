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

const button = `
import tkinter as tk

r = tk.Tk()
r.title('Counting Seconds')
button = tk.Button(r, text='Stop', width=25, command=r.destroy)
button.pack()
r.mainloop()


#
from tkinter import *

root = Tk()
frame = Frame(root)
frame.pack()
bottomframe = Frame(root)
bottomframe.pack(side=BOTTOM)
redbutton = Button(frame, text='Red', fg='red')
redbutton.pack(side=LEFT)
greenbutton = Button(frame, text='Brown', fg='brown')
greenbutton.pack(side=LEFT)
bluebutton = Button(frame, text='Blue', fg='blue')
bluebutton.pack(side=LEFT)
blackbutton = Button(bottomframe, text='Black', fg='black')
blackbutton.pack(side=BOTTOM)
root.mainloop()`.trim();

const checkbox = `
from tkinter import *
master = Tk()
var1 = IntVar()
Checkbutton(master, text='male', variable=var1).grid(row=0, sticky=W)
var2 = IntVar()
Checkbutton(master, text='female', variable=var2).grid(row=1, sticky=W)
mainloop()`.trim();

const inputField = `

from tkinter import *
master = Tk()
Label(master, text='First Name').grid(row=0)
Label(master, text='Last Name').grid(row=1)
e1 = Entry(master)
e2 = Entry(master)
e1.grid(row=0, column=1)
e2.grid(row=1, column=1)
mainloop()


# Display text
from tkinter import *
root = Tk()
w = Label(root, text='GeeksForGeeks.org!')
w.pack()
root.mainloop()


# Number
from tkinter import *
master = Tk()
w = Spinbox(master, from_ = 0, to = 10)
w.pack()
mainloop()`.trim();

const menus = `
from tkinter import *

root = Tk()
menu = Menu(root)
root.config(menu=menu)
filemenu = Menu(menu)
menu.add_cascade(label='File', menu=filemenu)
filemenu.add_command(label='New')
filemenu.add_command(label='Open...')
filemenu.add_separator()
filemenu.add_command(label='Exit', command=root.quit)
helpmenu = Menu(menu)
menu.add_cascade(label='Help', menu=helpmenu)
helpmenu.add_command(label='About')
mainloop()`.trim();

const radio = `
from tkinter import *
root = Tk()
v = IntVar()
Radiobutton(root, text='GfG', variable=v, value=1).pack(anchor=W)
Radiobutton(root, text='MIT', variable=v, value=2).pack(anchor=W)
mainloop()`.trim();

const scale = `
from tkinter import *
master = Tk()
w = Scale(master, from_=0, to=42)
w.pack()
w = Scale(master, from_=0, to=200, orient=HORIZONTAL)
w.pack()
mainloop()`.trim();


class Tkinter extends Component {
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
              <h3>What do you understand by Tkinter?</h3>
              Tkinter is an in-built Python module that is used to create GUI applications. It is Python’s standard toolkit for GUI development.
              <br />
              <br />
              Python provides various options for developing GUIs. Most important are listed below.
              <br />
              <ul>
                <li><b>Tkinter −</b> Tkinter is the Python interface to the Tk GUI toolkit shipped with Python.</li>
                <li><b>wxPython −</b> Is an open-source Python interface for wxWindows.</li>
                <li><b>JPython −</b> Is a Python port for Java which gives Python scripts seamless access to Java class libraries on the local machine</li>
              </ul>

              <h3>1. Button</h3>
              <div style={titles}>
                <PrismCode
                  code={button}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Checkbox</h3>
              <div style={titles}>
                <PrismCode
                  code={checkbox}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Input Fields</h3>
              <div style={titles}>
                <PrismCode
                  code={inputField}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Menu</h3>
              <div style={titles}>
                <PrismCode
                  code={menus}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Radio</h3>
              <div style={titles}>
                <PrismCode
                  code={radio}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Scale</h3>
              <div style={titles}>
                <PrismCode
                  code={scale}
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

export default (withStyles(styles)(Tkinter));
