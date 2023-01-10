import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';
import Graphs from '../../../assets/dinjection.png';
import formroot from '../../../assets/HhQY9.png';


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

const redesign = {
  height: 200,
  width: 500
}

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

<input type="email" [value]="user.email">

//Attribute Binding: Helps to set values for attributes directly.
<td [attr.colspan]="myColSpan" align="center">Record</td>

//Event binding: When a specific DOM event happens (eg.: click, change, keyup).
<button (click)="logout()"></button>
`.trim();

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

const customDir = `
//html
<p appCustomdir>Custom directive</p>


//ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomdir]'
})
export class CustomdirDirective {

  constructor(private el:ElementRef) { 
    el.nativeElement.style.color="green"
  }
}
`.trim();
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

const twoWay = `
template: '
Enter name: <input [value] = 'data'(input) = 'data=$event.target.value' >
  <br />
Your name {{data}}
    ',})

export class AppComponent {
  data:string = 'Data binding';
`.trim();



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

const angulconstar = `
export class AppComponent  {
  name = 'Angular';
  selectedUser = null;
  searching: boolean = false;
}
`.trim();

const postals = `
  class Number{
    constructor(){}
  }

  class Address{
    constructor(){}
  }

  class PostalDetails{
    Number;
    Address;
    
    constructor(){
      this.Number = new Number();
      this.Address = new Address();
    }
  }
`.trim();

const postalsparams = `
class Number{
  constructor(par){}
}

class Address{
  constructor(par){}
}

class PostalDetails{
  Number;
  Address;
  
  constructor(){
    this.Number = new Number();     //Error
    this.Address = new Address();   //Error
  }
}
`.trim();

const impdi = `
class PostalDetails{
  number;
  address;
  
  constructor(number, address){
    this.number = number();    
    this.address = address();  
  }
}
`.trim();

const stateFun = `
state('open', style({
  height: '300px',
  opacity: 0.5,
  backgroundColor: 'blue'
})),`.trim();

const transition = `
transition('open => closed', [
  animate('500ms')
]),`.trim();

const pipeFor = `
@Component({
  selector: 'app-birthday',
  template: '<p> Birthday is {{birthday | date}}</p>'
})
export class BirthdayComponent {
  birthday = new Date(1987, 6, 18); 
}`.trim();

const paraPipes = `
@Component({
      selector: 'app-birthday',
      template: '<p> Birthday is {{birthday | date: 'dd/MM/yyyy'}}</p>' // 18/06/1987
    })
    export class BirthdayComponent {
      birthday = new Date(1987, 6, 18);
    }`.trim();

const chainPipe = `
@Component({
          selector: 'app-birthday',
          template: '<p> Birthday is {{birthday | date: 'fullDate' | uppercase}} </p>' // THURSDAY, JUNE 18, 1987
        })
        export class BirthdayComponent {
          birthday = new Date(1987, 6, 18);
        }`.trim();

const purpose = `
@Component({
  selector: 'async-observable-pipe',
  template: '<div> <code>observable|async</code>:
  Time: {{time | async}}</div >'
})
export class AsyncObservablePipeComponent {
  time = new Observable(observer =>
    setInterval(() => observer.next(new Date().toString()), 2000)
  );
}`.trim();

const ViewContainerRef = `let componentRef = viewContainerRef.createComponent(componentFactory);`.trim();

const template = `
<p>Hip!</p>
<ng-template>
  <p>Hip!</p>
</ng-template>
<p>Hooray!</p>
`.trim();

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

const dslSyntax = `
(): Used for Output and DOM events.
[]: Used for Input and specific DOM element attributes.
*: Structural directives(*ngFor or *ngIf) will affect/change the DOM structure.`.trim();

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
              <h3>1. Please explain the various features of Angular.</h3>
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
              Metadata, Annotation and Decorator is same thing.
              <br/>
              <ul>
                <li>Decorator contain @. it accept object. decorator are simply functions that return functions.
                  decorator are invoke at runtime. decorator allows you to excuite functions.</li>
              </ul>
              <br/>
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
              <b>i. Method decorators: </b>Used for methods inside classes, e.g. @HostListener
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

              <b>ii. Parameter decorators: </b>Used for parameters inside class constructors, e.g. @Inject, Optional.
              <div style={titles}>
                <PrismCode
                  code={parameters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>5. Explain Components, Modules and Services in Angular.</h3>
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
                <ul>
                  <li>Components are the basic building blocks, which control a part of the UI for any application.</li>
                  <li>@component decorator provides additional metadata that determines how to process, instantiate and use the 
                    component at runtime.</li>
                    <br/>
                  <li>A component is defined using the @Component decorator. Every component consists of three parts, 
                    <ul>
                      <li><b>template: </b>lA template is a form of HTML that tells Angular how to render the component.</li>
                      <li><b>stylesheet: </b>defines the look and feel for the component.</li>
                      <li><b>class: </b>contains the business logic for the component.</li>
                      </ul>
                   </li>
                </ul>
                <br/>

              <h3>ii. Modules</h3>
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

              <h3>iii. Services </h3>
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

              <h3>6. What are directives: @directive</h3>
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
                    <li>Components is the special kind of directives, Becouse we have the template varriables.</li>
                    <li>Directives with own Template.</li>
                    <li>with the help of selector, @Component which is a decorator function is used to create a
                      component directive.</li>
                  </ul>
                </li>
                <br />
                <li><b>Structural Directives:</b>
                  <ul>
                    <li>Do manipulation in DOM.</li>
                    <li>Structural directive modifies or manipulates the structure of DOM by adding or removing DOM elements. it works on the structure of a DOM.</li>
                    <li>Structural directives which have a * sign before the directive.  *ngIf and *ngFor.</li>
                  </ul>
                </li>
                <br />
                <li><b>Attribute Directives/ Behavioral Directives:</b>
                  <ul>
                    <li>Do css related things.</li>
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
              <br />
              <b>Custom directive ex. are with *ngIf, *ngFor...</b><br/>
              <i>ng g directive mydirective</i>
              <div style={titles}>
                <PrismCode
                  code={customDir}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>7. What is difference between attribute and structural directives?</h3>
              Attribute directives modify the appearance or behavior of DOM elements. Structural directives add or remove elements from the DOM. 
              <br/>

              <h3>8. What are template expressions</h3>
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

              <h3>9. What are template statements</h3>
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

              <h3>10. What is Data Binding? How many ways it can be done?</h3>
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

              <h3>11. Explain string interpolation and property binding in Angular.</h3>
                <ul>
                  <li>String interpolation and Property binding are parts of data-binding (one way) in Angular.</li>
                  <li><b>String interpolation: </b>Refer to the special type of syntax that makes use of template expressions 
                  to display component data. Such variables are enclised within doubly curly braces.</li>
                  <br/>
                  <li><b>Property binding: </b>Means passing data from the component and to the template. Use square bracket.</li>
                </ul>
              <br/>

              <h3>12. What are the differences between Component and Directive</h3>
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

              <h3>13. Dependency Injection</h3>
              <ul>
                <li>is a technique where one object supplies the dependencies of another object. A dependency is an
                  object that can be used service.</li>
                <li>it's a codding pattern in which classes recive their dependencies from external sources rather
                  than creating them itself.</li>
              </ul>
              <br />

              <h3>14. What is DI and how angular handling DI? important.</h3>
              Angular uses the Dependency Injection design pattern, which makes it extremely efficient. This programming paradigm allows 
              classes, components, and modules to be interdependent while maintaining consistency. This reduces the frequency with which the 
              class changes.
              <br/>
              
              <h3>15. What Is Dependency Injection? </h3>
              Dependency injection is what makes a class independent of its dependencies. Dependency injection enables the creation of d
              ependent objects outside of a class while providing those very objects to a class in numerous ways. 
              <br/>
              <br/>
              Consider two classes, A and B. Let’s assume that class A uses the objects of class B. Normally, in OOPS, an instance of class 
              B is created so that class A can access the objects. Using DI, we move the creation and binding of the dependent objects 
              outside of the class that depend on them. 
              <br/>
              <br/>
              Typically, there are three types of classes, they are:
              <ul>
                <li><b>Client Class: </b>This is the dependent class, which depends on the service class. </li>
                <li><b>Service Class: </b>Class that provides the service to the client class.</li>
                <li><b>Injector Class: </b>njects the service class object into the client class. </li>
              </ul>
              <br/>
              <img src={Graphs} alt="DeadLock" className="responsive" style={redesign} />
              <br/>
              <br/>
              <b>There are three types of Dependency Injections in Angular </b>
              <ul>
                <li><b>Constructor injection: </b>It provides the dependencies through a class constructor.</li>
                <li><b>Setter injection: </b>The client uses a setter method into which the injector injects the dependency.</li>
                <li><b>Interface injection: </b>The dependency provides an injector method that will inject the dependency into any client 
                passed to it. On the other hand, the clients must implement an interface that exposes a setter method that accepts the 
                dependency.</li>
              </ul>
              <br/>
              <br/>
              <b>Advantages </b>
              <ul>
                <li>Dependency Injection helps in Unit testing.</li>
                <li>Extending the application becomes more manageable.</li>
                <li>It helps to enable loose coupling, which is essential in application programming. </li>
              </ul>
              <br/>
              <br/>
              <b>The Drawbacks of not using Dependency Injection </b>
              <br/>
              Consider a Postal details class that is dependent on the Number and the Address class.
              <br/>
              <div style={titles}>
                <PrismCode
                  code={postals}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              In the PostalDetails class, the constructor creates copies of the Number and address. So when you instantiate a new 
              PostalDetails class, the constructor instantiates a unique number and address. 
              <br/>
              <br/>
              Although this looks simple, there’s a problem with this code. Let’s assume that the Number and Address classes’ constructors 
              now accept parameters. 
              <div style={titles}>
                <PrismCode
                  code={postalsparams}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              When we change the Number class, the PostalDetails class is broken. To overcome this, we need to pass in a parameter to 
              the Number constructor. This applies to the Address class as well. 
              <br/>
              <br/>
              <ul>
                <li>The first drawback is that the code is not flexible. Any time the dependencies change, the PostalDetails class 
                  needs to be changed as well.</li>
                <li>The second drawback is that this code is not suitable for testing. Anytime you instantiate a new PostalDetails 
                  class, you get the same Number and Address. Even if you change the Number and Address classes, what if these 
                  classes, in turn, have dependencies?</li>
              </ul>
              <br/>
              As a result, we are not in control of the code, and here’s where Dependency Injection comes into the picture. 
              <br/>
              <br/>
              DI is a coding pattern where a class receives its dependencies from an external source rather than creating them itself. 
              <br/>
              <div style={titles}>
                <PrismCode
                  code={impdi}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              In the above example, we have moved the definition of the dependencies from inside the constructor to the 
              constructor’s parameters. So the PostalDetails class doesn’t create the dependencies anymore. It just consumes them. 
              The creation of those dependencies is external to this class, and by doing so, we now solve both the drawbacks. 
              <br/>

              <h3>16. What is the use of httpInterceptor Class?</h3>
              The Angular Interceptor helps us to modify the HTTP Request by intercepting it before the Request is sent to the 
              back end. It can also modify the incoming Response from the back end. The Interceptor globally catches every 
              outgoing and in coming request at a single place.
              <br />

              <h3>17. What is the difference between template driven form and reactive based approach?</h3>
              <ul>
                <li>Template-driven forms make use of the "FormsModule", while reactive forms are based on "ReactiveFormsModule".</li>
                <li>Template-driven forms are asynchronous in nature, whereas Reactive forms are mostly synchronous.</li>
                <li>In a template-driven approach, most of the logic is driven from the template, whereas in reactive-driven approach, the logic resides mainly in the component or typescript code.</li>
              </ul>
              <br/>

              <h3>18. What is the difference between forChild and forRoot? </h3>
              <b>forRoot </b>
              <br/>
              <ul>
                <li>Register the router service</li>
                <li>Used once for the application</li>
              </ul>
              <br/>
              <br/>

              <b>forChild </b>
              <br/>
              <ul>
                <li>Does not register the router service.</li>
                <li>Used in feature modules</li>
              </ul>
              <br/>
              <img src={formroot} alt="DeadLock" className="responsive" style={redesign} />
              <br/>

              <h3>19. What is Interceptor.</h3>
              Is a medium connecting the backend and front-end applications. Whenever a request is made, the interceptors handle 
              it in between. They can also identify the response by performing Rxjs operators. The interceptors do not initiate 
              the handle method and handle the requests at their level.
              <br/>

              <h3>20. Can you explain the concept of scope hierarchy in Angular?</h3>
              <ul>
                <li>Angular organizes the $scope objects into a hierarchy that is typically used by views. 
              It has a root scope that can further contain one or several scopes called child scopes.</li>
                <li>In a scope hierarchy, each view has its own $scope.</li>
                <li>The scope in Angular binds the HTML and the JavaScript. It as expected is an object with the available methods and 
              properties. The scope is available for both the view and the controller.</li>
              </ul>
              <br />

              <h3>21. What is zone</h3>
              Zone. js is a api or set of programs which is used by angular to update the application view when any
              change occurred.
              <br />
              <b>Ex.: </b>Events, XMLHttpRequests and Timers(setTimeout(), setInterval()) etc.
              <br />

              <h3>22. What is ViewEncapsulation and how many ways are there to do it in Angular?</h3>
              ViewEncapsulation determines whether the styles defined in a particular component
              will affect the entire application or not. Angular supports 3 types of ViewEncapsulation:
              <ul>
                <li><b>Emulated: </b>Styles used in other HTML spread to the component</li>
                <li><b>Native: </b>Styles used in other HTML doesn’t spread to the component</li>
                <li><b>None: </b>Styles defined in a component are visible to all components of the application</li>
              </ul>
              <br />

              <h3>23. What are Core and Shared modules for?</h3>
              <ul>
                <li>A Shared module serves as a generic module for all modules, components, directives, pipes, etc., which are not required to be in a single copy for the application but need to be imported into many different modules.</li>
                <li>A Core module is a place to store services that you need to have in the form of singleton for the entire application (for example, a user authorization service with data storage about it).</li>
              </ul>
              <br />

              <h3>24. What is the use of Bazel in Angular 8.</h3>
              <ul>
                <li>It provides a platform to make back-end and front-end services with the same tool.</li>
                <li>It allows us to build CLI applications quickly and easily.</li>
                <li>The entirety of the Angular framework is built on Bazel and it allows us to divide an
                  application into various build units which are defined at the NgModule level.</li>
                <li>It supports customization and also facilitates us to draw graphs. We can use these graphs to
                  easily identify the essential information.</li>
              </ul>
              <br />

              <h3>25. Why we should use Bazel for Angular builds</h3>
              <ul>
                <li>The initial build time with Bazel will be comparable
                  to the traditional JavaScript tooling. the difference is that the time will not grow exponentially when our
                  application’s size increases. With Bazel most of the time the build time will stay constant.</li>
                <li>Bazel rebuilds only the packages which have changed and nothing else.</li>
              </ul>
              <br />

              <h3>26. Interface Vs. Model Class</h3>
              <b>Interface</b>
              <ul>
                <li>An interface is a named shape/structure of related properties & methods that describe an object, but neither provides implementation nor initialisation for them.</li>
                <li>Interfaces are compile time to check strongly-typed data.</li>
                <li>An Interface exists only for developers convenience and are not used by angular at run time, They get removed when transpiling down to JS, so they take up no space.</li>
              </ul>
              <br/>
              <br/>
              <b>Model Class</b>
              <ul>
                <li>A model class is a blueprint that contains properties & method and also can provide implementation of something and instantiated using new keyword, unlike just a named shape.</li>
                <li>Classes are compile time, additional, can be used during runtime as well.</li>
                <li>A Class transpiled into its ES5-compatible function form and corresponding It generates JS code which persists in final JavaScript output, hence this take up space in memory.</li>
              </ul>
              <br/>

              <h3>27. Can we write a class in angular without using a constructor?</h3>
              A class may contain at most one constructor declaration. If a class contains no constructor declaration, an automatic constructor is provided,
              <div style={titles}>
              <PrismCode
                  code={angulconstar}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              
              <h3>28. What is State function</h3>
              Angular's state() function is used to define different states to call at the end of each transition. This function takes two arguments:
              <ul>
                <li>A unique name like open or closed.</li>
                <li><b>A style() function: </b>The style function is used to define a set of styles to associate with a given state name. You
                  need to use it along with state() function to set CSS style attributes.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={stateFun}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>29. What is transition function</h3>
              <ul>
                <li>The animation transition function is used to specify the changes that occur between one state and another over a period of time.
                  It accepts two arguments:
                </li>
                <ul>
                  <li>First argument accepts an expression that defines the direction between two transition states.</li>
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
              <br/>

              <h3>30. Pipes</h3>
              <ul>
                <li>A pipe takes in data as input and transforms it to a desired output. </li>
                <li>Using pipe operator (|), we can apply the pipe's features to any of property in app.</li>
                <li>Pipes used to transform the data before displaying it in a browser. Even we can create custom pipes.
                </li>
                <br />
                <li><b>Parameterize Pipes:</b>  we can pass any number of Parameters to the pipe using colon (:).</li>
                <li>Mutiple Pipes</li>
                <li>Pipes with string</li>
              </ul>
              <br />
              <b>Ex. </b>DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, and PercentPipe.
              <br/>
              Let us take a pipe to transform a component's birthday property into a human-friendly date using date pipe.
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
              <b>Steps to create custom pipe: </b>
                <ol>
                  <li>Creates a TypeScript class.</li>
                  <li>Decorate the class with "@Pipe" decorator.</li>
                  <li>Implements PipeTransform interface in TypeScript class.</li>
                  <li>Override the transform() method.</li>
                  <li>Configure the class with @NgModule.</li>
                </ol>
              <br/>

              <h3>31. What is a parameterized pipe</h3>
              The parameterized pipe can be created by declaring the pipe name with a colon ( : ) and then the
              parameter value.
              <br />
              <b>Ex. </b>Let's take a birthday example with a particular format(dd/MM/yyyy):
              <div style={titles}>
                <PrismCode
                  code={paraPipes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <b>N: The parameter value can be any valid template expression, such as a string literal or a component property.</b>
              <br />

              <h3>32. How do you chain pipes</h3>
              Let's take a birthday property which uses date pipe(along with parameter) and uppercase pipes as below.
              <div style={titles}>
                <PrismCode
                  code={chainPipe}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>33. Pure and Impure Pipes</h3>
                <table>
                  <tr>
                    <th>Pure Pipe</th>
                    <th>Impure Pipe</th>
                  </tr>
                  <tr>
                    <td>Based on the i/p state the o/p state can be determine.</td>
                    <td>If the o/p can't be determined from i/p state or has an internal/ external state involved.</td>
                  </tr>
                  <tr>
                    <td>i/p params determine the o/p.</td>
                    <td>i/p params can't determine o/p.</td>
                  </tr>
                  <tr>
                    <td>Angular calls the pipe transform function only if i/p parameters are change.</td>
                    <td>Angular call the transform function, even if i/p parameters are not changed.</td>
                  </tr>
                  <tr>
                    <td>Deterministic</td>
                    <td>Non-Deterministic</td>
                  </tr>
                  <tr>
                    <td>If i/p not change than o/p is same in that case, Does not run on every change detection cycle.</td>
                    <td>Runs on every change detection cycle.</td>
                  </tr>
                  <tr>
                    <td>Does not perform on any side-effect, and hold immutability.</td>
                    <td>Perform on side-effect</td>
                  </tr>
                </table>
              <br/>

              <h3>34. What is the purpose of async pipe</h3>
              The AsyncPipe subscribes to an observable or promise and returns the latest value it has emitted. When a new 
              value is emitted, the pipe marks the component to be checked for changes.
              <br />
              <br />
              Let's take a time observable which continuously updates the view for every 2 seconds with the current time.
              <div style={titles}>
                <PrismCode
                  code={purpose}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>35. Change Detection:</h3>
              <ul>
                <li>Means updating the DOM every time the data is changed.</li>
                <li>When modifying any of the models, Angular detects the changes and updates the views immediately. The purpose of this mechanism is to ensure that the underlying views are always synchronized with their corresponding models.</li>
              </ul>
              <br />
              <b>Angular provides two strategies for Change Detection:</b>
              <br />
              <b>1. default strategy:</b>
              <br />
              Every time you put or edit any data, Angular will run the change detector to update the DOM.
              <br />
              <br />
              <b>2. onPush strategy:</b>
              <ul>
                <li>It will be based only on the modification of the input references, some events activated by
                  themselves or one of his children. Do it with the <b>componentRef.markForCheck()</b> method.</li><br/>
                <li>With onPush, the component depends only on its inputs and covers immutability, the change detection 
                  strategy will be activated when:
                  <ul>
                    <li>The input reference changes;</li>
                    <li>An event originating from the member or one of his children;</li>
                    <li>Execute change detection explicitly <b>(componentRef.markForCheck ());</b></li>
                    <li>Use the async pipe in the view.</li>
                  </ul>
                  </li>
              </ul>
              <br />
              <ul>
                <li>In the onPush strategy, Angular only performs the change detector when a new reference to the data of @Input() is passed.</li>
              </ul>
              <ul>
                <li>Change Detection Mechanism-moves only forward and never looks back, starting from the root component to the last.
                  Each component points to a child, but the child does not point to a parent. One-way flow eliminates the need for
                  a <b>$digest loop</b>.</li>
              </ul>
              <br />

              <h3>36. ViewProvider</h3>
              <p>
                viewProviders property allows us to make providers available only for the component’s view.
                When we want to use a class in our component that is defined outside the @Component () decorator function, then, 
                first of all, we need to inject this class into our component, and we can achieve this with the help of the 
                "viewProvider" property of a component.
              </p>

              <h3>37. ViewChild</h3>
              ViewChild is a decorator for Angular component variables, which allow to bind child component data and method.
              <br />
              <ul>
                <li>are used for component communication. If a parent component want to access child
                  component then use ViewChild. Any component, directive or element which is part of a template
                  is ViewChild.</li>
                <li>ViewChild() decorator can be used to get the first element or directive matching the selector
                  from the view DOM. @ViewChild() provides the instance of another component or directive in a
                  parent component and then parent component can access the method and properties of that
                  component or directive.</li>
              </ul>
              <br />
              Use @ViewChild with ElementRef or TemplateRef.
              <br />

              <h3>Dynamically Load Component</h3>
              <ul>
                <li>Dynamic components are the components in which components location in the application is not defined at build 
                    time.i.e, They are not used in any angular template. But the component is instantiated and placed in the 
                    application at runtime.</li><br/>
                <li>Mainly, in the component template, a component is loaded using the component selector at angular
                    compile time. The component can also be loaded dynamically at runtime with the help of
                    <b>ComponentFactory, ComponentFactoryResolver</b>, and <b>ViewContainerRef</b>.</li><br/>
                <li>Those components which need to be loaded dynamically must also be configured in <b>entryComponents</b>
                    metadata of @NgModule decorator. To load a dynamic component in a template we required an insert
                    location and to get it we need <b>ViewContainerRef</b> of a decorator or a component.</li><br/>
                <li>ComponentFactory is used to create an instance of components where ComponentFactoryResolver resolves a
                    ComponentFactory for a particular component. It is used as follows.</li>
              <b>let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);</b>
              </ul>
              <br />
              
              <h3>38. ViewContainerRef</h3>
              <ul>
                <li>ViewContainerRef represents a container where we can attach one or more views to a component and
                  also show an API to create components. Some important methods of ViewContainerRef are:
                  <ul>
                    <li>createEmbeddedView()</li>
                    <li>clear()</li>
                    <li>get()</li>
                    <li>insert()</li>
                    <li>move()</li>
                    <li>createComponent()</li>
                  </ul>
                </li>
                <br />

                <li><b>CreateEmbeddedView()</b> instantiates an embedded view and inserts it into container.</li>
                <li><b>createComponent()</b> instantiates a single component and inserts its host view into the container at
                  a specified index.</li>
              </ul>
              <br />
              In dynamic component loader, load component using createComponent() of ViewContainerRef.
              <br />
              
              <div style={titles}>
                <PrismCode
                  code={ViewContainerRef}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              clear() method of ViewContainerRef destroys all existing views in the container.
              <br/>

              <h3>39. What is ng-template in Angular?</h3>
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

              <h3>40. What is the purpose of any type cast function</h3>
              You can disable binding expression type checking using $any() type cast function.
              <div style={titles}>
                <PrismCode
                  code={typeFunc}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>41. What is Non null type assertion operator</h3>
              You can use the non-null type assertion operator to suppress the Object is possibly 'undefined' error.
              <br />
              <br />
              In the following example, the user and contact properties are always set together, implying that contact is always non-null if user is non-null. The error is suppressed in the example by using contact!.email.
              <div style={titles}>
                <PrismCode
                  code={assertionOpp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>42. What is type narrowing</h3>
              Dynamic checks and predicates gives us information about values at run-time. type narrowing is the
              process of reflecting this information in the type-checker at compile time.
              <div style={titles}>
                <PrismCode
                  code={narrowing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>43. What is the purpose of common module</h3>
              The commonly-needed services, pipes, and directives provided by @angular/common module. 
              <br />

              <h3>44. What is angular animation</h3>
              <ul>
                <li>Angular animations are based on CSS web transition functionality, so anything that can be styled or
                  transformed in CSS can be animated the same way in Angular.</li>
                <li>Angular animations allow you to: Set animation timings, styles, keyframes, and transitions.</li>
              </ul>
              <br />

              <h3>45. What is Angular DSL (Domain-specific language)</h3>
              A DSL is a computer language specialized to a particular application domain. Angulard DSL allows us to write
              Angular specific html-like syntax on top of
              normal html. It has its own compiler that compiles this syntax to html that the browser can understand.
              This DSL is defined in NgModules such as animations, forms, routing and navigation.
              <br />
              <br />
              Basically you will see 3 main syntax in Angular DSL.
              <div style={titles}>
                <PrismCode
                  code={dslSyntax}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>46. What is multicasting</h3>
              Multi-casting is the process of broadcasting to a list of multiple subscribers in a single execution.
              <div style={titles}>
                <PrismCode
                  code={multicasting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>47. What modules should you import in Angular to use [(ngModel)] and reactive forms?</h3>
              FormsModule and Reactiveforms Module.
              <br />

              <h3>48. How many Change Detectors can there be in the whole application?</h3>
              Each component has its own ChangeDetector. All Change Detectors are inherited from
              AbstractChangeDetector.
              <br />

              <h3>49. Two ways to collect and validate data from users</h3>
              <b>1. Template-driven forms:</b>
              <ul>
                <li>Everythings which we are going to use in an application is defined into the template that are defining</li>
                <li>Along with a component.</li>
                <li>To use it we need to import FormsModule in application.</li>
              </ul>
              <br />
              <b>50. Model-driven forms (Reactive forms)</b>
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

export default (withStyles(styles)(IntroAngulard));
