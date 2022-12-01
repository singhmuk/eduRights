import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../ReactJs/styles.css'
import Sidebar from './sidebar';
import PrismCode from '../ReactJs/prismCode';


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

const slide={
  paddingRight:100
}

const slides={
  paddingRight:150
}

const consoles = `
debugger;

console.log(Math.random());                           //give line number in file
console.warn(Math.random(3));
console.error(Math.random(4>5));

console.table([
        {id:1, name:'Apple'},
        {id:2, name:'Book'},
        {id:3, name:'Cat'},
    ]);

console.group('label');
    console.info('One');
    console.info('Two');
    console.info('Three');
console.group('label');

custom:
  console.log('%s', 'custom');
  console.log('%d', '1');
  console.log('%cHi', 'font-size:20px');
  
  console.clear();`.trim();

const Verbose = `
Violatin is dissable: Default levels => Verbose, enable
console.debug('Hi')        //console.debug is Verbose

XHR/fetch break point => url cointain localhost:5000; => enter`.trim();

const elements = `
ctrl+f = enter text which inspect
write on inspect elemets than, enter

in console, $0.innerText
            $0.innerText = 'cool'`.trim();

const storings = `
localStorage.setItem('name', 'Kyle')            //This function takes two string parameters key values paire.
sessionStorage.setItem('name', 'Kyle')


document.cookie = 'name=Kyle'                 //the name and value are separated by an equals sign.

In order to set an expiration date manually we need to pass the expires key a UTC date value.
document.cookie = 'name=Kyle; expires='$'{new Date(9999, 0, 1).toUTCString()}'
`.trim();

const getItems = `
localStorage.setItem('name', 'Kyle')
localStorage.getItem('name') // Kyle

sessionStorage.setItem('name', 'Kyle')
sessionStorage.getItem('name') // Kyle


Cookies are a bit more difficult since there is no way to get an individual cookie. The only way to get 
cookies is to get all the cookies at once by accessing the document.cookie object.
document.cookie 
`.trim();

const removeItems = `
localStorage.removeItem('name')
sessionStorage.removeItem('name')


To remove a cookie you need to set the cookie again but give it a blank value and a past expiration date.
document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
`.trim();

// const storings = ``.trim();


class DevTools extends Component {
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
              <h3>1. Console</h3>
              <div style={titles}>
                <PrismCode
                  code={consoles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>2. Verbose</h3>
              <div style={titles}>
                <PrismCode
                  code={Verbose}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. Network</h3>
              <ol>
                <li><b>show disable: </b>setting than, click on show overview</li>
                <li>Top left red circle stop n/w requet in n/w tab</li>
                <li><b>Response Headers: </b>Values sends by remote server</li>
                <li><b>Request Handlers: </b>Request made by developers</li>
                <li><b>Initiator: </b>Tab show requests made to which side and order also.</li>
              </ol>
              Check webside performance in low internet: Select(No throtting) Fast 3G, Slow 3G from second row below n/w.
              web socket are not throtting.
              <br />
              <br />
              <b>n/w than, right click on url than, copy than, inside console paste than, enter than, again made request in n/w.</b>
              <h3>4. Elemets</h3>
              <div style={titles}>
                <PrismCode
                  code={elements}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Memory</h3>
              <b>Heap snapshort: </b>delete  than, select Heap snapshort than, start tab below
              window after that click stop btn.
              <br />

              <h3>Basic Linux CLI Commands</h3>
              <ul>
                <li><b>ls:</b> List the directory (folder) system.</li>
                <li><b>mv:</b> Move a file to another folder.</li>
                <li><b>mkdir:</b> Creates a new directory (folder).</li>
                <li><b>rmdir:</b> Remove a directory (folder).</li>
                <li><b>exit:</b> Closes the CLI window.</li>
              </ul>
              <br />

              <h3>Basic Windows CLI Commands</h3>
              <ul>
                <li><b>dir:</b> List the directory (folder) system.</li>
                <li><b>copy:</b> Copy a file to another folder.</li>
                <li><b>move:</b>Move a file to another folder.</li>
                <li><b>mkdir or md:</b>Creates a new directory (folder).</li>
                <li><b>rmdir or rd:</b>Removes a directory (folder).</li>
              </ul>
              <br/>

              <h3>HTML Web Storage Objects</h3>
              HTML web storage provides three objects for storing data on the client:
              <ol>
                <li><b>window.localStorage: </b>stores data with no expiration date.</li>
                <li><b>window.sessionStorage: </b>stores data for one session (data is lost when the browser tab is closed).</li>
                <br/>
                <li><b>Cookies: </b></li>
              </ol>
              <br />
              <table>
                <tr>
                  <th></th>
                  <th style={slide}>Cookies</th>
                  <th style={slide}>Local Storage</th>
                  <th>Session Storage</th>
                </tr>
                <tr>
                  <td style={slide}>Capacity</td>
                  <td style={slides}>4kb</td>
                  <td style={slides}>10mb</td>
                  <td>5mb</td>
                </tr>
                <tr>
                  <td>accessible Form</td>
                  <td>Any windows</td>
                  <td>Any windows</td>
                  <td>Same windows</td>
                </tr>
                <tr>
                  <td>Expires</td>
                  <td>Manually Set</td>
                  <td>Never</td>
                  <td>On tab close</td>
                </tr>
                <tr>
                  <td>Storage Location</td>
                  <td>Browser and Server</td>
                  <td>Browser only</td>
                  <td>Browser only</td>
                </tr>
                <tr>
                  <td>Sent with requests</td>
                  <td>Yes</td>
                  <td>No</td>
                  <td>No</td>
                </tr>
              </table>
              <br/>

              <ul>
                <li> All three methods of storage are used to store information on the user's browser which can be accessed even after navigating to new pages on your site. This data is also saved to the user's exact browser they are using so if they have your site open in Chrome it will only save the information to their Chrome browser on the device they are currently on.</li>
                <li>you shouldn't be storing too much information in cookies.</li>
                <br/>
                <b>Access</b>
                <li>Local storage is accessible in any window or tab that is open to your site. This means if you store some data in local storage on one tab of your browser that same local storage data will be available on all other tabs and windows you have open to that site.</li>
                <li>This differs from session storage which is only available in the current tab you set the session storage data in.</li>
                <li>cookies are very similar to local storage in that they are accessible from any window or tab after they are set, but one thing that makes them unique is that cookies are also accessible on the server as well. This is because for every request you make to your backend server all of your cookies are also sent along. This makes cookies ideal for authentication related tasks.</li>
                <br/>
                <b>Storing Data</b>
                <div style={titles}>
                <PrismCode
                  code={storings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <b>Getting Data</b>
              <div style={titles}>
                <PrismCode
                  code={getItems}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <b>Removing Data</b>
              <div style={titles}>
                <PrismCode
                  code={removeItems}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              </ul>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(DevTools));
