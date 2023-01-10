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


const projection = `
@Component({
  selector: 'app-root',
  template: '
      {{data.name}}
      <ng-content></ng-content>
      ',
})
export class AppComponent {
  data={
    id:1,
    name:'Mukesh'
  }
}
`.trim();

const parentChild = `
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-childs [items]="data"></app-childs>',
})
export class AppComponent {
  data={
    id:1,
    name:'Mukesh'
  }
}


@Component({
  selector: 'app-childs',
  template: '{{items.id}}',
})
export class ChildsComponent {
  @Input() items:any
  constructor() { }
}
`.trim();

const childParent = `
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-childs (parentFun)="parentFun($event)"></app-childs>
  {{name}}
'})
export class AppComponent {
  title = 'childparrent';
  name = "";
  parentFun(data:any){
    console.log(data)
    this.name = data.name
  }
}


@Component({
  selector: 'app-childs',
  template: '<button (click)='sendData()'> CallParent</button>',
})
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

const counting = `
@Component({
  selector: 'app-root',
  template: '
  <button (click)="handleCount()"> Count</button>
    {{ count }}
<button (click) = "handleButton()"> Pause</button>',})

export class AppComponent {
  title = 'demo';
  count=0;
  isPause: true;

  handleCount(){
    if(this.isPause==true){
    this.count=this.count+1
    }
    else{
      this.count=this.count-1
    }
  }

  handleButton(){
    this.isPause = !this.isPause
  }
}`.trim();

const toggle = `
@Component({
  selector: 'app-root',
  template: '{{ toggle }}
<button (click) = "onToggle()"> Toggle</button>
    ',
})

export class AppComponent {
  toggle=false;

  onToggle(){
    this.toggle ? "ON" : "OFF";
    this.toggle = !this.toggle
  }
}`.trim();

const keyInput = `
@Component({
  selector: 'app-root',
  template: '
  <input type = "number" min = "0" max = "100"
  [value] = "progress">
        ',
      })

export class AppComponent {
  constructor() { }
  progress=0;
}`.trim();

const ifConditions = `
@Component({
  selector: 'app-root',
  template: '
{{hoursOfDay}}<br/>
    <button (click) = "checkTime()"> Check</button> <br/>
{{msg}}
',})

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
@Component({
  selector: 'app-root',
  template: '
  <button (click)="getInfo()">if</button>
    <div *ngIf="isTrue; else elseblock">
      {{data}}
    </div>
  <ng-template #elseblock>
    Else
  </ng-template>
  ',
})
export class AppComponent {
  data="If";
  isTrue=false

  getInfo(){
    this.isTrue = !this.isTrue
  }
}`.trim();

const ifElseThen = `
@Component({
  selector: 'app-root',
  template: '
  <button (click)="getInfo()"> click</button>
    <div *ngIf="isTrue; then thenblock else elseblock"> {{data}}</div>
    <ng-template #thenblock>
      Then
    </ng-template>
    <ng-template #elseblock>
      Else
    </ng-template>
  ',
})
export class AppComponent {
  data="If";
  isTrue=false

  getInfo(){
    this.isTrue = !this.isTrue
  }
}`.trim();

const switchCase = `
@Component({
  selector: 'app-root',
  template: '
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
  ',
})
export class AppComponent {
  selectedItems?: string;

  getValue(e){
    this.selectedItems = e.target.value
  }
}`.trim();


const pushSplice = `
@Component({
  selector: 'app-root',
  template: '
    <input type = "text" name = "" #uname><br/>
    <button (click) = "createUser(uname)">Create</button>


  <table>
    <tr *ngFor="let user of users; let i=index">
    <td>{{user.name}}</td>
    <button (click)="removeUser(i)">X</button>
      </tr>
    </table>
  '',
})
export class AppComponent {
  users = [];

  createUser(uname){
    this.users.push({
      name:uname.value
    })
  }

  removeUser(id){
    this.users.splice(id, 1)
  }
}`.trim();


class Projection12 extends Component {
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
              <h3>Content projection</h3>
              Content projection is a pattern in which we insert or project, the content which want to use inside another component. 
              <b>Ex.</b> We could have a Card component that accepts content provided by another component.
              <br/>
              <br/>
              The <b>ng-content</b> element is a placeholder that does not create a real DOM element. Custom attributes applied 
              to <b>ng-content</b> are ignored.
              <br/>
              <br/>
              <ul>
                <li>Is used to project content in a component.</li>
                <li>Allows to insert a shadow DOM in our component.</li>
                <li>In Angular, achieve content projection using <b>'ng-content'  '/ng-content' </b>.  You</li>
              </ul>
              <br/>

              <ol>
                <li>Single-slot content projection</li>
                <li>Multi-slot content projection</li>
                <li>Conditional content projection</li>
              </ol>
              <div style={titles}>
                <PrismCode
                  code={projection}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

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
              The @Output() decorator in a child component or directive allows data to flow from the child to the parent.
              <br />
              <br />
              The Child Component exposes an EventEmitter Property. This Property is adorned with the @Output decorator. When Child
              Component needs to communicate with the parent it raises the event. The Parent Component listens to that event and
              reacts to it.
              
              <div style={titles}>
                <PrismCode
                  code={childParent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Count Inc-Dec</h3>
              <div style={titles}>
                <PrismCode
                  code={counting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Toggle</h3>
              <div style={titles}>
                <PrismCode
                  code={toggle}
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
              <br />

              <h3>Push Splice</h3>
              <div style={titles}>
                <PrismCode
                  code={pushSplice}
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

export default (withStyles(styles)(Projection12));
