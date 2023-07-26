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

const transition = `
transition('open => closed', [
  animate('500ms')
]),`.trim();

const pipeFor = `
//html
<p> Birthday is {{birthday | date}}</p>
<p> Birthday is {{birthday | date: 'dd/MM/yyyy'}}</p>
<p> Birthday is {{birthday | date: 'fullDate' | uppercase}} </p>

export class AppComponent {
  birthday = new Date(1987, 6, 18); 
}`.trim();

const purpose = `
//html
Time: {{time | async}}

export class AppComponent {
  time = new Observable((observer) => {
    setInterval(() => observer.next(new Date().toString()), 2000);
  });
}`.trim();

const typeFunc = `
  template:
    '{{ $any(user).contacts.email }}'
    
    
  //The $any() cast function also works with this to allow access to undeclared members of the component.
     template:
     '{{ $any(this).contacts.email }}'`.trim();

const assertionOpp = `@Component({
    selector: 'my-component',
    template: '<span *ngIf="user"> {{user.name}} contacted through {{contact!.email}} </span>'
  })
  class MyComponent {
    user?: User;
    contact?: Contact;
  
    setData(user: User, contact: Contact) {
      this.user = user;
      this.contact = contact;
    }
  }`.trim();

const narrowing = `
  @Component({
    selector: 'my-component',
    template: '<span *ngIf="user"> {{user.contact.email}} </span>'
  })
  class MyComponent {
    user?: User;
  }`.trim();

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

const changeDetector = `
  import { ChangeDetectionStrategy, Component } from '@angular/core';
  
@Component({
<button (click)='updateName()'>Update</button>
  Welcome {{userValue.firstName}} - {{userValue.lastName}}
  <div *ngFor="let str of myStrArr">{{str}}</div>
  <p>onPush Stretgy</p>
<button (click)='onClick()'>onPush</button>
    ',

changeDetection:ChangeDetectionStrategy.OnPush
})

  export class AppComponent {
    title = '3_change_detection';
    userValue:any;
    myStrArr:any[]=[];
  
    ngOnInit():void{
      this.userValue = {
        firstName:'Mukesh',
        lastName:'Singh'
      };
    }
  
    updateName(){
      this.userValue.firstName='Rakesh';
      console.log('default Stretgy')
    }
  
    onClick(){
      this.myStrArr.push('onPush Stretgy')
      console.log('onPush')
    }
  }
  `.trim();

const dynamically = `
<h1>Hello created dynamic</h1>

//childs.ts
export class ChildCompo {
  @Output() loaded: EventEmitter<null> = new EventEmitter<null>();
  @Output() destroyed: EventEmitter<null> = new EventEmitter<null>();

  ngOnInit() {
    this.loaded.emit();
  }

  ngOnDestroy() {
    this.destroyed.emit();
  }
}


//html
<ng-container>
  <button (click)="loadComponent()">Click me to load component</button>
</ng-container>
<p>Hello loaded: {{ childLoaded }}</p>
<ng-template #template></ng-template>

//app.component.ts
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ChildCompo } from './child';

export class AppComponent {
  childLoaded: boolean = false;
  componentRef!: ComponentRef<ChildCompo>;

  @ViewChild('template', { read: ViewContainerRef })
  viewTemplate!: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {}

  loadComponent() {
    const componentFactory = this.cfr.resolveComponentFactory(ChildCompo);
    this.componentRef = this.viewTemplate.createComponent(componentFactory);

    (this.componentRef.instance as any).loaded.subscribe(() => {
      this.childLoaded = true;
    });
  }
}
`.trim();

const capitalize = `
//html
<p>{{ "hello" | capital }}</p>
<p>{{ "angular pipes are awesome" | capital }}</p>


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capital',
})
export class ChildComp implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
}
`.trim();

class NgModel extends Component {
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
              <h3>
                3. Can you explain the concept of scope hierarchy in Angular?
              </h3>
              <ul>
                <li>
                  scopes are a way to organize and share data between components
                  and directives. Each component or directive has its own scope,
                  which is a JavaScript object that contains the properties and
                  methods of that component . Scopes can be nested inside one
                  another, forming a hierarchy of scopes.{" "}
                </li>

                <br />
                <li>
                  {" "}
                  The scope hierarchy in Angular is important because it
                  determines how data is shared between components and
                  directives.
                </li>
              </ul>
              <br />
              <br />
              <h3>6. Why we should use Bazel for Angular builds</h3>
              <ul>
                <li>
                  The initial build time with Bazel will be comparable to the
                  traditional JavaScript tooling. the difference is that the
                  time will not grow exponentially when our application’s size
                  increases. With Bazel most of the time the build time will
                  stay constant.
                </li>
                <li>
                  Bazel rebuilds only the packages which have changed and
                  nothing else.
                </li>
              </ul>
              <br />
              <br />
              <h3>7. What is State function</h3>
              <ul>
                <li>
                  A state function is a type of function that is used to manage
                  the state of a component or application. The state function is
                  a pure function that takes in an input state object and
                  returns a new output state object based on the input and any
                  actions that have been dispatched.
                </li>
                <br />
                <li>
                  The state function is typically use state management library
                  such as NgRx or Redux.
                </li>
                <br />
                <li>
                  The state function is typically defined as a reducer function
                  that takes in the current state and an action object, and
                  returns a new state object based on the action.{" "}
                </li>
              </ul>
              <br />
              <h3>8. What is transition function</h3>
              <ul>
                <li>
                  The animation transition function is used to specify the
                  changes that occur between one state and another over a period
                  of time. It accepts two arguments:
                </li>
                <ul>
                  <li>
                    First argument accepts an expression that defines the
                    direction between two transition states.
                  </li>
                  <li>Second argument accepts an animate() function.</li>
                </ul>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={transition}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>9. Pipes</h3>
              <ul>
                <li>
                  A pipe takes in data as input and transforms it to a desired
                  output.
                </li>

                <li>
                  Pipes used to transform the data before displaying it in a
                  browser. Even we can create custom pipes.
                </li>
                <br />
                <li>
                  <b>Parameterize Pipes:</b> we can pass any number of
                  Parameters to the pipe using colon (:).
                </li>
                <li>Mutiple Pipes</li>
                <li>Pipes with string</li>
                <br />
                <li>
                  <b>chain pipes: </b>To chain pipes, you simply add additional
                  pipe operators (|) followed by the name of the next pipe.
                </li>
              </ul>
              <br />
              <b>Ex. </b>DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe,
              and PercentPipe.
              <br />
              Let us take a pipe to transform a component's birthday property
              into a human-friendly date using date pipe.
              <br />
              <div style={titles}>
                <PrismCode
                  code={pipeFor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                Write a pipe in Angular that capitalizes the first letter of
                each word in a string.
              </h3>
              <div style={titles}>
                <PrismCode
                  code={capitalize}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>12. Pure and Impure Pipes</h3>
              <table>
                <tr>
                  <th>Pure Pipe</th>
                  <th>Impure Pipe</th>
                </tr>
                <tr>
                  <td>
                    Pure pipes are called only when Angular detects a change in
                    the input data.
                  </td>
                  <td>
                    are called on every change detection cycle, even if the
                    input data has not changed.
                  </td>
                </tr>
                <tr>
                  <td>
                    A pure pipe should always return the same output for the
                    same input, and it should not have any side effects.
                  </td>
                  <td>
                    Impure pipes can have side effects, and they should be used
                    with caution, as they can have a performance impact on the
                    application.
                  </td>
                </tr>
                <tr>
                  <td>
                    Pure pipes are designed to be used with immutable data, such
                    as strings, numbers, and objects that are not modified after
                    creation.
                  </td>
                  <td>
                    Impure pipes are designed to be used with mutable data, such
                    as arrays and objects that can be modified after creation.
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Ex. </b>UpperCasePipe, LowerCasePipe, JsonPipe
                  </td>
                  <td>
                    <b>Ex. </b>AsyncPipe, DatePipe
                  </td>
                </tr>
              </table>
              <br />
              <br />
              <h3>13. What is the purpose of async pipe</h3>
              Async pipe is used to handle asynchronous data and subscriptions
              in templates. The async pipe subscribes to an Observable or a
              Promise and returns the latest value emitted by the Observable or
              resolved by the Promise.
              <br />
              <br />
              Let's take a time observable which continuously updates the view
              for every 2 seconds with the current time.
              <div style={titles}>
                <PrismCode
                  code={purpose}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>14. Change Detection:</h3>
              <ul>
                <li>Means updating the DOM every time the data is changed.</li>
                <li>
                  When modifying any of the models, Angular detects the changes
                  and updates the views immediately. The purpose of this
                  mechanism is to ensure that the underlying views are always
                  synchronized with their corresponding models.
                </li>
              </ul>
              <br />
              <b>Angular provides two strategies for Change Detection:</b>
              <br />
              <b>1. default strategy:</b>
              <br />
              Every time you put or edit any data, Angular will run the change
              detector to update the DOM.
              <br />
              <br />
              <b>2. onPush strategy:</b>
              <ul>
                <li>
                  Angular will only run change detector when new reference is
                  passed to <b>@Input</b> data.
                </li>
                <br />
                <li>
                  With onPush, the component depends only on its inputs and
                  covers immutability, the change detection strategy will be
                  activated when:
                  <ul>
                    <li>The input reference changes;</li>
                    <li>
                      An event originating from the member or one of his
                      children;
                    </li>
                    <li>
                      Execute change detection explicitly{" "}
                      <b>(componentRef.markForCheck ());</b>
                    </li>
                    <li>Use the async pipe in the view.</li>
                  </ul>
                </li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={changeDetector}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <ul>
                <li>
                  In the onPush strategy, Angular only performs the change
                  detector when a new reference to the data of @Input() is
                  passed.
                </li>
              </ul>
              <ul>
                <li>
                  Change Detection Mechanism-moves only forward and never looks
                  back, starting from the root component to the last. Each
                  component points to a child, but the child does not point to a
                  parent. One-way flow eliminates the need for a{" "}
                  <b>$digest loop</b>.
                </li>
              </ul>
              <br />
              <h3>
                15. How many Change Detectors can there be in the whole
                application?
              </h3>
              Each component has its own ChangeDetector. All Change Detectors
              are inherited from AbstractChangeDetector.
              <br />
              <br />
              <h3>16. Dynamically Load Component</h3>
              Can dynamically load components at runtime using the
              ComponentFactoryResolver class. Dynamically loading components can
              be useful when you need to load a component based on user input or
              need to load a component conditionally based on some criteria.
              <br />
              <div style={titles}>
                <PrismCode
                  code={dynamically}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              Dynamic component loading is a powerful feature of Angular that
              allows developers to load components on demand and create more
              flexible and dynamic user interfaces.
              <br />
              <br />
              <h3>17. What is ng-template in Angular?</h3>
              <ul>
                <li>
                  <b>ng-template:</b> Is an Angular element that is used for
                  rendering HTML in a template. However, it is not rendered
                  directly on DOM. If you include an ng-template tag in a
                  template, the tag and the content inside it will be replaced
                  by comment upon render.
                </li>
                <br />
                <li>
                  <b>ng-container: </b>Allows us to create a section in a
                  template without introducing a new HTML element. The
                  ng-container does not render in the DOM, but content inside it
                  is rendered.
                </li>
              </ul>
              <br />
              <h3>18. What is the purpose of any type cast function</h3>
              You can disable binding expression type checking using $any() type
              cast function.
              <div style={titles}>
                <PrismCode
                  code={typeFunc}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>19. What is Non null type assertion operator</h3>
              You can use the non-null type assertion operator to suppress the
              Object is possibly 'undefined' error.
              <br />
              <br />
              In the following example, the user and contact properties are
              always set together, implying that contact is always non-null if
              user is non-null. The error is suppressed in the example by using
              contact!.email.
              <div style={titles}>
                <PrismCode
                  code={assertionOpp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>20. What is type narrowing</h3>
              Dynamic checks and predicates gives us information about values at
              run-time. type narrowing is the process of reflecting this
              information in the type-checker at compile time.
              <div style={titles}>
                <PrismCode
                  code={narrowing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>21. What is the purpose of common module</h3>
              The commonly-needed services, pipes, and directives provided by
              @angular/common module.
              <br />
              <h3>22. What is angular animation</h3>
              <ul>
                <li>
                  Angular animations are based on CSS web transition
                  functionality, so anything that can be styled or transformed
                  in CSS can be animated the same way in Angular.
                </li>
                <li>
                  Angular animations allow you to: Set animation timings,
                  styles, keyframes, and transitions.
                </li>
              </ul>
              <br />
              <h3>23. What is multicasting</h3>
              Multi-casting is the process of broadcasting to a list of multiple
              subscribers in a single execution.
              <div style={titles}>
                <PrismCode
                  code={multicasting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                24. Angular Module Loading: A module can be loaded eagerly,
                lazily, preloaded.
              </h3>
              <ul>
                <li>
                  <b>1. Eager loading:</b> All of the modules and functions are
                  loaded on application startup. the root module is always
                  eagerly loaded.
                </li>
                <li>
                  <b>2. Lazy loading:</b> is loading modules on demand.
                </li>
                <br />
                <li>
                  <b>3. Preloading:</b> is loading modules in background just
                  after app starts.
                </li>
                <li>
                  To configure Preloading features modules, first we configure
                  them for lazy loading then, using angular in-built
                  PreloadAllModules strategy, we enable to load all lazy loading
                  into Preloading modules.
                </li>
                <li>
                  Using PreloadAllModules strategy, all modules configured by
                  loadChildren property will be preloaded. The modules
                  configured by loadChildren property will be either lazily
                  loaded or preloaded but not both. To preload only selective
                  modules, we need to use custom preloading strategy.
                </li>
                <li>
                  We can create custom preloading strategy. For this we need to
                  create a service by implementing Angular PreloadingStrategy
                  interface and override its preload method and then configure
                  this service with PreloadingStrategy property in routing
                  module. To select a module for custom preloading we need to
                  use dataproperty in route configuration, configured as data
                  'preload: true' for selective feature module preloading.
                </li>
              </ul>
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(NgModel);
