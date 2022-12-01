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


const multicasting = `
var source = Rx.Observable.from([1, 2, 3]);
var subject = new Rx.Subject();
var multicasted = source.multicast(subject);

// These are, under the hood, 'subject.subscribe({ ...})':
multicasted.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
multicasted.subscribe({
  next: (v) => console.log('observerB: ' + v)
});`.trim();


class AngularDir2 extends Component {
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
              <h3>1. Describe the MVVM architecture. </h3>
              MVVM architecture removes tight coupling between each component. The MVVM architecture comprises of three parts:
              <br />
              <ul>
                <li>Model</li>
                <li>View</li>
                <li>ViewModel</li>
              </ul>
              The architecture allows the children to have reference through observables and not directly to their parents.
              <br />

              <h3>2. Can you explain the concept of scope hierarchy in Angular?</h3>
              Angular organizes the $scope objects into a hierarchy that is typically used by views. 
              It has a root scope that can further contain one or several scopes called child scopes.
              <br />
              In a scope hierarchy, each view has its own $scope.
              <br />
              <br />

              <h3>3. What is multicasting</h3>
              Multi-casting is the process of broadcasting to a list of multiple subscribers in a single execution.
              <div style={titles}>
                <PrismCode
                  code={multicasting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. What is ViewEncapsulation and how many ways are there to do it in Angular?</h3>
              ViewEncapsulation determines whether the styles defined in a particular component
              will affect the entire application or not. Angular supports 3 types of ViewEncapsulation:
              <ul>
                <li><b>Emulated: </b>Styles used in other HTML spread to the component</li>
                <li><b>Native: </b>Styles used in other HTML doesn’t spread to the component</li>
                <li><b>None: </b>Styles defined in a component are visible to all components of the application</li>
              </ul>
              <br />

              <h3>5. What modules should you import in Angular to use [(ngModel)] and reactive forms?</h3>
              FormsModule and Reactiveforms Module.
              <br />

              <h3>6. How many Change Detectors can there be in the whole application?</h3>
              Each component has its own ChangeDetector. All Change Detectors are inherited from
              AbstractChangeDetector.
              <br />

              <h3>7. What is zone</h3>
              Zone. js is a api or set of programs which is used by angular to update the application view when any
              change occurred.
              <br />
              <b>Ex.: </b>Events, XMLHttpRequests and Timers(setTimeout(), setInterval()) etc.
              <br />

              <h3>8. How do you update the view if your data model is updated outside the ‘Zone’?</h3>
              <ul>
                <li>Using the <b>ApplicationRef.prototype.tick</b> method, which will run change detection on the entire component tree.</li>
                <li>Using <b>NgZone.prototype.run</b> method, which will also run change detection on the entire tree. The run method under the hood itself calls tick, and the parameter takes the function you want to perform before tick.</li>
                <li>Using the <b>ChangeDetectorRef.prototype.detectChanges</b> method, which will launch change detection on the current component and its children.</li>
              </ul>
              <br />

              <h3>9. What are Core and Shared modules for?</h3>
              <ul>
                <li>A Shared module serves as a generic module for all modules, components, directives, pipes, etc., which are not required to be in a single copy for the application but need to be imported into many different modules.</li>
                <li>A Core module is a place to store services that you need to have in the form of singleton for the entire application (for example, a user authorization service with data storage about it).</li>
              </ul>
              <br />

              <h3>10. Ivy Compiler</h3>
              <ul>
                <li>Ivy is now default compiler and runtime. Ivy improves budle size, allows for better debugging, adds improves type checking, faster testing, enables the AOT compiler on by default, and improves CSS class and style binding.</li>
                <li>Reach better build times.</li>
                <li>reach better build sizes (with a generated code more compatible with tree-shaking).</li>
                <li>Unlock new potential features (metaprogramming or higher order components, lazy loading of component instead of modules).</li>
              </ul>
              <br />

              <h3>11. What is the use of Bazel in Angular 8.</h3>
              <ul>
                <li>It provides a platform to make back-end and front-end services with the same tool.</li>
                <li>It allows us to build CLI applications quickly and easily.</li>
                <li>The entirety of the Angular framework is built on Bazel and it allows us to divide an
                  application into various build units which are defined at the NgModule level.</li>
                <li>It supports customization and also facilitates us to draw graphs. We can use these graphs to
                  easily identify the essential information.</li>
              </ul>
              <br />

              <h3>12. Why we should use Bazel for Angular builds</h3>
              <ul>
                <li>The initial build time with Bazel will be comparable
                  to the traditional JavaScript tooling. the difference is that the time will not grow exponentially when our
                  application’s size increases. With Bazel most of the time the build time will stay constant.</li>
                <li>Bazel rebuilds only the packages which have changed and nothing else.</li>
              </ul>
              <br />

              <h3>13. What is the use of Codelyzer</h3>
              <ul>
                <li>All enterprise applications follows a set of coding conventions and guidelines to maintain code
                  in better way. Codelyzer is a tool to run and check whether the pre-defined coding guidelines has
                  been followed or not.
                  <br />
                  Codelyzer does only static code analysis for angular and typescript project.</li>
                <br />
                <li>Codelyzer can be run via angular cli or npm directly.</li>
              </ul>
              <br />

              <h3>14. Why should ngOnInit be used, if we already have a constructor</h3>
              <ul>
                <li>The Constructor is a default method of the class that is executed when the class is instantiated
                  and ensures proper initialization of fields in the class and its subclasses.</li>
                <li>ngOnInit is a life cycle hook called by Angular to indicate that Angular is done creating the
                  component.</li>
                <li>We use ngOnInit for all the initialization/ declaration in the constructor. The constructor should only be used to
                  initialize class members but shouldn't do actual "work". So you should use constructor() to setup Dependency Injection
                  and not much else. ngOnInit() is better place to "start" - it's where/ when components' bindings are resolved.</li>
              </ul>
              <br />

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

              <h3>16. Explain the purpose of Service Workers in Angular</h3>
              <ul>
                <li>A service worker is a script that runs in the web browser and manages caching for an application.</li>
                <li>Angular service worker is designed to optimize the end user experience of using an application over a slow or
                    unreliable network connection, while also minimizing the risks of serving outdated content.</li>
              </ul>
              <br />

              <h3>17. What are the design goals of service workers</h3>
              <ul>
                <li>It caches an application just like installing a native application.</li>
                <li>A running application continues to run with the same version of all files without any incompatible files.</li>
                <li>When you refresh the application, it loads the latest fully cached version.</li>
                <li>When changes are published then it immediately updates in the background.</li>
                <li>Service workers saves the bandwidth by downloading the resources only when they changed.</li>
              </ul>
              <br/>

              <h3>18. Session Management</h3>
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

              <h3>What is authentication and authorization in Angular.</h3>
              <ul>
                <li><b>Authentication: </b>During login, the credential are sent to an authentication API. This API is present 
                on the server and validation is done there. After a JWT is returned, this token has information about the usr 
                and is used to identify the user. This process is called Authentication.</li>
                <br/>
                <li><b>Authorization: </b>After authentication, user are given various levels of permission/ access. Some users 
                may have access to all the pages and some might not. This process of restricting the content is called 
                Authorization.</li>
              </ul>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(AngularDir2));
