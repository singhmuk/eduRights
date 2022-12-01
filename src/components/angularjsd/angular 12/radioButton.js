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


const radio = `
import { FormsModule } from '@angular/forms';

//app.component.ts
@Component({
  selector: 'my-app',
  template: '
    <div *ngFor="let season of seasons; let i = index">
    <input type="radio" id="season{{i}}" name="seasons" [value]="season" [(ngModel)]="chhose" />
      {{season}}
    </div >
    {{chhose}}',
            })

export class AppComponent {
  chhose: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
`.trim();


const showHide = `
@Component({
  selector: 'app-child',
  template: '
  <button (click)="handleBtn()">handle</button>
    <div *ngIf="isShow">
      {{name}}
    </div>',
})

export class ChildComponent implements OnInit {
  constructor() { }
  ngOnInit() {

  }
  isShow: false;
  name="Name"

  handleBtn(){
    this.isShow = !this.isShow
  }
}
`.trim();


const displays = `
import { FormsModule } from '@angular/forms';


//app.component.ts
export class AppComponent  {
  name = 'Angular';
  newEmployeeClick=false
  empl=[
    {id:1, name:'a', positons:'a'},
    {id:2, name:'b', positons:'a'},
    {id:3, name:'c', positons:'a'},
  ];

  constructor(){}
  ngOnInit(){}

  model:any={};
  model2:any={}

  addEmployee(){
    this.empl.push(this.model);
    this.model={}
  }

  addButton(){
    this.newEmployeeClick=!this.newEmployeeClick;
  }
}


//app.component.html
<p>Add Employee</p>
<div (click)="addButton()">add</div>
<div *ngIf="newEmployeeClick">
  <form>
    <input type="text" id="name" name="name" [(ngModel)]="model.name">
    <input type="text" id="positons" name="positons" [(ngModel)]="model.positons">

    <button type="submit" (click)="addEmployee()">Save</button>
  </form>
</div>

<div *ngFor="let empls of empl">
  {{empls.name}}
  {{empls.positons}}
</div>`.trim();


const version = `
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '
  <h2> Source code version</h2>
    <button (click) = "newMinor()"> New minor version</button>
      <button (click) = "newMajor()"> New major version</button>
        <app-voters [major] = "major"[minor] = "minor"></app-voters>
          '})

export class AppComponent {
  major = 1;
  minor = 23;

  newMinor() { this.minor++; }

  newMajor() {
    this.major++;
    this.minor = 0;
  }
}


@Component({
  selector: 'app-voters',
  template: '
          <li *ngFor="let change of changeLog"> {{change}}</li>
  '
})

export class VotersComponent {
  @Input() major = 0;
  @Input() minor = 0;
  changeLog: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    const log: string[] = [];
    
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      
      if (changedProp.isFirstChange()) {
        log.push('Initial value of '$'{propName} set to '$'{to}');
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push('$'{propName} changed from '$'{from} to '$'{to}');
      }
    }
    this.changeLog.push(log.join(', '));
  }
}

`.trim();

const launch = `
import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '
  <button (click)="start()"> start</button>
    {{seconds}}
    {{message}}
      ',
    })
  
export class AppComponent { 
  invalidId=0;
  message="";
  seconds=10;
  
  start(){
    setInterval(()=>{
      this.seconds -= 1;
      if(this.seconds==0){
        this.message = 'Blast off!'
      }
      else{
        if (this.seconds < 0) {this.seconds = 10;} 
        this.message = 'Holding at T - '$'{this.seconds} seconds';
      }
    },1000)
  }
}
`.trim();

const changeFonts = `
@Component({
  selector: 'app-root',
  template: '
  <button (click)="dec()">Smaller</button>
    <button (click) = "inc()"> Bigger</button>
      <label [style.font-size.px] = "fontSize"> {{fontSize}}px</label>
        ',
      })

export class AppComponent {
  constructor() { }
  fontSize = 16;

  resize(delta: number){
    this.fontSize = Math.min(40, Math.max(8, +this.fontSize + delta))
  }

  dec(){ this.resize(-1)}

  inc(){ this.resize(+1)}
}`.trim();


class RadioButton12 extends Component {
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
              <h3>Radio</h3>
              <div style={titles}>
                <PrismCode
                  code={radio}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Show Hide</h3>
              <div style={titles}>
                <PrismCode
                  code={showHide}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Add Input</h3>
              <div style={titles}>
                <PrismCode
                  code={displays}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Version</h3>
              <div style={titles}>
                <PrismCode
                  code={version}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Launch</h3>
              <div style={titles}>
                <PrismCode
                  code={launch}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Change Font</h3>
              <div style={titles}>
                <PrismCode
                  code={changeFonts}
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

export default (withStyles(styles)(RadioButton12));
