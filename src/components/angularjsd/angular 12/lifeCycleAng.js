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

const fullResponse = `
import { HttpClient, HttpResponse } from '@angular/common/http';


constructor(private http: HttpClient) {}

this.http.get('https://example.com/api', { observe: 'response' })
  .subscribe((response: HttpResponse<any>) => {
    console.log(response.headers); // headers of the response
    console.log(response.status); // status code of the response
    console.log(response.body);   // body of the response
  });
`.trim();

const performError = `
//html
<p>{{errorMessage}}</p>


import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class AppComponent {
  public errorMessage: string;

  constructor(private http: HttpClient) {
    this.getData().subscribe((res) => console.log(res), (error: HttpErrorResponse) => {

        if (error.error instanceof ErrorEvent) {
          this.errorMessage = 'Error: '$'{error.error.message}';                            // client-side error
        } 
        else {
          this.errorMessage = 'Error Code: '$'{error.status} Message: '$'{error.message}';  // server-side error
        }
      }
    );
  }

  private getData() {
    const url = 'https://my-api.com/data';
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
`.trim();

const interceptor = `
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('authToken');
    
    const authRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer '$'{authToken}')
    });
    
    // Pass the auth request on to the next interceptor or to the HttpClient if there are no more interceptors
    return next.handle(authRequest);
  }
}
`.trim();

class AngularLifeCycle extends Component {
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
              <h3>1. lifecycle hook</h3>
              Constructor excuite first. If we need to inject any dependencies
              into component, then Constructor is the best place to inject those
              dependencies. After excuitiing Constructor angular excuites its
              lifecycle hooks in a specific order.
              <br />
              <br />
              <b>Sequeces: </b>
              OnChange - OnInit - DoCheck - AfterContentInit -
              AfterContentChecked - AfterViewInit - AfterViewChecked - OnDestry.
              <br />
              <br />
              <b>Lifecycle of a component includes:</b>
              <br />
              <ul>
                <li>Creating a component</li>
                <li>Rendering a component</li>
                <li>Creating And Rendering its child component</li>
                <li>Checking data-bound properties</li>
                <li>Checking and removing it from DOM</li>
              </ul>
              <br />
              <b>ngOnChange:</b>
              Respond when Angular sets data-bound input properties. The method
              receives a SimpleChanges object of current and previous property
              values.
              <ul>
                <li>Alwase called whenever one of our bound input changes.</li>
                <li>Used in any component that has an input.</li>
                <li>Called whenever an input value changes</li>
                <li>Is called the first time before ngOnInit</li>
              </ul>
              <br />
              <b>ngOnInit():</b>
              Initialize the directive/ component after Angular first displays
              the data-bound properties and sets the directive/ component's
              input properties.
              <br />
              can be excuited once component has been initialize. This hook is
              fired before any of the child directive properties are initialize.
              This place we put logic related to initialization of properties.
              <ul>
                <li>Called once, after the first ngOnChanges().</li>
                <li>Used to initialize data in a component.</li>
                <li>
                  called after input values are set when a component is
                  initialized.
                </li>
                <li>Called only once.</li>
              </ul>
              <br />
              <b>ngDoCheck():</b>
              <br />
              Called during every change detection run, immediately after
              ngOnChanges() and ngOnInit().
              <br />
              whenever something changes on the template of a component or
              inside component then it excuites. it called during every changes
              detection run. This is similar to ngOnChanges() hook, but
              ngOnChanges() not detect all the changes made to the input
              properties.
              <br />
              <br />
              It detects changes for those properties which passed by value.
              However, ngDoCheck() detects changes for those properties also
              which are passed reference such as array.
              <br />
              <br />
              <ul>
                <li>Called during all changes detection runs.</li>
                <li>
                  A run through the view by Angular to update/ detect changes.
                </li>
              </ul>
              <br />
              <br />
              <b>ngAfterContentInit():</b>
              <br />
              <ul>
                <li>
                  Respond after Angular projects external content into the
                  component's view.
                </li>
                <li>Called once after the first ngDoCheck().</li>
              </ul>
              <br />
              <br />
              <b>ngAfterContentChecked():</b>
              <br />
              <ul>
                <li>
                  Respond after Angular checks the content projected into the
                  directive/ component.
                </li>
                <li>
                  Called after the ngAfterContentInit() and every subsequent
                  ngDoCheck().
                </li>
              </ul>
              <br />
              <br />
              <b>ngAfterViewInit():</b>
              <br />
              <ul>
                <li>
                  Respond after Angular initializes the component's views and
                  child views.
                </li>
                <li>Called once after the first ngAfterContentChecked().</li>
              </ul>
              <br />
              <br />
              <b>ngAfterViewChecked():</b>
              <br />
              <ul>
                <li>
                  Respond after Angular checks the component's views and child
                  views.
                </li>
                <li>
                  Called after the ngAfterViewInit() and every subsequent
                  ngAfterContentChecked().
                </li>
              </ul>
              <br />
              <br />
              <b>ngOnDestroy():</b>
              <br />
              <ul>
                <li>
                  Cleanup just before Angular destroys the directive/ component.
                  Unsubscribe Observables and detach event handlers to avoid
                  memory leaks.
                </li>
                <li>
                  Called just before Angular destroys the directive/ component.
                </li>
              </ul>
              <br />
              <br />
              <h3>2. What is the use of Codelyzer</h3>
              <ul>
                <li>
                  Codelyzer provides a set of rules and guidelines for writing
                  high-quality, maintainable code. It is built on top of TSLint,
                  a popular static analysis tool for TypeScript, and is
                  specifically designed to analyze Angular-specific code.
                </li>

                <br />
                <li>Codelyzer can be run via angular cli or npm directly.</li>
              </ul>
              <br />
              <h3>
                3. Why should ngOnInit be used, if we already have a constructor
              </h3>
              <ul>
                <li>
                  The constructor is a special method that is called when an
                  instance of a component is created. It's primarily used for
                  dependency injection, where you inject services or other
                  dependencies into the component's constructor parameters. You
                  can also perform initialization tasks in the constructor, such
                  as setting default property values.
                </li>
                <br />
                <li>
                  ngOnInit is a lifecycle hook that is called after the
                  component's constructor is called and all its inputs are set.
                  It's used for initialization tasks that require the
                  component's inputs to be set, such as fetching data from a
                  server or initializing a form.
                </li>
                <br />
                <li>
                  To summarize, the constructor is used for dependency injection
                  and initialization tasks that don't require the component's
                  inputs to be set, while ngOnInit is used for initialization
                  tasks that require the component's inputs to be set.
                </li>
              </ul>
              <br />
              <h3>4. How can you read full response</h3>To read the full
              response, you can set the observe option of the HttpClient request
              to 'response' instead of the default 'body'. This tells HttpClient
              to return the full HTTP response, including the headers and status
              code, instead of just the response body.
              <div style={titles}>
                <PrismCode
                  code={fullResponse}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>5. How do you perform Error handling.</h3>
              In Angular, error handling can be performed using a combination of
              techniques, including try-catch blocks, error handling functions,
              and observable error handling.
              <div style={titles}>
                <PrismCode
                  code={performError}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>5. What is Interceptor.</h3>
              <ul>
                <li>
                  Interceptor is a middleware that intercepts incoming or
                  outgoing HTTP requests and responses. Interceptors can be used
                  to modify or add headers to requests, handle errors, or
                  perform other actions before or after a request or response is
                  sent or received.
                </li>
                <br />
                <li>
                  Interceptors are defined as classes that implement the
                  HttpInterceptor interface, which defines a handle method that
                  intercepts HTTP requests and responses. Interceptors are
                  registered with the HttpClientModule by adding them to the
                  providers array of an Angular module.
                </li>

                <br />
                <div style={titles}>
                  <PrismCode
                    code={interceptor}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />
                <li>
                  Interceptors are a powerful feature of Angular that can be
                  used to implement common patterns such as authentication,
                  caching, and error handling in a reusable and modular way.
                </li>
              </ul>
              <br />
              <h3>How do you implement server-side rendering in Angular?</h3>
              Server-side rendering (SSR) is a technique used to improve the
              initial load time and search engine optimization (SEO) of web
              applications by rendering the HTML on the server before sending it
              to the client.
              <ol>
                <li>
                  <b>Install: </b>@nguniversal/express-engine
                  @nguniversal/module-map-ngfactory-loader.
                </li>
                <br />
                <li>
                  Create a new file server.ts in the root of your project, which
                  will contain the code for the server-side rendering logic.
                </li>
                <br />
                <li>
                  Modify app.module.ts file to include the ServerModule instead
                  of the BrowserModule.{" "}
                </li>
                <br />
                <li>
                  Add <b>"build:ssr"</b> command in package.json
                </li>
                <br />
                <li>
                  <b>npm run build:ssr :</b>Run this command to build the
                  server-side code:
                </li>
                <br />
                <li>
                  <b>node dist/server.js: </b>Start the server
                </li>
                <br />
              </ol>
              <br />
              <h3>
                How do you optimize the performance of an Angular application?
              </h3>
              <ul>
                <li>
                  <b>Lazy loading: </b>Splitting the application into smaller
                  feature modules and loading them on demand can improve initial
                  load times and reduce the amount of code the user needs to
                  download.
                </li>
                <br />
                <li>
                  <b>AOT compilation: </b>Pre-compiling the application can
                  improve the initial rendering speed and reduce the size of the
                  bundle.
                </li>
                <br />
                <li>
                  <b>Change detection strategy: </b>Choosing the right change
                  detection strategy (e.g. OnPush) can improve the performance
                  of the application by reducing the number of unnecessary
                  checks.
                </li>
                <br />
                <li>
                  <b>Optimizing network requests: </b>Minimizing the number of
                  HTTP requests, compressing files, and using server-side
                  caching can improve the performance of the application.
                </li>
                <br />
                <li>
                  <b>Optimizing rendering: </b>Avoiding unnecessary DOM
                  manipulations and using pure pipes can improve the rendering
                  performance of the application.
                </li>
                <br />
                <li>
                  <b>Production mode: </b>Enabling production mode can improve
                  the performance of the application by disabling certain
                  development-only features and enabling additional
                  optimizations.
                </li>
              </ul>
              <br />
              <h3>
                How do you implement authentication and authorization in
                Angular?.
              </h3>
              <ul>
                <li>
                  <b>Send authentication request: </b>When a user submits the
                  login form, send a request to the server to authenticate the
                  user's credentials. The server should return a token if the
                  user is authenticated.
                </li>
                <br />
                <li>
                  <b>Protect routes: </b>Use guards to protect routes that
                  require authentication. A guard is a service that can prevent
                  access to a route if certain conditions are not met.
                </li>
              </ul>
              <br />
              <h3>
                How would you handle asynchronous data in Angular, such as HTTP
                requests or observables?
              </h3>
              <ul>
                <li>
                  <b>Using the async pipe: </b>The async pipe is an Angular
                  built-in pipe that subscribes to an observable or a promise
                  and automatically handles the subscription and unsubscription.
                  It is often used in the template to display asynchronous data.
                </li>
                <br />
                <li>
                  <b>Subscribing manually: </b>Instead of using the async pipe,
                  you can subscribe to an observable or a promise manually and
                  handle the data in the component.
                </li>
                <br />
                <li>
                  <b>Using RxJS operators: </b>
                </li>
                <br />
                <li>
                  <b>Using the HttpClient: </b>
                </li>
              </ul>
              <br />
              <h3>
                Explain the concept of observables and how they are used in
                Angular.
              </h3>
              <ul>
                <li>
                  Observable is an entity that represents a stream of data that
                  can be subscribed to, allowing the consumer to receive values
                  emitted by the observable over time.
                </li>
                <br />
                <li>
                  In Angular, observables are often used for handling HTTP
                  requests, user interactions, and other asynchronous events.
                </li>
                <br />
                <li>
                  Observables have a number of advantages over traditional
                  callback-based approaches to handling asynchronous data. They
                  provide better support for handling multiple events, allow for
                  easy composition and transformation of data streams, and can
                  be canceled or unsubscribed when no longer needed.
                </li>
                <br />
                <li>
                  To use observables in Angular, you can create an observable
                  using the RxJS library and then subscribe to it in your
                  component.
                </li>
              </ul>
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AngularLifeCycle);
