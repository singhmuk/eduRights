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


const loader = `
@Component({
  selector: 'app-root',
  template: '
  <button(click)="getResult()"> Get result</button>
    <div>
      <h2>Results</h2>
      <progress *ngIf="isLoading">Loading...</progress>
      <p *ngIf="results"> {{results | json}}</p >
      <p *ngIf="error"> Error: {{error | json}}</p >
    </div >
  '})

export class AppComponent  {
  results: any;
  error: any;
  isLoading: boolean;

  constructor(private http: HttpClient) {
  }

  getResult() {
    this.error = null;
    this.results = '';
    this.isLoading = true;
    this.http.get('https://jsonplaceholder.typicode.com/users',)
      .subscribe(
        (res) => {
          this.isLoading = false
          this.results = res;
        },
        (err) => {
          this.error = err;
        },
      )
  }
}
`.trim();


const dynamically = `
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'

@Component({
  selector: 'app-root',
  template: '
  < div[formGroup]="addForm" >
    <input type="checkbox" formControlName="items">
        {{addForm.value.items_value}}
		
				<button (click)="onAddRow()" *ngIf="addForm.get('rows')">add row</button>
				<div * ngFor="let row of addForm.get('rows')?.controls;let index = index;" >
  <button (click) = "onRemoveRow(index)" > Remove</button >
				</div >
	</div >

  <pre>{{ rows.value | json }}</pre>
  '})
export class AppComponent {
 addForm: FormGroup;
  rows: FormArray;

  constructor(private fb: FormBuilder) {

    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });

    this.rows = this.fb.array([]);
  }

  ngOnInit() {
    this.addForm.get("items").valueChanges.subscribe(val => {
      if (val === true) {
        this.addForm.get("items_value").setValue("yes");

        this.addForm.addControl('rows', this.rows);
      }
      if (val === false) {
        this.addForm.get("items_value").setValue("no");
        this.addForm.removeControl('rows');
      }
    });
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      name: null,
      description: null,
      qty: null
    });
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
  }
}`.trim();


const progress = `
@Component({
  selector: 'app-root',
  template: '
{{progress}}
<button (click) = "stop($event)" > Stop</button>
  '})
export class AppComponent {
  progress = 0;
  isStop = false;

  ngOnInit(){
    setInterval(()=>{
      if(!this.isStop && this.progress <99){
      this.progress = this.progress + 10
    }
    else{
      if(this.progress==100){
        this.progress=0
      }

      this.progress = this.progress
    }
    },1000)
  }

  stop(){
    this.isStop = !this.isStop
  }
}`.trim();


const pureImpure = `
// import Pure, Impure component in app.module.ts

@Pipe({name: 'purePipe'})
export class Pure   {
  transform(item){
    return item.value  * 2;
  }
}

@Pipe({
  name: 'impurePipe',
  pure: false
  })
export class Impure   {
  transform(item){
    return item.value   * 2;
  }
}

@Component({
  selector: 'app-root',
  template: '
  <h1> pure: {{Object | purePipe}}</h1>
     <h1>impure: {{Object | impurePipe}}</h1>
     <button (click) = 'fun()'> change data</button>
      '})

export class AppComponent  {
Object = {value: 1};
  fun() { this.Object.value++; }
}
`.trim();


class Loader extends Component {
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
              <h3>1. Loader</h3>
              <div style={titles}>
                <PrismCode
                  code={loader}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Dynamically Sdd Row</h3>
              <div style={titles}>
                <PrismCode
                  code={dynamically}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Progress Bar</h3>
              <div style={titles}>
                <PrismCode
                  code={progress}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Pure-Impure Pipe</h3>
              <div style={titles}>
                <PrismCode
                  code={pureImpure}
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

export default (withStyles(styles)(Loader));
