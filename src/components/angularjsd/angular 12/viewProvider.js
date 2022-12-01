import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';
import Theata from '../../../assets/customElement.png';
import CustomElement from '../../../assets/create.png';


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


const myProvider = `
export class MyProvider{
  constructor(){
    console.log('myProvider called')
  }
  varProvider = "varProvider";
}

export class MyProvider2{
  constructor(){}
  varProvider2 = "varProvider2";

  getString(str){
    console.log('myProvider called2', str)
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  viewProviders: [MyProvider, MyProvider2]
})
export class AppComponent {
  constructor(public obj:MyProvider, public obj2:MyProvider2){
    obj2.getString('Mukesh')
    console.log(obj.varProvider);
    console.log(obj2.varProvider2);
  }
}`.trim();


const viewChild = `
//childs.ts
import { Component } from '@angular/core';
@Component({
  selector: 'app-childs',
  template: '
Username: {{username}}
      <br/>
    <button (click) = "clickMe()"> click</button>
  '
})
export class Child {
  username="default Value"
  clickMe(){
    alert(this.username)
  }
}


//viewChild_2.ts
import { Component, ViewContainerRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-root',
  template: '
  < button(click)="show()"> Show</button>
    <div id="layout" *ngIf="display">
      <div #contentPlaceholder></div>
</div >
  '
})
export class AppComponent {
  display = false;
    @ViewChild('contentPlaceholder', {read: ViewContainerRef}) viewContainerRef;

    show() {
        this.display = true;
        console.log(this.viewContainerRef); // undefined
        setTimeout(()=> {
            console.log(this.viewContainerRef); // OK
        }, 1);
    }
}


//app.component.ts
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Child } from './childs';

@Component({
  selector: 'app-root',
  template: '<div #box>
  <p>{{username}}</p>
</div>
<div>
  <button (click)="changeProperty()">Change Child Property</button>
  <button (click)="changeMethod()">Change Child Method</button>
</div>

<app-childs></app-childs>'
})

export class AppComponent implements OnInit {
  username="username";
  @ViewChild('box', {static: false}) box:ElementRef
  constructor(){}

  ngOnInit(){ }
  ngAfterViewInit(){
    // console.log(this.box);
    // this.box.nativeElement.style.backgroundColor="blue";
    // this.box.nativeElement.classList="viewChild accept class";
    // this.box.nativeElement.innerHTML="Can change innerHTML value";

    console.log(this.child)
  }

  @ViewChild(Child, {static: false}) child:Child;
  changeProperty(){
    this.child.username = "Mukesh"
  }

  changeMethod(){
    this.child.clickMe()
  }
}`.trim();




class AngularDir extends Component {
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
              <h3>1. ViewProvider</h3>
              <p>
                viewProviders property allows us to make providers available only for the component’s view.
                When we want to use a class in our component that is defined outside the @Component () decorator function, then, first of all, we need to inject this class into our component, and we can achieve this with the help of the "viewProvider" property of a component.
              </p>

              <div style={titles}>
                <PrismCode
                  code={myProvider}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Providers have services list which use by component.</h3>
              If component need any service than it ask to injector not to Promises, Injector will create that service by getting blue-print from Promises, But if injector have that service instance than directly provide to component.
              <br />
              <br />

              <h3>2. ViewChild</h3>
              ViewChild is a decorator for Angular component variables, which allow to bind child component data and method.
              <br />
              <ul>
                <li>are used for component communication. If a parent component want to access child
                  component then use ViewChild. Any component, directive or element which is part of a template
                  is ViewChild.</li>
                <li>ViewChild() decorator can be used to get the first element or directive matching the selector
                  from the view DOM. @ViewChild() provides the instance of another component or directive in a
                  parent component and then parent component can access the method and properties of that
                  component or directive.</li>
              </ul>
              <br />
              Use @ViewChild with ElementRef or TemplateRef.
              <br />

              <div style={titles}>
                <PrismCode
                  code={viewChild}
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

export default (withStyles(styles)(AngularDir));
