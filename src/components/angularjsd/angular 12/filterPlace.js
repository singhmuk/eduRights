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

const filters = `
//html
<input type = "text" [(ngModel)] = "filterBy" (keyup) = "getUsers()">
  <div *ngFor="let user of filtersUser"> {{user.name}}</div>


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

const liveInput = `
//html
<input #box (keyup) = 'onKey(box.value)' >
  {{result}}

export class HomeComponent {
  values = '';
  result = '';

  onKey(value: string) {
    this.values=String(value).replace('a','');
    this.result =(this.values).replace('a','');
  }
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

class FilterPlace extends Component {
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
              <h3>Filter-jsonPlaceholder</h3>
              <div style={titles}>
                <PrismCode
                  code={filters}
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
    );
  }
}

export default withStyles(styles)(FilterPlace);
