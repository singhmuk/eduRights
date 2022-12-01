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


const dynamically = `
//in app.module.ts
entryComponents: [Child, StudentInfoComponent]


//childs.ts
@Component({
  selector: 'app-childs',
  template: 'Child'
})
export class Child {
  message: string;
  constructor() { }

  ngOnInit() {
    alert('Child Call', this.message);
  }
}


//student-info.ts
@Component({
  selector: 'app-student-info',
  template: 'Student',
})
export class StudentInfoComponent implements OnInit {
  message: string;
  constructor() { }

  ngOnInit() {
    alert('Student Called', this.message);
  }
}


//app.component.ts
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
  ComponentFactory } from '@angular/core';
import { Child } from './childs';
import { StudentInfoComponent } from './student-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})
export class AppComponent {
  componentRef: any;
  @ViewChild('loadComponent', {read: ViewContainerRef}) entry: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver) { }
  createComponent(Id: number) {
    this.entry.clear();
    if (Id == 1) {
      const factory = this.resolver.resolveComponentFactory(StudentInfoComponent);
      this.componentRef = this.entry.createComponent(factory);
    } else if (Id == 2) {
      const factory = this.resolver.resolveComponentFactory(Child);
      this.componentRef = this.entry.createComponent(factory);
    }
    this.componentRef.instance.message = "Called by appComponent";
  }
  destroyComponent() {
    this.componentRef.destroy();
  }
  data = [
    { "Id": 1, "Name": "Student Info" },
    { "Id": 2, "Name": "Parent Info" }
  ]
  selectName(id : number) {
    this.createComponent(id);
  }
}
`.trim();

const blocking = `
//app.component.ts
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'my-web-worker-app';
  selectedColour: string;
  result: any;
  colourArr = ['#9999ff', '#00aaff', '#008000', '#b33c00', '#663300', '#cc3399'];
  isBusy = false;
  cpuWorker: any;

  constructor() {
  }

  changeColor(color: string) {
    this.selectedColour = color;
  }

  cpuIntensiveWork() {
    this.isBusy = true;
    const start = new Date().getTime();
    let calResult = 0;
    for (let i = Math.pow(environment.baseNumber, 7); i >= 0; i--) {
      calResult += Math.atan(i) * Math.tan(i);
    };

    let elapsed = new Date().getTime() - start;
    const milliseconds = (elapsed % 1000) / 100;
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    this.result = {'TimeElapsed': ''$'{ minutes }m, '$'{ seconds }s, '$'{ milliseconds }ms', 'output': calResult};
    this.isBusy = false;
  }
}



//app.component.html
<div class="container pt-4 mt-4">
    <div class="row">
        <div class="col">
            <div class="row">
                <div id='colorDiv' [ngStyle]="{'background-color':selectedColour}"></div>
            </div>
            <div class="row">
                <span [style.color]=selectedColour>{{selectedColour}}</span>
            </div>
            <div class="row pt-4">
                <div class="dropdown show">
                    <a class="btn btn-primary btn-lg dropdown-toggle" role="button" id="dropdownMenuLink" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Pick colour
                        </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a *ngFor=" let colour of colourArr" (click)="changeColor(colour)" class="dropdown-item">
                            <div class="drpDwnItem" [style.background-color]=colour>
                                <span [style.color]=colour>{{colour}}</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="row">
                <button class="btn btn-primary btn-lg" (click)="cpuIntensiveWork()"> CPU Intensive Work
                        <i *ngIf="isBusy" class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
                </button>
            </div>
            <ng-container *ngIf="result">
                <div class="row pt-4">
                    <h1 class="display-4">{{result.TimeElapsed}}</h1>
                </div>
                <div class="row">
                    <h1 class="display-4">{{result.output}}</h1>
                </div>
            </ng-container>
        </div>
    </div>
</div>
`.trim();

const nonBlocking = `
//app.component.ts
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'my-web-worker-app';
  selectedColour: string;
  result: any;
  colourArr = ['#9999ff', '#00aaff', '#008000', '#b33c00', '#663300', '#cc3399'];
  isBusy = false;
  cpuWorker: any;

  constructor() {
    this.intializeWorker();
  }

  intializeWorker() {
    if (typeof Worker !== 'undefined') {
      if (!this.cpuWorker) {
        this.cpuWorker = new Worker('./worker/cpu.worker',
          { type: "module" });
      }
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your
      // program still executes correctly.
    }
  }

  cpuIntensiveWork() {
    this.cpuWorker.postMessage('Message from main thread.');
    // listen back from worker
    this.cpuWorker.addEventListener('message', ({data}) => {
      this.result = data;
    });
  }

  changeColor(color: string) {
    this.selectedColour = color;
  }
}


//app.component.html
<div class="container pt-4 mt-4">
    <div class="row">
        <div class="col">
            <div class="row">
                <div id='colorDiv' [ngStyle]="{'background-color':selectedColour}"></div>
            </div>
            <div class="row">
                <span [style.color]=selectedColour>{{selectedColour}}</span>
            </div>
            <div class="row pt-4">
                <div class="dropdown show">
                    <a class="btn btn-primary btn-lg dropdown-toggle" role="button" id="dropdownMenuLink" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Pick colour
                        </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a *ngFor=" let colour of colourArr" (click)="changeColor(colour)" class="dropdown-item">
                            <div class="drpDwnItem" [style.background-color]=colour>
                                <span [style.color]=colour>{{colour}}</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="row">
                <button class="btn btn-primary btn-lg" (click)="cpuIntensiveWork()"> CPU Intensive Work
                        <i *ngIf="isBusy" class="fa fa-spinner fa-spin fa-2x fa-fw"></i>
                </button>
            </div>
            <ng-container *ngIf="result">
                <div class="row pt-4">
                    <h1 class="display-4">{{result.TimeElapsed}}</h1>
                </div>
                <div class="row">
                    <h1 class="display-4">{{result.output}}</h1>
                </div>
            </ng-container>
        </div>
    </div>
</div>



//worker/cpu.worker.ts
import { environment } from "../../environments/environment";

addEventListener('message', ({data}) => {
  const result = cpuIntensiveWork();
  postMessage(result);
});

const cpuIntensiveWork = function () {
  const start = new Date().getTime();
  let calResult = 0;
  for (let i = Math.pow(environment.baseNumber, 7); i >= 0; i--) {
    calResult += Math.atan(i) * Math.tan(i);
  };

  let elapsed = new Date().getTime() - start;
  const milliseconds = (elapsed % 1000) / 100;
  const seconds = Math.floor((elapsed / 1000) % 60);
  const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
  const result = {'TimeElapsed': ''$'{ minutes }m, '$'{ seconds }s, '$'{ milliseconds }ms', 'output': calResult};
  return result;
}
`.trim();

const ViewContainerRef = `let componentRef = viewContainerRef.createComponent(componentFactory);`.trim();

class DynamicallyLoad extends Component {
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
              <br />
              
              <b>ViewContainerRef</b><br />
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
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={dynamically}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Web-Worker (Blocking UI)</h3>
              <div style={titles}>
                <PrismCode
                  code={blocking}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Web-Worker (Non-Blocking UI)</h3>
              <div style={titles}>
                <PrismCode
                  code={nonBlocking}
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

export default (withStyles(styles)(DynamicallyLoad));
