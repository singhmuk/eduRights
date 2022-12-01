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


const trackBy = `
trackByStudentID(index: number, student: any): string{
  return student.studentID;
}

template: '<div *ngFor="let emp of students; let i=index; let f=first; let o=odd;
            TrackBy: trackById">
            {{i}} - {{emp.name}} - {{f}} - {{o}}
          </div>
        <button (click) = "getMoreStudents()"> getStudets</button>
       ',})

export class AppComponent {
  students: any[];
  constructor(){
    this.students = [
    { "id": 1, "name": "Leanne", "username": "Bret", "email": "Sincere@april.biz" },
    { "id": 2,"name": "Ervin", "username": "Antonette", "email": "Shanna@melissa.tv" },
    { "id": 3,"name": "Clement","username": "Samantha","email": "Nathan@yesenia.net" },
    { "id": 4,"name": "Patricia","username": "Karianne","email": "Julianne@kory.org" },
    { "id": 5,"name": "Chelsey","username": "Kamren","email": "Lucio@annie.ca" }
  ]
  }

  getMoreStudents(): void{
    this.students = [
    { "id": 1, "name": "Leanne", "username": "Bret", "email": "Sincere@april.biz" },
    { "id": 2,"name": "Ervin", "username": "Antonette", "email": "Shanna@melissa.tv" },
    { "id": 3,"name": "Clement","username": "Samantha","email": "Nathan@yesenia.net" },
    { "id": 4,"name": "Patricia","username": "Karianne","email": "Julianne@kory.org" },
    { "id": 5,"name": "Chelsey","username": "Kamren","email": "Lucio@annie.ca" },
    { "id": 6,"name": "Chelsey6","username": "Kamren6","email": "Lucio6@annie.ca" }
  ]
  }

  trackById(index: number, students: any):string {
    return students.id
  }
}`.trim();


const ngFor = `
template: '<div *ngFor="let emp of employees; let i=index; let f=first; let o=odd">
            {{i}} - {{emp.name}} - {{f}} - {{o}}
           </div >',})

export class AppComponent {
  employees = [
    { "id": 1, "name": "Leanne", "username": "Bret", "email": "Sincere@april.biz" },
    { "id": 2,"name": "Ervin", "username": "Antonette", "email": "Shanna@melissa.tv" },
    { "id": 3,"name": "Clement","username": "Samantha","email": "Nathan@yesenia.net" },
    { "id": 4,"name": "Patricia","username": "Karianne","email": "Julianne@kory.org" },
    { "id": 5,"name": "Chelsey","username": "Kamren","email": "Lucio@annie.ca" }
  ]
}`.trim();


const iterates = `
//app.component.ts
import { HEROES } from './data';

@Component({
  selector: 'app-root',
  template: '<div *ngFor="let hero of data">
               <li>{{hero.name}}</li>
            </div>',
              })

export class AppComponent {
  data=HEROES

  OnInit(){
    console.log('ddddd', HEROES)
  }
}


//data.ts
export interface Hero {
  id: number;
  name: string;
}

export const HEROES: Hero[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
`.trim();

// const projection = ``.trim();



class AngularFor extends Component {
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
              <h3>1. TrackBy with *ngFor</h3>
              <ul>
                <li>The use of TrackBy it's a performance optimization and is usually not needed by default.
                  it use if running into performance issues.</li>
                <li>TrackBy help to track the items which have been added/ remove.</li>
                <li>TrackBy function take 2 arguments first is index and second is current item, return the unique identifier as
                  a return argument.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={trackBy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. ngFor - Local variables</h3>
              <li><b>index:</b> Used for provide the index for current element while itertion.</li>
              <li><b>First:</b> Return true if current element is first element in the itertion otherwise false.</li>
              <li><b>Last:</b> Return true if current element is last element in the itertion otherwise false.</li>
              <li><b>Even:</b> Return true if current element is even element based on index in the itertion otherwise false.</li>
              <li><b>Odd:</b> Return true if current element is odd element based on index in the itertion otherwise false.</li>
              <div style={titles}>
                <PrismCode
                  code={ngFor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Iterates</h3>
              <div style={titles}>
                <PrismCode
                  code={iterates}
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

export default (withStyles(styles)(AngularFor));
