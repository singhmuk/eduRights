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

const CustomersComponent = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  template: '<p>Customer List</p>',
})
export class CustomersComponent {}
`.trim();

const AddCustomerComponent = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-customer',
  template: '<p>Add New Customer</p>',
})
export class AddCustomerComponent {}
`.trim();

const CustomersRoutingModule = `
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './add-customer.component';
import { CustomersComponent } from './customers.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'add-customer', component: AddCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}`.trim();

const CustomersModule = `
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { AddCustomerComponent } from './add-customer.component';

@NgModule({
  declarations: [CustomersComponent, AddCustomerComponent],
  imports: [CommonModule, CustomersRoutingModule],
})
export class CustomersModule {}`.trim();

const OrdersComponent = `
@Component({
  selector: 'app-orders',
  template: '<p>Order List</p>',
})
export class OrdersComponent {}`.trim();

const OrdersRoutingModule = `
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';

const routes: Routes = [{ path: '', component: OrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }`.trim();

const OrdersModule = `
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';


@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
`.trim();

const AppRoutingModule = `
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) }, 
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
`.trim();

const AppComponent = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ' <h2>Welcome</h2>

    <ul>
      <li>
        <a routerLink="">Home</a>
      </li>

      <li>
        <a routerLink="/customers">Customers</a>
      </li>

      <li>
        <a routerLink="/customers/add-customer">Add customer</a>
      </li>

      <li>
        <a routerLink="/orders">Orders</a>
      </li>
    </ul>

    <router-outlet> </router-outlet>',
})
export class AppComponent {
  title = 'LazyLoaingAngular';
}
`.trim();

const AppModule = `
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`.trim();

class NgRepeat extends Component {
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
              <b>customers/customers.component.ts</b>
              <div style={titles}>
                <PrismCode
                  code={CustomersComponent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>customers/add-customer.component.ts</b>
              <div style={titles}>
                <PrismCode
                  code={AddCustomerComponent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>customers/customers-routing.module.ts</b>
              <div style={titles}>
                <PrismCode
                  code={CustomersRoutingModule}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>customers/customers.module.ts</b>
              <div style={titles}>
                <PrismCode
                  code={CustomersModule}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>orders/orders.component</b>
              <div style={titles}>
                <PrismCode
                  code={OrdersComponent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>orders/orders-routing.module</b>
              <div style={titles}>
                <PrismCode
                  code={OrdersRoutingModule}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>orders/orders.module</b>
              <div style={titles}>
                <PrismCode
                  code={OrdersModule}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>app-routing.module.ts</b>
              <div style={titles}>
                <PrismCode
                  code={AppRoutingModule}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>app.component.ts</b>
              <div style={titles}>
                <PrismCode
                  code={AppComponent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>app.module.ts</b>
              <div style={titles}>
                <PrismCode
                  code={AppModule}
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

export default withStyles(styles)(NgRepeat);
