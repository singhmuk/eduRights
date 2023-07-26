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

const dropdowns = `
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: '
    <div *ngFor="let hero of heroes" (click)="onSelect(hero)">
      {{hero.id}}
      {{hero.name}}
    </div >

  <div *ngIf="selectedHero">
    <h2>{{selectedHero.name | uppercase}}</h2>
      id: {{selectedHero.id}}
      name: {{selectedHero.name}}
    </div >',
  })

export class AppComponent {
  constructor(private http: HttpClient){}

  heroes:any=[]
  ngOnInit(){
    this.http.get('https://jsonplaceholder.typicode.com/users')
        .subscribe(val=>{
            this.heroes = val
        })
      }

  selectedHero?;
  onSelect(hero):void {
     this.selectedHero = hero
  }
}

`.trim();

class DropDownAngular extends Component {
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
              <h3>Pick a data from list</h3>
              <div style={titles}>
                <PrismCode
                  code={dropdowns}
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

export default withStyles(styles)(DropDownAngular);
