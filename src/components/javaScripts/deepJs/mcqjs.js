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

const change = `
document.title="My New Title";`.trim();

const thisKey = ``.trim();




class McqJs extends Component {
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
              <h3>1. Explain the procedure of document loading.</h3>
              Loading a document tells preparing it for further execution on the system. The document loads instantly on the browser when 
              there is a running document on the system. The application (browser) permits the JavaScript engine to do dual tasks:
              <br/>
              <br/>
              <ul>
                <li>Search for all the properties, provided to the object.</li>
                <li>Involve all the property values, used in the content that is being served for the page about to load.</li>
              </ul>
              <br/>

              <h3>2. What is the function of close () in JavaScript?</h3>
              The function of close () is mainly used to close the latest window. You have to write window.close() to make sure that this 
              command is clearly associated with a window object and not the other JavaScript object.
              <br/>

              <h3>3. What is the JavaScript Event Delegation Model?</h3>
              There is a lot of cool stuff available in JavaScript and one of them is Delegation model. When you are bubbling and 
              capturing, it permit functions to apply a single handler to several elements at a specific time then it’s called 
              Event Delegation. It basically permits you to put event listeners to single parent instead of particular nodes. That 
              specific listener analyzes the bubbled events to get a match on the child elements. Several individuals think it to 
              be daunting job but in reality, it seems easy if one begins to understand it.
              <br/>

              <h3>4. What do you mean by JavaScript BOM?</h3>
              BOM refers to “Browser Object Modal” that permits JavaScript to “talk” to the browser, modern browsers, no standards 
              apply same BOMS – screen, history, window, location, timing, navigator, and cookies.
              <br/>

              <h3>5. In what way we can change the title of the page in JavaScript?</h3>
              <div style={titles}>
                <PrismCode
                  code={change}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>6. Explain JavaScript Cookies.</h3>
              Cookies are the tiny test files that are properly stored in a computer, and they get build when the user goes to the 
              websites to store some information that they require. Examples are User name details and information about the 
              shopping cart from earlier visits.
              <br/>

              <h3>Explain the role of deferred scripts in JavaScripts.</h3>
              The HTML code’s parsing while the page is loading is stopped by default until the script has not paused executing. 
              If your server is a little slow or the script is specifically heavy, then your webpage will be delayed. While you 
              are using Deferred, scripts delays the execution for sometime of the script till the time the HTML parser is 
              running. This lessens the loading time of web pages and get showed up faster.
              <div style={titles}>
                <PrismCode
                  code={thisKey}
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

export default (withStyles(styles)(McqJs));
