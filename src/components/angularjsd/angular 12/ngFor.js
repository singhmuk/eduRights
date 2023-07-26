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

const tempLocal = `
@Component({
  selector: 'app-root',
  template: '
    <input #inputInfo type = "text" name = "template" value = "property">
    <br/>
    <button (click) = "getInfo(inputInfo)"> Refrence Varriable</button>
  '})
export class AppComponent {
  getInfo(inputInfo){
    console.log(inputInfo)
    console.log(inputInfo.name)
  }
}`.trim();

const objects = `
@Component({
  selector: 'app-root',
  template: '
  <input(keyup)="onKey($event)">
    <p>{{values}}</p>
  '})

export class AppComponent {
  values = '';

  onKey(event: any) {
    this.values += event.target.value + ' | ';
  }`.trim();

const keyEvents = `
  @Component({
   selector: 'app-root',
   template: '
   <input #box (keyup.enter) = "onEnter(box.value)">
     <p>{{value}}</p>
   '})
 
 export class AppComponent {
   values = '';
 
   value = '';
   onEnter(value: string) { this.value = value; }
 }`.trim();

const onBlur = `
     <input #box
       (keyup.enter)="update(box.value)"
       (blur)="update(box.value)">
     <p>{{value}}</p>'})
 
 export class AppComponent {
   value = '';
   update(value: string) { this.value = value; }
 }
 `.trim();

class AngularFor extends Component {
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
              <h3>1. TrackBy with *ngFor</h3>
              <ul>
                <li>
                  The use of TrackBy it's a performance optimization and is
                  usually not needed by default. it use if running into
                  performance issues.
                </li>
                <li>
                  TrackBy help to track the items which have been added/ remove.
                </li>
                <li>
                  TrackBy function take 2 arguments first is index and second is
                  current item, return the unique identifier as a return
                  argument.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={trackBy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>
                4. Template/local reference variables: Access by id '#inputInfo'
              </h3>
              <div style={titles}>
                <PrismCode
                  code={tempLocal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>5. Get user input from the $event object:</h3>
              <div style={titles}>
                <PrismCode
                  code={objects}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>6. Key event filtering (with key.enter):</h3>
              bind to Angular's keyup.enter pseudo-event. Then Angular calls the
              event handler only when the user presses Enter.
              <div style={titles}>
                <PrismCode
                  code={keyEvents}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>7. On blur</h3>
              <div style={titles}>
                <PrismCode
                  code={onBlur}
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

export default withStyles(styles)(AngularFor);
