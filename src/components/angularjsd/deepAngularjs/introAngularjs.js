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

const redesign = {
  height: 200,
  width: 500,
};

const NgClass = `
@Component({
  selector: 'app-root',
  template: '
  <p [ngStyle] = "{backgroundColor: getColor()}" [ngClass] = "{Online: serverStatus === 'Online'}"> 
    Server  with ID {{serverID}} is {{serverStatus}}. 
  </p >,
  styles: ['.Online{ color: yellow; }']'})

export class AppComponent {
  serverID: number = 10;
  serverStatus: string = 'Offline';

  constructor () {
  this.serverStatus = Math.random() > 0.5 ? 'Online' : 'Offline';
  }

  getServerStatus() {
    return this.serverStatus;
  }
  getColor() {
    return this.serverStatus === 'Online' ? 'green' : 'red';
  }
}`.trim();

const databinding = `
DOM               Component
<----{{value}}-----
<-[propery]="value" --                        <img [src]="imageUrl">
--(event)="handler" -->                       <button (click)="onClick()">Click me</button>
<-[(NgModule)]="propery" --                   [ngModel];
`.trim();

const property = `
syntax: [property]='expression

//html
<button (click)="toggleSecret()">Toggle Secret</button>
<h3 [hidden]="secretTextHidden">Property Binding</h3>

    
export class AppComponent {
  secretTextHidden = false;
  toggleSecret() {
    this.secretTextHidden = !this.secretTextHidden;
  }
}
`.trim();

const NgStyles = `
//1
<div [ngStyle]="{'color':green}"></div>
ngStyle become much more useful when the value is dynamic.
<div [ngStyle]="{'color': person.country==='UK' ? 'green' : 'red'}"></div>


//2
@Component({
  selector: 'app-root',
  template: '
  <p[ngStyle]="{backgroundColor: 'green'}"> Server with ID {{serverID}} is {{serverStatus}}.</p>
  '})
export class AppComponent {
  serverID: number = 10;
  serverStatus: string = 'Offline';

  constructor () {
  this.serverStatus = Math.random() > 0.5 ? 'Online' : 'Offline';
  }
}`.trim();

const templateState = `
export class AppComponent {
  isHsow = false;

  onToggle() {
    this.isHsow = !this.isHsow;
  }
}


//html
{{ isHsow }}
<button (click)="onToggle()">Click</button>

`.trim();

const hostBinding = `
import { Component, ElementRef, HostBinding, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<p>@HostBinding() & @HostListener()</p>',
  providers:[]
})

export class AppComponent{
  constructor(private el:ElementRef){

  }

  @HostBinding('style.color') textColor: any;
  ngOnInit(){
    this.textColor="green";
  }

  @HostListener('click') onClick(){
    // alert('HostListener')
    this.textColor = "red";
  }

  @HostListener('mouseover') onMouseHover(){
    this.textColor = "blue";
  }

  @HostListener('mouseout') onMouseOut(){
    this.textColor = "pink";
  }
}`.trim();

const makeServices = `
//myService.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class myService {
  name = 'Mukesh';
  sayHello() {
    console.log(this.name);
  }
}


//app.component.ts
import { myService } from './myservice';

@Component({
  selector: 'app-root',
  template: '',
})
export class AppComponent {
  constructor(private myServices: myService) {
    this.myServices.sayHello();
  }
}


//app.module.ts
@NgModule({
  declarations: [AppComponent, Child],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({}),
  ],
  providers: [myService],
  bootstrap: [AppComponent],
})
`.trim();

const makeServices1 = `
@Injectable({
  providedIn: 'root'
})`.trim();

const makeServices2 = `
import { Injectable } from '@angular/core';
import { MyModule } from './my.module';

@Injectable({
  providedIn: MyModule
})
export class MyService {}`.trim();

const httpClients = `
//html
<tr *ngFor="let datas of httpData">
  <td>{{ datas.title }}</td>
</tr>'


interface Kafein {
  name: string;
  address: string;
}

export class AppComponent {
  url = 'https://jsonplaceholder.typicode.com/todos';
  httpData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.callApi();
  }

  callApi() {
    this.http.get<Kafein[]>(this.url).subscribe((data) => {
      this.httpData = data;
    });
  }
}
`.trim();

const reactiveforms = `
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class AppComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
}


//
<form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <input type="text" formControlName="name" required />
  <input type="email" formControlName="email" required />
  <button type="submit">Submit</button>
</form>
`.trim();

const tempForm = `
//html
<form #userForm="ngForm" (ngSubmit)="onSubmit()">
  <input type="text" name="name" [(ngModel)]="user.name" required />
  <input type="text" name="email" [(ngModel)]="user.email" required />

  <button type="submit" [disabled]="!userForm.valid">Submit</button>
</form>


export class AppComponent {
  user = { name: '', email: '' };

  onSubmit() {
    console.log(this.user);
  }
}`.trim();

const formBuilder = `
myForm: FormGroup = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  age: [18, Validators.min(18)]
});`.trim();

const templateexp = `
1+2={{ 1 + 2 }}
`.trim();

class IntroAngulard extends Component {
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
              <h3>1. Please explain the various features of Angular.</h3>
              <ul>
                <li>
                  <b>Components: </b>Angular is a component-based framework,
                  which means that applications are built by assembling
                  components that represent different parts of the application's
                  user interface. Components are reusable, self-contained, and
                  can be easily combined to create complex user interfaces.
                </li>
                <br />
                <li>
                  <b>Templates: </b> Angular uses templates to define the user
                  interface of a component. Templates are written in HTML and
                  contain Angular-specific syntax that allows for data binding
                  and other features.
                </li>
                <br />
                <li>
                  <b>Directives: </b>Angular provides a number of built-in
                  directives that allow you to manipulate the DOM, add or remove
                  elements, and apply conditional logic to your templates. You
                  can also create custom directives to extend the functionality
                  of Angular.
                </li>
                <br />
                <li>
                  <b>Services: </b>Services are used to provide functionality
                  that can be shared across different components of an
                  application. Services can be used for things like fetching
                  data from a server, performing complex calculations, or
                  managing state.
                </li>
                <br />
                <li>
                  <b>Dependency Injection: </b>Angular's dependency injection
                  system allows you to easily manage dependencies between
                  different components and services. Dependencies are injected
                  into components and services through their constructors.
                </li>
                <br />
                <li>
                  <b>Routing: </b>Angular's routing system allows you to define
                  routes for different parts of your application and navigate
                  between them using URLs.
                </li>
                <br />
                <li>
                  <b>Forms: </b>Angular provides powerful support for building
                  forms, including both template-driven and reactive forms. This
                  includes features like form validation, form submission, and
                  handling user input.
                </li>
                <br />
                <li>
                  <b>Observables: </b>Angular uses observables to handle
                  asynchronous operations such as HTTP requests. Observables
                  provide a way to work with asynchronous data streams in a more
                  efficient and predictable way.
                </li>
                <br />
                <li>
                  <b>Testing: </b>Angular provides a number of tools and
                  utilities for testing your application, including both unit
                  tests and end-to-end tests. This includes features like the
                  Angular testing library and the Protractor testing framework.
                </li>
                <br />
                <li>
                  <b>Mobile Support: </b>Angular provides support for building
                  mobile applications using technologies like Ionic and
                  NativeScript.
                </li>
              </ul>
              <br />
              <br />
              <h3>
                2. What is difference between package.json and
                package-lock.json.
              </h3>
              <ul>
                <li>
                  <b>package.json: </b>This file is used to define the
                  dependencies and other metadata of an application. It contains
                  information about the application, such as its name, version,
                  author, and dependencies required for the application to run.
                </li>
                <br />
                <li>
                  <b>package.lock.json: </b>This file is used to keep track of
                  the exact version of every package and its dependencies that
                  are installed in an application. The package-lock.json file
                  ensures that the exact same version of a package and its
                  dependencies are installed on all machines running the
                  application. This helps to avoid dependency conflicts and
                  ensures that the application runs consistently across
                  different environments.
                </li>
              </ul>
              <br />
              In summary, package.json defines the metadata and dependencies
              required for the application to run, while package-lock.json is
              used to lock the dependencies to specific versions to ensure
              consistency across different machines.
              <br />
              <br />
              <h3>3. What is metadata</h3>
              Metadata, Annotation and Decorator is same thing.
              <br />
              <ul>
                <li>
                  Metadata is used to decorate a class so that it can configure
                  the expected behavior of the class.
                </li>
                <br />
                <li>
                  Decorator accept object. decorator are simply functions that
                  return functions. decorator are invoke at runtime. decorator
                  allows you to excuite functions.
                </li>
              </ul>
              <br />
              There are four main types of decorators:
              <ul>
                <li>
                  <b>Class decorators: </b>, @Component, @Directive, @NgModule,
                  @Injectable, and @Pipes.
                </li>
                <li>
                  <b>Property decorators: </b>These decorators are used to
                  modify the behavior of a class property. <b>Ex </b>
                  @Input, @Output, @HostBinding, @ContentChild,
                  @ContentChildren, @ViewChild, @ViewChildren.
                </li>
                <li>
                  <b>Method decorators: </b>These decorators are used to modify
                  the behavior of a class method. <b>Ex </b>
                  @HostListener.
                </li>
                <li>
                  <b>
                    Parameter decorators for parameters inside class
                    constructors
                  </b>
                  @Inject.
                </li>
              </ul>
              <br />
              <br />
              <ul>
                <li>
                  <b>@HostBinding: </b>Decorator is used to bind a property of a
                  directive to a property of its host element. This allows the
                  directive to set properties on the host element based on its
                  own state or configuration.
                </li>
                <br />
                <li>
                  <b>@HostListener: </b>Decorator is used to subscribe to events
                  that occur on the host element of a directive. The host
                  element is the element that the directive is attached to, and
                  the @HostListener decorator is used to specify which events
                  the directive should listen to.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={hostBinding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <br />
              <b>ii. Parameter decorators: </b>Used for parameters inside class
              constructors, e.g. @Inject, Optional.
              <br />
              <br />
              <h3>4. Explain Components, Modules and Services in Angular.</h3>
              <b>i. Components: </b>
              Components are the most basic building blocks of an Angular
              application, and they can be reused throughout the application to
              create a consistent user interface.
              <br />
              <br />
              <b>key features: </b>
              <ul>
                <li>
                  <b>Selector: </b>Components are identified by a selector,
                  which is a CSS selector that identifies the HTML element that
                  the component represents. The selector is used to tell Angular
                  where to insert the component in the DOM.
                </li>
                <br />
                <li>
                  <b>Template: </b>A component has its own template, which is
                  the HTML code that defines the structure and layout of the
                  component. The template can include data binding syntax, which
                  allows the component to display dynamic data.
                </li>
                <br />
                <li>
                  <b>styleUrls: </b>
                </li>
              </ul>
              <br />
              <br />
              <b>ii. Modules </b>
              A module is a mechanism for organizing code into separate,
              reusable, and encapsulated units. A module can contain components,
              services, directives, and other types of Angular constructs that
              are needed for a particular feature or functionality in an
              application.
              <br />
              <br />
              To define a module, we use <b>@NgModule</b> decorator.
              <ul>
                <li>Default module is app.module.ts.</li>
                <li>We can includes a module inside another module.</li>
                <li>
                  A module have at least one component. components declared
                  inside "declarations" in module. while module inside "imports"
                  in app.module.ts.{" "}
                </li>
                <li>
                  We can import a module and use inside another module. For
                  injecting a module we use, exports:[ModuleName].
                </li>

                <li>
                  A component cannot be import in two diffrent modules. If do
                  than show runtime error. this is features module.
                </li>
              </ul>
              <br />
              By default, modules are of two types:
              <ul>
                <li>
                  <b>Root Module: </b>
                </li>
                <li>
                  <b>Feature Module: </b>Every application can have only one
                  root module whereas, it can have one or more feature modules.
                  <ol>
                    <li>A root module imports BrowserModule,</li>
                    <li>whereas a feature module imports CommonModule.</li>
                  </ol>
                </li>
              </ul>
              <br />
              <br />
              <h3>iii. Services </h3>
              <ul>
                <li>
                  Are a greate way to share information among classes that don't
                  know each other.
                </li>
                <li>
                  Are basically a classes which may have some data, property or
                  some functions. And we can use these data,property and
                  functions in multiple files.
                </li>
                <li>
                  Services are objects which get instantiated only once during
                  the lifetime of an application.{" "}
                </li>
                <li>Services can depend on other services.</li>
              </ul>
              <br />A service is defined using a <b>@Injectable</b> decorator.
              <br />
              <br />
              <b>providedIn: </b>
              <ul>
                <li>
                  providedIn property is used to specify the provider of a
                  service or a dependency injection token. It is a property of
                  the @Injectable decorator, which is used to annotate a class
                  that can be injected as a dependency in other classes.
                </li>
                <br />
                <li>
                  The providedIn property can have one of two possible values:
                  'root' or an NgModule class. When 'root' is specified, the
                  service is registered with the application's root injector,
                  which makes it available to the entire application. When an
                  NgModule class is specified, the service is registered with
                  the injector of that module, which makes it available to all
                  components and services declared in that module.
                </li>
              </ul>
              <br />
              Here's an example of using providedIn to specify the provider of a
              service:
              <div style={titles}>
                <PrismCode
                  code={makeServices1}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              In this example, the providedIn property is set to 'root', which
              means that MyService will be registered with the root injector and
              will be available to the entire application.
              <br />
              <br />
              Alternatively, you can specify an NgModule as the provider:
              <div style={titles}>
                <PrismCode
                  code={makeServices2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <ul>
                <li>
                  In this example, MyService is registered with the injector of
                  the MyModule module, which means that it will be available to
                  all components and services declared in that module.
                </li>
                <li>
                  Using providedIn is a convenient way to register services and
                  DI tokens in Angular, and it can help simplify the process of
                  managing dependencies and provider hierarchies in an
                  application.
                </li>
              </ul>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={makeServices}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>5. What are directives</h3>
              <ul>
                <li>
                  Directives are used to extend the power of the HTML attributes
                  and to change the appearance or behavior of a DOM element.
                </li>
              </ul>
              <br />
              <br />
              <b>
                Elements which change the appearence/ behavior of the DOM
                element. 3 types of Directives.
              </b>
              <ul>
                <li>
                  <b>Component Directives:</b>
                  <ul>
                    <li>
                      These are directives that are used to define a new custom
                      component, which can be used in templates like any other
                      component. Component directives are declared using the
                      @Component decorator.
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <b>Structural Directives:</b>
                  <ul>
                    <li>Do manipulation in DOM.</li>
                    <li>
                      Structural directive modifies or manipulates the structure
                      of DOM by adding or removing DOM elements. it works on the
                      structure of a DOM.
                    </li>
                    <li>
                      Structural directives which have a * sign before the
                      directive. *ngIf and *ngFor.
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <b>Attribute Directives/ Behavioral Directives:</b>
                  <ul>
                    <li>Do css related things.</li>
                    <li> Change appearence/ behavior of the DOM.</li>
                    <li>
                      Attribute directives deal with the changing of look and
                      behavior of the DOM element, component or another
                      directive. Ex. NgStyle
                    </li>
                  </ul>
                </li>
                <br />
                By default, angular provide two attribute directives
                <br />
                <b>1. NgClass: </b>dynamically, add or remove CSS class on the
                basis of the certain conditions.
                <br />
                <br />
                Allows us to set the CSS class dynamically for a DOM element. we
                can use ngClass with string, array, object or component method.
                <br />
                <br />
                <div style={titles}>
                  <PrismCode
                    code={NgClass}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
              </ul>
              <br />
              <br />
              <b>2. NgStyle: </b>dynamically, add or remove styles on the basis
              of the certain conditions.
              <br />
              <div style={titles}>
                <PrismCode
                  code={NgStyles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                6. What is difference between attribute and structural
                directives?
              </h3>
              Attribute directives modify the appearance or behavior of DOM
              elements. Structural directives add or remove elements from the
              DOM.
              <br />
              <h3>7. What are template expressions</h3>
              <ul>
                <li>
                  Template expressions are expressions that are evaluated by the
                  Angular template engine and used to dynamically render values
                  or perform calculations in the template.
                </li>
                <li>
                  <div style={titles}>
                    <PrismCode
                      code={templateexp}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>
                </li>
              </ul>
              <br />
              <h3>8. What are template statements</h3>
              Template statements are a way to define event bindings between the
              user interface and component logic. They allow you to listen for
              events triggered by the user, such as button clicks or form
              submissions, and respond to those events with the appropriate
              logic.
              <br />
              <div style={titles}>
                <PrismCode
                  code={templateState}
                  language="js"
                  plugins={["line-numbers"]}
                />
                <br />
                <b>N: </b>Component send data to Template by using Promises
                binding or Interpolation.
              </div>
              <br />
              <h3>9. What is Data Binding? How many ways it can be done?</h3>
              In order to connect application data with the DOM, data binding is
              used. It happens between the template and component. There are 4
              ways to achieve data binding:
              <ul>
                <li>
                  Interpolation / String Interpolation (one-way data binding)
                </li>
                <li>
                  <b>Event Binding: </b>Event binding allows you to bind an
                  event of an element to a method in the component. It is done
                  by using parentheses.
                </li>
                <li>
                  <b>Property Binding: </b>Means passing data from the component
                  to the template.
                </li>
                <li>
                  <b>Two-way Binding: </b>It's a process that gives component a
                  way to share data between the component class and its
                  template. If the data is changed in one place it will
                  automatically change the data at other end.. It is done by
                  using the [(ngModel)] directive.
                </li>
              </ul>
              <br />
              <br />
              <b>Data binding Forms:</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={databinding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Property binding: </b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={property}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                10. What are the differences between Component and Directive
              </h3>
              <table>
                <tr>
                  <th>Component</th>
                  <th>Directive</th>
                </tr>
                <tr>
                  <td>
                    To register a component we use @Component meta-data
                    annotation
                  </td>
                  <td>
                    To register directives we use @Directive meta-data
                    annotation
                  </td>
                </tr>
                <tr>
                  <td>Components are typically used to create UI widgets</td>
                  <td>
                    Directive is used to add behavior to an existing DOM element
                  </td>
                </tr>
                <tr>
                  <td>
                    Component is used to break up the application into smaller
                    components
                  </td>
                  <td>Directive is use to design re-usable components</td>
                </tr>
                <tr>
                  <td>Only one component can be present per DOM element</td>
                  <td>Many directives can be used per DOM element</td>
                </tr>
              </table>
              <br />
              <h3>11. Dependency Injection</h3>
              <ul>
                <li>
                  Dependency Injection (DI) is a design pattern used in Angular
                  that allows a class to receive its dependencies from an
                  external source rather than creating them itself. It is a way
                  of providing objects or services to a component that needs to
                  function properly, without creating these objects directly.
                </li>
                <br />

                <li>
                  When a component or service is instantiated, the Angular
                  injector checks its constructor for required dependencies and
                  injects them into the component or service automatically. This
                  allows for loose coupling between components and services and
                  makes the code more modular, easier to maintain, and more
                  testable.
                </li>
              </ul>
              <br />
              <br />
              <h3>12. HttpClient</h3>
              <ul>
                <li>
                  HttpClient is a built-in service that allows you to make HTTP
                  requests to a server in your application. It provides a
                  simplified client interface for HTTP requests and responses,
                  with support for advanced features such as request and
                  response interception, progress tracking, and error handling.
                </li>
                <br />
                <li>
                  import HttpClientModule as imports: [ HttpClientModule] in
                  app.module.ts file.
                </li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={httpClients}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>
                13. What is the difference between template driven form and
                reactive based approach?
              </h3>
              <b>
                import FormsModule and Reactiveforms Module in Angular to use
                [(ngModel)] and reactive forms respectively.
              </b>
              <ul>
                <li>
                  Template-driven forms are asynchronous in nature, whereas
                  Reactive forms are mostly synchronous.
                </li>
                <li>
                  In a template-driven approach, most of the logic is driven
                  from the template, whereas in reactive-driven approach, the
                  logic resides mainly in the component.
                </li>
              </ul>
              <br />
              <h3>14. Two ways to collect and validate data from users</h3>
              <b>1. Template-driven forms:</b>
              <ul>
                <li>To use it we need to import FormsModule in application.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={tempForm}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>2. Model-driven forms (Reactive forms)</b>
              <ul>
                <li>
                  The model which is created in .ts file is responsible for
                  handling all the user interactions/ validations. For this
                  first need to create the model using Angular unbuilt classes
                  like formGroup and formControl and then, we need to bind the
                  model to HTML form.
                </li>
                <li>
                  As we create the form controls directly in the component, it
                  makes easier to push data between the data models and UI
                  elements.{" "}
                </li>
              </ul>
              <br />
              <b>import 'ReactiveFormsModule' in app.module.ts file</b>
              <div style={titles}>
                <PrismCode
                  code={reactiveforms}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>statusChanges():</b>
              <br />
              Is a property of AbstractControl that emits an event every time
              when the validations status of the control is recalculated.
              <br />
              statusChanges property is available in formControl, FormArray and
              formGroup classes because they inherit AbstractControl class.
              <br />
              <br />
              <h3>
                15. What is the difference between FormBuilder and FormControl?
              </h3>
              <ul>
                <li>
                  <b>FormControl: </b>Is a class that represents a single form
                  control, which is typically a single input field . A
                  FormControl can be used to capture user input, validate input
                  data, and track the state of the input field.
                </li>
                <br />
                <li>
                  <b>FormBuilder: </b>Is a service that provides a more
                  convenient way to create and manage form controls and form
                  groups. It allows developers to create complex forms with many
                  form controls and nested form groups.
                </li>
                <br />
                <li>
                  In summary, FormControl is used to create and manage a single
                  form control, while FormBuilder is used to create and manage
                  complex forms with many form controls and nested form groups.
                </li>
              </ul>
              <br />
              <br />
              <b>The FormBuilder class has 3 methods: </b>
              <ol>
                <li>control()</li>
                <li>group()</li>
                <li>array()</li>
              </ol>
              <br />
              <div style={titles}>
                <PrismCode
                  code={formBuilder}
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

export default withStyles(styles)(IntroAngulard);
