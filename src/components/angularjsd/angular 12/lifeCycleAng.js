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


const appcompos = `
import {
  Component,
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  Input,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '
      <h2> Life Cycle Hooks</h2>
        <button (click) = "toggle()"> Hide / Show Child</button >
        
        <child-component *ngIf="displayChild" [message] = "'Hello'">
      </child-component>
  '
})
export class AppComponent implements
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

    displayChild: boolean = false;

    constructor() {
      console.log("AppComponent: Constructor");
    }

    toggle() {
      this.displayChild = !this.displayChild;
    }

    ngOnChanges() {
      console.log("AppComponent: OnChanges");
    }

    ngOnInit() {
      console.log("AppComponent: OnInit");
    }

    ngDoCheck() {
      console.log("AppComponent: DoCheck");
    }

    ngAfterContentInit() {
      console.log("AppComponent: AfterContentInit");
    }

    ngAfterContentChecked() {
    console.log("AppComponent:AfterContentChecked");
    }

    ngAfterViewInit() {
    console.log("AppComponent:AfterViewInit");
    }

    ngAfterViewChecked() {
      console.log("AppComponent:AfterViewChecked");
    }

    ngOnDestroy() {
      console.log("AppComponent:OnDestroy");
    }
}
`.trim();

const childcompo = `
import {
  Component,
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  Input,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'child-component',
  template: '<h > Child Component</h2>'
})

export class ChildComponent implements
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
    @Input() message:string = "";

    constructor() {
    console.log("ChildComponent:Constructor");
    }

    ngOnChanges() {
      console.log("ChildComponent:OnChanges");
    }


    ngOnInit() {
      console.log("ChildComponent:OnInit");
    }

    ngDoCheck() {
      console.log("ChildComponent:DoCheck");
    }

    ngAfterContentInit() {
      console.log("ChildComponent:AfterContentInit");
    }

    ngAfterContentChecked() {
      console.log("ChildComponent:AfterContentChecked");
    }

    ngAfterViewInit() {
      console.log("ChildComponent:AfterViewInit");
    }

    ngAfterViewChecked() {
      console.log("ChildComponent:AfterViewChecked");
    }

    ngOnDestroy() {
      console.log("ChildComponent:OnDestroy");
    }
}`.trim();

const fullResponse = `
getUserResponse(): Observable<HttpResponse<User>> {
  return this.http.get<User>(
    this.userUrl, { observe: 'response' });
}`.trim();

const performError = `
fetchUser() {
  this.userService.getProfile()
    .subscribe(
      (data: User) => this.userProfile = { ...data }, // success path
      error => this.error = error // error path
    );
}`.trim();


class AngularLifeCycle extends Component {
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
              <h3>1. lifecycle hook</h3>
              Constructor excuite first. If we need to inject any
              dependencies into component, then Constructor is the best place to inject those dependencies.
              After excuitiing Constructor angular excuites its lifecycle hooks in a specific order.
              <br />
              <br />
              <b>Sequeces: </b>
              OnChange - OnInit - DoCheck - AfterContentInit - AfterContentChecked - AfterViewInit -
              AfterViewChecked - OnDestry.
              <br />
              <br />
              <b>Lifecycle of a component includes:</b><br />
              <ul>
                <li>Creating a component</li>
                <li>Rendering a component</li>
                <li>Creating And Rendering its child component</li>
                <li>Checking data-bound properties</li>
                <li>Checking and removing it from DOM</li>
              </ul>
              <br />
              <b>ngOnChange:</b>
              Respond when Angular sets data-bound input properties. The method receives a SimpleChanges object of
              current and previous property values.
              <ul>
                <li>Alwase called whenever one of our bound input changes.</li>
                <li>Used in any component that has an input.</li>
                <li>Called whenever an input value changes</li>
                <li>Is called the first time before ngOnInit</li>
              </ul>
              <br />
              <b>ngOnInit():</b>
              Initialize the directive/ component after Angular first displays the data-bound properties and sets the
              directive/ component's input properties.
              <br />
              can be excuited once component has been initialize. This hook is fired before any of the child directive
              properties are initialize. This place we put logic related to initialization of properties.
              <ul>
                <li>Called once, after the first ngOnChanges().</li>
                <li>Used to initialize data in a component.</li>
                <li>called after input values are set when a component is initialized.</li>
                <li>Called only once.</li>
              </ul>
              <br />
              <b>ngDoCheck():</b>
              <br />
              Called during every change detection run, immediately after ngOnChanges() and ngOnInit().
              <br />
              whenever something changes on the template of a component or inside component
              then it excuites. it called during every changes detection run.
              This is similar to ngOnChanges() hook, but ngOnChanges() not detect all the changes made
              to the input properties.
              <br />
              <br />
              It detects changes for those properties which passed by value.
              However, ngDoCheck() detects changes for those properties also which are passed reference
              such as array.
              <br />
              <br />
              <ul>
                <li>Called during all changes detection runs.</li>
                <li>A run through the view by Angular to update/ detect changes.</li>
              </ul>
              <br />
              <br />
              <b>ngAfterContentInit():</b>
              <br />
              <ul>
                <li>Respond after Angular projects external content into the component's view.</li>
                <li>Called once after the first ngDoCheck().</li>
              </ul>
              <br />
              <br />
              <b>ngAfterContentChecked():</b>
              <br />
              <ul>
                <li>Respond after Angular checks the content projected into the directive/ component.</li>
                <li>Called after the ngAfterContentInit() and every subsequent ngDoCheck().</li>
              </ul>
              <br />
              <br />
              <b>ngAfterViewInit():</b>
              <br />
              <ul>
                <li>Respond after Angular initializes the component's views and child views.</li>
                <li>Called once after the first ngAfterContentChecked().</li>
              </ul>
              <br />
              <br />
              <b>ngAfterViewChecked():</b>
              <br />
              <ul>
                <li>Respond after Angular checks the component's views and child views.</li>
                <li>Called after the ngAfterViewInit() and every subsequent ngAfterContentChecked().</li>
              </ul>
              <br />
              <br />
              <b>ngOnDestroy():</b>
              <br />
              <ul>
                <li>Cleanup just before Angular destroys the directive/ component. Unsubscribe Observables and detach event handlers to avoid memory leaks.</li>
                <li>Called just before Angular destroys the directive/ component.</li>
              </ul>
              <br />

              <b>app.component.ts</b>
              <div style={titles}>
                <PrismCode
                  code={appcompos}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>child.component.ts</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={childcompo}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>2. Describe the MVVM architecture. </h3>
              MVVM architecture removes tight coupling between each component. The MVVM architecture comprises of three parts:
              <br />
              <ul>
                <li>Model</li>
                <li>View</li>
                <li>ViewModel</li>
              </ul>
              The architecture allows the children to have reference through observables and not directly to their parents.
              <br />

              <h3>3. How do you update the view if your data model is updated outside the ‘Zone’?</h3>
              <ul>
                <li>Using the <b>ApplicationRef.prototype.tick</b> method, which will run change detection on the entire component tree.</li>
                <li>Using <b>NgZone.prototype.run</b> method, which will also run change detection on the entire tree. The run method under the hood itself calls tick, and the parameter takes the function you want to perform before tick.</li>
                <li>Using the <b>ChangeDetectorRef.prototype.detectChanges</b> method, which will launch change detection on the current component and its children.</li>
              </ul>
              <br />

              <h3>4. What is the use of Codelyzer</h3>
              <ul>
                <li>All enterprise applications follows a set of coding conventions and guidelines to maintain code
                  in better way. Codelyzer is a tool to run and check whether the pre-defined coding guidelines has
                  been followed or not.
                  <br />
                  Codelyzer does only static code analysis for angular and typescript project.</li>
                <br />
                <li>Codelyzer can be run via angular cli or npm directly.</li>
              </ul>
              <br />

              <h3>5. Why should ngOnInit be used, if we already have a constructor</h3>
              <ul>
                <li>The Constructor is a default method of the class that is executed when the class is instantiated
                  and ensures proper initialization of fields in the class and its subclasses.</li>
                <li>ngOnInit is a life cycle hook called by Angular to indicate that Angular is done creating the
                  component.</li>
                <li>We use ngOnInit for all the initialization/ declaration in the constructor. The constructor should only be used to
                  initialize class members but shouldn't do actual "work". So you should use constructor() to setup Dependency Injection
                  and not much else. ngOnInit() is better place to "start" - it's where/ when components' bindings are resolved.</li>
              </ul>
              <br />

              <h3>6. How can you read full response</h3>
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

              <h3>7. How do you perform Error handling</h3>
              If the request fails reach the server due to network issues then HttpClient will return an error
              object instead of a successful reponse. In this case, need to handle in the component by passing error object as a second callback to subscribe() method.
              <div style={titles}>
                <PrismCode
                  code={performError}
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

export default (withStyles(styles)(AngularLifeCycle));
