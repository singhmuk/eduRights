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

const serverity = `
import logging
logging.debug('This is a debug message')
logging.info('This is an info message')
logging.warning('This is a warning message')
logging.error('This is an error message')
logging.critical('This is a critical message')


o/p:
WARNING:root:This is a warning message
ERROR:root:This is an error message
CRITICAL:root:This is a critical message`.trim();

const hierarchy = `
# helper.py
import logging
logger = logging.getLogger(__name__)
logger.info('HELLO')

# main.py
import logging
logging.basicConfig(level=logging.INFO, format='%(name)s - %(levelname)s - %(message)s')
import helper

# o/p:
# helper - INFO - HELLO`.trim();

const reason = `
# helper.py
import logging
logger = logging.getLogger(__name__)
logger.propagate = False
logger.info('HELLO')

# main.py
import logging
logging.basicConfig(level=logging.INFO, format='%(name)s - %(levelname)s - %(message)s')
import helper
`.trim();

const optionally = `
import logging

logger = logging.getLogger(__name__)

stream_handler = logging.StreamHandler()                                    # Create handlers
file_handler = logging.FileHandler('file.log')

                                                                  # Configure level and formatter and add it to handlers
stream_handler.setLevel(logging.WARNING)                                    # warning and above is logged to the stream
file_handler.setLevel(logging.ERROR)                                        # error and above is logged to a file

stream_format = logging.Formatter('%(name)s - %(levelname)s - %(message)s')
file_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
stream_handler.setFormatter(stream_format)
file_handler.setFormatter(file_format)


logger.addHandler(stream_handler)                                           # Add handlers to the logger
logger.addHandler(file_handler)

logger.warning('This is a warning')                                         # logged to the stream
logger.error('This is an error')                                            # logged to the stream AND the file!
`.trim();

const filters = `
class InfoFilter(logging.Filter):
    def filter(self, record):
        return record.levelno == logging.INFO                               # Now only INFO level messages will be logged


stream_handler.addFilter(InfoFilter())
logger.addHandler(stream_handler)`.trim();

const traceback = `
import logging

try:
    a = [1, 2, 3]
    value = a[3]
except IndexError as e:
    logging.error(e)
    logging.error(e, exc_info=True)
    
o/p:
ERROR:root:list index out of range
ERROR:root:list index out of range
Traceback (most recent call last):
  File "<ipython-input-6-df97a133cbe6>", line 5, in <module>
    value = a[3]
IndexError: list index out of range
`.trim();

const correct = `
import logging
import traceback

try:
    a = [1, 2, 3]
    value = a[3]
except:
    logging.error("uncaught exception: %s", traceback.format_exc())`.trim();

const rotating = `
import logging
from logging.handlers import RotatingFileHandler

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

handler = RotatingFileHandler('app.log', maxBytes=2000, backupCount=5)    
logger.addHandler(handler)                    # roll over after 2KB, and keep backup logs app.log.1, app.log.2 ,...

for _ in range(10000):
    logger.info('Hello, world!')`.trim();

const midnight = `
import logging
import time
from logging.handlers import TimedRotatingFileHandler
 
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# This will create a new log file every minute, and 5 backup files with a timestamp before overwriting old logs.
handler = TimedRotatingFileHandler('timed_test.log', when='m', interval=1, backupCount=5)
logger.addHandler(handler)
 
for i in range(6):
    logger.info('Hello, world!')
    time.sleep(50)`.trim();

const records = `
import logging
from pythonjsonlogger import jsonlogger

logger = logging.getLogger()

logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)`.trim();

const resources = `
with open('notes.txt', 'w') as f:
    f.write('some todo...')`.trim();

const execution = `
class ManagedFile:
    def __init__(self, filename):
        print('init', filename)
        self.filename = filename
        
    def __enter__(self):
        print('enter')
        self.file = open(self.filename, 'w')
        return self.file
        
    def __exit__(self, exc_type, exc_value, exc_traceback):
        if self.file:
            self.file.close()
        print('exit')
            
with ManagedFile('notes.txt') as f:
    print('doing stuff...')
    f.write('some todo...')`.trim();

const resource = `
from contextlib import contextmanager

@contextmanager
def open_managed_file(filename):
    f = open(filename, 'w')
    try:
        yield f
    finally:
        f.close()
        
with open_managed_file('notes.txt') as f:
    f.write('some todo...')`.trim();


class Logging extends Component {
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
              <h3>1. Log Level</h3>
              There are 5 different log levels indicating the serverity of events. By default, the system logs only events with level WARNING and above.
              <div style={titles}>
                <PrismCode
                  code={serverity}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Logging in modules and logger hierarchy</h3>
              <ul>
                <li>To create an internal logger using the __name__ global variable.</li>
                <li>This will create a logger with the name of our module and ensures no name collisions. The logging module creates a hierarchy of
                  loggers, starting with the root logger, and adding the new logger to this hierarchy.</li>
                <li>If import our module in another module, log messages can be associated with the correct module through the logger name.</li>
              </ul>
              <b>N: </b>Changing the basicConfig of the root logger will also affect the log events of the other (lower) loggers in the hierarchy.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={hierarchy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Propagation</h3>
              <ul>
                <li>By default, all created loggers will pass the log events to the handlers of higher loggers, in addition to any handlers attached
                  to the created logger.</li>
                <li>We can deactivate this by setting <b>propagate = False</b>.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={reason}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>No output when running main.py since the helper module logger does not propagate its messages to the root logger.</i>
              <br />

              <h3>4. LogHandlers</h3>
              Handler objects are responsible for dispatching the appropriate log messages to the handler's specific destination.
              <br />
              <br />
              For example can use different handlers to send log messaged to the standard output stream, to files, via HTTP, or via Email.
              Typically you configure each handler with a
              <ul>
                <li>level (setLevel())</li>
                <li>formatter (setFormatter())</li>
                <li>and optionally a filter (addFilter())</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={optionally}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Example of a filter</h3>
              overwrite InfoFilter() method. Only log records for which this
              function evaluates to True will pass the filter.
              <div style={titles}>
                <PrismCode
                  code={filters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Capture Stack traces</h3>
              Logging the traceback in our exception logs can be very helpful for trouble shooting issues. W can capture the traceback in
              logging.error() by setting the <b>exc_info = True</b>.
              <div style={titles}>
                <PrismCode
                  code={traceback}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              If don't capture the correct Exception, you can also use the <b>traceback.format_exc()</b> method to log the exception.
              <div style={titles}>
                <PrismCode
                  code={correct}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Rotating FileHandler</h3>
              When we have a large application that logs many events to a file, and only need to keep track of the most recent events,
              then use a <b>RotatingFileHandler</b> that keeps the files small. When the log reaches a certain number of bytes, it gets <b>"rolled over"</b>.
              We can also keep multiple backup log files before overwriting them.
              <div style={titles}>
                <PrismCode
                  code={rotating}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. TimedRotatingFileHandler</h3>
              If our application will be running for a long time, Can use a TimedRotatingFileHandler. This will create a rotating log
              based on how much time has passed. Possible time conditions.
              <ul>
                <li>second (s)</li>
                <li>minute (m)</li>
                <li>hour (h)</li>
                <li>day (d)</li>
                <li>w0-w6 (weekday, 0=Monday)</li>
                <li>midnight</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={midnight}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Logging in JSON Format</h3>
              If our application generates many logs from different modules, and especially in a microservice architecture, it can be
              challenging to locate the important logs for our analysis.
              <br />
              Therefore, log our messages in JSON format, and send them to a centralized log management system. Then can analyze log records.
              <div style={titles}>
                <PrismCode
                  code={records}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Context managers and the 'with' statement</h3>
              Context managers are a great tool for resource management. They allow to allocate and release
              resources precisely when want to.
              <br />
              <b>Ex. </b>with open() statemtent:
              <div style={titles}>
                <PrismCode
                  code={resources}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>This will open a file and makes sure to automatically close it after program execution leaves the
                context of the with statement. It also handles exceptions and makes sure to properly close the file
                even in case of an exception.</i>
              <br />
              <br />

              <b>Examples of context managers</b>
              <br />
              <ul>
                <li>Open and close files</li>
                <li>open and close database connections</li>
                <li>Acquire and release locks:</li>
              </ul>
              <br />

              <h3>10. Implementing a context manager as a class</h3>
              To support the with statement for our own classes, we have to implement the __enter__ and __exit__ methods.
              Python calls __enter__ when execution enters the context of the with statement. Here the resource should be
              acquired and returned. When execution leaves the context again, __exit__ is called and the resource is freed up.
              <div style={titles}>
                <PrismCode
                  code={execution}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. Implementing a context manager as a generator</h3>
              Instead of writing a class, we can also write a generator function and decorate it with the
              <b>contextlib.contextmanager</b> decorator. Then we can also call the function using a with statement.
              <br />

              For this approach, the function must yield the resource in a try statement, and all the content of
              the __exit__ method to free up the resource goes now inside the corresponding finally statement.
              <br />
              <div style={titles}>
                <PrismCode
                  code={resource}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>The generator first acquires the resource. Then temporarily suspends its own execution and yields
                the resource so it can be used by the caller. When the caller leaves the with context, the generator
                continues to execute and frees up the resource in the finally statement.</i>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Logging));
