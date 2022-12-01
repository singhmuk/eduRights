import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = {backgroundColor:'#F0F8FF', padding:'1px', fontSize:'16px'}

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


const serverStatic = `
const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

const port = 5000;

app.listen(port, () => Server running on port '$'{port});`.trim()


const serverData = `
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Bodyparser Middleware
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/appSetup', { 
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(Server started on port '$'{port}));
`.trim()


const server = `
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/employees');
var Employee = mongoose.model('Employee', mongoose.Schema({
	name:String,
	dept:String,
	area:String,
	status:String,
	contact:String,
	salary:String
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/api/employees', function(req, res){
	Employee.find(function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

app.get('/api/employees/:id', function(req, res){
	Employee.findOne({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

app.post('/api/employees', function(req, res){
	Employee.create( req.body, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

app.delete('/api/employees/:id', function(req, res){
	Employee.findOneAndRemove({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

app.put('/api/employees/:id', function(req, res){
	var query = {
		name:req.body.name,
		dept:req.body.dept,
		area:req.body.area,
		status:req.body.status,
		contact:req.body.contact,
		salary:req.body.salary
	};
	Employee.findOneAndUpdate({_id:req.params.id}, query, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(Server started on port '$'{port}));`.trim()

const controllers = `
myApp.controller('empController', empController);


function empController($scope,$route,$routeParams,$http){
	$scope.getEmployees = function(){
		$http.get('/api/employees/')
			 .then((response) => {
			 $scope.employees = response.data;
		});
	};

	$scope.showEmployee = function(){
		var id = $routeParams.id;
		$http.get('/api/employees/'+ id)
			 .then((response) => {
			 $scope.employee = response.data;
		});
	};

	$scope.addEmployee = function(){
		$http.post('/api/employees/', $scope.employee)
			 .then(function(response){
			 window.location.href = '/';
		});
	};

	$scope.updateEmployee = function(){
		var id = $routeParams.id;
		$http.put('/api/employees/'+ id , $scope.employee)
			 .then(function(response){
			 window.location.href = '/';
		});
	};

	$scope.deleteEmployee = function(id){
		var id = id;
		$http.delete('/api/employees/'+ id)
			 .then(function(response){
			 $route.reload();
		});
	};
};`.trim()

const add = `
<div class="panel panel-default">
	<div class="panel-heading">
	  <p class="panel-title"><span style="color:#5bc0de;" class="glyphicon glyphicon-plus"> </span> Add New Employee</p>
  </div>
  

	<div class="panel-body">
		<form ng-submit="addEmployee()">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" ng-model="employee.name">
    </div>
  
    <div class="form-group">
      <label for="dept">Department:</label>
      <input type="text" class="form-control" id="dept" ng-model="employee.dept">
    </div>
  
    <div class="form-group">
      <label for="area">Location:</label>
      <input type="text" class="form-control" id="area" ng-model="employee.area">
    </div>
  
    <div class="form-group">
      <label for="contact">Contact No. :</label>
      <input type="text" class="form-control" id="contact" ng-model="employee.contact">
      <div class="form-group">
      <label for="status">Job Status :</label>
      <input type="text" class="form-control" id="status" ng-model="employee.status">
      <div class="form-group">
      <label for="salary">Salary :</label>
      <input type="text" class="form-control" id="salary" ng-model="employee.salary">
    </div>
  
    <button type="submit" style="color:#5bc0de;" class="btn btn-default">Save</button>
    <a href="#/employees" class="btn btn-default"> Cancel</a>
    </form>		
  <div>
<div>`.trim()

const edit = `
<div class="panel panel-default" ng-init="showEmployee()">
	<div class="panel-heading">
	  <p class="panel-title"><span style="color:#5bc0de;" 
      class="glyphicon glyphicon-edit"> </span> Edit Employee</p>
	</div>
  
  <div class="panel-body">
		<form ng-submit="updateEmployee()">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" class="form-control" id="name" ng-model="employee.name" value="employee.name">
    </div>
  
    <div class="form-group">
      <label for="dept">Department:</label>
      <input type="text" class="form-control" id="dept" ng-model="employee.dept" value="employee.dept">
    </div>
  
    <div class="form-group">
      <label for="area">Location:</label>
      <input type="text" class="form-control" id="area" ng-model="employee.area" value="employee.area">
    </div>
  
    <div class="form-group">
      <label for="contact">Contact No. :</label>
      <input type="text" class="form-control" id="contact" ng-model="employee.contact" value="employee.contact">
      <div class="form-group">
      <label for="status">Job Status :</label>
      <input type="text" class="form-control" id="status" ng-model="employee.status" value="employee.status">
      <div class="form-group">
      <label for="salary">Salary :</label>
      <input type="text" class="form-control" id="salary" ng-model="employee.salary" value="employee.salary">
    </div>
  
    <button type="submit" style="color:#5bc0de;" class="btn btn-default">Update</button>
    <a href="#/employees" class="btn btn-default"> Cancel</a>
      </form>		
    <div>
<div>
`.trim()

const list = `
<div class="panel panel-default" ng-init="getEmployees()">
	<div class="panel-heading">
	  <p class="panel-title"><span style="color:#5bc0de;" 
		class="glyphicon glyphicon-list"> </span> Employees List</p>
	</div>
	
	<div class="panel-body">
		<table class="table table-striped">
			<thead>
			<tr>
			  <th>Name</th>
			  <th>Department</th>
			  <th>Location</th>
			  <th>Actions</th>
			</tr>
			</thead>
	
			<tbody>
			<tr ng-repeat="employee in employees">
			  <td>{{ employee.name }}</td>
			  <td>{{ employee.dept }}</td>
			  <td>{{ employee.area }}</td>
			  <td> 
			    <a href="#/employees/{{employee._id}}/show" class="btn btn-info"> Show  </a>
					<a href="#/employees/{{employee._id}}/edit" class="btn btn-success">
						<span class="glyphicon glyphicon-edit"> </span> Edit  </a>
					<a ng-click="deleteEmployee(employee._id)" class="btn btn-danger">
						<span class="glyphicon glyphicon-trash"> </span> Delete </a>
			  </td>
			</tr>
			</tbody>
		</table>		
    <div>
<div>`.trim()

const show = `
<div class="panel panel-default" ng-init="showEmployee()">
	<div class="panel-heading">
	  <p class="panel-title"> Employee Detail Information</p>
	</div>
	
	<div class="panel-body">
		<form>
		<div class="form-group">
		 <label class="form-control">Name: {{ employee.name }}</label>
		 <label class="form-control">Department: {{ employee.dept }}</label>
		 <label class="form-control">Location: {{ employee.area }}</label>
		 <label class="form-control">Job Status: {{ employee.status }}</label>
		 <label class="form-control">Contact: {{ employee.contact }}</label>
		 <label class="form-control">Salary: {{ employee.salary }}</label>
		 <label class="form-control">ID: {{ employee._id }}</label>
		<a href="#/employees" class="btn btn-default"> Cancel</a>
		</div>
	</form>		
    <div>
<div>`.trim()

const app = `
var myApp = angular.module('myApp',['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl:'templates/list.html',
			controller:'empController'
		})
		.when('/employees', {
			templateUrl:'templates/list.html',
			controller:'empController'
		})
		.when('/employees/create', {
			templateUrl:'templates/add.html',
			controller:'empController'
		})
		.when('/employees/:id/edit', {
			templateUrl:'templates/edit.html',
			controller:'empController'
		})
		.when('/employees/:id/show', {
			templateUrl:'templates/show.html',
			controller:'empController'
		});
});
`.trim()

const index = `<!DOCTYPE html>
<html lang="en" ng-app="myApp">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>MEAN CRUD</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="style.css" rel="stylesheet">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-route.min.js"></script>
    <script src="app.js"></script>
    <script src="controllers/controllers.js"></script>
</head>
<body>

<div class="container">
	<div class="row">
		<div class="header clearfix">
			<nav>
			  <ul class="nav nav-pills pull-right">
			    <li role="presentation" class="active">
                    <a href="#/employees">
                        <span class="glyphicon glyphicon-th-list"> </span> Employee List
                    </a>
                </li>
                
                <li role="presentation">
                    <a href="#/employees/create"> 
                    <span class="glyphicon glyphicon-plus"> </span>	Add New Employee
                </a>
            </li>
            
			  </ul>
			</nav>
			<h3 class="text-muted">Simple MEAN web Application using CRUD operation</h3>
		</div>
		<div ng-view></div>
		
		<footer class="footer well well-sm">
		    <p>© 2016 Tutplus24</p>
		</footer>

	</div>
</div>
</body>
</html>`.trim()



class Mean extends Component {
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
      <h3>Server without databae</h3>
      <b>server.js</b>
      <div style={titles}>
      <PrismCode
        code={serverStatic}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <h3>Server with databae</h3>
      <div style={titles}>
      <PrismCode
        code={serverData}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <h1>MEAN</h1>
        <b>server.js</b>
      <div style={titles}>
      <PrismCode
        code={server}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <b>controllers/controllers.js</b>
      <div style={titles}>
      <PrismCode
        code={controllers}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
        <b>templates/add.js</b>
      <div style={titles}>
      <PrismCode
        code={add}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
        <b>templates/edit.js</b>
      <div style={titles}>
      <PrismCode
        code={edit}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
        <b>templates/list.js</b>
      <div style={titles}>
      <PrismCode
        code={list}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
			<br/>
        <b>templates/show.js</b>
      <div style={titles}>
      <PrismCode
        code={show}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
        <b>app.js</b>
      <div style={titles}>
      <PrismCode
        code={app}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
			<br/>
        <b>index.js</b>
      <div style={titles}>
      <PrismCode
        code={index}
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

export default (withStyles(styles)(Mean));
