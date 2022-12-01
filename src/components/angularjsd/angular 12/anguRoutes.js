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


const wildcart = `{ path: '**', component: PageNotFoundComponent }`.trim();



const angularRouter = `import { RouterModule, Routes } from '@angular/router';`.trim();

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

const fullResponse = `
getUserResponse(): Observable<HttpResponse<User>> {
  return this.http.get<User>(
    this.userUrl, { observe: 'response' });
}`.trim();

const observer = `
interface Observer<T> {
  closed?: boolean;
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}


//A handler that implements the Observer interface for receiving observable notifications will be passed as a 
parameter for observable as

myObservable.subscribe(myObserver);
`.trim();

const performError = `
fetchUser() {
  this.userService.getProfile()
    .subscribe(
      (data: User) => this.userProfile = { ...data }, // success path
      error => this.error = error // error path
    );
}`.trim();



// const projection = ``.trim();



class AngularRoutes extends Component {
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
              Angular Router is a mechanism in which navigation happens from one view to the next as users perform application tasks. It borrows the concepts or model of browser's application navigation.
              <br />

              <h3>2. What is the purpose of base href tag</h3>
              The routing application should add element to the index.html as the first child in the tag in order to indicate how to compose navigation URLs.
              <br />

              <h3>3. What are the router imports</h3>
              The Angular Router which represents a particular component view for a given URL is not part of Angular Core. It is available in library named @angular/router to import required router components.
              <div style={titles}>
                <PrismCode
                  code={angularRouter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>4. Routing</h3>
              To parse the URL, Angular uses the following conventions:
              <br />
              <b>step1:</b>
              <ul>
                <li><b>/:</b> slashes divide URL segments</li>
                <li><b>():</b> parentheses specify secondary routes.</li>
                <li><b>::</b> colon specify a named router outlet.</li>
                <li><b>;:</b> specify a matrix Parameter.</li>
                <li><b>?:</b> separates the query string parameters.</li>
                <li><b>#:</b>hashtag specifies the fragment</li>
                <li><b>//:</b> separates multiple secondary routes.</li>
              </ul>
              <b>step2</b>
              <ul>
                <li>Before Angular router uses the URL tree to create state, it checks to see if any redirect
                  should be applied. There are 2 kinds of redirect:</li>
                <li><b>Local redirect:</b> when redirectTo does not start with a alash, replaces a single URL segment.</li>
                <li><b>Absolute redirect:</b> when redirect start with a slash. replaces the entire URL.</li>
                <li>Only one redirect is applied.</li>
              </ul>
              <h3>5. Router outlet</h3>
              Router outlet is a dynamic component that router uses to display views based on
              router navigations.
              <br />
              The RouterOutlet is a directive from the router library and it acts as a placeholder that marks the spot in the template where the router should display the components for that outlet. Router outlet is used like a component,
              <br />
              It tells the router where to display routed views.
              <br />

              <h3>6. Router Link</h3>
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

              <h3>7. What are active router links</h3>
              RouterLinkActive is a directive that toggles css classes for active RouterLink bindings based on the
              current RouterState. i.e, the Router will add CSS classes when this link is active and remove when the link is inactive.
              <br />

              <h3>8. What is router state</h3>
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

              <h3>9. What are router events</h3>
              During each navigation, the Router emits navigation events through the Router.events property allowing you to track the lifecycle of the route.
              <br />
              <br />
              The sequence of router events is as below,
              <ol>
                <li>NavigationStart</li>
                <li>RouteConfigLoadStart</li>
                <li>RouteConfigLoadEnd</li>
                <li>RoutesRecognized</li>
                <li>GuardsCheckStart</li>
                <li>ChildActivationStart</li>
                <li>ActivationStart</li>
                <li>GuardsCheckEnd</li>
                <li>ResolveStart</li>
                <li>ResolveEnd</li>
                <li>ActivationEnd</li>
                <li>ChildActivationEnd</li>
                <li>NavigationEnd</li>
                <li>NavigationCancel</li>
                <li>NavigationError</li>
                <li>Scroll</li>
              </ol>
              <br />

              <h3>10. What is the purpose of Wildcard route</h3>
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

              <h3>11. Observables and Subscribe:</h3>
              <ul>
                <li>Observables are declarative which provide support for passing messages between publishers and subscribers
                  in application. They are mainly used for event handling, asynchronous programming, and handling multiple
                  values.</li>
                <li>To perform asynchronous programming in angular app. We can
                  use either Observables or Promise. When we send and receive data over HTTP, we need to deal it
                  asynchronously. Observables is Subscribe by using async pipe or Subscribe method.</li>
                <li>RxJS is ReactiveX library for js that perform reactive programming.
                  Observables represents any set of values over any amount of time. Observables plays most basic
                  role in reactive programming with RxJS, Some methods are: Subscribe, map, mergeMap,
                  switchMap, exhaustMap, debounceTime, of, retry, catch, row,th.</li>
                <br />
                <b>HttpClient implement 'Simplified syntax for headers' while, HTTP not.</b>
              </ul>
              <br />

              <h3>12. What is Subscribing</h3>
              <ul>
                <li>A Subscription is an object that represents a disposable resource, usually the execution of an Observable.</li>
                <li>A Subscription has one important method, unsubscribe, that takes no argument and just disposes of the resource held by the subscription.</li>
              </ul>
              <br />

              <h3>13. What is an observer</h3>
              Observer is an interface for a consumer of push-based notifications delivered by an Observable.
              <div style={titles}>
                <PrismCode
                  code={observer}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <b>N: </b>If you don't supply a handler for a notification type, the observer ignores notifications of that type.
              <br />
              <br />

              <h3>14. How can you read full response</h3>
              The response body doesn't may not return full response data because sometimes servers also return special headers or status code which are important for the application workflow. Inorder to get full response, you should use observe option from HttpClient,
              <div style={titles}>
                <PrismCode
                  code={fullResponse}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              Now HttpClient.get() method returns an Observable of typed HttpResponse rather than just the JSON data.
              <br />

              <h3>15. How do you perform Error handling</h3>
              If the request fails reach the server due to network issues then HttpClient will return an error
              object instead of a successful reponse. In this case, need to handle in the component by passing error object as a second callback to subscribe() method.
              <div style={titles}>
                <PrismCode
                  code={performError}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>16. What will happen if you do not supply handler for observer</h3>
              Normally an observer object can define any combination of next, error and complete notification type handlers. If you don't supply a handler for a notification type, the observer just ignores notifications of that type.
              <br />

              <h3>17. Two ways to collect and validate data from users</h3>
              <b>1. Template-driven forms:</b>
              <ul>
                <li>Everythings which we are going to use in an application is defined into the template that are defining</li>
                <li>Along with a component.</li>
                <li>To use it we need to import FormsModule in application.</li>
              </ul>
              <br />
              <b>2. Model-driven forms (Reactive forms)</b>
              <ul>
                <li>The model which is created in .ts file is responsible for handling all the user interactions/
                  validations. For this first need to create the model using Angular unbuilt classes like
                  formGroup and formControl and then, we need to bind the model to HTML form.</li>
                <li>As we create the form controls directly in the component, it makes easier to push data
                  between the data models and UI elements. </li>
              </ul>
              <br />

              <b>statusChanges():</b>
              <br />
              is a property of AbstractControl that emits an event every time when the
              validations status of the control is recalculated.
              <br />statusChanges property is available in
              formControl, FormArray and formGroup classes because they inherit AbstractControl class.
              <br />
              <br />
              <b>Angular Module Loading: A module can be loaded eagerly, lazily, preloaded.</b>
              <ul>
                <li><b>1. Eager loading:</b> All of the modules and functions are loaded on application startup. the root module
                  is always eagerly loaded.</li>
                <li><b>2. Lazy loading:</b> is loading modules on demand.</li>
                <br />
                <li><b>3. Preloading:</b> is loading modules in background just after app starts.</li>
                <li>To configure Preloading features modules, first we configure them for lazy loading then, using
                  angular in-built PreloadAllModules strategy, we enable to load all lazy loading into Preloading
                  modules.</li>
                <li>Using PreloadAllModules strategy, all modules configured by loadChildren property will be preloaded.
                  The modules configured by loadChildren property will be either lazily loaded or preloaded but not
                  both. To preload only selective modules, we need to use custom preloading strategy.</li>
                <li>We can create custom preloading strategy. For this we need to create a service by implementing
                  Angular PreloadingStrategy interface and override its preload method and then configure this
                  service with PreloadingStrategy property in routing module. To select a module for custom preloading
                  we need to use dataproperty in route configuration, configured as data 'preload: true' for
                  selective feature module preloading.</li>
              </ul>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(AngularRoutes));
