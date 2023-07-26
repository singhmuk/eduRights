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

const basicRouter = `
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SignupComponent } from './order/signup.component';

const routes: Routes = [
  { path:'signup', component:SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//
<a routerLink='login'>Login</a>
<a routerLink='signup'>Signp</a>

<router-outlet></router-outlet>
`.trim();

const addcomponents = `
router.navigateByUrl("/team/1");
router.navigate(['team' ,1]);
`.trim();

const forRoots = `
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
`.trim();

const forChilds = `
const routes: Routes = [
  { path: 'products', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
`.trim();

const routerLink = `
<my-tile [routerLink]="['/secondPage', item.id, 'item-list']" *ngFor="let item of listaOfItem" [item]="item">
</my-tile>
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

const angularRouter =
  `import { RouterModule, Routes } from '@angular/router';`.trim();

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

const multipleRoute = `
const routes: Routes = [
  { path:"",  component:HomeComponent },
  { path:"about", redirectTo:"signup", pathMatch:"full", component:AboutComponent },
  { path:'profile/:username', component:ProfileComponent },
  { path:'profile/:username/:userid', component:ProfileComponent }
];


//about.component.ts
import {ActivatedRoute } from '@angular/router';

export class AboutComponent implements OnInit {
  username="";
  name1="";
  name2="";
  userid1="";
  userid2="";
  constructor( private route: ActivatedRoute, ) {}
 

  ngOnInit(): void {

    this.route.params.subscribe(params => {      //pass data as parameter
        this.name1 = params['username'];
        this.userid1=params['userid'];
     });

    this.route.queryParams.subscribe(params => {  //pass data as query string parameter
        this.name2 = params['username'];
        this.userid2=params['userid'];
     });
  }
}


//browser url show through template
<h1>Parameter User Profile</h1>
<h2>Username:{{name1}}</h2>
<h2>User ID:{{userid1}}</h2>
`.trim();

const currentRoute = `
<router-outlet></router-outlet>                          //Unnamed router outlet as primary outlet
<router-outlet name="second"></router-outlet>            //named router outlet as secondary outlet


//app-routing.module.ts
const routes: Routes = [
  {
    path:'customer', loadChildren:()=>import('./customer/customer.module') .then(mod=>mod.CustomerModule), 
      component:CustomerComponent
  },
  { path:'customerdetails',  component:CudtomerdetailsComponent, outlet:'customerList' },
  {
    path:'order', loadChildren:()=>import('./order/order.module') .then(mod=>mod.OrderModule),
      component:OrderComponent
  }
];


//app.component.ts
import {UserdataService} from './userdata.service';

@Component({
  selector: 'app-root',
  template: '
      <a routerLink="customer">Customer</a><br/>
      <a [routerLink]="[{Outlets:{customerList:['customerdetails']}}]">Details</a><br/>

      <a routerLink="order">Order</a>

      <router-outlet></router-outlet>
      <router-outlet name="customerList"></router-outlet>
  ',
  providers:[UserdataService]
})

export class AppComponent {}
`.trim();

const routerLinkActive = `
<a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a><br/>
<a routerLink="/about" routerLinkActive="active">About</a><br/>
<a routerLink="/login" routerLinkActive="active">Login</a><br/>
<a routerLink="/signup" routerLinkActive="active">SignUp</a><br/>
<a routerLink="/profile" routerLinkActive="active">Profile</a>
`.trim();

const routrtDetect = `
//html
<p>Current route: {{ currentRoute }}</p>


import { ActivatedRoute } from '@angular/router';

export class MyComponent implements OnInit {
  currentRoute: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentRoute = params['id'];
      console.log('Route changed to: ', this.currentRoute);
    });
  }
}
`.trim();

const resolvers = `
const routes: Routes = [
  {
    path: 'app', component: RoutesComponent,
    resolve: {
      exampleData: ExampleResolverService
    }
  }
];
`.trim();

class NgrxCounter extends Component {
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
              <h3>1. Basic Routing</h3>
              Router basically means navigating b/w pages. we have seen many
              sites with links that direct us to a new page.
              <div style={titles}>
                <PrismCode
                  code={basicRouter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>2. Routing with multiple route parameter</h3>
              We should define custome route before wildcard route. Otherwise it
              not work if we define after wildcard route.
              <div style={titles}>
                <PrismCode
                  code={multipleRoute}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. Name & Multiple router-outlets</h3>
              Router-outlet work as a placeholder which is used to load the
              different components dynamically based on the activated component
              or current route state.
              <div style={titles}>
                <PrismCode
                  code={currentRoute}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>4. routerLinkActive</h3>
              <div style={titles}>
                <PrismCode
                  code={routerLinkActive}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>5. What are the router imports</h3>
              The router imports in Angular are used to configure and manage the
              application's routing functionality. The following are some of the
              router imports in Angular:
              <br />
              <ul>
                <li>
                  <b>RouterModule: </b>This is the core Angular module that
                  provides the routing functionality for the application. It
                  includes several classes and methods for configuring routes,
                  navigating between routes, and handling route-related events.
                </li>
                <br />
                <li>
                  <b>Routes: </b>This is an array of route objects that define
                  the application's routing configuration. Each route object
                  specifies a path, a component, and other optional properties
                  such as data, guards, and resolvers.
                </li>
                <br />
                <li>
                  <b>Router: </b>This is the Angular service that provides
                  methods for navigating between routes, accessing the current
                  route, and subscribing to route-related events.
                </li>
                <br />
                <li>
                  <b>ActivatedRoute: </b>This is a service that provides
                  information about the current route, including the route
                  parameters, query parameters, and route data.
                </li>
                <br />
                <li>
                  <b>RouterLink: </b>This is a directive that is used in HTML
                  templates to create links between routes. It takes a path as
                  input and generates a link to the corresponding route.
                </li>
                <br />
                <li>
                  <b>RouterOutlet: </b>This is a directive that is used in HTML
                  templates to define the location where the component
                  corresponding to the current route should be displayed.
                </li>
                <br />
                <br />
                <li>
                  These router imports are essential for setting up the routing
                  functionality in an Angular application. By configuring the
                  routes, using the router and activated route services, and
                  utilizing the router link and outlet directives, developers
                  can create a seamless and intuitive user experience for their
                  application.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={angularRouter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>6. What are Router Events</h3>
              Router Events in Angular are a set of events emitted by the
              Angular Router whenever the navigation state changes. The Router
              Events provide a way to track and respond to changes in the
              application's navigation, and they can be used to perform tasks
              such as updating the UI, tracking user behavior, or logging
              navigation events.
              <br />
              <ul>
                <li>
                  <b>NavigationStart: </b>Emitted when navigation starts.
                </li>
                <br />
                <li>
                  <b>RoutesRecognized: </b>Emitted when the Router has
                  recognized the new route and is about to activate it.
                </li>
                <br />
                <li>
                  <b>RouteConfigLoadStart: </b>Emitted when the Router begins
                  loading a lazy-loaded route configuration.
                </li>
                <br />
                <li>
                  <b>RouteConfigLoadEnd: </b>Emitted when the Router has
                  finished loading a lazy-loaded route configuration.
                </li>
                <br />
                <li>
                  <b>NavigationEnd: </b>Emitted when navigation has successfully
                  completed.
                </li>
                <br />
                <li>
                  <b>NavigationCancel: </b>Emitted when navigation has been
                  cancelled.
                </li>
                <br />
                <li>
                  <b>NavigationError: </b>Emitted when navigation has failed due
                  to an error.
                </li>
              </ul>
              <br />
              <br />
              <h3>7. What is the use of router-outlet in angular 8.</h3>
              <ul>
                <li>
                  Router outlet is a dynamic component that router uses to
                  display views based on router navigations.
                </li>
                <br />

                <li>It tells the router where to display routed views.</li>
              </ul>
              <br />
              <h3>
                8. Difference between navigate and navigatebyurl in angular.
              </h3>
              <ul>
                <li>
                  navigate method accept an array and it construct the root path
                  while, navigateByUrl accept an string which give us root path.
                </li>
                <li>
                  Using navigate method we can also achieved relative path by{" "}
                  <b>relativeTo</b> option while, navigateByUrl can be use only
                  for absolute path.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={addcomponents}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>1. What is the difference between forChild and forRoot? </h3>
              <ul>
                <li>
                  In Angular, forRoot() and forChild() are two methods provided
                  by the RouterModule to configure the router module. The main
                  difference between them is that forRoot() should be used only
                  in the root AppModule of the application, while forChild()
                  should be used in all the other modules.
                </li>
                <br />
                <li>
                  The forRoot() method is used to configure the router at the
                  application level, and it sets up the router with the routes
                  and other configuration options required by the root module.
                </li>
                <div style={titles}>
                  <PrismCode
                    code={forRoots}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />
                <li>
                  forChild() method is used to configure the router in feature
                  modules.
                </li>
                <div style={titles}>
                  <PrismCode
                    code={forChilds}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
              </ul>
              <br />
              <h3>9. How do you detect route change in Angular?</h3>
              can detect route changes using the ActivatedRoute service and the
              Router module.
              <br />
              <br />
              One way to detect route changes is to subscribe to the params
              property of the ActivatedRoute service. This property is an
              observable that emits a new value whenever the route parameters
              change.
              <div style={titles}>
                <PrismCode
                  code={routrtDetect}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>10. What is pathMatch in angular routing?</h3>
              In Angular routing, pathMatch is a configuration option that
              determines how to match the URL segments to the configured route
              path.
              <br />
              <br />
              There are two possible values for the pathMatch option:
              <ul>
                <li>
                  <b>prefix: </b>This value indicates that the router should
                  match the configured route path if the URL starts with the
                  specified path. This is the default value if pathMatch is not
                  specified.
                </li>
                <br />
                <li>
                  <b>full: </b>This value indicates that the router should match
                  the configured route path if the URL matches the entire path.
                </li>
              </ul>
              <br />
              <br />
              <h3>11. Difference between Angular's canLoad and canActivate?</h3>
              Both canLoad and canActivate are Angular route guards that can be
              used to protect routes in an Angular application, but they are
              used in different scenarios.
              <ul>
                <li>
                  <b>canActivate: </b>Is a route guard that is used to protect a
                  route after it has been loaded. When a user navigates to a
                  protected route, canActivate is called before the route is
                  activated. canActivate returns either a boolean value or an
                  observable that resolves to a boolean value. If canActivate
                  returns true, the route is activated, and the user can
                  proceed. If canActivate returns false, the route is not
                  activated, and the user is redirected to a different page.
                </li>
                <br />
                <li>
                  <b>canLoad: </b> Is a route guard that is used to protect a
                  route before it is loaded. When a user navigates to a route
                  that requires lazy loading, canLoad is called before the
                  module containing the route is loaded. canLoad returns either
                  a boolean value or an observable that resolves to a boolean
                  value. If canLoad returns true, the module is loaded, and the
                  user can proceed. If canLoad returns false, the module is not
                  loaded, and the user is redirected to a different page.
                </li>
              </ul>
              <br />
              <br />
              <h3>12. What is router state</h3>
              RouterState is a tree of activated routes. Every node in this tree
              knows about the URL segments, the extracted parameters, and the
              resolved data.
              <br />
              You can access the current RouterState from anywhere in the
              application using the Router service and the routerState property.
              <br />
              <div style={titles}>
                <PrismCode
                  code={routerState}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>13. How to specify which route to navigate to in NavLink?</h3>
              To specify which route to navigate to, use the to prop and pass
              the path name. The activeClassName prop will add an active class
              to the link if it’s currently active. On the browser, the NavLink
              component is rendered as an tag with an href attribute value that
              was passed in prop.
              <br />
              <h3>14. When to use absolute path in navigate method?</h3>
              Navigate Method always uses the absolute path unless you provide a
              starting point. <b>navigate.navigateByUrl</b> Use this method if
              you want to navigate to a URL by using the absolute path. The
              first argument is a string containing the complete URL.
              <br />
              <h3>15. What is Routing Guard in Angular?</h3>
              Angular’s route guards tell the router whether or not it should
              allow navigation to a requested route. They make this decision by
              looking for a true or false return value from a class which
              implements the given guard interface.
              <br />
              <br />
              There are five different types of guards:
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
              <br />
              <br />
              <h3>16. Pass complex JSON via routerLink.</h3>
              <div style={titles}>
                <PrismCode
                  code={routerLink}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>What is a resolver in Angular and how is it used?</h3>
              <ul>
                <li>
                  In Angular, a resolver is a service that is used to retrieve
                  data before a route is activated. It allows you to fetch data
                  and perform any necessary operations before the component is
                  rendered. This can be useful for scenarios where you need to
                  fetch data from an API or perform some other async operation
                  before rendering the component.
                </li>
                <br />
                <li>
                  When a resolver is added to a route, it ensures that the data
                  is available to the component before it is rendered. This can
                  help prevent issues with data being unavailable or incorrect
                  during rendering, as the resolver ensures that the data is
                  loaded and ready to use.
                </li>
                <br />
                <li>
                  To create a resolver in Angular, you can create a service that
                  implements the Resolve interface and defines a resolve()
                  method. This method should return an observable that resolves
                  to the data that you want to load. You can then add the
                  resolver to the resolve property of the route definition.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={resolvers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                17. Angular by default, uses client-side rendering for its
                applications. Can one make an angular application to render on
                the server-side?
              </h3>
              Yes, with Angular Universal, Angular application can render on the
              server-side.
              <br />
              <br />
              <b>The advantages of using Angular Universal are :</b>
              <ul>
                <li>
                  First time users can instantly see a view of the application.
                  This providing better user experience.
                </li>
                <li>
                  Many search engines expect pages in plain HTML, thus,
                  Universal can make sure that your content is available on
                  every search engine, which leads to better SEO.
                </li>
                <li>
                  Any server-side rendered application loads faster since
                  rendered pages are available to the browser sooner.
                </li>
              </ul>
              <br />
              <h3>
                18. How does one share data between components in Angular?
              </h3>
              <ul>
                <li>Parent to child using @Input decorator</li>

                <li>
                  Child to parent using @Output with EventEmitter and @ViewChild
                  decorator
                </li>
              </ul>
              <br />
              <h3>19. What are filters in Angular? Name a few of them.</h3>
              Filters are used to format an expression and present it to the
              user.
              <ol>
                <li>Date</li>
                <li>filter</li>
                <li>Json</li>
                <li>limitTo</li>
                <li>lowercase</li>
              </ol>
              <br />
              <h3>20. What type of DOM does Angular implement?</h3>
              <ul>
                <li>
                  Angular uses the regular DOM. This updates the entire tree
                  structure of HTML tags until it reaches the data to be
                  updated. However, to ensure that the speed and performance are
                  not affected, Angular implements Change Detection.
                </li>
              </ul>
              <br />
              <h3>21. What is DOM?</h3>
              It is responsible for representing the content of a web page and
              changes in the architecture of an application. Here, all the
              objects are organized in the form of a tree, and the document can
              easily be modified, manipulated, and accessed only with the help
              of APIs.
              <br />
              <h3>22. Shadow DOM</h3>
              <ul>
                <li>
                  Shadow DOM is a feature of web components that allows
                  encapsulation of HTML, CSS, and JavaScript. In Angular, Shadow
                  DOM is used to encapsulate component styles and HTML
                  templates, ensuring that they do not leak out and affect other
                  parts of the application.
                </li>
                <br />
                <li>
                  When a component is created in Angular, it is rendered within
                  a Shadow DOM root. The Shadow DOM root is a separate DOM tree
                  that is attached to the main document's DOM tree, but is not
                  part of it. This allows the component to have its own isolated
                  CSS styles and HTML structure, which cannot be affected by
                  styles or elements outside of the component.
                </li>
                <br />
                <br />
                <li>
                  Angular uses the ViewEncapsulation metadata property to
                  control how a component's styles are encapsulated.
                  <br />
                  <br />
                  determines whether the styles defined in a particular
                  component will affect the entire application or not. Angular
                  supports 3 types of ViewEncapsulation:
                </li>
                <br />
                <ul>
                  <li>
                    <b>Emulated: </b>This is the default value, and it emulates
                    the behavior of Shadow DOM by adding unique CSS selectors to
                    the component's styles, making it more difficult for them to
                    be overridden by external styles.
                  </li>
                  <br />
                  <li>
                    <b>Native: </b> This value uses the native Shadow DOM
                    implementation to encapsulate a component's styles. This
                    means that the component's styles are completely isolated
                    from the rest of the application.
                  </li>
                  <br />
                  <li>
                    <b>None: </b>This value disables encapsulation and allows a
                    component's styles to be applied globally, potentially
                    affecting other parts of the application.
                  </li>
                </ul>
              </ul>
              <br />
              Overall, Shadow DOM in Angular provides a powerful way to
              encapsulate component styles and templates, ensuring that they do
              not leak out and affect other parts of the application. By using
              the ViewEncapsulation metadata property, developers can control
              how a component's styles are encapsulated, and ensure that they
              behave as expected.
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(NgrxCounter);
