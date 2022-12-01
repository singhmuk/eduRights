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


const creaditCard = `
//import CreditCardDirective in app.module.ts

import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[credit-card]'
})
export class CreditCardDirective {

  @HostBinding('style.border')
  border: string;

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\s+/g, '');
    if(trimmed.length > 16) {
      trimmed = trimmed.substr(0, 16);
    }
    let numbers = [];
    for(let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substr(i, 4));
    }
    input.value = numbers.join(' ');

    this.border = '';
    if(/[^\d]+/.test(trimmed)) {
      this.border = '1px solid red';
    }
  }
}


//app.component.ts
@Component({
  selector: 'app-root',
  template: '
  < div >
  <label>Credit Card Number
    <input
      name="credit-card"
      type="text"
      credit-card>
      </label>
    </div>
      ',
    })

export class AppComponent  {}
`.trim();


const debounce = `
//debounce-click.directive.ts
import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 500;
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject();
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.clicks.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}


//app.component.ts
@Component({
  selector: 'app-root',
  template: '
  <h1> Creating a Custom Debounce Click Directive in Angular</h1>
    {{count}}
      <br />
      <button (click) = "log()"> Regular Click</button>
      & nbsp;
<button appDebounceClick (debounceClick) = "log()" [debounceTime] = "700"> Debounced Click</button>
    ',
  })
export class AppComponent  {
   count = 0;

  log() {
    this.count++;
    console.log('Clicked!');
  }
}
`.trim();


const truncates = `
//truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): string {
    return value.length < limit
      ? value
      : value.slice(0, limit) + '...';
  }
}


//app.component.ts
@Component({
  selector: 'app-root',
  template: 
  <p> {{'this is a not so long string' | truncate}}</p>
    <p>{{'this is a not so long string' | truncate : 20}}</p>
      ',
    })

export class AppComponent  {}
`.trim();


const popUp = `
@Component({
  selector: 'app-root',
  template: '
  <button(click)="showAlert()"> show alert</button>
    <div *ngIf="isVisible">
      JWT copied to clipboard
</div>
'})

export class AppComponent  {
    public isVisible: boolean = false;

  showAlert() : void {
    if (this.isVisible) {
      return;
    }
    this.isVisible = true;
    setTimeout(()=> this.isVisible = false,2500)
  }
}`.trim();


class Debounce extends Component {
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
              <h3>1. Credit Card Input</h3>
              <div style={titles}>
                <PrismCode
                  code={creaditCard}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Debounce</h3>
              <ul>
                <li>This directive is used to help prevent duplicate actions.</li>
                <li>The Directive API is a particular way to add behavior to existing DOM elements or components. For our use case, we want to debounce or delay click events from occurring when an element is a click.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={debounce}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Truncates</h3>
              <div style={titles}>
                <PrismCode
                  code={truncates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. PopUp</h3>
              <div style={titles}>
                <PrismCode
                  code={popUp}
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

export default (withStyles(styles)(Debounce));
