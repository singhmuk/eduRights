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


const counters = `
angular [routerlink]: <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
  link to user component
</a>


ng router link: <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
  link to user component
</a>
`.trim();

const addcomponents = `
router.navigateByUrl("/team/33/user/11");

// Navigate without updating the URL
router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
`.trim();

const routerLink = `
<my-tile [routerLink]="['/secondPage', item.id, 'item-list']" *ngFor="let item of listaOfItem" [item]="item">
</my-tile>
`.trim();

const javaScriptExp = `
‘{{ someExpression() }}’
`.trim();

const template = `
<p>Hip!</p>
<ng-template>
  <p>Hip!</p>
</ng-template>
<p>Hooray!</p>
`.trim();

const macros = `
export function wrapInArray<T>(value: T): T[] {
  return [value];
}`.trim();

const CanActivate = `
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
`.trim();

const protect = `
// import the newly created AuthGuard
const routes: Routes = [
  {
    path: 'account',
    canActivate: [AuthGuard]
  }
];
`.trim();

const notifications = `
interface Observer<T> {
  closed?: boolean;
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

`.trim();

const purpose = `
<base href="/">
`.trim();

// const macros = ``.trim();

// const macros = ``.trim();

// const macros = ``.trim();

// const macros = ``.trim();



class NgrxCounter extends Component {
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
              <h3>1. Can we create custom Pipes in Angular 8.</h3>
              <ol>
                <li>Create a Pipe Class and decorate it with the decorator @Pipe.</li>
                <li>Supply a name property to be used as template code name.</li>
                <li>Register your Pipe in the module under declarations.</li>
                <li>Finally, implement PipeTransform and write transformation logic.</li>
              </ol>
              <br />

              <h3>2. What  are Router Events</h3>
                The Router event allows to track the entire lifecycle of the route. This is doneby emitting navigation events through the router.event property.
                <br/>
                <br/>
                The sequences is as follows:
                <ol>
                  <li>NavigationStart</li>
                  <li>RouteConfigLoadStart</li>
                  <li>RouteConfigLoadEnd</li>
                  <li>RoutesRecognized</li>
                  <li>GuardsCheckStart</li>
                  <li>ChildActivationStart</li>
                  <li>ActivationStart</li>
                  <li>GuardCheckEnd</li>
                  <li>ResolveStart</li>
                  <li>ResolveEnd</li>
                  <li>ActivationEnd</li>
                  <li>ChildActivationEnd</li>
                  <li>NavigationEnd</li>
                  <li>NavigationCancel</li>
                  <li>NavigationError</li>
                  <li>Scroll</li>
                </ol>
              <br/>

              <h3>3. What is the use of router-outlet in angular 8.</h3>
              <ul>
                <li>The router-outlet is a directive that's used by the router to mark where in a template, a matched component
                  should be inserted.</li>
                <br />
                <li>Our app will have multiple views/ pages and the app template acts like a shell of our application. 
                  Any element, we add to the shell
                  will be rendered in each view, only the part marked by the router outlet will be changed between views.</li>
              </ul>
              <br />

              <h3>4. Can I use multiple router outlets in Angular 8?</h3>
              Yes! We can use multiple router-outlets in same template by configuring our routers and simply add the router-outlet name.
              <br />

              <h3>5. How do you make a router link in HTML?</h3>
              Linking Routes in HTML.
              <ol>
                <li>To add links to one of the routes, use the routerLink directive in HTML. This directive accepts an array.</li>
                <li>If you use the routerLink directive without the brackets, you'll need to pass the route as a string.</li>
                <li>The <b>router-outlet</b> <b>/router-outlet</b> acts as a placeholder for components.</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={counters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Difference between navigate and navigatebyurl in angular.</h3>
              navigateByUrl is similar to changing the location bar directly–we are providing the “whole” new URL. Whereas router. navigate creates a new URL by applying an array
              of passed-in commands, a patch, to the current URL.
              <div style={titles}>
                <PrismCode
                  code={addcomponents}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. How do you detect route change in Angular?</h3>
              <ul>
                <li>Import Router, Event, NavigationStart, NavigationEnd, NavigationError from ‘@angular/router’.</li>
                <li>And inject router in the constructor.</li>
                <li>Subscribe to the NavigationStart, NavigationEnd, NavigationError events of the router.</li>
              </ul>
              <br />

              <h3>8. What is this router navigate?</h3>
              navigate method, you must supply the ActivatedRoute to give the router knowledge of where you are in the current route tree. After the link parameters array, add an
              object with a relativeTo property set to the ActivatedRoute . The router then calculates the target URL based on the active route’s location.
              <br />

              <h3>9. When to use Route class in case of navigation?</h3>
              Using Route class in case of navigation to happen on a triggered event. Before performing the above two operations, there is a need to register this component in the
              Route class’s instance which lies inside the app-routing.module.ts file. This will be further used to navigate from child to parent.
              <br />

              <h3>10. Is there a way to navigate between routes in angular?</h3>
              You can also navigate imperatively by using the code. This is done using the router service, which provides navigate and navigatebyUrl methods via which you can
              perform route changes.
              <br />

              <h3>11. How to specify which route to navigate to in NavLink?</h3>
              To specify which route to navigate to, use the to prop and pass the path name. The activeClassName prop will add an active class to the link if it’s currently active.
              On the browser, the NavLink component is rendered as an tag with an href attribute value that was passed in the to prop.
              <br />

              <h3>12. When to use absolute path in navigate method?</h3>
              Navigate Method always uses the absolute path unless you provide a starting point. <b>navigate.navigateByUrl</b> Use this method if you want to navigate to a URL by using
              the absolute path. The first argument is a string containing the complete URL.
              <br />

              <h3>13. What is the use of EventEmitter in angular.</h3>
                EventEmitter is used with @Output directive to emit custom events asynchronously and synchronously, and register 
                handlers for those events by subscribing to an instance.
              <br />

              <h3>14. What is the use of shared module in angular.</h3>
              A Shared Module is used to organize a set of commonly used pieces into one module and export them to any other 
              module that imports the Share Module. This allows us to selectively aggregate the reusable components.
              <br />

              <h3>15. What is ng-template in Angular?</h3>
              <ul>
                <li>ng-template is an Angular element that is used for rendering HTML in a template. However, it is not rendered directly on DOM. If you include an ng-template tag
                  to a template, the tag and the content inside it will be replaced by comment upon render.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={template}
                  language="js"
                  plugins={["line-numbers"]}
                />
             </div>
              <br />

              <h3>16. How do you handle error in Angular?</h3>
              By using ErrorHandler class. This class can be extended to create your own global error handler.
              <br />

              <h3>17. Pass complex JSON via routerLink.</h3>
              <div style={titles}>
                <PrismCode
                  code={routerLink}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>18. How does an Angular application work?</h3>
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

              <h3>19. What is AOT compilation? What are the advantages of AOT?</h3>
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

              <h3>20. What are the three phases of AOT</h3>
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

              <h3>21. JIT compilation: </h3>
              Just-in-Time is a type of compilation that compiles your app in the
                  browser at runtime. JIT compilation is the default when you run the ng build (build only) or ng serve (build and serve locally).
                <ul>
                  <li>A JIT compiler runs after the program has started and compiles the code (usually bytecode or some kind of VM instructions).
                    A JIT has access to dynamic runtime information whereas a standard compiler doesn't and can make better optimizations like
                    inlining functions that are used frequently.</li>
                  <li>This is in contrast to a traditional compiler that compiles all the code to machine language before the program is first run.</li>
                </ul>
                <br/>

                <h3>22. What are macros</h3>
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

              <h3>23. How are Angular expressions different from JavaScript expressions?</h3>
              <ul>
                <li>Angular expressions allow us to write JavaScript in HTML</li>
                <li>Angular expressions are evaluated against a local scope object whereas JavaScript expressions against global window object.</li>
              </ul>
              <br/>

              <h3>24. How are observables different from promises?</h3>
              The first difference is that an Observable is lazy whereas a Promise is eager.
              <br/>
            <table>
              <tr>
                <th>Observables</th>
                <th>Promises</th>
              </tr>
              <tr>
                <td>Handle a sequence of asynchronous events over a period of time.</td>
                <td>Deal with one asynchronous event at a time</td>
              </tr>
              <tr>
                <td>Lazy. An observable is not called until we subscribe() to the observable</td>
                <td>Not Lazy, Execute immediately after creation.</td>
              </tr>
              <tr>
                <td>Can be cancelled by using the unsubscribe() method</td>
                <td>Cannot be cancelled</td>
              </tr>
              <tr>
                <td>Observable provides operators like map, forEach, filter, reduce, retry, retryWhen etc.</td>
                <td></td>
              </tr>
            </table>
              <br/>

              <h3>25. Angular by default, uses client-side rendering for its applications. Can one make an angular application to render on the server-side?</h3>
              Yes, with Angular Universal, Angular application can render on the server-side.
              <br/>
              <br/>
              <b>The advantages of using Angular Universal are :</b>
                <ul>
                  <li>First time users can instantly see a view of the application. This providing better user experience.</li>
                  <li>Many search engines expect pages in plain HTML, thus, Universal can make sure that your content is available on every search engine, which leads to better SEO.</li>
                  <li>Any server-side rendered application loads faster since rendered pages are available to the browser sooner.</li>
                </ul>
              <br/>

              <h3>26. How does one share data between components in Angular?</h3>
              <ul>
                <li>Parent to child using @Input decorator</li>
                <li>Child to parent using @ViewChild decorator
                  <ul><li><b>@ViewChild: </b>decorator is used to reference the child component as “child” property.</li></ul>
                </li>
                <li>Child to parent using @Output and EventEmitter</li>
              </ul>
              <br/>

              <h3>27. what is dependency injection in simple terms?</h3>
                    Dependencies in angular are services which have a functionality. Functionality of a service, can be needed by various components and directives in an application. Angular provides a smooth mechanism by which we can inject these dependencies in our components and directives.
                    So basically, we are just making dependencies which are injectable across all components of an application.
              <br/>

              <h3>28. What are Annotations in Angular?</h3>
              Annotations are the hard-coded language feature. Annotations are only metadata set on the class that is used to reflect the metadata library.
              <br/>

              <h3>29. What are filters in Angular? Name a few of them.</h3>
              Filters are used to format an expression and present it to the user. They can be used in view templates, controllers, or services. Some inbuilt filters are as follows.
              <ol>
                <li>Date</li>
                <li>filter</li>
                <li>Json</li>
                <li>limitTo</li>
                <li>lowercase</li>
              </ol>
              <br/>

              <h3>30. What do you understand by scope in Angular?</h3>
              The scope in Angular binds the HTML and the JavaScript. It as expected is an object with the available methods and 
              properties. The scope is available for both the view and the controller.
              <br/>

              <h3>31. What is Bootstrap? How is it embedded into Angular?</h3>
              Bootstrap is a collection of HTML, CSS, and JavaScript tools for creating and building responsive web pages and 
              web applications.
              <br/>

              <h3>32. What type of DOM does Angular implement?</h3>
                <ul>
                  <li>DOM (Document Object Model) treats an XML or HTML document as a tree structure in which each node is an object representing a part of the document.</li>
                  <li>Angular uses the regular DOM. This updates the entire tree structure of HTML tags until it reaches the data to be updated. However, to ensure that the speed and performance are not affected, Angular implements Change Detection.</li>
                </ul>
              <br/>

              <h3>33. What is DOM?</h3>
              It is responsible for representing the content of a web page and changes in the architecture of an application. Here, all the objects are organized in the form of a tree, and the document can easily be modified, manipulated, and accessed only with the help of APIs.
              <br />

              <h3>34. Shadow DOM</h3>
              <ul>
                <li>it means that Shadow DOM allows us to hide the DOM logic behind other elements.</li>
                <li>Shadow DOM allows us to apply scoped styles to elements without bleeding into the outside world.
                </li>
              </ul>
              <br/>

              <h3>35. What does subscribing mean in RxJS?</h3>
              In RxJS, when using observables, we need to subscribe to an observable to use the data that flows through that observable. This data is generated from a publisher and is consumed by a subscriber. When we subscribe to an observable, we pass in a function for the data and another function for errors so that, in case there is some error, we can show some message or process the message in some way.
              <br/>

              <h3>36. What is Angular Router?</h3>
                <ul>
                  <li>Routing in a single-page frontend application is the task of responding to the changes in the URL made by 
                    adding and removing content from the application. In this task as we first need to intercept a request that 
                    changes the browser’s URL as we do not wish for the browser to reload. Then, we need to determine which 
                    content to remove and which content to add, and finally, we have to change the browser’s URL as well to 
                    show the user the current page they are on.</li>
                </ul>
              <br/>

              <h3>37. What is Routing Guard in Angular?</h3>
              Angular’s route guards are interfaces which can tell the router whether or not it should allow navigation to a 
              requested route. They make this decision by looking for a true or false return value from a class which implements 
              the given guard interface.
              <br/>
              <br/>
              There are five different types of guards and each of them is called in a particular sequence. The router’s behavior 
              is modified differently depending on which guard is used. The guards are:
              <ul>
                <li>CanActivate</li>
                <li>CanActivateChild</li>
                <li>CanDeactivate</li>
                <li>CanLoad</li>
                <li>Resolve</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={CanActivate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>38. What is the difference between *ngIf vs [hidden]?</h3>
              <b>*ngIf</b> effectively removes its content from the DOM while <b>[hidden]</b> modifies the <b>display</b> property and only instructs the browser to not show the content but the DOM still contains it.
              <br/>

              <h3>39. How would you protect a component being activated through the router?</h3>
              The Angular router ships with a feature called guards. These provide us with ways to control the flow of our application. We can stop a user from visitng certain routes, stop a user from leaving routes, and more. The overall process for protecting Angular routes:
              <ul>
                <li>Create a guard service: <b>ng g guard auth</b></li>
                <li>Create <b>canActivate()</b> or <b>canActivateChild()</b> methods</li>
                <li>Use the guard when defining routes</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={protect}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              <b>Some other available guards: </b>
              <ul>
                <li><b>CanActivate: </b>Check if a user has access</li>
                <li><b>CanActivateChild: </b>Check if a user has access to any of the child routes</li>
                <li><b>CanDeactivate: </b>Can a user leave a page? For example, they haven't finished editing a post</li>
                <li><b>Resolve: </b>Grab data before the route is instantiated</li>
                <li><b>CanLoad: </b>Check to see if we can load the routes assets</li>
              </ul>
              <br/>

              <h3>40. What are Observables?</h3>
              <ul>
                <li>Observables are declarative which provide support for passing messages between publishers and subscribers in your application.</li><br/>
                <li>They are mainly used for event handling, asynchronous programming, and handling multiple values. In this case, you define a function for publishing values, but it is not executed until a consumer subscribes to it. The subscribed consumer then receives notifications until the function completes, or until they unsubscribe.</li>
              </ul>
              <br/>

              <h3>41. What is an Observer?</h3>
              Observer is an interface for a consumer of push-based notifications delivered by an Observable. It has below structure.
              <div style={titles}>
                <PrismCode
                  code={notifications}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>42. What is HttpClient, and what are its benefits?</h3>
                Angular applications communicate with backend services over HTTP protocol using HttpClient which is based on top of the XMLHttpRequest interface.
                <br/>
                <b>advantages:</b>
                <ul>
                  <li>Contains testability features</li>
                  <li>Provides typed request and response objects</li>
                  <li>Intercept request and response</li>
                  <li>Supports Observable APIs</li>
                  <li>Supports streamlined error handling</li>
                </ul>
              <br/>

              <h3>43. What is the purpose of base href tag?</h3>
              The routing application should add element to the index.html as the first child in the tag inorder to indicate how to compose navigation URLs. If app folder is the application root then you can set the href value as below.
              <div style={titles}>
                <PrismCode
                  code={purpose}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>44. What is server-side rendering in Angular?</h3>
              If we have a large application with a big bundle size, our page’s load speed is slowed down quite a bit as it needs to download all the files, parse JavaScript, and then execute it. To overcome this slowness, we can use server-side rendering, which allows us to send a fully rendered page from the server that the browser can display and then let the JavaScript code take over any subsequent interactions from the user.
              <br/>

              <h3>45. What is Angular Universal?</h3>
              Angular Universal is a package for enabling server-side rendering in Angular applications. We can easily make our application ready for server-side rendering using the Angular CLI.<br/>
              <b>ng add @nguniversal/express-engine</b>
              <br/>
              <br/>
              This allows our Angular application to work well with an ExpressJS web server that compiles HTML pages with Angular Universal based on client requests. This also creates the server-side app module, app.server.module.ts, in our application directory.
              <br/>

              <h3>46. What is the difference between interpolated content and the content assigned to the innerHTML property of a DOM element?</h3>
              Angular interpolation happens when in our template we type some JavaScript expression inside double curly braces 
              <div style={titles}>
                <PrismCode
                  code={javaScriptExp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>.
               This is used to add dynamic content to a web page. However, we can do the same by assigning some dynamic content to the innerHTML property of a DOM element. The difference between the two is that, in Angular, the compiler always escapes the interpolated content, i.e., HTML is not interpreted, and the browser displays the code as it is with brackets and symbols, rather than displaying the output of the interpreted HTML. However, in innerHTML, if the content is HTML, then it is interpreted as the HTML code.
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(NgrxCounter));
