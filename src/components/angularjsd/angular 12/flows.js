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

const purpose = `
<base href="/">
`.trim();

const angularRouter = `import { RouterModule, Routes } from '@angular/router';`.trim();

const wildcart = `{ path: '**', component: PageNotFoundComponent }`.trim();

const pipes = `
RouterLink-client side:
<a [routerLink]=['/students]">Students</a>
<router-outlet></router-outlet>`.trim();

const routerState = `
@Component({templateUrl:'template.html'})
class MyComponent {
  constructor(router: Router) {
    const state: RouterState = router.routerState;
    const root: ActivatedRoute = state.root;
    const child = root.firstChild;
    const id: Observable<string> = child.params.map(p => p.id);
    //...
  }
}`.trim();


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
              <h3>1. What is Angular Router</h3>
              Angular Router is a mechanism in which navigation happens from one view to the next as users perform application 
              tasks. It borrows the concepts or model of browser's application navigation.
              <br />

              <h3>2. What are the router imports</h3>
              The Angular Router which represents a particular component view for a given URL is not part of Angular Core. It is 
              available in library named @angular/router to import required router components.
              <div style={titles}>
                <PrismCode
                  code={angularRouter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>3. What are Router Events</h3>
                The Router event allows to track the entire lifecycle of the route. This is doneby emitting navigation events through the router.event property.
                <br/>
                <br/>
                The sequences is as follows:
                <ol>
                  <b>NavigationStart = 
                  RouteConfigLoadStart = 
                  RouteConfigLoadEnd = 
                  RoutesRecognized = 
                  GuardsCheckStart = 
                  ChildActivationStart = 
                  ActivationStart = 
                  GuardCheckEnd = 
                  ResolveStart = 
                  ResolveEnd = 
                  ActivationEnd = 
                  ChildActivationEnd = 
                  NavigationEnd = 
                  NavigationCancel = 
                  NavigationError = 
                  Scroll</b>
                </ol>
              <br/>

              <h3>4. What is the use of router-outlet in angular 8.</h3>
              <ul>
                <li>Router outlet is a dynamic component that router uses to display views based on router navigations.</li>
                <br />
                <li>The RouterOutlet is a directive from the router library and it acts as a placeholder that marks the spot in 
                  the template where the router should display the components for that outlet. Router outlet is used like a 
                  component,</li>
                <br/>
                <li>It tells the router where to display routed views.</li>
              </ul>
              <br />

              <h3>5. Can I use multiple router outlets in Angular 8?</h3>
              Yes! We can use multiple router-outlets in same template by configuring our routers and simply add the router-outlet name.
              <br />

              <h3>6. How do you make a router link in HTML?</h3>
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

              <h3>7. Difference between navigate and navigatebyurl in angular.</h3>
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

              <h3>8. How do you detect route change in Angular?</h3>
              <ul>
                <li>Import Router, Event, NavigationStart, NavigationEnd, NavigationError from ‘@angular/router’.</li>
                <li>And inject router in the constructor.</li>
                <li>Subscribe to the NavigationStart, NavigationEnd, NavigationError events of the router.</li>
              </ul>
              <br />

              <h3>9. When to use Route class in case of navigation?</h3>
              Using Route class in case of navigation to happen on a triggered event. Before performing the above two operations, there is a need to register this component in the
              Route class’s instance which lies inside the app-routing.module.ts file. This will be further used to navigate from child to parent.
              <br />

              <h3>10. What is pathMatch in angular routing?</h3>
              Angular 2 applications require to redirect route and pathMatch is a property which informs a router how to match and 
              map a URL to the path of an actual route. In the application, the router automatically select the route using 
              component HeroListComponent only when the entire URL of matches.
              <br/>

              <h3>11. Difference between Angular's canLoad and canActivate?</h3>
              <ul>
                <li><b>canActivate: </b>is used to prevent unauthorized users from accessing certain routes. See docs for more info.</li>
                <li><b>canLoad: </b>is used to prevent the application from loading entire modules lazily if the user is not authorized to do so.</li>
              </ul>
              <br/>

              <h3>12. Router Link</h3>
              <ul>
                <li>routerLink is the selector for the RouterLink Directive that turns user clicks into router navigations.</li>
                <li>this Directive generates our link based on the route path.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={pipes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>13. What are active router links</h3>
              RouterLinkActive is a directive that toggles css classes for active RouterLink bindings based on the
              current RouterState. i.e, the Router will add CSS classes when this link is active and remove when the link is inactive.
              <br />

              <h3>14. What is router state</h3>
              RouterState is a tree of activated routes. Every node in this tree knows about the "consumed" URL
              segments, the extracted parameters, and the resolved data.
              <br />
              You can access the current RouterState from anywhere in the application using the Router service and the routerState property.
              <br />
              <div style={titles}>
                <PrismCode
                  code={routerState}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>15. What is the purpose of Wildcard route</h3>
              If the URL doesn't match any predefined routes then it causes the router to throw an error and crash
              the app. In this case, use wildcard route. A wildcard route has a path consisting of two asterisks to match every URL.
              <div style={titles}>
                <PrismCode
                  code={wildcart}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>16. How to specify which route to navigate to in NavLink?</h3>
              To specify which route to navigate to, use the to prop and pass the path name. The activeClassName prop will add an active class to the link if it’s currently active.
              On the browser, the NavLink component is rendered as an tag with an href attribute value that was passed in the to prop.
              <br />

              <h3>17. When to use absolute path in navigate method?</h3>
              Navigate Method always uses the absolute path unless you provide a starting point. <b>navigate.navigateByUrl</b> Use this method if you want to navigate to a URL by using
              the absolute path. The first argument is a string containing the complete URL.
              <br />

              <h3>18. What is Routing Guard in Angular?</h3>
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

              <h3>19. How would you protect a component being activated through the router?</h3>
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

              <h3>20. What is the purpose of base href tag?</h3>
              The routing application should add element to the index.html as the first child in the tag inorder to indicate how to compose navigation URLs. If app folder is the application root then you can set the href value as below.
              <div style={titles}>
                <PrismCode
                  code={purpose}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>21. Pass complex JSON via routerLink.</h3>
              <div style={titles}>
                <PrismCode
                  code={routerLink}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>22. What is the use of EventEmitter in angular.</h3>
                EventEmitter is used with @Output directive to emit custom events asynchronously and synchronously, and register 
                handlers for those events by subscribing to an instance.
              <br />

              <h3>23. What is the use of shared module in angular.</h3>
              A Shared Module is used to organize a set of commonly used pieces into one module and export them to any other 
              module that imports the Share Module. This allows us to selectively aggregate the reusable components.
              <br />

              <h3>24. How do you handle error in Angular?</h3>
              By using ErrorHandler class. This class can be extended to create your own global error handler.
              <br />

              <h3>25. How are Angular expressions different from JavaScript expressions?</h3>
              <ul>
                <li>Angular expressions allow us to write JavaScript in HTML</li>
                <li>Angular expressions are evaluated against a local scope object whereas JavaScript expressions against global window object.</li>
              </ul>
              <br/>

              <h3>26. Angular by default, uses client-side rendering for its applications. Can one make an angular application to render on the server-side?</h3>
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

              <h3>27. How does one share data between components in Angular?</h3>
              <ul>
                <li>Parent to child using @Input decorator</li>
                <li>Child to parent using @ViewChild decorator
                  <ul><li><b>@ViewChild: </b>decorator is used to reference the child component as “child” property.</li></ul>
                </li>
                <li>Child to parent using @Output and EventEmitter</li>
              </ul>
              <br/>

              <h3>28. What are filters in Angular? Name a few of them.</h3>
              Filters are used to format an expression and present it to the user. They can be used in view templates, controllers, or services. Some inbuilt filters are as follows.
              <ol>
                <li>Date</li>
                <li>filter</li>
                <li>Json</li>
                <li>limitTo</li>
                <li>lowercase</li>
              </ol>
              <br/>

              <h3>29. What is Bootstrap? How is it embedded into Angular?</h3>
              Bootstrap is a collection of HTML, CSS, and JavaScript tools for creating and building responsive web pages and 
              web applications.
              <br/>

              <h3>30. What type of DOM does Angular implement?</h3>
                <ul>
                  <li>DOM (Document Object Model) treats an XML or HTML document as a tree structure in which each node is an object representing a part of the document.</li>
                  <li>Angular uses the regular DOM. This updates the entire tree structure of HTML tags until it reaches the data to be updated. However, to ensure that the speed and performance are not affected, Angular implements Change Detection.</li>
                </ul>
              <br/>

              <h3>31. What is DOM?</h3>
              It is responsible for representing the content of a web page and changes in the architecture of an application. Here, all the objects are organized in the form of a tree, and the document can easily be modified, manipulated, and accessed only with the help of APIs.
              <br />

              <h3>32. Shadow DOM</h3>
              <ul>
                <li>it means that Shadow DOM allows us to hide the DOM logic behind other elements.</li>
                <li>Shadow DOM allows us to apply scoped styles to elements without bleeding into the outside world.
                </li>
              </ul>
              <br/>

              <h3>33. What is the difference between *ngIf vs [hidden]?</h3>
              <b>*ngIf</b> effectively removes its content from the DOM while <b>[hidden]</b> modifies the <b>display</b> property and only instructs the browser to not show the content but the DOM still contains it.
              <br/>

              <h3>34. What is server-side rendering in Angular?</h3>
              If we have a large application with a big bundle size, our page’s load speed is slowed down quite a bit as it needs to download all the files, parse JavaScript, and then execute it. To overcome this slowness, we can use server-side rendering, which allows us to send a fully rendered page from the server that the browser can display and then let the JavaScript code take over any subsequent interactions from the user.
              <br/>

              <h3>35. What is Angular Universal?</h3>
              Angular Universal is a package for enabling server-side rendering in Angular applications. We can easily make our application ready for server-side rendering using the Angular CLI.<br/>
              <b>ng add @nguniversal/express-engine</b>
              <br/>
              <br/>
              This allows our Angular application to work well with an ExpressJS web server that compiles HTML pages with Angular Universal based on client requests. This also creates the server-side app module, app.server.module.ts, in our application directory.
              <br/>

              <h3>36. What is the difference between interpolated content and the content assigned to the innerHTML property of a DOM element?</h3>
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
