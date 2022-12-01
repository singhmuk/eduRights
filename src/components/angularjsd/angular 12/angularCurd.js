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


const curd = `
//app.module.ts: import { FormsModule } from '@angular/forms';

//app.component.ts
export class AppComponent  {
  name = 'Angular';
  newEmployeeClick=false
  empl=[
    {id:1, name:'a', positions:'a'},
    {id:2, name:'b', positions:'a'},
    {id:3, name:'c', positions:'a'},
  ];

  constructor(){}
  ngOnInit(){}

  model:any={};
  model2:any={}

  addEmployee(){
    this.empl.push(this.model);
    this.model={}
  }

  saveButton(){
    this.newEmployeeClick=!this.newEmployeeClick;
  }

  deleteEmployee(i){
    this.empl.splice(i)
  }

  myValue;
  editEmployee(editEmpl){
    this.model2.name = this.empl[editEmpl].name;
    this.model2.positions = this.empl[editEmpl].positions
    this.myValue = editEmpl;

  }

  updateEmpl(){
    let editEmpl = this.myValue;
    for(let i=0; i<this.empl.length; i++){
      if(i == editEmpl){
        this.empl[i] = this.model2;
        console.log('ss', this.model2)
        this.model2 = {};
      }
    }
  }
}



//app.component.html
<p>Add Employee</p>
<div (click)="saveButton()">add</div>
<div *ngIf="newEmployeeClick">
  <form>
    <input type="text" id="name" name="name" [(ngModel)]="model.name" >
    <input type="text" id="positions" name="positions" [(ngModel)]="model.positions" >

    <button type="submit" (click)="addEmployee()">Save</button>
  </form>
</div>

<div *ngFor="let empls of empl; let i = index">
  {{empls.name}}
  {{empls.positions}}
<div>
  <button (click)="editEmployee(i)">E</button>
  <button (click)="deleteEmployee(i)">X</button>
</div>
</div>

<p>Edit Employee</p>
<form>
    <input type="text" id="name" name="name" [(ngModel)]="model2.name">
    <input type="text" id="positions" name="positions" [(ngModel)]="model2.positions">
  <button type="submit" (click)="updateEmpl()">Update</button>
</form>`.trim();



class AngularCurd12 extends Component {
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
              <h3>Curd</h3>
              <div style={titles}>
                <PrismCode
                  code={curd}
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

export default (withStyles(styles)(AngularCurd12));
