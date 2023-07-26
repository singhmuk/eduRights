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

const parentChild = `
//html of AppComponent.ts
<app-childs [items]="data"></app-childs>

export class AppComponent {
  data={ id:1, name:'Mukesh' }
}


//html of ChildsComponent.ts
{{items.id}}

export class ChildsComponent {
  @Input() items:any
  constructor() { }
}
`.trim();

const childParent = `
//html
 <app-childs (parentFun)="parentFun($event)"></app-childs>
  {{name}}

export class AppComponent {
  title = 'childparrent';
  name = "";
  parentFun(data:any){
    console.log(data)
    this.name = data.name
  }
}


//html
<button (click)='sendData()'> CallParent</button>

export class ChildsComponent {
@Output() parentFun:EventEmitter<any> = new EventEmitter()

  sendData(){
     let user = {
      name: "Mukesh",
      age: 30
    }
    this.parentFun.emit(user)
  }
}
`.trim();

const keyInput = `
//html
<input type = "number" min = "0" max = "100" [value] = "progress">

export class AppComponent {
  progress=0;
}`.trim();

const ifConditions = `
//html
{{hoursOfDay}}
<button (click) = "checkTime()"> Check</button> 
{{msg}}

export class AppComponent {
 hoursOfDay = 9;
 msg=""

 checkTime(){
   this.msg = this.hoursOfDay <12 ? "Good Morning" : "Keep on";
   this.hoursOfDay = this.hoursOfDay + 1;
 }
}
}`.trim();

const ifElse = `
//html
<button (click)="getInfo()">if</button>
  <div *ngIf="isTrue; else elseblock">
    {{data}}
  </div>
  <ng-template #elseblock>
    Else
  </ng-template>

export class AppComponent {
  data="If";
  isTrue=false

  getInfo(){
    this.isTrue = !this.isTrue
  }
}`.trim();

const ifElseThen = `
//html
<button (click)="getInfo()"> click</button>
  <div *ngIf="isTrue; then thenblock else elseblock"> {{data}}</div>
  <ng-template #thenblock>
    Then
  </ng-template>
  <ng-template #elseblock>
    Else
  </ng-template>


export class AppComponent {
  data="If";
  isTrue=false

  getInfo(){
    this.isTrue = !this.isTrue
  }
}`.trim();

const switchCase = `
//html
< select(change)="getValue($event)" >
    <option value="default">Select</option>
    <option value="laptop">Laptop</option>
    <option value="tv">TV</option>
    <option value="mobile">Mobile</option>
    <option value="machine">Machine</option>
  </select >

<div [ngSwitch] = "selectedItems">
    <p *ngSwitchCase="'laptop'"> Laptop</p>
    <p *ngSwitchCase="'tv'"> TV</p>
    <p *ngSwitchCase="'mobile'"> Mobile</p>
    <p *ngSwitchCase="'machine'"> Machine</p>
  </div >

    
export class AppComponent {
  selectedItems?: string;

  getValue(e){
    this.selectedItems = e.target.value
  }
}`.trim();

class Projection12 extends Component {
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
              <h3>Parent-Child</h3>
              <div style={titles}>
                <PrismCode
                  code={parentChild}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Child-Parent</h3>
              The @Output() decorator in a child component or directive allows
              data to flow from the child to the parent.
              <br />
              <br />
              The Child Component exposes an EventEmitter Property. This
              Property is adorned with the @Output decorator. When Child
              Component needs to communicate with the parent it raises the
              event. The Parent Component listens to that event and reacts to
              it.
              <div style={titles}>
                <PrismCode
                  code={childParent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Key-input</h3>
              <div style={titles}>
                <PrismCode
                  code={keyInput}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>If-Condition</h3>
              <div style={titles}>
                <PrismCode
                  code={ifConditions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>If-Else</h3>
              <div style={titles}>
                <PrismCode
                  code={ifElse}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>If-Else-Then</h3>
              <div style={titles}>
                <PrismCode
                  code={ifElseThen}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Switch</h3>
              <div style={titles}>
                <PrismCode
                  code={switchCase}
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

export default withStyles(styles)(Projection12);
