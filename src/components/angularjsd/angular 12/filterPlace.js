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


const filters = `
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


//app.component.ts
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  template: '
  <input type = "text" [(ngModel)] = "filterBy" (keyup) = "getUsers()">
    <div *ngFor="let user of filtersUser"> {{user.name}}</div>',  })


export class AppComponent  {
 users: any[];
 filtersUser: any[];
 filterBy;

 constructor(private http:HttpClient){}

 ngOnInit(){
   this.http.get('https://jsonplaceholder.typicode.com/users')
        .subscribe(user=>{
          this.users=user;
          this.filtersUser=[...this.users]
        })
 }
 getUsers(){
     this.filtersUser = [...this.users.filter(user => {
       user.name.includes(this.filterBy)})];
  }
}
`.trim();

const tempCon = `
@Component({
  selector: 'app-root',
  template:'
  <div>
  Celsius
  <input type = "number" [(ngModel)] = "c" (ngModelChange) = "onChange($event, 'c')" />
    Fahrenheit
    <input type = "number" [(ngModel)] = "f" (ngModelChange) = "onChange($event, 'f')" />
</div >
  '})

export class AppComponent {
   c = "";
   f = "";

   onChange(value: string | null, type: "c" | "f") {
    if (value === null) {
      this.c = "";
      this.f = "";
      return;
    }

    const temperature = Number(value);
    if (type === "c") {
      this.f = ((temperature * 9) / 5 + 32).toFixed(1);
    } else {
      this.c = (((temperature - 32) * 5) / 9).toFixed(1);
    }
  }
}`.trim();

const liveInput = `
//app.component.ts
@Component({
  selector: 'my-app',
  template: '
  <input #box (keyup) = 'onKey(box.value)' >
    {{result}}',
            })

export class HomeComponent {
  values = '';
  result = '';

  constructor() { }

  onKey(value: string) {
    this.values=String(value).replace('a','');
    this.result =(this.values).replace('a','');
  }
}
`.trim();

const agreeDis = `
//app.component.ts
@Component({
  selector: 'app-root',
  template: '
  <h3> Agree: {{agreed}}, Disagree: {{disagreed}}</h3>
    <app-voters *ngFor="let voter of voters"
    [name] = "voter"
      (voted) = "onVoted($event)" >
    </app-voters>
  '
})

export class AppComponent {
  agreed = 0;
  disagreed = 0;
  voters = ['Narco', 'Celeritas', 'Bombasto'];

  onVoted(agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
  }
}


//voters.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-voters',
  template: '
  <h4> {{name}}</h4>
    <button (click) = "vote(true)" [disabled] = "didVote"> Agree</button >
      <button (click) = "vote(false)" [disabled] = "didVote"> Disagree</button >
  '
})
export class VotersComponent {
  @Input()  name = '';
  @Output() voted = new EventEmitter<boolean>();
  didVote = false;

  vote(agreed: boolean) {
    this.voted.emit(agreed);
    this.didVote = true;
  }
}
`.trim();

const setname = `
//app.component.ts
@Component({
  selector: 'app-root',
  template: '
  <p> Master controls {{names.length}} names</p>
    <app-voters *ngFor="let name of names" [name] = "name"></app-voters>
        '})

export class AppComponent {
  names = ['Dr IQ', '   ', '  Bombasto  '];
}


//voters.component.ts
@Component({
  selector: 'app-voters',
  template: '<h4>{{name}}</h4>'
})

export class VotersComponent {
  @Input()
  get name(): string { return this._name; }
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }
  private _name = '';
}
`.trim();


const excell = `
//app.component.ts
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  template: '<div>
  <button (click) = "exportexcel()" > Export to Excel</button >

    <table id="excel-table">
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
      </tr>
      <tr *ngFor="let item of userList">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.username }}</td>
      <td>{{ item.email }}</td>
                  </tr>
                </table>
              </div>',})

export class AppComponent {
  fileName= 'ExcelSheet.xlsx';
  userList = [
    { "id": 1, "name": "Leanne", "username": "Bret", "email": "Sincere@april.biz" },
    { "id": 2,"name": "Ervin", "username": "Antonette", "email": "Shanna@melissa.tv" },
    { "id": 3,"name": "Clement","username": "Samantha","email": "Nathan@yesenia.net" },
    { "id": 4,"name": "Patricia","username": "Karianne","email": "Julianne@kory.org" },
    { "id": 5,"name": "Chelsey","username": "Kamren","email": "Lucio@annie.ca" }
  ]

  exportexcel(): void {
       /* table id is passed over here */
       let element = document.getElementById('excel-table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);

    }
}
`.trim();

const getData = `
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: '
  <div>
  Enter Name
<input type="text" [(ngModel)] ="searchTerm" (ngModelChange) ="onChange($event)" />

   <div *ngIf="searchedData">
    id: {{searchedData.id}}
    email: {{searchedData.email}}
   </div>
  <div *ngIf="searchTerm && !searchedData">
      No Results Found
    </div>
  </div>
  '})

  export class AppComponent {
  constructor(private http:HttpClient){}
  mockData:any =[];

  ngOnInit(){
    this.http.get('https://jsonplaceholder.typicode.com/users')
        .subscribe(val=>{
          this.mockData=val;
        })
  }
  searchTerm = "";
  searchedData?;

  onChange(value: string | null) {
    this.searchedData = this.mockData.find(
      ({name}) => name.toLowerCase() === value.toLowerCase()
    );
  }
}`.trim();


class FilterPlace extends Component {
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
              <h3>Get-jsonPlaceholder</h3>
              <div style={titles}>
                <PrismCode
                  code={getData}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Filter-jsonPlaceholder</h3>
              <div style={titles}>
                <PrismCode
                  code={filters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Temperature Converter</h3>
              <div style={titles}>
                <PrismCode
                  code={tempCon}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Live Input</h3>
              <div style={titles}>
                <PrismCode
                  code={liveInput}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Agree-Disagree</h3>
              <div style={titles}>
                <PrismCode
                  code={agreeDis}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>No Name Set</h3>
              <div style={titles}>
                <PrismCode
                  code={setname}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Export Excel</h3>
              <div style={titles}>
                <PrismCode
                  code={excell}
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

export default (withStyles(styles)(FilterPlace));
