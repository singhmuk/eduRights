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

const setvalue = `
// import { Component, ViewChild } from '@angular/core';
// import { FormBuilder, NgForm } from '@angular/forms';

export class AppComponent {
  @ViewChild('f') f: NgForm;
  lastidx = -1; 
  states = [
    { name: 'Arizona', abbrev: 'AZ' },
    { name: 'California', abbrev: 'CA' },
    { name: 'Colorado', abbrev: 'CO' },
  ];
  constructor(private formBuilder: FormBuilder) {}

  changeSelection() {
    const randomIndex = this.getRandomIndex(this.states);
    this.f.controls.state.setValue(this.states[randomIndex]);
  }

  getRandomIndex(arr): number {
    let index = Math.round(Math.random() * (arr.length - 1));
    while (index === this.lastidx) {
      index = Math.round(Math.random() * (arr.length - 1));
    }
    this.lastidx = index;
    return index;
  }
}


//html
<form #f="ngForm">
<select name="state" ngModel>
  <option value="" disabled>Choose a state</option>
  <option *ngFor="let state of states" [ngValue]="state">
    {{ state.abbrev }}
  </option>
</select>&nbsp;
<button (click)="changeSelection()">Random Selection</button>
</form>

<p>Form value: {{ f.value | json }}</p>

`.trim();

const folding = `
let selector = 'app-root';
@Component({
  selector: selector
})

//Will be folded into inline selector

@Component({
      selector: 'app-root'
    })`.trim();

const macros = `
export function wrapInArray<T>(value: T): T[] {
  return [value];
}`.trim();


class DepenInjection extends Component {
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
            <b>1. Angular CLI: </b>
            <ul>
              <li>Build angular apps using nodejs style modules.</li>
              <li>Give ability to add components, deploy, and perform testing and many such functions.</li>
            </ul>
            
              <h3>2. Angular</h3>
              <ul>
                <li>Angular version number have 3 parts: <b>major, minor, patch (8.2.9).</b></li>
                <li>Angular say if project in version 4 and want to migrate 6 than firstly move from 4 to 5 than
                  finally move to version 6.</li>
                <li>Major realease in every <b>6 month,</b> minor in <b>2-3 month</b> and patch in <b>every week</b>.</li>
                <li><b>e2e: </b>integration testing</li>
                <li><b>.editorconfig: </b>Required when work in team involvent</li>
                <li><b>angular.json: </b>configure our application</li>
                <li><b>selector: </b>component refrense</li>
                <li><b>polyfils: </b>support diffrent browsers</li>
                <li><b>tsconfig: </b>testing perpose</li>
                <li><b>tslint: </b>rules define for standard codding</li>
                <li><b>^: </b>minor and revision version checked and upper level install in system</li>
                <li><b>~: </b>only revision checked and if stable version find than install</li>
              </ul>
              <br />

              <h3>3. What is the difference between form builder and form control?</h3>
              <ul>
                <li>A reactive form is a FormGroup that is made up of FormControls.</li>
                <li>FormBuilder is the class that is used to create both FormGroups and FormControls.</li>
              </ul>
              <br/>

              <h3>4. How does an Angular application work?</h3>
                <ul>
                  <li>Every Angular app consists of a file named angular.json. This file will contain all the configurations of 
                    the app. While building the app, the builder looks at this file to find the entry point of the application. </li>
                  <li>Inside the build section, the main property of the options object defines the entry point of the application 
                    which is main.ts.
                      The main.ts file creates a browser environment for the application to run and along with this, it also calls a function called bootstrapModule, which bootstraps the application. These two steps are performed in the following order inside the main.ts file:</li>
                  <b>platformBrowserDynamic().bootstrapModule(AppModule)</b>
                  <br/>
                  <li>In the above line of code, AppModule is getting bootstrapped.
                      The AppModule is declared in the app.module.ts file. This module contains declarations of all the components.</li>
                  <li>Now, AppComponent is getting bootstrapped.</li>
                  <li>This component is defined in app.component.ts file. This file interacts with the webpage and serves data to it.</li>
                </ul>
                <br/>

                Each component is declared with three properties:
                <ul>
                  <li><b>Selector: </b>used for accessing the component.</li>
                  <li><b>Template/TemplateURL: </b>contains HTML of the component.</li>
                  <li><b>StylesURL: </b>contains component-specific stylesheets.</li>
                </ul>
                After this, Angular calls the index.html file. This file consequently calls the root component that is app-root. The root component is defined in app.component.ts.
                <br/>
                This is how every angular application works.
              <br/>

              <h3>5. What is AOT compilation? What are the advantages of AOT?</h3>
              Every Angular application consists of components and templates which the browser cannot understand. Therefore, all the Angular applications need to be compiled first before running inside the browser.
              <br/>
              Angular provides two types of compilation:
              <ul>
                <li>JIT(Just-in-Time) compilation</li>
                <li>AOT(Ahead-of-Time) compilation</li>
              </ul>
              <br/>
              The advantages of using AOT compilation are:
              <ul>
              <li><b>Faster rendering: </b>The browser downloads a pre-compiled version of the application. So it can render the application immediately without compiling the app.</li>
                <li><b>Fewer asynchronous requests: </b>It inlines external HTML templates and CSS style sheets within the application javascript which eliminates separate ajax requests.</li>
                <li><b>Smaller Angular framework download size: </b>Doesn't require downloading the Angular compiler. Hence it dramatically reduces the application payload.</li>
                <li><b>Detect template errors earlie: </b>Detects and reports template binding errors during the build step itself</li>
                <li><b>Better security: </b>It compiles HTML templates and components into JavaScript. So there won't be any injection attacks.</li>
                <br/>
                <li>By default, angular builds and serves the application using JIT compiler:
                  <ul>
                    <li>ng build</li>
                    <li>ng serve</li>
                  </ul>
                </li>
                <br/>
                <li>For using AOT compiler following changes should be made:
                  <ul>
                    <li>ng build --aot</li>
                    <li>ng serve --aot</li>
                  </ul>
                </li>
              </ul>
              <br/>

              <h3>6. What are the three phases of AOT</h3>
              The AOT compiler works in three phases
              <ul>
                <li><b>Code Analysis: </b>The TypeScript compiler and AOT collector create a representation of the source.</li>
                <li><b>Code generation: </b>It handles the interpretation as well as places restrictions on what it interprets.</li>
                <li><b>Validation: </b>Angular template compiler uses the TypeScript compiler to validate the binding expressions in templates.</li>
              </ul>
              <br />
              <b>N: </b>Arrow functions or lambda functions can’t be used to assign values to the decorator properties.
              <br />
              <br />

              If true, the AOT compiler will ignore this directive/ component and will therefore always be compiled
              using JIT.
              <br />
              <b>jit: true</b>
              <br />

              <h3>7. What are macros</h3>
              The AOT compiler supports macros in the form of functions or static methods that return an expression
              in a single return expression.
              <div style={titles}>
                <PrismCode
                  code={macros}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Can I use any javascript feature for expression syntax in AOT</h3>
              No, the AOT collector understands limited JavaScript features. If an expression uses
              unsupported syntax, the collector writes an error node to the .metadata.json file. Later point of time,
              the compiler reports an error if it needs that piece of metadata to generate the application code.
              <br />

              <h3>9. JIT compilation: </h3>
              Just-in-Time is a type of compilation that compiles your app in the
                  browser at runtime. JIT compilation is the default when you run the ng build (build only) or ng serve (build and serve locally).
                <ul>
                  <li>A JIT compiler runs after the program has started and compiles the code (usually bytecode or some kind of VM instructions).
                    A JIT has access to dynamic runtime information whereas a standard compiler doesn't and can make better optimizations like
                    inlining functions that are used frequently.</li>
                  <li>This is in contrast to a traditional compiler that compiles all the code to machine language before the program is first run.</li>
                </ul>
                <br/>

                <h3>10. Ivy Compiler</h3>
              <ul>
                <li>Ivy is now default compiler and runtime. Ivy improves budle size, allows for better debugging, adds improves type checking, faster testing, enables the AOT compiler on by default, and improves CSS class and style binding.</li>
                <li>Reach better build times.</li>
                <li>reach better build sizes (with a generated code more compatible with tree-shaking).</li>
                <li>Unlock new potential features (metaprogramming or higher order components, lazy loading of component instead of modules).</li>
              </ul>
              <br />

              <h3>11. What is folding</h3>
              The compiler can only resolve references to exported symbols in the metadata. Whereas some of the non-exported members are folded while generating the code.
              <br />
              <br />
              Folding is a process in which the collector evaluates an expression during collection and record the result in the .metadata.json instead of the original expression.
              <div style={titles}>
                <PrismCode
                  code={folding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              Remember that the compiler can’t fold everything. For example, spread operator on arrays, objects created using new keywords and function calls.
              <br />

              <h3>12. What is metadata rewriting</h3>
              Metadata rewriting is the process in which the compiler converts the expression initializing the
              fields such as useClass, useValue, useFactory, and data into an exported variable, which replaces the
              expression.
              <br />

              <h3>13. Explain the purpose of Service Workers in Angular</h3>
              <ul>
                <li>A service worker is a script that runs in the web browser and manages caching for an application.</li>
                <li>Angular service worker is designed to optimize the end user experience of using an application over a slow or
                    unreliable network connection, while also minimizing the risks of serving outdated content.</li>
              </ul>
              <br />

              <h3>14. What are the design goals of service workers</h3>
              <ul>
                <li>It caches an application just like installing a native application.</li>
                <li>A running application continues to run with the same version of all files without any incompatible files.</li>
                <li>When you refresh the application, it loads the latest fully cached version.</li>
                <li>When changes are published then it immediately updates in the background.</li>
                <li>Service workers saves the bandwidth by downloading the resources only when they changed.</li>
              </ul>
              <br/>

              <h3>15. Are there any pros/ cons in using local storage to replace cookie functionality.</h3>
              Cookies and local storage serve different purposes.
              <ul>
                <li>Cookies are primarily for reading server-side,</li>
                <li>Local Storage can only be read by the client-side.</li>
                <li>If data needs client, then by all means switch to local storage. You're wasting bandwidth by
                  sending all the data in each HTTP header.</li>
                <li>If data needs server, local storage is  okay if the server only needs
                  a small subset of the total data for each request.</li>
              </ul>
              <br />

              <h3>16. Session Management</h3>
              <ul>
                <li>Unlike cookies, the storage limit is larger<b>(5 mb)</b> and information is
                  never transferred to the server.</li>
                <li>Web storage<b>(localStorage and sessionStorage)</b> offer advantages compared to using cookies.
                  Data is saved locally only and can't be read by the server, which eliminates the security
                  issue that coockies present.</li>
                <li>It allows for much more data to be saved<b>(10 mb for most browses)</b>.</li>
                <li>It's simpler to use and the syntax is simple.</li>
                <br />
                <li>sessionStorage object is equal to the localStorage object, except that it stores the data for
                  only one Session. The data is deleted when user close the browser tab.</li>
                <br />
                <li><b>'ng-container': </b>is a logical container that can be used to group nodes but it not rendered in
                  the DOM tree as a node. 'ng-container' renderd as an HTML comment.</li>
                <li>In order to avoid to create that extra div, use ng-container directive.</li>
              </ul>
              <br/>

              <h3>17. What is authentication and authorization in Angular.</h3>
              <ul>
                <li><b>Authentication: </b>During login, the credential are sent to an authentication API. This API is present 
                on the server and validation is done there. After a JWT is returned, this token has information about the usr 
                and is used to identify the user. This process is called Authentication.</li>
                <br/>
                <li><b>Authorization: </b>After authentication, user are given various levels of permission/ access. Some users 
                may have access to all the pages and some might not. This process of restricting the content is called 
                Authorization.</li>
              </ul>
              <br/>

              <h3>18. How do you set the value of form control in ts file?</h3>
              <b>setValue()</b>
              <div style={titles}>
                <PrismCode
                  code={setvalue}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>19. How we handle large data api in frontend.</h3>
              Pagination, infinite scroll
              <br/>

              <h3>20. What is the usagle of ngOnChanges lifecycle hooks?.</h3>
              <br/>

              <h3>21. How can we use authentication in Routes?.</h3>
              <br/>

              <h3>22. Let suppose we have a text field and that is name, and we have to setup a validation to accept only 5 
                chars so how can we achieve this by template driven forms. If we want to show the error message then how 
                can we do it.</h3>
              <br/>

              <h3>23. Let suppose we have three API urls as per first response, we need to call second and as per second 
                response we need to call third API. if there would we error then on third api call we need to show 
                the error, what would be the best approach for this. Can we use rxjs operator in this issue?</h3>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(DepenInjection));
