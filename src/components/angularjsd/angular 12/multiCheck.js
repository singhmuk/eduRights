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


const mulSelects = `
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: '
    <li *ngFor="let item of list">
    <input type="checkbox" [(ngModel)] = "item.checked">
      {{item.name}}
    </li>
  {{this.result | json}}
    ',
})

export class AppComponent {
  list: any[];

  constructor(private http: HttpClient){}
  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/users')
        .subscribe(val => {
          this.list = val
        })
    }

  get result() {
    return this.list.filter(item => item.checked);
  }

}
`.trim();

const multiCheck = `
//in app.module => import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: '
  < form[formGroup]="form"(ngSubmit) = "submit()" >
    <div * ngFor="let web of websiteList" >
      <input type="checkbox" [value] = "web.id"(change) = "onCheckboxChange($event)" />
        {{web.name}}
      </div >

  <button type="submit" [disabled] = "!form.valid"> Submit</button>
    </form>
',})

export class AppComponent {
 form: FormGroup;
  websiteList: any = [
    { id: 1, name: 'ItSolutionStuff.com' },
    { id: 2, name: 'HDTuto.com' },
    { id: 3, name: 'NiceSnippets.com' }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      website: this.formBuilder.array([], [Validators.required])
    })
  }

  onCheckboxChange(e) {
    const website = this.form.get('website') as FormArray;

    if (e.target.checked) {
      website.push(new FormControl(e.target.value));
    } else {
       const index = website.controls.findIndex(x => x.value === e.target.value);
       website.removeAt(index);
    }
  }

  submit(){
    console.log(this.form.value);
  }
}
`.trim();

const dropdawn = `
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: '
  <select #select (change) = "onChange()">
    <option>Select</option>
      <option *ngFor="let item of this.dataList; let i = index"
              value = "{{item.name}}" [selected] = "i == 0">
        {{item.name}}
      </option >
    </select >
  ',})

export class AppComponent {
  dataList: Array<any> = [];
  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.http.get('https://jsonplaceholder.typicode.com/users')
        .subscribe(val => {
          this.dataList = val
        })
    }

  onChange(){
    console.log('sss', this.dataList)
  }
}`.trim();

const dropForm = `
import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  template: '
  <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
    <select (change) = "changeCity($event)" formControlName="cityName">
              <option value="">Choose your city</option>
              <option *ngFor="let city of City" [ngValue]="city">{{city}}</option>
            </select>

            < !--error block-- >
  <div *ngIf="isSubmitted && cityName.errors?.required">
    Please enter your city name
  </div>

  <button type="submit">Submit</button>
      </form >',
})

export class AppComponent {
  isSubmitted = false;
  City: any = ['Florida', 'South Dakota', 'Tennessee', 'Michigan']

  constructor(public fb: FormBuilder) { }

  //Form
  registrationForm = this.fb.group({
    cityName: ['', [Validators.required]]
  })

  changeCity(e) {
    console.log(e.value)
    this.cityName.setValue(e.target.value)
  }

  get cityName() {
    return this.registrationForm.get('cityName');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.registrationForm.value))
    }
  }
}`.trim();

const currTime = `
@Component({
  selector: 'app-root',
  template: '{{ time }}',
})

export class AppComponent {
  time='';
  ngOnInit(){
    setTimeout(()=>{
      this.time = new Date().toLocaleTimeString();
    },1000)
  }
}`.trim();


const pipes = `
@Component({
  selector: 'app-root',
  template: '
    <div> {{product | json}}</div>
    <div>Birthdate: {{(product?.birthdate | date:'longDate') | uppercase}}</div>
    <label>Price: </label>{{product.price | currency: 'USD': 'symbol'}}
  ',
})

export class AppComponent {
  product = {
    name: 'frimfram',
    price: 42,
    birthdate:  new Date(1970, 1, 25)
  };
}`.trim();

const currency = `
@Component({
  selector: 'app-root',
  template: '
      <div>{{money | currency: 'JPY': 'symbol'}}</div >
      <div>{{money | currency:'USD':'symbol'}}</div>
      <div>{{money | currency:'INR':'symbol'}}</div>
      <div>{{money | currency:'JPY':'' }}円</div>
    ',
})

export class AppComponent {
	money = 1980;
}`.trim();

const switching = `
interface name{
  name:string;
  city:string;
  state:string;
  country:string;
  street:string;
}

function address(obj:name){
  switch(obj.name){
    case 'Mukesh':
      console.log(obj.name)
    case 'Gr. Noida':
      console.log(obj.city)
    case 'UP':
      console.log(obj.state)
    case 'India':
      console.log(obj.country)
    case 'Sanjay Vihar':
      console.log(obj.street)
    break;
    default:
      console.log('Sorry')
  }
}

const obj2={name:'Mukesh', city:'Gr. Noida', state:'UP', country:'India',street:'Sanjay Vihar'};
address(obj2)
}`.trim();



class MultiCheck extends Component {
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
              <h3>Multi Select</h3>
              <div style={titles}>
                <PrismCode
                  code={mulSelects}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>MultiCheck</h3>
              <div style={titles}>
                <PrismCode
                  code={multiCheck}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Dropdown</h3>
              <div style={titles}>
                <PrismCode
                  code={dropdawn}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <h3>Dropdown Form</h3>
              <div style={titles}>
                <PrismCode
                  code={dropForm}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Current Time</h3>
              <div style={titles}>
                <PrismCode
                  code={currTime}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Pipes</h3>
              <div style={titles}>
                <PrismCode
                  code={pipes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Currency converter</h3>
              <div style={titles}>
                <PrismCode
                  code={currency}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Switch case</h3>
              <div style={titles}>
                <PrismCode
                  code={switching}
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

export default (withStyles(styles)(MultiCheck));
