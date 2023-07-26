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

const myProvider = `
export class ViewProvider {
  name: string = 'Mukesh';
}

export class ViewProvider2 {
  name: string = 'Rakesh';
  getName() {
    console.log(this.name);
  }
}

@Component({
  viewProviders: [ViewProvider, ViewProvider2],
})
export class AppComponent {
  constructor(public pr: ViewProvider, public pr2: ViewProvider2) {
    console.log(pr.name);
    pr2.getName();
  }
}
`.trim();

const custEle = `
@Component({
  selector: 'my-custom-element',
  template: '<h1>Hello, World!</h1>'
})
export class MyCustomElementComponent {}`.trim();

const custEle2 = `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { MyCustomElementComponent } from './my-custom-element.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [MyCustomElementComponent],
  entryComponents: [MyCustomElementComponent]
})
export class MyCustomElementModule {
  constructor() {
    const customElement = createCustomElement(MyCustomElementComponent, { injector: this.injector });
    customElements.define('my-custom-element', customElement);
  }
  ngDoBootstrap() {}
}
`.trim();

const custEle3 = `
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MyCustomElementModule } from './my-custom-element.module';

platformBrowserDynamic().bootstrapModule(MyCustomElementModule);
`.trim();

const custEle4 = `<my-custom-element></my-custom-element>`.trim();

const transferCust = `
import { Component, Input, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

@Component({
  selector: 'my-angular-component',
  templateUrl: './my-angular-component.component.html',
  styleUrls: ['./my-angular-component.component.css']
})
export class MyAngularComponent {
  @Input() title: string;
}
`.trim();

const transferCust2 = `
@Component({
  selector: 'my-angular-component',
  templateUrl: './my-angular-component.component.html',
  styleUrls: ['./my-angular-component.component.css'],
  // Use "viewProviders" to make the component available to its own template
  viewProviders: [{ provide: MyAngularComponent, useValue: MyAngularComponent }]
})
export class MyAngularComponent extends HTMLElement {
  @Input() title: string;

  constructor(private injector: Injector) {
    super();
  }

  connectedCallback() {
    // Create the Angular element and attach it to the custom element's shadow DOM
    const angularElement = createCustomElement(MyAngularComponent, { injector: this.injector });
    customElements.define('my-custom-element', angularElement);
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(document.createElement('my-custom-element'));
  }
}
`.trim();

const transferCust3 =
  `<my-angular-component title="Hello World"></my-angular-component>`.trim();

const viewChilds = `
//html
{{ empSalery }}


//child.ts
export class ChildCompo {
  empSalery = 0;

  childMethod() {
    this.empSalery += 500;
  }

  childMethod2() {
    this.empSalery -= 500;
  }
}
  
  
//app.component.ts
//html
<button (click)="empIncreaseSalery()">Inc</button>
<button (click)="empDecreSalery()">Din</button>
    <child></child>


import { ChildCompo } from './child';
export class AppComponent {
  @ViewChild(ChildCompo)
  ChildCompo!: ChildCompo;

  empIncreaseSalery() {
    this.ChildCompo.childMethod();
  }

  empDecreSalery() {
    this.ChildCompo.childMethod2();
  }
}
  `.trim();

const ViewContainerRef =
  `let componentRef = viewContainerRef.createComponent(componentFactory);`.trim();

class AngularDir extends Component {
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
              <h3>1. Custom Element : npm install @angular/elements</h3>
              Angular Custom Elements is a feature that allows Angular
              components to be used as standalone custom elements in HTML. This
              means that an Angular component can be used in any HTML page,
              regardless of whether it is an Angular application or not.
              <br />
              <br />
              To create an Angular custom element, we can use the
              @angular/elements package and the createCustomElement function.
              Here is an example of how to create a simple Angular custom
              element:
              <br />
              <ol>
                <li>
                  First, create a new Angular component using the @Component
                  decorator:
                  <div style={titles}>
                    <PrismCode
                      code={custEle}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>
                </li>
                <br />
                <li>
                  Next, convert the component into a custom element using the
                  createCustomElement function from the @angular/elements
                  package:
                  <div style={titles}>
                    <PrismCode
                      code={custEle2}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>{" "}
                </li>
                <br />
                <li>
                  Finally, we need to bootstrap our custom element using the
                  bootstrapModule function:
                  <div style={titles}>
                    <PrismCode
                      code={custEle3}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>
                </li>
                <br />
                <li>
                  Once we have completed these steps, we can use our custom
                  element in any HTML page like this:
                  <div style={titles}>
                    <PrismCode
                      code={custEle4}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>
                </li>
                <br />
              </ol>
              Overall, Angular Custom Elements provides a powerful way to reuse
              Angular components in non-Angular applications or web pages. By
              following these simple steps, developers can create custom
              elements that encapsulate their Angular components and make them
              available for use in any HTML page.
              <br />
              <br />
              <h3>2. Do I need to bootstrap custom elements</h3>
              <ul>
                <li>
                  Yes, you need to bootstrap custom elements in Angular if you
                  want to use them in your application. Bootstraping is the
                  process of starting up an application and preparing it for
                  use. In the context of Angular, bootstrapping refers to the
                  process of initializing the root module of the application and
                  preparing it for use by the browser.
                </li>
                <br />
                <li>
                  When using custom elements in Angular, you need to create a
                  new module that imports the custom element and sets it up for
                  use in your application. This module needs to be bootstrapped
                  in your application to ensure that the custom element is
                  properly initialized and can be used by other components in
                  your application.
                </li>
                <br />
                <li>
                  To bootstrap a custom element in Angular, you can use the
                  createCustomElement function from the @angular/elements
                  package. This function takes a component class and returns a
                  new custom element class that can be used in your application.
                </li>
                <br />
                <li>
                  Once you have created the custom element class, you can add it
                  to the entryComponents array of your root module, and then
                  bootstrap the module using the
                  platformBrowserDynamic().bootstrapModule() function.
                </li>
                <br />
                <li>
                  Overall, bootstrapping custom elements in Angular is an
                  important step in using them in your application. By properly
                  initializing the custom element, you can ensure that it
                  behaves as expected and can be used by other components in
                  your application.
                </li>
                <br />
              </ul>
              <br />
              <br />
              <h3>3. How to transfer components to custom elements</h3>
              To transfer Angular components to custom elements, we can use
              Angular's built-in support for web components. This involves
              creating a custom element that wraps the Angular component and
              registers it as a custom element.
              <br />
              <br />
              Here are the steps to transfer an Angular component to a custom
              element:
              <ul>
                <li>Install the @angular/elements package.</li>
                <br />
                <li>
                  In the Angular component that you want to transfer to a custom
                  element, import the necessary dependencies:
                </li>
                <br />
                <li>
                  Decorate the component with the @Component decorator as usual:
                  <div style={titles}>
                    <PrismCode
                      code={transferCust}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>
                </li>
                <br />
                <li>
                  Modify the component's class to extend the HTMLElement class,
                  so that it can be used as a custom element:
                  <div style={titles}>
                    <PrismCode
                      code={transferCust2}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>
                </li>
                <br />
                <li>
                  Register the custom element using the customElements.define()
                  method, and attach the Angular component to the custom
                  element's shadow DOM.
                </li>
                <br />
                <li>
                  Use the custom element in your HTML as follows:
                  <div style={titles}>
                    <PrismCode
                      code={transferCust3}
                      language="js"
                      plugins={["line-numbers"]}
                    />
                  </div>
                </li>
                <br />
              </ul>
              <br />
              <br />
              <h3>4. Animations</h3>
              Angular Animations is a powerful feature of the Angular framework
              that allows developers to create rich and dynamic user interfaces
              by adding animations and transitions to the application's
              components. With Angular Animations, developers can create
              animations that respond to user interactions, changes in component
              state, or changes in the data displayed by the application.
              <br />
              <br />
              Angular Animations is based on the Web Animations API, which is a
              native browser API that allows developers to create and control
              animations directly in the browser. Angular Animations provides a
              higher-level API that makes it easier to create and manage complex
              animations and transitions.
              <br />
              <br />
              Angular Animations is based on three key concepts:
              <ul>
                <li>
                  <b>Triggers: </b>A trigger is a named animation state that
                  defines a set of animations that are applied to a component
                  when the state is active. For example, a trigger can be used
                  to define the animations that are played when a button is
                  clicked, or when a component is added or removed from the DOM.
                </li>
                <br />
                <li>
                  <b>States: </b>A state is a named configuration of a component
                  that can be used as the target of an animation. For example, a
                  state can be used to define the appearance of a component when
                  it is in a particular state, such as when it is active or
                  inactive.
                </li>
                <br />
                <li>
                  <b>Transitions: </b>A transition is a set of animations that
                  are applied when a component transitions between two states.
                  For example, a transition can be used to animate the
                  transition from an inactive to an active state, or from one
                  set of styles to another.
                </li>
              </ul>
              <br />
              Overall, Angular Animations provides a powerful way to create
              dynamic and engaging user interfaces by adding animations and
              transitions to components. By using triggers, states, and
              transitions.
              <br />
              <br />
              <h3>5. JQuery</h3>
              <ul>
                <li>first install jquery as npm install jquery</li>
                <li>
                  inside ./angular-cli.json file, find script, and include the
                  path to jQuery as <br />
                  "script":["./node_moules/jquery/dist/jquery.min.js"]
                </li>
                <li>
                  <b>Note:</b> jQuery should be before bootstrap, if use both.
                </li>
              </ul>
              <br />
              <br />
              <h3>6. ViewProvider</h3>
              <p>
                view provider is a provider that is defined at the component
                level and is only available to the component and its descendants
                in the component tree.
              </p>
              view provider used to provide services or values that are specific
              to a component and its view, without exposing them to the rest of
              the application.
              <div style={titles}>
                <PrismCode
                  code={myProvider}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>7. Providers have services list which use by component.</h3>
              If component need any service than it ask to injector not to
              Promises, Injector will create that service by getting blue-print
              from Promises, But if injector have that service instance than
              directly provide to component.
              <br />
              <br />
              <h3>8. ViewChild</h3>
              ViewChild is a decorator for Angular component variables, which
              allow to bind child component data and method.
              <br />
              <ul>
                <li>
                  There may be situation where we want to access a directive,
                  child component or a DOM element from a parent component
                  class. @ViewChild decorator returns the first element that
                  matches a give directive, component or template.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={viewChilds}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>9. ViewContainerRef</h3>
              <ul>
                <li>
                  ViewContainerRef represents a container where we can attach
                  one or more views to a component and also show an API to
                  create components. Some important methods of ViewContainerRef
                  are:
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

                <li>
                  <b>CreateEmbeddedView()</b> instantiates an embedded view and
                  inserts it into container.
                </li>
                <li>
                  <b>createComponent()</b> instantiates a single component and
                  inserts its host view into the container at a specified index.
                </li>
              </ul>
              <br />
              In dynamic component loader, load component using
              createComponent() of ViewContainerRef.
              <br />
              <div style={titles}>
                <PrismCode
                  code={ViewContainerRef}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              clear() method of ViewContainerRef destroys all existing views in
              the container.
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AngularDir);
