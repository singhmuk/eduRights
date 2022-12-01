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


const NgModules = `
@NgModule({
  imports:      [ BrowserModule ],
  providers:    [ Logger ],
  declarations: [ AppComponent ],
  exports:      [ AppComponent ],
  bootstrap:    [ AppComponent ]
})`.trim();

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
<-[propery]="value" --
--(event)="handler" -->
<-[(NgModule)]="propery" --`.trim();

const property = `
syntax: [property]='expression

<input type="email" [value]="user.email">`.trim();

const evtBinding = `<button (click)="logout()"></button>`.trim();

const twoWayBinding = `<input type="email" [(ngModel)]="user.email">`.trim();

const compDeco = `
 @Component({
  selector: 'app-root',
  templateUrl: string,
  styleUrls: string[],
  moduleId: string,
  preserveWhitespaces:true,
  changeDetection: ChangeDetectionStrategy,
  viewProviders: Provider[],
  animations: any[],
  encapsulation: ViewEncapsulation,
  interpolation: [string, string],
  entryComponents: Array<Type<any> | any[]>,

  // inherited from core/Directive
  selector: string,
  inputs? string[],
  outputs: string[],
  providers: Provider[],
  exportAs: string,
  queries: {...},
  host: {...},
  jit: false                      //Remove all whitespace from the compiled template.
})`.trim();

const objects = `
@Component({
  selector: 'app-root',
  template: '
  <input(keyup)="onKey($event)">
    <p>{{values}}</p>
  '})

export class AppComponent {
  values = '';

  onKey(event: any) {
    this.values += event.target.value + ' | ';
  }`.trim();

const keyEvents = `
 @Component({
  selector: 'app-root',
  template: '
  <input #box (keyup.enter) = "onEnter(box.value)">
    <p>{{value}}</p>
  '})

export class AppComponent {
  values = '';

  value = '';
  onEnter(value: string) { this.value = value; }
}`.trim();

const onBlur = `
    <input #box
      (keyup.enter)="update(box.value)"
      (blur)="update(box.value)">
    <p>{{value}}</p>'})

export class AppComponent {
  value = '';
  update(value: string) { this.value = value; }
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

const templateExpree = `
<h3>{{username}}, welcome to Angular</h3>


//The below javascript expressions are prohibited in template expression
1. assignments (=, +=, -=, ...)
2. new
3. chaining expressions with ; or ,
4. increment and decrement operators (++ and --)
`.trim();

const templateState = `
//template statements appear in quotes to the right of the = symbol like (event)="statement".
<button (click)="statement()">Edit Profile</button>
`.trim();

const binding = `
<td [attr.colspan]="myColSpan" align="center">Record</td>
`.trim();

const twoWay = `
template: '
Enter name: <input [value] = 'data'(input) = 'data=$event.target.value' >
  <br />
Your name {{data}}
    ',})

export class AppComponent {
  data:string = 'Data binding';
`.trim();

const tempLocal = `
@Component({
  selector: 'app-root',
  template: '
    <input #inputInfo type = "text" name = "template" value = "property">
    <br/>
    <button (click) = "getInfo(inputInfo)"> Refrence Varriable</button>
  '})
export class AppComponent {
  getInfo(inputInfo){
    console.log(inputInfo)
    console.log(inputInfo.name)
  }
}`.trim();

const hostListener = `
mport { Component, HostListener } from '@angular/core';

@Component({
    selector: 'my-component',
    template: '<div>Method decorator</div>'
})
export class MyComponent {
    @HostListener('click', ['$event'])
    onHostClick(event: Event) {
        // clicked, 'event' available
    }
}`.trim();

const parameters = `
import { Component, Inject } from '@angular/core';
import { MyService } from './my-service';

@Component({
    selector: 'my-component',
    template: '<div>Parameter decorator</div>'
})
export class MyComponent {
    constructor(@Inject(MyService) myService) {
        console.log(myService); 
    }
}`.trim();


class IntroAngulard extends Component {
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
            <b>Angular CLI: </b>
            <ul>
              <li>Build angular apps using nodejs style modules.</li>
              <li>Give ability to add components, deploy, and perform testing and many such functions.</li>
            </ul>
            
              <h3>1. Angular</h3>
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
              <b>Please explain the various features of Angular.</b>
              <ul>
                <li>Angular CLI</li>
                <li>Animation Support</li>
                <li>Cross-Platform App Development</li>
                <li>Code Splitting</li>
                <li>Declarative UI</li>
                <li>Testing</li>
                <li>lazy loading syntax</li>
                <li><b>Differential loading: </b>Lets in Angular CLI to create two different production bundles of your app. 
                <br/>
                <br/>
                Attributes on the <b>script</b> tag in our index.html file tell browsers will request a bundle that uses
                  ES6 syntax, which will be significantly smaller than the bundle that uses ES5 syntax to  
                  support for older browsers. Differential loading is enabled by default for new apps created.</li>
                <br />
                <li><b>Create web workers with the CLI: </b>New schematic <b>ng generate</b> command to create and update the 
                necessary files in our project to add a new web worker. The new and updated
                  files include a basic template for our new web worker so focus on writing the code you want to run on a background thread.</li>
                <br />
              </ul>
              <br />

              <h3>2. What is difference between package.json and package-lock.json.</h3>
              <ul>
                <li><b>package.json: </b>Records important metadata about the project.</li>
                <li><b>package.lock.json: </b>Allows future devs to install the same dependencies in the project.</li>
              </ul>
              <br />

              <h3>3. What are the building blocks of Angular?</h3>
              <ul>
                <li>Components</li>
                <li>Data Binding</li>
                <li>Dependency Injection (DI)</li>
                <li>Directives</li>
                <li>Metadata(decorators are used)</li>
                <li>Modules</li>
                <li>Routing</li>
                <li>Services</li>
                <li>Template</li>
              </ul>
              <br />

              <h3>4. What is metadata</h3>
              Metadata is used to decorate a class so that it can configure the expected behavior of the class. The metadata is represented by
              decorators.There are four main types of decorators:
              <ul>
                <li><b>Class decorators</b>, @Component and @NgModule.</li>
                <li><b>Property decorators for properties inside classes</b>, @Input and @Output.</li>
                <li><b>Method decorators for methods inside classes</b>, @HostListener.</li>
                <li><b>Parameter decorators for parameters inside class constructors</b>, @Inject.</li>
              </ul>
              <b>Decorators are actually just functions, And called with whatever they are decorating.</b>
              <br/>
              <br/>
              <b>5. Method decorators: </b>Used for methods inside classes, e.g. @HostListener
              <ul>
                <li>Function decorator allows us to handle event of the host element in the directive class.</li>
                <li>It lets us to listen for event on host element/ component.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={hostListener}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>6. Parameter decorators: </b>Used for parameters inside class constructors, e.g. @Inject, Optional.
              <div style={titles}>
                <PrismCode
                  code={parameters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>7. Explain Components, Modules and Services in Angular.</h3>
                <ul>
                  <li>Components are the basic building blocks, which control a part of the UI for any application.</li>
                  <li>A component is defined using the @Component decorator. Every component consists of three parts, 
                    <ul>
                      <li><b>template: </b>loads the view for the component.</li>
                      <li><b>stylesheet: </b>defines the look and feel for the component.</li>
                      <li><b>class: </b>contains the business logic for the component.</li>
                      </ul>
                   </li>
                </ul>
                <br/>

              <h3>8. Modules</h3>
              Is logical grouping of components, directives, pipes or services. To define a module, we use the NgModule.
                <ul>
                  <li>Default module is app.module.ts.</li>
                  <li>We can includes a module inside another module.</li>
                  <li>A module have at least one component. components declared inside "declarations" in module. while
                      module inside "imports" in app.module.ts. </li>
                  <li>We can import a module and use inside another module. For injecting a module we use, exports:[ComponentName].</li>
                  <li>Every module is defined with a <b>@NgModule</b> decorator.</li>
                  <li>Angular apps are modular and Angular has its own modularity system called NgModules.</li>
                  <li>A component cannot be import in two diffrent modules. If do than show runtime error. this is features module.</li>
                <li>The purpose of NgModule is to declare everything that has been created in angular and group it.</li>
                </ul>
                By default, modules are of two types:
                <ul>
                  <li><b>Root Module: </b></li>
                  <li><b>Feature Module: </b>Every application can have only one root module whereas, it can have one or more feature modules.
                  <ol>
                    <li>A root module imports BrowserModule,</li>
                    <li>whereas a feature module imports CommonModule.</li>
                  </ol>
                  </li>
                </ul>
                <br/>
              <div style={titles}>
                <PrismCode
                  code={NgModules}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>providers: </b>Provider are used to make services and values known to DI.It is an instruction to the DI system on how to obtain a value for a dependency.
              <br />
              <br />

              <b>Frequently Used NgModule:</b><br />
              <ul>
                <li><b>BrowserModule :</b>When run your app in a browser.</li>
                <li><b>CommonModule :</b>When use NgIf, NgFor.</li>
                <li><b>FormsModule :</b>When build template driven forms (includes NgModel).</li>
                <li><b>ReactiveFormsModule :</b>When build reactive forms.</li>
                <li><b>RouterModule :</b>When use RouterLink, .forRoot(), .forChild().</li>
                <li><b>HttpClientModule :</b>When talk to a server.</li>
              </ul>
              <br />

              <h3>Services </h3>
                  <ul>
                    <li>Are basically a classes which may have some data, property or some functions. And we can 
                        use these data,property and functions in multiple files.</li>
                    <li>Services are objects which get instantiated only once during the lifetime of an application. </li>
                    <li>Services can depend on other services.</li>
                    <li>Service is a mechanism used to share the functionality between the components.</li>
                  </ul>
                <br/>
                A service is defined using a <b>@Injectable</b> decorator. A function defined inside a service can be invoked from any component or directive.
              <br/>

              <h3>9. Decorator</h3>
              Decorator contain @. it accept object. decorator are simply functions that return functions.
                  decorator are invoke at runtime. decorator allows you to excuite functions.
              <ul>
                <li><b>Common decorator: </b>@ngModule(), @Component(), @Injectable(): define services, @Input & @Output:
                  send and recive data from dom. many build-in decorator available in Angular.</li>
              </ul>
              <br />

              <ul>
                <li><b>Class decorator:</b> @ngModule(), @Component().</li>
                <li><b>Property decorator:</b> @Input(), @Output.</li>
                <li><b>Method decorator:</b> for Method inside classes (@HostListener)</li>
                <li><b>Parameter decorator:</b> for Parameter inside class constructors (@Inject)</li>
                <li>Each decorator has a unique role.</li>
              </ul>
              <br />

              <h3>10. What are directives: @directive</h3>
              <ul>
                <li>Directive is a js class.</li>
                <li>Directives are used to extend the power of the HTML attributes and to change the appearance or behavior of a DOM element.</li>
              </ul>
              <br />
              <br />

              <b>Elements which change the appearence/ behavior of the DOM element. 3 types of Directives.</b>
              <ul>
                <li><b>Component Directives:</b>
                  <ul>
                    <li>Directives with own Template.</li>
                    <li>with the help of selector, @Component which is a decorator function is used to create a
                      component directive.</li>
                  </ul>
                </li>
                <br />
                <li><b>Structural Directives:</b>
                  <ul>
                    <li>Structural directive modifies or manipulates the structure of DOM by adding or removing DOM elements. it works on the structure of a DOM.</li>
                    <li>Structural directives which have a * sign before the directive.  *ngIf and *ngFor.</li>
                  </ul>
                </li>
                <br />
                <li><b>Attribute Directives:</b>
                  <ul>
                    <li> Change appearence/ behavior of the DOM.</li>
                    <li>Attribute directives deal with the changing of look and behavior of the DOM element,
                      component or another directive. Ex. NgStyle</li>
                  </ul>
                </li>
                <br />
                By default, angular provide two attribute directives<br />
                <b>1. NgClass: </b>dynamically, add or remove CSS class on the basis of the certain conditions.<br />
                <br />
                Allows us to set the CSS class dynamically for a DOM element. we can use ngClass with string, array,
                object or component method.
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
              <b>2. NgStyle: </b>dynamically, add or remove styles on the basis of the certain conditions.
              <br />
              <div style={titles}>
                <PrismCode
                  code={NgStyles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>20. Dependency Injection</h3>
              <ul>
                <li>is a technique where one object supplies the dependencies of another object. A dependency is an
                  object that can be used service.</li>
                <li>it's a codding pattern in which classes recive their dependencies from external sources rather
                  than creating them himself.</li>
              </ul>
              <br />

              <h3>11. What are the differences between Component and Directive</h3>
              <table>
                <tr>
                  <th>Component</th>
                  <th>Directive</th>
                </tr>
                <tr>
                  <td>To register a component we use @Component meta-data annotation</td>
                  <td>To register directives we use @Directive meta-data annotation</td>
                </tr>
                <tr>
                  <td>Components are typically used to create UI widgets</td>
                  <td>Directive is used to add behavior to an existing DOM element</td>
                </tr>
                <tr>
                  <td>Component is used to break up the application into smaller components</td>
                  <td>Directive is use to design re-usable components</td>
                </tr>
                <tr>
                  <td>Only one component can be present per DOM element</td>
                  <td>Many directives can be used per DOM element</td>
                </tr>
              </table>
              <br />

              <h3>12. Component Decorator:</h3>
              <ul>
                <li>ngOnInit is called by default whenever the class is run.</li>
                <li>@component decorator provides additional metadata that determines how to process, instantiate
                  and use the component at runtime.</li>
                <li>component Decorator accepts the required configuration object that requires information to
                  create and display the component in real time.</li>
              </ul>
              <br />
              <b>Types: </b> Ex. @Component, @ngModule, @injectable.<br />
              <div style={titles}>
                <PrismCode
                  code={compDeco}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <ul>
                <li><b>selector :</b>css selector which identifies this component in a template.</li>
                <li><b>inputs :</b></li>
                <li><b>outputs :</b></li>
                <li><b>providers :</b>Providers are usually singleton objects, to which other objects have access
                  through dependency injection (DI).</li>
                <li><b>exportAs :</b>name under which the component instance is exported to a template.</li>
                <li><b>queries :</b>allows you to configure queries that can be inserted into the component.</li>
                <li><b>host :</b>Map of class properties to host element links for events, properties, and attributes.</li>
                <li><b>jit :</b>if true, the AOT compiler will ignore this directive/ component and will therefore always be compiled using JIT.</li>
                <li><b>changeDetection: </b>change the detection strategy used component.</li>
                <li><b>viewProviders: </b>list of providers available for component and the view of their children.</li>
                <li><b>moduleId: </b>Module ID of the file in which component is defined.</li>
                <li><b>animations: </b>animation’s list of the component.</li>
                <li><b>encapsulation: </b>strategy of style encapsulation used by component.</li>
                <li><b>interpolation: </b>custom interpolation markers used in the template o component.</li>
                <li><b>entryComponents: </b>entryComponents is the list of components that are dynamically inserted
                  into the view of the component.</li>
                <li><b>preserveWhitespaces: </b>Using this property, we can remove all whitespaces from the template.</li>
              </ul>
              <br />

              <h3>13. What is the use of template in angular.</h3>
              A template is a form of HTML that tells Angular how to render the component. 
              <br />

              <h3>14. What are template expressions</h3>
              <ul>
                <li>Template expressions are computations/ assignments done in the template inside the interpolation curly braces.</li>
                <li>In interpolation syntax, the template expression is surrounded by double curly braces.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={templateExpree}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>15. What are template statements</h3>
              A template is an HTML snippet that tells Angular how to render the component in angular application.
              <div style={titles}>
                <PrismCode
                  code={templateState}
                  language="js"
                  plugins={["line-numbers"]}
                />
                <br />
                <b>N: </b>Component send data to Template by using Promises binding or Interpolation.
              </div>
              <br />

              <h3>16. Template/local reference variables: Access by id '#inputInfo'</h3>
              <div style={titles}>
                <PrismCode
                  code={tempLocal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>17. Templates and views</h3>
              <ul>
                <li><b>ngIf:</b> conditionally includes a Template based on the value of expression, It add/ remove HTML
                  elements in DOM layout.</li>
                <li><b>ngSwitch Directives:</b> ngSwitch is combination of attribute Directive and Structural Directive,
                  it similar to switch statement. </li>
                <li><b>ngFor:</b> it change the structure of DOM. It's point to repeat a given HTML Template once for each value in
                  an array, each time passing it the array value as context for string interpolation/ binding.</li>
                <li><b>syntax:</b> *ngFor="let 'value' of 'cpllection'.</li>
                <br />
              </ul>
              <br />

              <h3>18. What is Data Binding? How many ways it can be done?</h3>
              In order to connect application data with the DOM, data binding is used.
              It happens between the template and component. There are 3 ways to achieve data binding:
              <ul>
                <li>Interpolation / String Interpolation (one-way data binding)</li>
                <li><b>Event Binding: </b>one-way data binding.</li>
                <li><b>Property Binding: </b>one-way data binding.</li>
                <li><b>Two-way Binding: </b>Changes made in the application state gets automatically reflected in the view and vice-versa. The ngModel directive is used for achieving this type of data binding.</li>
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

              <ul>
                <li>Component to view</li>
                <li>View to component</li>
                <li>Two way sequence: view to component to view</li>
              </ul>
              <br />
              <br />

              <b>Property binding:</b>
              <br />
              <ul>
                <li>We can also use string and non-string data in property binding.</li>
                
                <li>Interpolation use only string data.</li>
                <li>in property binding can't use string concatnation.</li>
                <li>It set a property to view element.</li>
              </ul>
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

              <b>Attribute Binding: </b>Helps to set values for attributes directly.
              <br />
              <div style={titles}>
                <PrismCode
                  code={binding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Event binding: </b> 
              <br />
              When a specific DOM event happens (eg.: click, change, keyup), call the specified method in the component
              <div style={titles}>
                <PrismCode
                  code={evtBinding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Two-way data binding:</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={twoWayBinding}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <ul>
                <li>It's a process that gives component a way to share data between the component class and its template. If 
                  the data is changed in one place it will automatically change the data at other end.</li>
                <li>Two-way binding commonly used to listen for events and updates values between parent and child component.</li>
                <li>mainly used in the input field or form.</li>
                <li>it's combination of both property binding and event binding.</li>
                <li>binding using [(ngModel)] Directive. </li>
                <li>ngModel Directive which combines the square bracket of property binding with parentheses of event binding
                  in a single notation.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={twoWay}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>19. Explain string interpolation and property binding in Angular.</h3>
                <ul>
                  <li>String interpolation and Property binding are parts of data-binding (one way) in Angular.</li>
                  <li><b>String interpolation: </b>Refer to the special type of syntax that makes use of template expressions 
                  to display component data. Such variables are enclised within doubly curly braces.</li>
                  <br/>
                  <li><b>Property binding: </b>Means passing data from the component and to the template. Use square bracket.</li>
                </ul>
              <br/>

              <h3>20.1. Get user input from the $event object:</h3>
              <div style={titles}>
                <PrismCode
                  code={objects}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>  20.2. Key event filtering (with key.enter):</h3>
              bind to Angular's keyup.enter pseudo-event. Then Angular calls the event handler only when the user presses Enter.
              <div style={titles}>
                <PrismCode
                  code={keyEvents}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>20.3. On blur</h3>
              <div style={titles}>
                <PrismCode
                  code={onBlur}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(IntroAngulard));
