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

const app = `
var app = angular.module("HangmanApp",[]);
app.controller("GameController",['$scope','$timeout',function($scope,$timeout){
	var words=["Altassian","Remember","Mountain","Pokemon"];
		$scope.incorrectLettersChosen=[];
		$scope.correctLettersChosen=[];
		var selectedWord='';
		$scope.guesses=6;
		$scope.displayWord='';
		$scope.input = {
			letter: ''
		};
		
		console.log('input letter =',$scope.input)
		
	var selectRandomWord = function() {
		var index = Math.round(Math.random()*words.length);
		console.log('random number multiply with word length =',index)
		console.log('find which word as a option =',words[index])
		return words[index];
	}
	
	var newGame = function() {
		$scope.incorrectLettersChosen = [];
		$scope.correctLettersChosen=[];
		$scope.guesses=6;
		$scope.displayWord="";
		selectedWord=selectRandomWord();
		console.log('Random word selected: ',selectedWord,':',selectedWord.length);
			var tempDisplayWord='';
			for(var i=0;i<selectedWord.length;i++) {
				tempDisplayWord+='*';
			}
			console.log('display word in start: ',tempDisplayWord)
			$scope.displayWord=tempDisplayWord;
			// Random word selection.
		}
		
	$scope.letterChosen = function() {
		// Check if $scope.input.letter is a single letter and an alphabet and not an already chosen letter.
		// Check if its correct.
		for(var i=0;i<$scope.correctLettersChosen.length;i++) {
			if($scope.correctLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
				$scope.input.letter="";
				return;
			}
		}
		for(var i=0;i<$scope.incorrectLettersChosen.length;i++) {
			if($scope.incorrectLettersChosen[i].toUpperCase()==$scope.input.letter.toUpperCase()) {
				$scope.input.letter="";
				return;
			}
		}
		
		/*
		if Letter is correct selected word 'a'
		cat
		*a*
		*/
		var correct=false;
		for(var i=0;i<selectedWord.length;i++) {
			if(selectedWord[i].toLowerCase()==$scope.input.letter.toLowerCase()) {
	$scope.displayWord=$scope.displayWord.slice(0,i)+$scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
				console.log('display word pattern: ',$scope.displayWord)
				correct=true;
			}
		}
		
		if(correct) {
			//if correct guess than not reduce guess count else reduce
			$scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
			console.log('correct guess store in array: ',$scope.correctLettersChosen)
		} else {
			$scope.guesses--;
			console.log('incorrect guesses reduce options: ',$scope.guesses--)
			$scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
		}
		
		$scope.input.letter="";
		if($scope.guesses==0) {
			// You Lose
			alert('You lost')
			$timeout(function() {
				newGame();
			},500);
		}
		if($scope.displayWord.indexOf("*")==-1) {
			// Show score
			alert('You won')
			$timeout(function() {
				newGame();
			},500);
		}
	}
	newGame();
}]);`.trim();

const index = `
<body ng-app="HangmanApp" ng-controller="GameController">
	<div>
		Guesses Left :: {{guesses}}
	</div>
	<div>
		<div style="min-width: 40%">
			Correct Letters :: <span ng-repeat="letter in correctLettersChosen">{{letter}}</span>
		</div>
		<div style="min-width: 40%">
			Incorrect Letters :: <span ng-repeat="letter in incorrectLettersChosen">{{letter}}</span>
		</div>
	</div>
	<div>{{displayWord}}</div>
	<div>
		<input 
			type="text" 
			name="guess" 
			ng-model="input.letter" 
			ng-minlength="1" 
			ng-maxlength="1" 
			ng-pattern="/^[A-Za-z]+$/"
		>
		<button ng-click="letterChosen()">SUBMIT</button>
	</div>
</body>`.trim();


class DataBinding extends Component {
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
      <h3>Guess Game</h3>
      <b>app.js</b>
      <div style={titles}>
      <PrismCode
        code={app}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
        <br/>
        <b>index.html</b>
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

export default (withStyles(styles)(DataBinding));
