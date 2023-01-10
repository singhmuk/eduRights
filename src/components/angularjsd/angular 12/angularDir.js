import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';
import Theata from '../../../assets/customElement.png';
import CustomElement from '../../../assets/create.png';


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


const happens = `
export class InnerHtmlBindingComponent {
  // For example, a user/attacker-controlled value from a URL.
  htmlSnippet = 'Template <script>alert("0wned")</script> <b>Syntax</b>';
}`.trim();


const step2 = `
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';`.trim();

const step3 = `
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
    // animation triggers go here
  ]
})`.trim();

const changeDetection = `
//1
import { Component, ChangeDetectorRef ,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '
  < button(click)="detech()"> detech</button>
    <button (click) = "reattach()"> reattach</button>
      <button (click) = "detect()"> detect</button>
        <br />
      {{count}}
  ',
  
  // changeDetection: ChangeDetectionStrategy.Default,
  changeDetection: ChangeDetectionStrategy.OnPush,  //count stop by this
})
export class AppComponent {
   count=0;
  constructor(private changeDR: ChangeDetectorRef){
    setInterval(() => {
      this.count++;
      this.changeDR.markForCheck();
    },1000)
  }

 detech(){
   //stop change detection
   this.changeDR.detach();
 }

 reattach(){
   //satrt change detection from stopping place
   this.changeDR.reattach();
 }

 detect(){
   //satrt change detection from continue increased place but count remain stop
   this.changeDR.detectChanges();
 }
}



//2 childs.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-childs',
  // changeDetection: ChangeDetectionStrategy.Default,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '
          {{data.name}} <br/>
          {{data.email}}
  '})
  
export class Child {
  @Input() data
}


//app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: '
    <app-childs [data]="parentVar"></app-childs>
    <button (click)="defaultStratgy()">default</button>
    <button (click)="defaultObj()">defaultObj</button>',
})
export class AppComponent {
  private parentVar: { name: string, email?: string }

  constructor(){
    this.parentVar = {
      name: "Mukesh",
      email: 'mukesh7@gmail.com'
    }
  }

  defaultStratgy(){
    this.parentVar.name="Rakesh";
  }

  defaultObj(){
    this.parentVar = {
      name: "Ritesh",
      email: "ritesh@gmail.com"
    }
  }
}`.trim();

const myProvider = `
export class MyProvider{
  constructor(){
    console.log('myProvider called')
  }
  varProvider = "varProvider";
}

export class MyProvider2{
  constructor(){}
  varProvider2 = "varProvider2";

  getString(str){
    console.log('myProvider called2', str)
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  viewProviders: [MyProvider, MyProvider2]
})
export class AppComponent {
  constructor(public obj:MyProvider, public obj2:MyProvider2){
    obj2.getString('Mukesh')
    console.log(obj.varProvider);
    console.log(obj2.varProvider2);
  }
}`.trim();

const viewChild = `
//childs.ts
import { Component } from '@angular/core';
@Component({
  selector: 'app-childs',
  template: '
Username: {{username}}
      <br/>
    <button (click) = "clickMe()"> click</button>
  '
})
export class Child {
  username="default Value"
  clickMe(){
    alert(this.username)
  }
}


//viewChild_2.ts
import { Component, ViewContainerRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  template: '
  < button(click)="show()"> Show</button>
    <div id="layout" *ngIf="display">
      <div #contentPlaceholder></div>
</div >
  '
})
export class AppComponent {
  display = false;
    @ViewChild('contentPlaceholder', {read: ViewContainerRef}) viewContainerRef;

    show() {
        this.display = true;
        console.log(this.viewContainerRef); // undefined
        setTimeout(()=> {
            console.log(this.viewContainerRef); // OK
        }, 1);
    }
}


//app.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Child } from './childs';

@Component({
  selector: 'app-root',
  template: '<div #box>
  <p>{{username}}</p>
</div>
<div>
  <button (click)="changeProperty()">Change Child Property</button>
  <button (click)="changeMethod()">Change Child Method</button>
</div>

<app-childs></app-childs>'
})

export class AppComponent implements OnInit {
  username="username";
  @ViewChild('box', {static: false}) box:ElementRef
  constructor(){}

  ngOnInit(){ }
  ngAfterViewInit(){
    // console.log(this.box);
    // this.box.nativeElement.style.backgroundColor="blue";
    // this.box.nativeElement.classList="viewChild accept class";
    // this.box.nativeElement.innerHTML="Can change innerHTML value";

    console.log(this.child)
  }

  @ViewChild(Child, {static: false}) child:Child;
  changeProperty(){
    this.child.username = "Mukesh"
  }

  changeMethod(){
    this.child.clickMe()
  }
}`.trim();


class AngularDir extends Component {
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
              <h3>1. Angular Elements: npm install @angular/elements</h3>
              <ul>
                <li>to add in project: ng add @angular/elements </li>
                <li>It offers functionality that allows to convert a normal Angular component to a native web component.</li>
                <li>Theoretically use it in any web page - no matter if that page uses Angular or not.</li>
                <li>Custom elements bootstrap themselves - they start automatically when they are added to the DOM,
                  and are automatically destroyed when removed from the DOM.</li>
              </ul>
              <br />

              <h3>2. Custom Element</h3>
              <ul>
                <li>A Custom Element provides a way to create web components i.e new DOM elements that behave like standard HTML elements.</li>
                <li>We are bootstrapping our Angular Component as a custom element in the ngDoBootstrap() method.</li>
              </ul>
              <br />
              
              The createCustomElement method takes two parameters:
              <ul>
                <li>1. The first parameter is the Angular component that will be used to create the custom element.</li>
                <li>2. The second parameter is a configuration object that has an injector property set to the current Injector instance.</li>
              </ul>
              <br />

              <b>ng build --prod --output-hashing none</b>
              <br />
              <br />

              <h3>3. What is the browser support of Angular Elements</h3>
              Since Angular elements are packaged as custom elements the browser support of angular elements is same as custom elements support.
              <br />
              <br />

              <h3>4. Do I need to bootstrap custom elements</h3>
              No, custom elements bootstrap automatically when they are added to the DOM, and are automatically
              destroyed when removed from the DOM. Once a custom element is added to the DOM for any page, it looks
              and behaves like any other HTML element.
              <br />
              <br />

              <h3>5. Explain how custom elements works internally</h3>
              Below are the steps in an order about custom elements functionality,
              <br />
              <ul>
                <li><b>App registers custom element with browser: </b>Use the createCustomElement function to convert a component into a class that can be registered with the browser as a custom element.</li>
                <li><b>App adds custom element to DOM: </b>Add custom element just like a built-in HTML element directly into the DOM.</li>
                <li><b>Browser instantiate component based class: </b>Browser creates an instance of the registered class and adds it to the DOM.</li>
                <li><b>Instance provides content with data binding and change detection: </b>The content with in
                  template is rendered using the component and DOM data. The flow chart of the custom elements
                  functionality would be as follows,</li>
              </ul>
              <br />
              <br />
              <img src={Theata} alt="Theata" className="responsive" />
              <br />
              <br />

              <h3>6. How to transfer components to custom elements</h3>
              Transforming components to custom elements involves two major steps.
              <ul>
                <li><b>Build custom element class: </b>Angular provides the createCustomElement function for converting an Angular component (along with its dependencies) to a custom element. The conversion process implements NgElementConstructor interface, and creates a constructor class which is used to produce a self-bootstrapping instance of Angular component.</li>
                <br />
                <li><b>Register element class with browser: </b>It uses customElements.define JS function, to register the configured constructor and its associated custom-element tag with the browser's CustomElementRegistry. When the browser encounters the tag for the registered element, it uses the constructor to create a custom-element instance.</li>
              </ul>
              <br />
              <br />
              <img src={CustomElement} alt="Theata" className="responsive" />
              <br />
              <br />

              <h3>7. animations</h3>
              <ul>
                <li>The main Angular modules for animations are @angular/animations and @angular/platform-browser.</li>
                <li><b>Step 1: </b>Import BrowserAnimationsModule, which introduces the animation capabilities into your Angular root application module.</li>
                <li><b>Step 2: </b>If you plan to use specific animation functions in component files, import those functions from @angular/animations.</li>
                <div style={titles}>
                  <PrismCode
                    code={step2}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />

                <li><b>Step 3: </b>Adding the animation metadata property.</li>
                <div style={titles}>
                  <PrismCode
                    code={step3}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
              </ul>
              <br/>

              <h3>8. JQuery</h3>
              <ul>
                <li>first install jquery as npm install jquery</li>
                <li>inside ./angular-cli.json file, find script, and include the path to jQuery as <br />
                  "script":["./node_moules/jquery/dist/jquery.min.js"]</li>
                <li><b>Note:</b> jQuery should be before bootstrap, if use both.</li>
              </ul>
              <br />

              <h3>9. Change Detection</h3>
              <div style={titles}>
                <PrismCode
                  code={changeDetection}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>10. ViewProvider</h3>
              <div style={titles}>
                <PrismCode
                  code={myProvider}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. Providers have services list which use by component.</h3>
              If component need any service than it ask to injector not to Promises, Injector will create that service by 
              getting blue-print from Promises, But if injector have that service instance than directly provide to component.
              <br />

              <h3>12. ViewChild</h3>
              <div style={titles}>
                <PrismCode
                  code={viewChild}
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

export default (withStyles(styles)(AngularDir));
