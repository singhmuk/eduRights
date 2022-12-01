import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';
import Ngrx from '../../../assets/ngrx.png';


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


const actions = `
//user-action.ts
import {User} from '../models/user';

export const USER_LIST_REQUEST = 'user list request';
export const USER_LIST_SUCCESS = 'user list success';
export const USER_DELETE = 'user delete';
export const USER_UPDATE = 'user update';
export const USER_ADD = 'user add';
export const USER_LIST_ERROR = 'user list error';

export class UserListRequestAction {
  readonly type = USER_LIST_REQUEST;
}

export class UserDeleteAction {
  readonly type = USER_DELETE;

  constructor(public payload?: { id: number }) {
  }
}

export class UserUpdateAction {
  readonly type = USER_UPDATE;

  constructor(public payload?: { data: User }) {
  }
}

export class UserAddAction {
  readonly type = USER_ADD;

  constructor(public payload?: { data: User }) {
  }
}

export class UserListErrorAction {
  readonly type = USER_LIST_ERROR;
}

export class UserListSuccessAction {
  readonly type = USER_LIST_SUCCESS;

  constructor(public payload?: { data: User[] }) {
  }
}



//index.ts
import {Action as NgRxAction} from '@ngrx/store';

export interface Action extends NgRxAction {
  payload?: any;
}`.trim();

const reducers = `
//user-reducer.ts
import {User} from '../models/user';
import {Action} from '../actions';
import {USER_ADD, USER_DELETE, USER_LIST_ERROR, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_UPDATE} 
        from '../actions/user-action';
import {StoreUtility} from '../utils/store-utility';
import {createSelector} from '@ngrx/store';

export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: { [id: number]: User };
  ids: number[];
}

const initialState: UserReducerState = {
  loaded: false,
  loading: false,
  error: false,
  entities: {},
  ids: []
};

export function UserReducer(state = initialState, action: Action): UserReducerState {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return {...state, loading: true};
    }
    case USER_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter(elem => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      return {...state, ...{entities: newEntities, ids: newIds}};
    }
    case USER_UPDATE: {
      const user = action.payload.data;
      const entity = {[user.id]: user};
      const updatedEntities = {...state.entities, ...entity};
      return {...state, ...{entities: updatedEntities}};
    }
    case USER_ADD: {
      const user = action.payload.data;
      const entity = {[user.id]: user};
      const newEntities = {...state.entities, ...entity};
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, user.id]);
      return {...state, ...{entities: newEntities, ids: newIds}};

    }
    case USER_LIST_ERROR: {
      return {...state, error: true, loading: false};
    }
    case USER_LIST_SUCCESS: {
      const users = action.payload.data;
      const obj = StoreUtility.normalize(users);
      const newEntities = {...state.entities, ...obj};
      const ids = users.map(user => user.id);
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, ...ids]);
      return {
        ...state, ...{
          loaded: true,
          loading: false, error: false,
          entities: newEntities, ids: newIds
        }
      };
    }
    default: {
      return state;
    }
  }
}

// selectors
export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getEntities = (state: UserReducerState) => state.entities;
export const getIds = (state: UserReducerState) => state.ids;
export const getUsers = createSelector(getEntities,
  (entities) => StoreUtility.unNormalized(entities));
export const getError = (state: UserReducerState) => state.error;



//index.ts
import * as fromUser from './user-reducer';
import {ActionReducerMap, createSelector} from '@ngrx/store';


export interface RootReducerState {
  users: fromUser.UserReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromUser.UserReducer,
};

export const getUserState = (state: RootReducerState) => state.users;

export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);
export const getUserLoading = createSelector(getUserState, fromUser.getLoading);
export const getUserEntities = createSelector(getUserState, fromUser.getEntities);
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUserError = createSelector(getUserState, fromUser.getError);

export const getUserById = (state: RootReducerState, id: number) => {
  const entities = getUserEntities(state);
  return entities[id];
};

export const getPostById = (state: RootReducerState, id: number) => {
  const entities = getUserEntities(state);
  return entities[id];
};`.trim();

const services = `
//api.service.ts
import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {
  }

  getAllUser(): Observable<User[]> {
    return this.httpService.get('/users')
      .pipe(map(data => data as User[]));
  }

  getUser(id: number): Observable<User> {
    return this.httpService.get('/users/' + id);
  }
}



//http.service.ts
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  AUTH_TOKEN = 'auth_token';

  constructor(private httpClient: HttpClient) {
  }

  get(url: string, params?: any): Observable<any> {
    const data = {params, headers: this.getAuthHeader()};
    return this.httpClient
      .get(this.baseUrl + url, data).pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(response: any) {
    const error = response.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message = error[key];
    if (response.status === 401) {
      
    }
    if (error[key] instanceof Array) {
      message = error[key][0];
    }
    if (key === 'isTrusted') {
      // this will occur when not connected to internet
    } else {
      message = key + ' : ' + message;
    }
    // call snackbar and show error with message
    return throwError({messages: message, error});
  }

  private getAuthHeader(): { [header: string]: string | string[]; } {
    return {
      Authorization: 'Bearer '$'{ localStorage.getItem(this.AUTH_TOKEN)}'
    };
  }
}



//youtube-repository.ts
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  getUserById,
  getUserError,
  getUserLoaded,
  getUserLoading,
  getUsers,
  RootReducerState
} from '../reducers';
import {combineLatest, Observable} from 'rxjs';
import {
  UserAddAction,
  UserDeleteAction,
  UserListErrorAction,
  UserListRequestAction,
  UserListSuccessAction,
  UserUpdateAction
} from '../actions/user-action';
import {ApiService} from './api.service';
import {User} from '../models/user';
import {take} from 'rxjs/operators';


@Injectable()
export class YoutubeRepository {
  constructor(private store: Store<RootReducerState>, private apiService: ApiService) {
  }

  getUserList(force = false): [Observable<boolean>, Observable<User[]>, Observable<boolean>] {
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData$ = this.store.select(getUsers);
    const getError$ = this.store.select(getUserError);
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      if ((!data[0] && !data[1]) || force) {
        this.store.dispatch(new UserListRequestAction());
        this.apiService.getAllUser().subscribe(res => {
          this.store.dispatch(new UserListSuccessAction({data: res}));
        }, error => {
          this.store.dispatch(new UserListErrorAction());
        });
      }
    });
    return [loading$, getUserData$, getError$];
  }

  deleteUser(id: number) {
    // first we will call actual delete api
    this.store.dispatch(new UserDeleteAction({id}));
  }

  updateUser(data: User) {
// first send details to actual api
    this.store.dispatch(new UserUpdateAction({data}));
  }

  addUser(data: User) {
    // first call api to add a user and then update it in store
    this.store.dispatch(new UserAddAction({data}));
  }

  getUserById(id: number, force = false) {
    // get user from reducer if exist otherwise from api
    const user$ = this.store.select(state => getUserById(state, id));
    user$.pipe(take(1)).subscribe(res => {
      if (force || !res) {
        return this.apiService.getUser(id).subscribe(data => {
          this.store.dispatch(new UserAddAction({data}));
        });
      }
      return res;
    });
    return user$;
  }
}`.trim();

const utils = `
//store-utility.ts
export class StoreUtility {
  // [{id,...},{id,..}] -> normal array
  // entities: {id:{}} -> normalized format
  static normalize(entityArray: Entity[]) {
    return entityArray.reduce((previousValue, currentValue) => {
      return {...previousValue, ...{[currentValue.id]: currentValue}};
    }, {});
  }

  // {dsdsd:{id:dsdsd,name:"dasds"}}; -> entities
  // [{id:dsdsd,name:"dasds"}];
  static unNormalized(entities: { [id: number]: any }) {
    if (!entities) {
      return [];
    } else {
      return Object.keys(entities).map(key => entities[key]);
    }
  }

  // [1,2,3,4,5,1];
  static filterDuplicateIds(ids: number[]) {
    return ids.filter((elem, index, self) => index === self.indexOf(elem));
  }

  static removeKey(entities: { [id: number]: any }, id: any) {
    const newObj = {...entities};
    delete newObj[id];
    return newObj;
  }
}

interface Entity {
  id: any;
}`.trim();

const models = `
//user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  username: string;
}

interface Address {
  street: string;
  suite: string;
  'city': string;
  'zipcode': string;
  geo: Geo;
}

interface Geo {
  'lat': string;
  'lng': string;
}`.trim();

const containers = `
//users.component.ts
import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/user';
import {YoutubeRepository} from '../services/youtube-repository';
import {takeWhile} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {UpdateUserComponent} from '../components/update-user.component';

@Component({
  selector: 'youtube-users',
  template: '
  < div >
  <youtube-user-list * ngIf="!this.loading && !this.error"[users] = "this.users" ></youtube - user - list >
    <mat-spinner * ngIf="this.loading" ></mat - spinner >
      <button * ngIf="!this.loading && !this.error"(click) = "addUser()" > Add User</button >
    </div >
  ',
})

export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  error = false;
  isAlive = true;

  constructor(private youtubeRepository: YoutubeRepository, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchData() {
    const observer$ = this.youtubeRepository.getUserList();
    const userData$ = observer$[1];
    const loading$ = observer$[0];
    const error$ = observer$[2];
    userData$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.users = data;
    });
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.loading = data;
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.error = data;
    });
  }

  tryAgain() {
    this.youtubeRepository.getUserList(true);
  }

  addUser() {
    this.dialog.open(UpdateUserComponent, {
    });
  }
}


// reducer -> it contain a state (global state)
// it will take an action -> it will return a new state

// action -> it will contain a payload and a type

// Dependency Injection Principle
// you should not depend on something directly
// component -> youtube repo -> apiService -> http Service -> http client



//view-user.component.ts
import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {YoutubeRepository} from '../services/youtube-repository';
import {filter, map, switchMap, takeWhile} from 'rxjs/operators';
import {User} from '../models/user';

@Component({
  selector: 'youtube-view-user',
  template: '
    <h1> {{ this.user ?this.user.email: ''}}</h1>
    <h1>{{ this.user ? this.user.name : '' }}</h1>
',
})

export class ViewUserComponent implements OnDestroy {
  isAlive = true;
  user: User;

  constructor(private route: ActivatedRoute, private youtubeRepo: YoutubeRepository) {
    this.fetchData();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchData() {
    const user$ = this.route.params.pipe(map(data => data.id),
      takeWhile(() => this.isAlive),
      switchMap((id) => {
        return this.youtubeRepo.getUserById(id);
      }), filter(res => !!res));
    user$.subscribe(data => {
      this.user = data;
    });
  }
}`.trim();

const componentsLay = `
//layout/youtube-layout.component.ts
@Component({
  selector: 'youtube-layout',
  template: '
  < button routerLink = ""[routerLinkActiveOptions] = "{exact:true}" routerLinkActive = "selected" > Users</button>
    <router-outlet></router-outlet>
      ',
    })

export class LayoutComponent {

  constructor() {
  }
}


//user-list.component.ts
@Component({
  selector: 'youtube-user-list',
  template: '
  < div fxLayout = "row wrap" >
    <youtube-user-card [user] = "user" * ngFor="let user of users" ></youtube - user - card >
    </div >
  ',
})

export class UserListComponent {
  @Input() users: User[];
  constructor() {
  }
}


//user-card.component.ts
import {Component, Input} from '@angular/core';
import {User} from '../models/user';
import {YoutubeRepository} from '../services/youtube-repository';
import {MatDialog} from '@angular/material/dialog';
import {UpdateUserComponent} from './update-user.component';
import {Router} from '@angular/router';

@Component({
  selector: 'youtube-user-card',
  template: '
  <mat-card(click)="open()" >
      <li>{{this.user.name}}</li>
      <li>{{this.user.email}}</li>
      <button (click) = "delete()" > Delete</button >
  <button (click) = "update()" > Update</button >
    </mat-card >
  ',
})

export class UserCardComponent {
  @Input() user: User;

  constructor(private youtubeRepo: YoutubeRepository,
              private dialog: MatDialog, private router: Router) {
  }

  delete() {
    this.youtubeRepo.deleteUser(this.user.id);
  }

  update() {
    this.dialog.open(UpdateUserComponent, {
      data: this.user
    });
  }

  open() {
    this.router.navigate(['user', this.user.id]);
  }
}



//update-user.component.ts
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../models/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {YoutubeRepository} from '../services/youtube-repository';

@Component({
  selector: 'youtube-update-user',
  template: '
  <form[formGroup]="userForm"(ngSubmit) = "this.userForm.valid && this.addOrUpdateUser()" >
        <mat-form-field>
          <input formControlName="email" matInput placeholder="email"/>
          <mat-error>Valid email is Required</mat-error>
        </mat-form-field>
        <mat-form-field>
          <input formControlName="name" matInput placeholder="username"/>
          <mat-error>Name is Required</mat-error>
        </mat-form-field>
        <button type="submit">{{this.data ? 'Update' : 'Add'}}</button>
    </form >
  ',
})

export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<UpdateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User, private youtubeRepo: YoutubeRepository) {
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(this.data ? this.data.name : null, [Validators.required]),
      email: new FormControl(this.data ? this.data.email : null, [Validators.required]),
    });
  }


  addOrUpdateUser() {
    if (this.data) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  updateUser() {
    const updatedUser = {...this.data, ...this.userForm.value};
    this.youtubeRepo.updateUser(updatedUser);
    this.dialogRef.close();
  }

  addUser() {
    this.youtubeRepo.addUser(this.userForm.value);
    this.dialogRef.close();
  }
}`.trim();

const roots = `
//app-routing.module.ts
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './containers/users.component';
import {ViewUserComponent} from './containers/view-user.component';


const routes: Routes = [{
  path: '', component: UsersComponent,
  children: [
    {path: 'user/:id', component: ViewUserComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


//material.module.ts
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

const data = [MatToolbarModule,
  MatButtonModule, MatCardModule, MatProgressSpinnerModule,
  MatIconModule, MatFormFieldModule, MatDialogModule, MatInputModule
];

@NgModule({
  imports: data,
  exports: data
})
export class MaterialModule {}



//app.component.ts
@Component({
  selector: 'youtube-root',
  template: '<router - outlet ></router-outlet>',
})
export class AppComponent {
  constructor() {
  }
}

// my component are dependent on api service
// api service -> http service
// http service -> http client



//app.module.ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {UsersComponent} from './containers/users.component';
import {LayoutComponent} from './components/layout/youtube-layout.component';
import {MaterialModule} from './material.module';
import {HttpService} from './services/http.service';
import {ApiService} from './services/api.service';
import {UserCardComponent} from './components/user-card.component';
import {UserListComponent} from './components/user-list.component';
import {StoreModule} from '@ngrx/store';
import {rootReducer} from './reducers';
import {YoutubeRepository} from './services/youtube-repository';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {UpdateUserComponent} from './components/update-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ViewUserComponent} from './containers/view-user.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LayoutComponent,
    UserCardComponent,
    UserListComponent,
    UpdateUserComponent,
    ViewUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FlexModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [HttpService, ApiService, YoutubeRepository],
  bootstrap: [AppComponent]
})
export class AppModule {
}`.trim();


class NgrxCurd extends Component {
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
              <h3>NGRX</h3>
              NgRx is a framework for building reactive applications in Angular. NgRx provides libraries for:
              <br />
              <br />
              <b>Managing global and local state.</b>
              <ul>
                <li>Isolation of side effects to promote a cleaner component architecture.</li>
                <li>Entity collection management.</li>
                <li>Integration with the Angular Router.</li>
              </ul>
              <br />
              <br />
              <b>State:</b>
              <br />
              <ul>
                <li><b>Store: </b>RxJS powered global state management for Angular apps, inspired by Redux.</li>
                <li><b>Effects: </b>Side effect model for @ngrx/store.</li>
                <li><b>Router Store: </b>Bindings to connect the Angular Router to @ngrx/store.</li>
                <li><b>Entity: </b>Entity State adapter for managing record collections.</li>
                <li><b>ComponentStore: </b>Standalone library for managing local/ component state.</li>
              </ul>
              <br />

              <b>Data: </b>Extension for simplified entity data management.
              <br />
              <br />
              <b>View:</b>Component - Extension for fully reactive Angular applications.
              <img src={Ngrx} alt="Theata" className="responsive" />
              <br />

              <h3>Actions</h3>
              <div style={titles}>
                <PrismCode
                  code={actions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Reducers</h3>
              <div style={titles}>
                <PrismCode
                  code={reducers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Services</h3>
              <div style={titles}>
                <PrismCode
                  code={services}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Utils</h3>
              <div style={titles}>
                <PrismCode
                  code={utils}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Models</h3>
              <div style={titles}>
                <PrismCode
                  code={models}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Containers</h3>
              <div style={titles}>
                <PrismCode
                  code={containers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Components</h3>
              <div style={titles}>
                <PrismCode
                  code={componentsLay}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Roots</h3>
              <div style={titles}>
                <PrismCode
                  code={roots}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(NgrxCurd));
