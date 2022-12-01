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

const events = `
var fs = require('fs');
var rs = fs.createReadStream('./test.txt');

rs.on('open', function () {
  console.log('The file is open');
});`.trim();

const myEventHandler = `
//1
var events = require('events');
var eventEmitter = new events.EventEmitter();


var myEventHandler = function () {                                      //Create an event handler.
  console.log('I hear a scream!');
}

eventEmitter.on('scream', myEventHandler);                              //Assign the event handler to an event.

eventEmitter.emit('scream');                                            //Fire the 'scream' event.


//2
//test.txt
text file datas uuuuuuuuuuuuuuu

//events.js
var fs = require('fs');
var rs = fs.createReadStream('./test.txt');
rs.on('open', function() {
    console.log('The file is open');
});`.trim();

const firstEvt = `
const { EventEmitter } = require("events");
const firstEmitter = new EventEmitter();

const evt = firstEmitter.emit("My first event");
console.log(evt);


//2
const EventEmmiter = require('events').EventEmitter;

function counter(init) {
    this.increment = function() {
        init++;
        this.emit('incremented', init);
    }
}

counter.prototype = new EventEmmiter();
var counter = new counter(10);

function callback(count) {
    console.log(count);
}

counter.addListener('incremented', callback);

//counter.removeListener('incremented', callback);                 //To remove the event listeners bound to counte.
//counter.on('incremented', callback);                             //counter.on and counter.addListener are interchangeable.

counter.increment();
counter.increment();`.trim();

const SecondEvt = `
const EventEmitter = require("events");

class TicketManager extends EventEmitter {
 constructor(supply) {
 super();
 this.supply = supply;
 }
 
 buy(email, price) {
  this.supply--;
  this.emit("buy", email, price, Date.now());
  } 
}

module.exports = TicketManager;



//2
// const TicketManager = require("./ticketManager");
const ticketManager = new TicketManager(10);
ticketManager.on("buy", () => {
  console.log("Someone bought a ticket!");
 });
 
 ticketManager.once("buy", () => {
  console.log("This is only called once");
 });
 
 
 ticketManager.buy('test@gmail.com',10);
 ticketManager.buy('test@gmail.com',10);`.trim();

const capture = `
const ticketManager = new TicketManager(10);
ticketManager.on("buy", () => {
  console.log("Someone bought a ticket!");
 });

class EmailService {
  send(email) {
  console.log(Sending email to '$'{email});
  }
 }
 
 module.exports = EmailService;
 
 
 class DatabaseService {
  save(email, price, timestamp) {
  console.log(Running query: INSERT INTO orders VALUES
 (email, price, created) VALUES ('$'{email}, '$'{price}, '$'{timestamp}));
  }
 }
 module.exports = DatabaseService;
 
 
// const TicketManager = require("./ticketManager");
// const EmailService = require("./emailService");
// const DatabaseService = require("./databaseService");

const ticketManager = new TicketManager(3);
const emailService = new EmailService();
const databaseService = new DatabaseService();


ticketManager.on("buy", (email, price, timestamp) => {
  emailService.send(email);
  databaseService.save(email, price, timestamp);
 });

 this.emit("buy", email, price, Date.now());
 ticketManager.buy("test@email.com", 10);
 `.trim();

const handling = `
const EventEmitter = require("events");

class TicketManager extends EventEmitter {
 constructor(supply) {
 super();
 this.supply = supply;
 }
 
 buy(email, price) {
  if (this.supply > 0) {
  this.supply;
  this.emit("buy", email, price, Date.now());
  return;
  }
  this.emit("error", new Error("There are no more tickets left to purchase"));
 }
 
}

module.exports = TicketManager;


const ticketManager = new TicketManager(10);
ticketManager.on("buy", () => {
  console.log("Someone bought a ticket!");
 });
 
ticketManager.buy("test@email.com", 10);`.trim();

const addListener = `
var events = require("events");
var emitter = new events.EventEmitter();
var author = "Slim Shady";
var title = "The real Slim Shady";

emitter.on("addAuthorTitle", function (author, title) {                                   //an event listener.
  console.log("Added Author and Title " + author + " - " + title);
});

emitter.emit("addAuthorTitle", author, title);                                       //add record to db then emit an event.
`.trim();



const evtEmmiter = `
var emitter = require("events").EventEmitter;

function LoopProcessor(num) {
  var e = new emitter();

  setTimeout(function () {
    for (var i = 1; i <= num; i++) {
      e.emit("BeforeProcess", i);

      console.log("Processing number:" + i);

      e.emit("AfterProcess", i);
    }
  }, 2000);

  return e;
}
var lp = LoopProcessor(3);

lp.on("BeforeProcess", function (data) {
  console.log("About to start the process for " + data);
});

lp.on("AfterProcess", function (data) {
  console.log("Completed processing " + data);
});`.trim();

const getMaxListeners = `
const EventEmitter = require("events");

var eventEmitter1 = new EventEmitter();                                 // Initializing event emitter instances
var eventEmitter2 = new EventEmitter();

// Getting max listener
console.log("Default max listener", eventEmitter1.getMaxListeners());
console.log("Default max listener", eventEmitter2.getMaxListeners());


EventEmitter.defaultMaxListeners = 2;                                   // Set global deaultMaxListeners to 2

console.log("Default max listener", eventEmitter1.getMaxListeners());
console.log("Default max listener", eventEmitter2.getMaxListeners());

eventEmitter1.setMaxListeners(5);                                       // Set max listener of eventEmitter1 to 5

console.log("Default max listener", eventEmitter1.getMaxListeners());
console.log("Default max listener", eventEmitter2.getMaxListeners());


var fun1 = (msg) => {
  console.log("Message from fun1: " + msg);                             // Declaring listener fun1 to myEvent1
};

var fun2 = (msg) => {
  console.log("Message from fun2: " + msg);                             // Declaring listener fun2 to myEvent2
};

for (var i = 0; i < 3; i++) {
  eventEmitter1.addListener("myEvent1", fun1);                    // Listening to myEvent1 with 3 instance of fun1
}

for (var i = 0; i < 3; i++) {
  eventEmitter2.addListener("myEvent2", fun2);                    // Listening to myEvent2 with 3 instance of fun2
}

eventEmitter1.emit("myEvent1", "Event1 occurred");
eventEmitter2.emit("myEvent2", "Event2 occurred");`.trim();

const onces = `
var events = require("events");
var emitter = new events.EventEmitter();
var author = "Slim Shady";
var title = "The real Slim Shady";

emitter.once("addAuthorTitle", function (author, title) {
  console.log("Added Author and Title " + author + " - " + title);
});


emitter.emit("addAuthorTitle", author, title);                                  //add record to db then emit an event.
emitter.emit("addAuthorTitle", author, title);`.trim();

const raiseHandle = `
var events = require("events");
var em = new events.EventEmitter();

em.on("FirstEvent", function (data) {
  console.log("First subscriber: " + data);
});

em.emit("FirstEvent", "This is my first Node.js event emitter.");`.trim();

const removeListener = `
const EventEmitter = require("events");

var eventEmitter = new EventEmitter();

var geek1 = (msg) => {
  console.log("Message from geek1: " + msg);
};

var geek2 = (msg) => {
  console.log("Message from geek2: " + msg);
};


eventEmitter.on("myEvent", geek1);                                      // Registering geek1 and geek2
eventEmitter.on("myEvent", geek1);
eventEmitter.on("myEvent", geek2);

eventEmitter.removeListener("myEvent", geek1);                          // Removing listener geek1
eventEmitter.emit("myEvent", "Event occurred");
eventEmitter.removeAllListeners("myEvent");                             // Removing all the listeners to myEvent
eventEmitter.emit("myEvent", "Event occurred");`.trim();

const setMax = `
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.setMaxListeners(11);                                          // increase the limit

for (let i = 0; i < 11; i++) {
  myEmitter.on("event", (_) => console.log(i));
}

myEmitter.emit("event");
`.trim();

const evts = `
const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
`.trim();


class EvtNode extends Component {
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
              <h3>Events</h3>
              <ul>
                <li>Every action on a computer is an event. Like when a connection is made or a file is opened.</li>
                <li>Objects in Node.js can fire events, like the readStream object fires events when opening and closing a file.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={events}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>What is Event Emmitter</h3>
              <ul>
                <li>Node.js has a built-in module, called "Events", where we can create-, fire-, and listen for- own events.</li>
                <li>Can assign event handlers to own events with the EventEmitter object.</li>
                <li>All objects that emit events are members of EventEmitter class. These objects expose an <b>eventEmitter.on()</b> function that allows one/ more functions to be attached to events emitted by the object.</li>
                <li>When the EventEmitter object emits an event, all of the functions attached to that specific event are called synchronously.</li>
                <li>Node.js allows us to add a listener for an event with the on() function of an event emitter object. This listens for a particular event name and fires a callback when the event is triggered.</li>
              </ul>
              <br />
              <br />

              Node.js allows us to create and handle custom events by using events module. Event module includes EventEmitter class which can be
              used to raise and handle custom events.
              <br />
              <br />
              Many objects in a Node emit events, for example.
              <ul>
                <li>A net.Server emits an event each time a peer connects to it</li>
                <li>fs.readStream emits an event when the file is opened.</li>
                <li>All objects which emit events are the instances of events.EventEmitter.</li>
              </ul>
              <br />

              EventEmitter provides multiple properties like on and emit.
              <ul>
                <li><b>on: </b>property is used to bind a function with the event.</li>
                <li><b>emit: </b>is used to fire an event.</li>
              </ul>
              <br />
              <ul>
                <li><b>addListener(event, listener):</b> Adds a listener at the end of the listeners array for the specified event. No checks are made to see if the listener has already been added. Multiple calls passing the same
                  combination of event and listener will result in the listener being added multiple times. Returns emitter, so calls can be chained.</li>
                <li><b>on(event, listener):</b> Adds a listener at the end of the listeners array for the specified event. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of event and listener will result in the listener being added multiple times. Returns emitter, so calls can be chained.</li>
                <li><b>once(event, listener):</b> Adds a one time listener to the event. This listener is invoked only the next time the event is fired, after which it is removed. Returns emitter, so calls can be chained.</li>
                <li><b>removeListener(event, listener):</b> Removes a listener from the listener array for the specified event. Caution − It changes the array indices in the listener array behind the listener. removeListener will remove, at most, one instance of a listener from the listener array. If any single listener has been added multiple times to the listener array for the specified event, then removeListener must be called multiple times to remove each instance. Returns emitter, so calls can be chained.</li>
                <li><b>removeAllListeners([event]):</b> Removes all listeners, or those of the specified event. It's not a good idea to remove listeners that were added elsewhere in the code, especially when it's on an emitter that you didn't create (e.g. sockets or file streams). Returns emitter, so calls can be chained.</li>
                <li><b>setMaxListeners(n):</b> By default, EventEmitters will print a warning if more than 10 listeners are added for a particular event. This is a useful default which helps finding memory leaks. Obviously not all Emitters should be limited to 10. This function allows that to be increased. Set to zero for unlimited.</li>
                <li><b>listeners(event):</b> Returns an array of listeners for the specified event.</li>
                <li><b>emit(event, [arg1], [arg2], [...]):</b> Execute each of the listeners in order with the supplied arguments. Returns true if the event had listeners, false otherwise.</li>
                <li><b>listenerCount(emitter, event):</b> Returns the number of listeners for a given event.</li>
                <br />
                <li>There are two common patterns that can be used to raise and bind an event using EventEmitter class in Node.js.</li>
                <ul>
                  <li><b>Return EventEmitter from a function.</b></li>
                  <li><b>Extend the EventEmitter class.</b></li>
                </ul>
                <br />
                <li><b>Return EventEmitter from a function:</b> In this pattern, a constructor function returns an EventEmitter object, which was used to emit events inside a function. This EventEmitter object can be used to subscribe for the events.</li>
                <li>eventEmitter.on(event,listener) and eventEmitter.addListener(event, listener) are pretty much similar.</li>
              </ul>
              <br />

              <h3>addListener</h3>
              <ul>
                <li>Events are worthless unless there is some action to perform in response to an event. To handle an event response, Node
                  provides the on() and addListener() methods.</li>
                <li>Both methods take an event name and handler function as arguments. These methods can be used interchangeably because
                  they do the same thing: execute code based on events.</li>
                <li>Continuing with the author and title example, but adding a handler function to be invoked once the event is triggered.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={addListener}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <div style={titles}>
                <PrismCode
                  code={evts}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <div style={titles}>
                <PrismCode
                  code={myEventHandler}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />



              <h3>EventEmitter2</h3>
              <div style={titles}>
                <PrismCode
                  code={firstEvt}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Secon Evt</h3>
              <div style={titles}>
                <PrismCode
                  code={SecondEvt}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Capture Data</h3>
              <div style={titles}>
                <PrismCode
                  code={capture}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Handling Error</h3>
              <div style={titles}>
                <PrismCode
                  code={handling}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Extend EventEmitter</h3>
              In this pattern, we can extend the constructor function from EventEmitter class to emit the events.
              <div style={titles}>
                <PrismCode
                  code={evtEmmiter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>getMaxListeners</h3>
              <div style={titles}>
                <PrismCode
                  code={getMaxListeners}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Once</h3>
              Sometimes you want your application to respond to an event only one time (the first time the event occurs).
              To do this, Node provides the once() method. It is used just like the addListener() and on() methods, but allows for
              responding to the event only once.
              <div style={titles}>
                <PrismCode
                  code={onces}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Raise and Handle</h3>
              <ul>
                <li>on() method requires name of the event to handle and callback function which is called when an event is raised.</li>
                <li>emit() function raises the specified event. First parameter is name of the event as a string and then arguments. </li>
                <li>An event can be emitted with zero or more arguments.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={raiseHandle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>removeListener</h3>
              <div style={titles}>
                <PrismCode
                  code={removeListener}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>setMax</h3>
              <div style={titles}>
                <PrismCode
                  code={setMax}
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

export default (withStyles(styles)(EvtNode));
