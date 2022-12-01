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


const changeDetection = `
//1
import { Component, ChangeDetectorRef ,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '
  < button(click)="detech()"> detech</button>
    <button (click) = "reattach()"> reattach</button>
      <button (click) = "detect()"> detect</button>
        <br />
      {{count}}
  ',
  
  // changeDetection: ChangeDetectionStrategy.Default,
  changeDetection: ChangeDetectionStrategy.OnPush,  //count stop by this
})
export class AppComponent {
   count=0;
  constructor(private changeDR: ChangeDetectorRef){
    setInterval(() => {
      this.count++;
      this.changeDR.markForCheck();
    },1000)
  }

 detech(){
   //stop change detection
   this.changeDR.detach();
 }

 reattach(){
   //satrt change detection from stopping place
   this.changeDR.reattach();
 }

 detect(){
   //satrt change detection from continue increased place but count remain stop
   this.changeDR.detectChanges();
 }
}



//2 childs.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-childs',
  // changeDetection: ChangeDetectionStrategy.Default,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '
          {{data.name}} <br/>
          {{data.email}}
  '})
  
export class Child {
  @Input() data
}


//app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: '
    <app-childs [data]="parentVar"></app-childs>
    <button (click)="defaultStratgy()">default</button>
    <button (click)="defaultObj()">defaultObj</button>',
})
export class AppComponent {
  private parentVar: { name: string, email?: string }

  constructor(){
    this.parentVar = {
      name: "Mukesh",
      email: 'mukesh7@gmail.com'
    }
  }

  defaultStratgy(){
    this.parentVar.name="Rakesh";
  }

  defaultObj(){
    this.parentVar = {
      name: "Ritesh",
      email: "ritesh@gmail.com"
    }
  }
}`.trim();


class AngularSelector extends Component {
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
              <h3>1. JQuery</h3>
              <ul>
                <li>first install jquery as npm install jquery</li>
                <li>inside ./angular-cli.json file, find script, and include the path to jQuery as <br />
                  "script":["./node_moules/jquery/dist/jquery.min.js"]</li>
                <li><b>Note:</b> jQuery should be before bootstrap, if use both.</li>
              </ul>
              <br />

              <h3>2. Change Detection:</h3>
              <ul>
                <li>Means updating the DOM every time the data is changed.</li>
                <li>When modifying any of the models, Angular detects the changes and updates the views immediately. The purpose of this mechanism is to ensure that the underlying views are always synchronized with their corresponding models.</li>
              </ul>
              <br />
              <b>Angular provides two strategies for Change Detection:</b>
              <br />
              <b>1. default strategy:</b>
              <br />
              Every time you put or edit any data, Angular will run the change detector to update the DOM.
              <br />
              <br />
              <b>2. onPush strategy:</b>
              <ul>
                <li>It will be based only on the modification of the input references, some events activated by
                  themselves or one of his children. Do it with the <b>componentRef.markForCheck()</b> method.</li><br/>
                <li>With onPush, the component depends only on its inputs and covers immutability, the change detection 
                  strategy will be activated when:
                  <ul>
                    <li>The input reference changes;</li>
                    <li>An event originating from the member or one of his children;</li>
                    <li>Execute change detection explicitly <b>(componentRef.markForCheck ());</b></li>
                    <li>Use the async pipe in the view.</li>
                  </ul>
                  </li>
              </ul>
              <br />
              <ul>
                <li>In the onPush strategy, Angular only performs the change detector when a new reference to the data of @Input() is passed.</li>
              </ul>
              <ul>
                <li>Change Detection Mechanism-moves only forward and never looks back, starting from the root component to the last.
                  Each component points to a child, but the child does not point to a parent. One-way flow eliminates the need for
                  a <b>$digest loop</b>.</li>
              </ul>
              <br />

              <h3>Change Detection</h3>
              <div style={titles}>
                <PrismCode
                  code={changeDetection}
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

export default (withStyles(styles)(AngularSelector));
