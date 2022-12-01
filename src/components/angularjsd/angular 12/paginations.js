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


const pagination = `
//pagination.component.ts.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: '
  < div >
  <div [ngClass] = "currentPage === 1 && 'pagination__button--disabled'"
    (click) = "onFirstPage()" >
    First
  </div >
  <div [ngClass] = "currentPage === 1 && 'pagination__button--disabled'"
    (click) = "onPreviousPage()" >
    Previous
  </div >
  <input (input) = "onSetPage($event)"[value] = "currentPage" > / <span>{{allPagesNumber}}</span >
    <div [ngClass] = "currentPage === allPagesNumber && 'pagination__button--disabled'"
      (click) = "onNextPage()" >
      Next
  </div >
  <div [ngClass] = "currentPage === allPagesNumber && 'pagination__button--disabled'"
    (click) = "onLastPage()" >
    Last
  </div >
</div >
  '})
export class PaginationComponent {
  @Input() itemsPerPage: number;
  @Input() itemsNumber: number;
  @Input() allPagesNumber: number;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  private _currentPage: number = 1;

get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page) {
    this._currentPage = page;
    this.changePage.emit(this.currentPage);
  }

  onSetPage(event): void {
    this.currentPage = event.target.value;
  }

  onFirstPage(): void {
    this.currentPage = 1;
  }

  onLastPage(): void {
    this.currentPage = this.allPagesNumber;
  }
  onNextPage(): void {
    this.currentPage += 1;
  }

  onPreviousPage(): void {
    this.currentPage -= 1;
  }
}


//data-list.component.ts
@Component({
  selector: 'app-data-list',
  template: '
  <p *ngFor="let item of postsData">
    {{item.id}} - {{item.title}}
        </p>
  '})
export class DataListComponent implements OnInit {
  @Input() postsData: any = [];

  ngOnInit(): void {}
}


//app.component.ts
interface IData {
  useId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  template: '
  <div>
  <h1>Angular Pagination</h1>
  <app-data-list [postsData] = "displayedData"></app-data - list>
  <app-pagination [allPagesNumber] = "allPages" (changePage) = "onPageChange($event)"></app - pagination>
</div >',
  })
export class AppComponent  {
    fetchedData: IData[] = [];
  displayedData: IData[] = [];
  itemsPerPage: number = 10;
  allPages: number;

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData(): void {
    const dataConfig$ = this.http.get('https://jsonplaceholder.typicode.com/posts');
    dataConfig$.subscribe((data: any) => {
        this.fetchedData = data;
        this.onPageChange();
        this.allPages = Math.ceil(this.fetchedData.length / this.itemsPerPage);
      }
    );
  }

  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.displayedData = this.fetchedData.slice(startItem, endItem);
  }
}
`.trim();


const scrollTop = `
@Component({
  selector: 'app-root',
  template: '
  <li *ngFor="let product of Images; let  j = index;">
    <img [src] = "product.image">
        </li >

  <div (click) = "scrollToTop()">
    scrollToTop 
        </div>
      '})

export class AppComponent  {
scrollToTop(){
  document.body.scrollTop = document.documentElement.scrollTop = 0;
}
   Images = [
    {ID:1, image: 'https://material-components-web.appspot.com/images/photos/3x2/16.jpg'},
    {ID:2, image: 'https://material-components-web.appspot.com/images/photos/3x2/16.jpg'}
  ];
}
`.trim();


const startRatings = `
@Component({
  selector: 'app-root',
  template: '
  <ul *ngFor="let star of stars" style="display: inline-block">
    <li (click) = "countStar(star)">
      <i class="fa fa-star">start</i>
        </li> 
      </ul>
  '})
export class AppComponent  {
    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number;

    countStar(star) {
      //store selected values
      this.selectedValue = star;
      console.log('Value of star', this.selectedValue);
    }
}`.trim();


const findOP = `
1. @Component({
  selector: 'app-root',
  template: '{{num | number: '3.2-5'}}'
})
export class AppComponent {
 constructor(){}
 num=12.638457846;
}


2. @Component({
  selector: 'app-root',
  template: '{{num | percent}}',
})
export class AppComponent {
 constructor(){}
 num=2.5;
}


3. @Component({
  selector: 'app-root',
  template: '{{dateObj | date: 'medium'}}',
})
export class AppComponent {
 constructor(){}
 dateObj=2015-6-15-21-43-11;
}`.trim();


class Paginations extends Component {
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
              <h3>1. Paginations</h3>
              <div style={titles}>
                <PrismCode
                  code={pagination}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Scroll-Top</h3>
              <div style={titles}>
                <PrismCode
                  code={scrollTop}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Star Rating</h3>
              <div style={titles}>
                <PrismCode
                  code={startRatings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Find OutPut</h3>
              <div style={titles}>
                <PrismCode
                  code={findOP}
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

export default (withStyles(styles)(Paginations));
