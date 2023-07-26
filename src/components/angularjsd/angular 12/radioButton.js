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

const radio = `
//html
<div *ngFor="let season of seasons; let i = index">
<input type="radio" id="season{{i}}" name="seasons" [value]="season" [(ngModel)]="chhose" />
  {{season}}
</div >
  {{chhose}}

export class AppComponent {
  chhose: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
`.trim();

const changeFonts = `
//html
<button (click)="dec()">Smaller</button>
<button (click) = "inc()"> Bigger</button>
<label [style.font-size.px] = "fontSize"> {{fontSize}}px</label>
    

export class AppComponent {
  constructor() { }
  fontSize = 16;

  resize(delta: number){
    this.fontSize = Math.min(40, Math.max(8, +this.fontSize + delta))
  }

  dec(){ this.resize(-1)}

  inc(){ this.resize(+1)}
}`.trim();

const cusDirectives = `
//html
<button bgColorChange>Change background color!</button>


import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[bgColorChange]',
})
export class ChildComp {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red');
  }
}
`.trim();

const arrValidates = `
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; in app.module.ts

//html
<div [@fadeIn]>Element will fade in when added to the DOM</div>


import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  animations: [
    trigger('fadeIn', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition(':enter', [
        animate(
          '500ms ease-in-out',
          style({
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class AppComponent {}
`.trim();

class RadioButton12 extends Component {
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
              <h3>Radio</h3>
              <div style={titles}>
                <PrismCode
                  code={radio}
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
              <br />
              <h3>
                Create a custom directive in Angular that changes the background
                color of an element on click.
              </h3>
              <div style={titles}>
                <PrismCode
                  code={cusDirectives}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>
                Use Angular animations to create a fade-in effect on a
                component.
              </h3>

              <div style={titles}>
                <PrismCode
                  code={arrValidates}
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

export default withStyles(styles)(RadioButton12);
