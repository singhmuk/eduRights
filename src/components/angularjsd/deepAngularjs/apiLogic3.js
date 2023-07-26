import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../../ReactJs/styles.css";
import Sidebar from "../sidebar";
import PrismCode from "../../ReactJs/prismCode";

const titles = { backgroundColor: "#F0F8FF", padding: "1px", fontSize: "16px" };

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
});

const choose = `
//html
<button (click)="onClick()">Click me</button>
<div #myButton>Selected element</div>


import { Component, ViewChild, ElementRef } from '@angular/core';
export class AppComponent {
  @ViewChild('myButton') myElement!: ElementRef;

  onClick() {
    console.log(this.myElement.nativeElement);
  }
}`.trim();

const ngZone = `
//html
<p>Value: {{ value }}</p>


import { Component, NgZone } from '@angular/core';
export class MyComponent {
  value: string;

  constructor(private zone: NgZone) {
    // Listen for changes to the model data outside the NgZone
    someExternalService.onDataChanged((newValue) => {
      // Update the model data inside the NgZone
      this.zone.run(() => {
        this.value = newValue;
      });
    });
  }
}`.trim();

const cookies = `
// Set a cookie
this.cookieService.set('myCookie', 'myValue');

// Get a cookie
const myCookieValue = this.cookieService.get('myCookie');

// Clear a cookie
this.cookieService.delete('myCookie');`.trim();

const contentPro = `
//add in html of childs.ts
<ng-content></ng-content>


//add in html of app.component.ts
<child>Mukesh</child>
<child>Rakesh</child>
<child>Nitesh</child>
`.trim();

class Logic3 extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4>
              <Sidebar />
            </h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>1. How do you choose an element from a component template</h3>
              To create a template reference variable, you can add the # symbol
              followed by a name to the element you want to select.
              <br />
              <br />
              With the help of the ViewChild decorator can get a reference to
              the element in the component class.
              <div style={titles}>
                <PrismCode
                  code={choose}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>
                2. What happens when you use the script tag within a template.
              </h3>
              <ul>
                <li>
                  If you include a script tag within a template, the content of
                  the tag is treated as text and displayed in the template as
                  is. It is not executed as JavaScript code.
                </li>
                <br />
                <li>
                  This is because Angular's built-in security system, called
                  "Sanitization", is designed to protect against Cross-Site
                  Scripting (XSS) attacks by removing potentially dangerous code
                  from the HTML before it is rendered in the browser.
                </li>
                <br />
                <li>
                  To include a script in an Angular application, you should use
                  the Angular CLI to install and manage external dependencies or
                  create a custom Angular service to handle dynamic script
                  loading.
                </li>
              </ul>
              <br />
              <h3>
                3. How will you update the view if your model data is updated
                outside the 'Zone'.
              </h3>
              <ul>
                <li>
                  In Angular, the NgZone service is responsible for running
                  change detection and updating the view when model data
                  changes. However, if model data is updated outside the NgZone,
                  Angular may not be aware of the changes and may not update the
                  view as expected.
                </li>
                <br />
                <li>
                  To update the view if your model data is updated outside the
                  NgZone, you can use the zone.run() method to execute a
                  function inside the NgZone.{" "}
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={ngZone}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              we're using the someExternalService to listen for changes to the
              model data outside the NgZone. When the data changes, we're using
              the zone.run() method to update the model data inside the NgZone,
              which triggers change detection and updates the view.
              <br />
              <br />
              <h3>4. How will you set, get, and clear cookies in Angular.</h3>
              <ul>
                <li>
                  You can use the ngx-cookie-service library to set, get, and
                  clear cookies. This library provides an easy-to-use API for
                  working with cookies in Angular.
                </li>
                <li>
                  Now, you can use the CookieService to set, get, and clear
                  cookies:
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={cookies}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>5. Content Projection</h3>
              Content Projection in Angular is a technique for passing content
              from a parent component to its child components via the component
              template.
              <div style={titles}>
                <PrismCode
                  code={contentPro}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Logic3);
