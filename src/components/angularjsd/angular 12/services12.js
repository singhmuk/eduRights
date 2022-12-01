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


const services = `
//service/calc.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  constructor() { }

  public add(...params: number[]): number {
    let result = 0;
    for (let val of params) {
        result += val;
    }
    return result;
  }
}


//app.component.ts
import { CalcService } from './service/calc.service';

@Component({
  selector: 'app-root',
  template: '
            <div style="text-align:center">
              Welcome to {{ title }}! Sum is {{sum}}
            </div>',
          })
          
export class AppComponent {
  title = 'app';
  sum: number = 0;
  constructor(calc:CalcService){
    this.sum = calc.add(1,2,3,4);
  }
}
`.trim();

const searchs = `
import { Component, Pipe } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '
    <input type = "text" [(ngModel)]="terms" placeholder="Serach any fields" />

    <table border="1">
      <tr>
        <th>Name</th>
        <th>Venue</th>
        <th>Date</th>
        <th>Timing</th>
        <th>Address</th>
      </tr>
      <tr *ngFor="let workshop of WorkShopData | search:terms">
      <td>{{workshop.name}}</td>
      <td>{{workshop.venue}}</td>
      <td>{{workshop.date | date:'dd/MM/yyyy'}}</td>
      <td>{{workshop.timing}}</td>
      <td>{{workshop.address}}</td>
      </tr>
    </table >
  ',})

export class AppComponent {
  terms="";

  WorkShopData=[
    {name:'test 1', venue:'venue 1', date:new Date(), timing:3, address:'Indore'},
    {name:'user', venue:'305 vijay nagar', date:new Date(), timing:5, address:'Ahmedabad'},
    {name:'Admin', venue:'test venue', date:new Date(), timing:3, address:'Delhi'},
    {name:'user 5', venue:'254561', date:new Date(), timing:3, address:'Bhopal'}
  ]
}


@Pipe({
  name: 'search'
})
export class SearchPipe {
  transform(value: any, args?: any): any {
    if(!args){
      return value;
    }
    return value.filter((val)=>{
      let rVal=(val.name.toLocaleLowerCase().includes(args)) || (val.venue.toLocaleLowerCase().includes(args)) ||
               (val.address.toLocaleLowerCase().includes(args));
      return rVal;
    })
  }
}
`.trim();


class Services extends Component {
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
              <h3>Services</h3>
              <div style={titles}>
                <PrismCode
                  code={services}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Search</h3>
              <div style={titles}>
                <PrismCode
                  code={searchs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              {/* <h3></h3>
              <div style={titles}>
                <PrismCode
                  code={empty}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div> */}
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(Services));
