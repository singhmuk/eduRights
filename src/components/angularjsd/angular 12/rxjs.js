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

const purejs = `
//html
<html>
  <script src="https://unpkg.com/@reactivex/rxjs@5.3.0/dist/global/Rx.js"></script>
  <body>
    <button>Click me</button>
    <script src="app.js"></script>
  </body>
</html>


//js
document.addEventListener('click', (event) => console.log(event));


//2
var button = document.querySelector('button');

Rx.Observable.fromEvent(button, 'click')
  .subscribe(
    (value) => console.log(value.clientX)
  );
`.trim();

const observables = `

`.trim();

const execs = `
var button = document.querySelector('button');

var observer = {
  next: function (value) {
    console.log(value);
  },
  error: function (error) {
    console.log(error);
  },
  complete: function () {
    console.log('Completed');
  }
};

//Rx.Observable.fromEvent(button, 'click')
var subscription = Rx.Observable.create(function (obs) {
  //obs.next('A value');
  //obs.error('Error');
  //setTimeout(function() {
  //	obs.complete();
  //  obs.next('A second value');
  //}, 2000);
  button.onclick = function (event) {
    obs.next(event);
  }
})
  .subscribe(observer);

setTimeout(function () {
  subscription.unsubscribe();
}, 5000);
`.trim();

const throttleTime = `
var observable = Rx.Observable.interval(1000);
var observer = {
  next: function (value) {
    console.log(value);
  }
};

observable.map(function (value) {
  return 'Number: ' + value;
}).throttleTime(1900).subscribe(observer);
`.trim();

const fixrxjs = `
var subject = new Rx.Subject();

subject.subscribe({
  next: function (value) {
    console.log(value);
  },
  error: function (error) {
    console.log(error);
  },
  complete: function () {
    console.log('Complete');
  }
});

subject.subscribe({
  next: function (value) {
    console.log(value);
  }
});

subject.next('A new data piece');
subject.complete();
subject.next('New value');
`.trim();

const filteringrxjs = `
var observable = Rx.Observable.interval(1000);

observable
  .filter(function (value) {
    return value % 2 == 0;
  })
  .subscribe({
    next: function (value) {
      console.log(value);
    },
    error: function (error) {
      console.log('Error: ', error);
    }
  });
`.trim();

const debounceTime = `
//html
<html>
  <script src="https://unpkg.com/@reactivex/rxjs@5.3.0/dist/global/Rx.js"></script>
  <body>
    <input type="text">
      <script src="app.js"></script>
  </body>
</html>


//js
var input = document.querySelector('input');
var observable = Rx.Observable.fromEvent(input, 'input');

observable
  .subscribe({
    next: function (event) {
      console.log(event.target.value);
    }
  });
  
  
  
//2
var input = document.querySelector('input');
var observable = Rx.Observable.fromEvent(input, 'input');

observable
  .map(event => event.target.value)
  .debounceTime(500)
  .distinctUntilChanged()
  .subscribe({
    next: function (value) {
      console.log(value);
    }
  });
`.trim();

const scan = `
var input = document.querySelector('input');
var observable = Rx.Observable.of(1, 2, 3, 4, 5);

observable
  .subscribe({
    next: function (value) {
      console.log(value);
    }
  });



//2
var observable = Rx.Observable.of(1, 2, 3, 4, 5);

observable
  .scan((total, currentValue) => {
    return total + currentValue;
  }, 0)
  .subscribe({
    next: function (value) {
      console.log(value);
    }
  });
`.trim();

const pluck = `
var input = document.querySelector('input');
var observable = Rx.Observable.fromEvent(input, 'input');

observable
  .subscribe({
    next: function (event) {
      console.log(event.target.value);
    }
  });


//2
var input = document.querySelector('input');
var observable = Rx.Observable.fromEvent(input, 'input');

observable
  .pluck('target', 'value')
  .debounceTime(500)
  .distinctUntilChanged()
  .subscribe({
    next: function (value) {
      console.log(value);
    }
  });
`.trim();

const mergeMap = `
//html
<body>
    <input type="text" id="input1">
      <input type="text" id="input2">
        <p>Combined value: <span></span></p>
        <script src="app.js"></script>
      </body>
      
      
//js
var input1 = document.querySelector('#input1');
var input2 = document.querySelector('#input2');

var span = document.querySelector('span');

var obs1 = Rx.Observable.fromEvent(input1, 'input');
var obs2 = Rx.Observable.fromEvent(input2, 'input');

obs1.mergeMap(
event1 => {
return obs2.map(event2 => event1.target.value + ' ' + event2.target.value)
      }
    ).subscribe(
    combinedValue => span.textContent = combinedValue
  );
`.trim();

const switchMaps = `
var button = document.querySelector('button');

var obs1 = Rx.Observable.fromEvent(button, 'click');
var obs2 = Rx.Observable.interval(1000);

obs1.switchMap(
  event => {
    return obs2
  }
).subscribe(
  (value) => console.log(value)
);
`.trim();

const BehaviorSubject = `
var clickEmitted = new Rx.Subject();
var button = document.querySelector('button');
var div = document.querySelector('div');

button.addEventListener('click', () => clickEmitted.next('Clicked!'));

clickEmitted.subscribe(
  (value) => div.textContent = value
);


//2
var clickEmitted = new Rx.BehaviorSubject('Not clicked');
var button = document.querySelector('button');
var div = document.querySelector('div');

button.addEventListener('click', () => clickEmitted.next('Clicked!'));

clickEmitted.subscribe(
  (value) => div.textContent = value
);
`.trim();

const map = `
import {Observable, interval} from 'rxjs';
import {map} from "rxjs/operators";

interval(1000).pipe(map(data => data * 2))
              .subscribe((data:number) => {
                console.log(data)
              });



//map
import {Observable, interval, Subscriber, pipe} from 'rxjs';
import {map} from "rxjs/operators";

function fetchUser(){
  const newObservable = new Observable((observer:Subscriber<unknown>) => {
    const user={
      data:{firstName: 'Sam', mob: 2345342290}
    }
    observer.next(user)
  });
  return newObservable.pipe(map(user)=>{
    return user.data
  })
}


fetchUser().Subscriber((user)=>{
  console.log(user)
})`.trim();

const filter = `
import {interval} from 'rxjs';
import {filter, map} from "rxjs/operators";

const observable = interval(100).pipe(filter(data=>{
  return data<5
}));

observable.subscribe(data => {
  console.log(data);
})
`.trim();

const switchMap = `
import {Observable} from 'rxjs';
import {switchMap} from "rxjs/operators";

function buySugarInBulk(){
  return new Observable(observer=>{
    observer.next('Suger Perchased');
  })
}

function getSuger(quantity){
  return new Observable((observer)=>{
    return observer.next('Suger ' +quantity+ 'for you' )
  })
}

function getSugarFromShop(quantity){
  return buySugarInBulk().pipe(switchMap(()=>{
    return getSuger(quantity);
  }));
}

getSugarFromShop('1Kg').subscribe(data=>{
  console.log(data);
});`.trim();

const concatMap = `
import {timer} from "rxjs";
import {concatMap, map} from "rxjs/operators";

const timer$ = timer(100, 500)
                .pipe(map(data => data + 'timer1'));

const timer2$ = timer(100, 500)
                .pipe(map(data => data + 'timer2'));

const observables = timer$.pipe(concatMap(timer1Data => {
                 return timer2$.pipe(map(data => data + timer1Data));
}))


observables.subscribe(data => console.log(data));`.trim();

const observableVsPromises = `
function isBreadAvailable(){
  return true;
}

function isAggAvailable(){
  return false;
}

function bringBread(){
  return new Promise((res, rej) =>{
    if(isBreadAvailable()) {
      res('Bread is Available');
    }
    else if(isAggAvailable){
      res('Agg is Available')
    }
    else{
      rej('Bread is bring')
    }
  })
}

bringBread().then((data)=>{
  console.log(data);
})
.catch(err => {
  console.log(err)
})`.trim();

const observableV = `
import {BehaviorSubject, timeout} from 'rxjs';

const data = ['A', 'B', 'C', 'D', 'E'];
const fm = new BehaviorSubject('First Data');

function changeSongs(){
  for(let song of data){
    fm.next(song);
  }
}


fm.subscribe((song:string)=>{
  console.log(song);
});

changeSongs();

setTimeout(()=>{
  fm.subscribe((song:string)=>{
  console.log(song);
});
},1000);`.trim();

const rxjxLibrary = `import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';`.trim();

const observableFun = `import { from } from 'rxjs'; // from function
const data = from(fetch('/api/endpoint')); //Created from Promise
data.subscribe({
 next(response) {console.log(response);},
 error(err) {console.error('Error: ' + err);},
 complete() {console.log('Completed');}
});`.trim();

const observableAJAX = `
import { ajax } from 'rxjs/ajax'; // ajax function
const apiData = ajax('/api/data'); // Created from AJAX request
// Subscribe to create the request
apiData.subscribe(res => console.log(res.status, res.response));`.trim();

const observableCount = `
import { interval } from 'rxjs'; // interval function
const secondsCounter = interval(1000); // Created from Counter value
secondsCounter.subscribe(n =>
  console.log('Counter value: '$'{n}'));`.trim();

const observableEvt = `
import { fromEvent } from 'rxjs';
const el = document.getElementById('custom-element');
const mouseMoves = fromEvent(el, 'mousemove');
const subscription = mouseMoves.subscribe((e: MouseEvent) => {
  console.log('Coordnitaes of mouse pointer: '$'{e.clientX} * '$'{e.clientY}');
  });`.trim();

const placeholders = `
//app.component.ts
import {PlaceholderService} from "./services/placeholder.service"

@Component({
  selector: 'app-root',
  template: '
  <button (click)="getApi()">GET</button>
    <div *ngFor="let items of data">
      <p>{{items.id}} - {{items.title}}</p>
    </div>
  ',
})

export class AppComponent implements OnInit{
  data:Array<any>;
  
  constructor( private https:PlaceholderService) { 
    this.data=new Array<any>()
   }

  ngOnInit(): void {}
  getApi(){
    this.https.getData().subscribe((data)=>{
      this.data=data
    })
  }
}


//services/placeholder.service.ts
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {

  constructor(private http:HttpClient) { }

  getData(): Observable<any>{
    const url="https://jsonplaceholder.typicode.com/posts";
    return this.http.get<any>(url)
  }
}
`.trim();


class Rxjs extends Component {
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
              <h3>Rxjs With Pure Js (Reactive Extension for JavaScript)</h3>
              <div style={titles}>
                <PrismCode
                  code={purejs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>RxJS OPERATORS LIKE map() OR throttleTime()</h3>
              <div style={titles}>
                <PrismCode
                  code={throttleTime}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>RxJS SUBJECT (~EventEmitter)</h3>
              <div style={titles}>
                <PrismCode
                  code={fixrxjs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>filter() OPERATOR</h3>
              <div style={titles}>
                <PrismCode
                  code={filteringrxjs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>debounceTime & distinctUntilChanged </h3>
              <div style={titles}>
                <PrismCode
                  code={debounceTime}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>scan() vs reduce()</h3>
              <div style={titles}>
                <PrismCode
                  code={scan}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>pluck()</h3>
              <div style={titles}>
                <PrismCode
                  code={pluck}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>mergeMap()</h3>
              <div style={titles}>
                <PrismCode
                  code={mergeMap}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>switchMap()</h3>
              <div style={titles}>
                <PrismCode
                  code={switchMaps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>BehaviorSubject</h3>
              <div style={titles}>
                <PrismCode
                  code={BehaviorSubject}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>What is RxJS With Angular</h3>
              RxJS is a library for composing asynchronous and callback-based code in a functional, reactive style using Observables. Many APIs such as HttpClient produce and consume RxJS Observables and also uses operators for processing observables.
              <div style={titles}>
                <PrismCode
                  code={rxjxLibrary}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>What are the utility functions provided by RxJS</h3>
              The RxJS library also provides below utility functions for creating and working with observables.
              <ul>
                <li>Converting existing code for async operations into observables</li>
                <li>Iterating through the values in a stream</li>
                <li>Mapping values to different types</li>
                <li>Filtering streams</li>
                <li>Composing multiple streams</li>
              </ul>
              <br />

              <h3>What are observable creation functions</h3>
              RxJS provides creation functions for the process of creating observables from things such as promises, events, timers and Ajax requests.
              <br />
              <b>1. Create an observable from a promise</b>
              <div style={titles}>
                <PrismCode
                  code={observableFun}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>2. Create an observable that creates an AJAX request</b>
              <div style={titles}>
                <PrismCode
                  code={observableAJAX}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>3. Create an observable from a counter</b>
              <div style={titles}>
                <PrismCode
                  code={observableCount}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>4. Create an observable from an event</b>
              <div style={titles}>
                <PrismCode
                  code={observableEvt}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>Map</h3>
              <ul>
                <li>map change observable value.</li>
                <li>map to transform a collection of items into a collection of different items.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={map}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Filter</h3>
              This operator takes values from the source Observable, passes them through a predicate function and only emits those values that get TRUE.
              <div style={titles}>
                <PrismCode
                  code={filter}
                  language="js"
                  plugins={["line-numbers"]}
                />
                <br />

                <h3>SwitchMap</h3>
                switchMap operator is basically a combination of two operators - switchAll and map. The map part lets you map a value from a higher-order source observable to an inner observable stream. When a new value arrives from a source observable, execute a map function that returns an inner observable.
                <div style={titles}>
                  <PrismCode
                    code={switchMap}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />

                <h3>concatMap</h3>

                <div style={titles}>
                  <PrismCode
                    code={concatMap}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />

                <h3>OservableVsPromises</h3>

                <div style={titles}>
                  <PrismCode
                    code={observableVsPromises}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />

                <h3>BehaviorSubject ObservableV:</h3>
                <div style={titles}>
                  <PrismCode
                    code={observableV}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
              </div>
              <br />

              <h3>Placeholders</h3>
              <div style={titles}>
                <PrismCode
                  code={placeholders}
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

export default (withStyles(styles)(Rxjs));
