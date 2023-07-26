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

class DepenInjection extends Component {
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
              <h3>1. How does an Angular application work?</h3>
              <ul>
                <li>
                  Every Angular app consists of a file named angular.json. This
                  file will contain all the configurations of the app. While
                  building the app, the builder looks at this file to find the
                  entry point of the application. 
                </li>
                <br />
                <li>
                  AppModule is getting bootstrapped. The AppModule is declared
                  in the app.module.ts file. This module contains declarations
                  of all the components.
                </li>
                <br />
                <li>Now, AppComponent is getting bootstrapped.</li>
                <br />
                <li>
                  <b>Initialization: </b>When an Angular application is loaded
                  in the browser, the main.ts file is executed, which
                  initializes the application and bootstraps the root module.
                </li>
                <br />

                <li>
                  When an Angular application is launched, the main component is
                  loaded, which in turn loads the other components and services
                  that the application requires. The main component is typically
                  called AppComponent and is defined in the app.component.ts
                  file.
                </li>
                <br />
                <li>
                  Angular uses a reactive programming approach based on the
                  Observable design pattern to handle events and data streams.
                  This means that the application subscribes to data streams and
                  reacts to changes as they occur, rather than polling for
                  changes at regular intervals.
                </li>
              </ul>
              <br />
              <b>index.html </b>
              <ul>
                <li>
                  The index.html file is the main entry point for an Angular
                  application. When a user navigates to the URL of an Angular
                  application, the web server serves the index.html file, which
                  is loaded into the browser.
                </li>
                <br />
                <li>
                  The index.html file contains the necessary scripts and
                  stylesheets that are required to load the Angular application
                  into the browser. It also includes a 'base' tag, which is used
                  by Angular's router to determine the base URL for the
                  application.
                </li>
                <br />
                <li>
                  The main app component is usually loaded inside a 'div'
                  element with an id of app-root in the index.html file. This
                  component acts as the root of the application and is
                  responsible for loading and rendering other components in the
                  application.
                </li>
                <br />
                <li>
                  In addition to loading the Angular application, the index.html
                  file can also be used to add any other necessary HTML, CSS, or
                  JavaScript to the application, such as third-party libraries
                  or custom stylesheets.
                </li>
                <br />
                <li>
                  Overall, the index.html file is an important part of an
                  Angular application, as it serves as the entry point for the
                  application and contains the necessary scripts and stylesheets
                  to load the application into the browser.
                </li>
              </ul>
              <br />
              <br />
              <h3>
                2. What is AOT compilation? What are the advantages of AOT?
              </h3>
              Every Angular application consists of components and templates
              which the browser cannot understand. Therefore, all the Angular
              applications need to be compiled first before running inside the
              browser.
              <br />
              Angular provides two types of compilation:
              <ul>
                <li>JIT(Just-in-Time) compilation</li>
                <li>AOT(Ahead-of-Time) compilation</li>
              </ul>
              <br />
              The advantages of using AOT compilation are:
              <ul>
                <li>
                  <b>Faster rendering: </b>The browser downloads a pre-compiled
                  version of the application. So it can render the application
                  immediately without compiling the app.
                </li>
                <li>
                  <b>Fewer asynchronous requests: </b>It inlines external HTML
                  templates and CSS style sheets within the application
                  javascript which eliminates separate ajax requests.
                </li>
                <li>
                  <b>Smaller Angular framework download size: </b>Doesn't
                  require downloading the Angular compiler. Hence it
                  dramatically reduces the application payload.
                </li>
                <li>
                  <b>Detect template errors earlie: </b>Detects and reports
                  template binding errors during the build step itself
                </li>
                <li>
                  <b>Better security: </b>It compiles HTML templates and
                  components into JavaScript. So there won't be any injection
                  attacks.
                </li>
                <br />
                <li>
                  By default, angular builds and serves the application using
                  JIT compiler:
                  <ul>
                    <li>ng build</li>
                    <li>ng serve</li>
                  </ul>
                </li>
                <br />
                <li>
                  For using AOT compiler following changes should be made:
                  <ul>
                    <li>ng build --aot</li>
                    <li>ng serve --aot</li>
                  </ul>
                </li>
              </ul>
              <br />
              <h3>3. What are the three phases of AOT</h3>
              The AOT compiler works in three phases
              <ul>
                <li>
                  <b>Code Analysis: </b>The TypeScript compiler and AOT
                  collector create a representation of the source.
                </li>
                <li>
                  <b>Code generation: </b>It handles the interpretation as well
                  as places restrictions on what it interprets.
                </li>
                <li>
                  <b>Validation: </b>Angular template compiler uses the
                  TypeScript compiler to validate the binding expressions in
                  templates.
                </li>
              </ul>
              <br />
              If true, the AOT compiler will ignore this directive/ component
              and will therefore always be compiled using JIT.
              <br />
              <b>jit: true</b>
              <br />
              <br />
              <h3>
                4. Can I use any javascript feature for expression syntax in AOT
              </h3>
              No, the AOT collector understands limited JavaScript features. If
              an expression uses unsupported syntax, the collector writes an
              error node to the .metadata.json file. Later point of time, the
              compiler reports an error if it needs that piece of metadata to
              generate the application code.
              <br />
              <h3>5. JIT compilation: </h3>
              Just-in-Time is a type of compilation that compiles your app in
              the browser at runtime. JIT compilation is the default when you
              run the ng build or ng serve.
              <ul>
                <li>
                  A JIT compiler runs after the program has started and compiles
                  the code (usually bytecode or some kind of VM instructions). A
                  JIT has access to dynamic runtime information whereas a
                  standard compiler doesn't and can make better optimizations
                  like inlining functions that are used frequently.
                </li>
                <li>
                  This is in contrast to a traditional compiler that compiles
                  all the code to machine language before the program is first
                  run.
                </li>
              </ul>
              <br />
              <h3>6. Ivy Compiler</h3>
              <ul>
                <li>
                  Ivy is now default compiler and runtime. Ivy improves budle
                  size, allows for better debugging, adds improves type
                  checking, faster testing, enables the AOT compiler on by
                  default, and improves CSS class and style binding.
                </li>
                <li>Reach better build times.</li>
                <li>
                  reach better build sizes (with a generated code more
                  compatible with tree-shaking).
                </li>
                <li>
                  Unlock new potential features (metaprogramming or higher order
                  components, lazy loading of component instead of modules).
                </li>
              </ul>
              <br />
              <br />
              <h3>7. What is metadata rewriting</h3>
              <ul>
                <li>
                  Metadata rewriting in Angular refers to the process of
                  modifying the metadata associated with a class or component
                  during the build process. Metadata in Angular is defined using
                  decorators, which are special functions that modify the
                  behavior of a class or component.
                </li>
                <br />
                <li>
                  During the build process, Angular's compiler analyzes the
                  application's source code and generates an optimized version
                  of the application's JavaScript code. As part of this process,
                  the compiler can also modify the metadata associated with the
                  application's components.
                </li>
                <br />
                <li>
                  Metadata rewriting is used to add or modify the metadata of a
                  component, such as changing the selector, modifying the
                  template or styles, or adding new input or output properties.
                  This can be useful in situations where the component needs to
                  be customized or extended for a specific use case.
                </li>
                <br />
                <li>
                  For example, suppose you have a third-party library that
                  provides a component that you want to use in your Angular
                  application. However, the component's selector conflicts with
                  another component in your application, and you cannot change
                  the selector of either component. In this case, you can use
                  metadata rewriting to modify the selector of the third-party
                  component during the build process, so that it does not
                  conflict with the other component.
                </li>
                <br />
                <li>
                  Overall, metadata rewriting is a powerful feature of Angular
                  that allows developers to modify the metadata associated with
                  a component during the build process. This can be useful in a
                  variety of situations, such as customizing third-party
                  components, optimizing component performance, or adding new
                  functionality to existing components.
                </li>
              </ul>
              <br />
              <br />
              <h3>8. Explain the purpose of Service Workers in Angular</h3>
              <ul>
                <li>
                  Service Workers are implemented using the
                  @angular/service-worker package. This package provides a set
                  of tools and utilities for configuring and deploying a Service
                  Worker in an Angular application.
                </li>
                <br />
                <li>
                  The purpose of Service Workers in Angular is to provide
                  advanced caching and offline capabilities to web applications.
                  By intercepting network requests and caching responses,
                  Service Workers can greatly reduce the amount of data that
                  needs to be downloaded and improve the performance of the
                  application. They can also provide offline support, allowing
                  users to continue using the application even when they are not
                  connected to the internet.
                </li>
                <br />
                <li>
                  Service Workers can also be used to provide push notifications
                  and background synchronization, which can be useful for
                  applications that need to update data in real-time.
                </li>
                <br />
                <li>
                  Overall, the purpose of Service Workers in Angular is to
                  provide advanced caching, offline, and real-time capabilities
                  to web applications. By leveraging Service Workers, developers
                  can create faster, more reliable, and more engaging web
                  applications that can work seamlessly across different devices
                  and network conditions.
                </li>
              </ul>
              <br />
              <br />
              <h3>9. What are the design goals of service workers</h3>
              Service workers in Angular are designed to help developers build
              progressive web applications (PWAs) that are reliable, fast, and
              engaging. The primary design goals of service workers in Angular
              are as follows:
              <ul>
                <li>
                  <b>Offline support: </b>Service workers allow Angular
                  applications to work offline by caching assets and data that
                  are necessary for the application to function.
                </li>
                <br />
                <li>
                  <b>Performance: </b>Service workers can improve the
                  performance of Angular applications by caching assets and data
                  on the client-side, reducing the number of requests that need
                  to be made to the server. This can lead to faster load times
                  and a smoother user experience.
                </li>
                <br />
                <li>
                  <b>Push notifications: </b>Service workers enable Angular
                  applications to send push notifications to users, even when
                  the application is not open in the user's browser. This can be
                  used to keep users engaged with the application and to provide
                  timely updates.
                </li>
                <br />
                <li>
                  <b>Security: </b>Service workers are designed to be secure and
                  reliable. They run in a separate context from the main
                  application and cannot access sensitive user data or resources
                  without permission.
                </li>
              </ul>
              <br />
              <br />
              <h3>
                10. Difference between local storage, cookies and Session.
              </h3>
              In Angular, there are three common ways to store data on the
              client-side: local storage, cookies, and session storage. Each has
              its own advantages and disadvantages, and the choice of which to
              use depends on the specific needs of the application.
              <ul>
                <li>
                  <b>Local Storage: </b>Local storage is a key-value store that
                  allows data to be stored on the client-side in a persistent
                  manner. The data stored in local storage is accessible even
                  after the browser is closed, and can be accessed by any page
                  in the same domain. Local storage is a good option for storing
                  large amounts of data that need to persist between sessions.
                </li>
                <br />
                <li>
                  <b>Cookies: </b>Cookies are small text files that are stored
                  on the client-side by the browser. Cookies can be used to
                  store small amounts of data, such as user preferences or
                  authentication tokens. Cookies are accessible by any page in
                  the same domain and can be set to expire after a certain
                  period of time.
                </li>
                <br />
                <li>
                  <b>Session Storage: </b>Session storage is similar to local
                  storage, but the data stored in session storage is only
                  accessible within the current browser session. Once the
                  browser is closed, the data is deleted. Session storage is a
                  good option for storing data that needs to be accessible
                  across multiple pages within the same session, but does not
                  need to persist between sessions.
                </li>
              </ul>
              <br />
              <br />
              <h3>11. What is authentication and authorization in Angular.</h3>
              <ul>
                <li>
                  <b>Authentication: </b>During login, the credential are sent
                  to an authentication API. This API is present on the server
                  and validation is done there. After a JWT is returned, this
                  token has information about the usr and is used to identify
                  the user. This process is called Authentication.
                </li>
                <br />
                <li>
                  <b>Authorization: </b>After authentication, user are given
                  various levels of permission/ access. Some users may have
                  access to all the pages and some might not. This process of
                  restricting the content is called Authorization.
                </li>
              </ul>
              <br />
              <br />
              <h3>12. How we handle large data api in frontend.</h3>
              Pagination, infinite scroll
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(DepenInjection);
