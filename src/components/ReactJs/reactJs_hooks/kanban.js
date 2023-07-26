import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../prismCode';


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


const getLists = `
//AddTaskForm.js
export default class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const taskText = this.textInput.value.trim();
    const listNumber = this.props.formNum;
    console.log(listNumber)
    if (taskText && this.props.onAdd) {
      this.props.onAdd(taskText, listNumber);
    }
    this.textInput.value = '';
  }

 setEditing(editing) {
    this.setState({
      editing
    });
  }

  render() {
    if(!this.state.editing) {
      return (
        <div onClick={() => this.setEditing(true)}>
          <a href="#">Add a task!</a>
        </div>  
        ); 
    }
      return (
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input type="text" ref={input => this.textInput = input} aria-label="Add a task" />
          <div>
            <button>Add Task</button>
            <button onClick={() => this.setEditing(false)}>Cancel</button>
          </div>
        </form>
      );
  }
}


//TaskCard.js
import React from 'react';

export default function TaskCard(props) {
  return (
    <div className="task-card" draggable="true" id={[props.timeId]} onDragStart={props.onDragStart}>
      {props.taskText}
    </div>
  ) 
};


//List.js
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';


export default class List extends React.Component {
  constructor(props) {
    super(props);
    }
   
  render() {
    const cards = this.props.cards.map((card, index) => {
      return ( 
        <li key={index}>
          <TaskCard {...card} onDragStart={this.props.onDragStart} />
        </li>
      );
    })
      
    return (
      <div>
        <h2>{this.props.title}</h2>
        <ul className="list" onDragOver={this.props.onDragOver} onDrop={this.props.onDrop}>
          {cards}
          <li>
            <AddTaskForm formNum={this.props.id} onAdd={this.props.onAdd} />
          </li>
        </ul>
      </div>
    );
  }
}


//App.js
import List from './kanban/List';
import "./App.css"

export default class Board extends Component {
  constructor(props) {
    super(props);
      this.state = {
        lists: [
          {title: 'Derrick', id: 0,
            cards: [{ taskText: 'default task card 1', listNumber: 0, timeId: 0 }, 
            { taskText: 'default task card 2', listNumber: 0, timeId: 1 }]
          },
          { title: 'Maxwell', id: 1,
            cards: [{ taskText: 'default task card 1', listNumber: 1, timeId: 2 }, 
            { taskText: 'default task card 2', listNumber: 1, timeId: 3 }]
          },
          { title: 'Zaza', id: 2,
            cards: [{ taskText: 'default task card 1', listNumber: 2, timeId: 4 }, 
            { taskText: 'default task card 2', listNumber: 2, timeId: 5 }]
          },
          { title: 'Sam', id: 3,
            cards: [{ taskText: 'default task card 1', listNumber: 3, timeId: 6 }, 
            { taskText: 'default task card 2', listNumber: 3, timeId: 7 }]
          }
        ]
      }

      localStorage.setItem('lists', JSON.stringify(this.state.lists))
    }

  //get id of item being dragged and list where it's coming from
  onDragStart = (e, fromList) => {
    const dragInfo = {
      taskId: e.currentTarget.id,
      fromList: fromList
    }
  
    localStorage.setItem('dragInfo', JSON.stringify(dragInfo));
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, listNum) => {
    //get the dropped task card, the localStorage, 
    const droppedTask = localStorage.getItem('dragInfo');
    const rawLS = localStorage.getItem('lists');
    const parsedLS = JSON.parse(rawLS);
    const parsedDragInfo = JSON.parse(droppedTask)
    
    //get task cards array, get rid of moved card, and put a new card
    // in the list where it was dropped
    const cardsArray = parsedLS[parsedDragInfo.fromList].cards
    const taskCard = cardsArray.find(card => card.timeId == parsedDragInfo.taskId)
    const indexOfCard = cardsArray.findIndex(card => card.timeId == parsedDragInfo.taskId)
    parsedLS[parsedDragInfo.fromList].cards.splice(indexOfCard, 1)
    parsedLS[listNum].cards.push({...taskCard, listNumber: parseInt(listNum)})
   
    //sync the state and localStorage
    this.setState({
      lists: parsedLS
    });
    localStorage.setItem('lists', JSON.stringify(parsedLS));
    
  }

  //add some new task cards
  addTaskCard(taskText, listNumber) {
    const rawLS = localStorage.getItem('lists');
    const parsedLS = JSON.parse(rawLS);

    const newTask = {
      taskText,
      listNumber,
      timeId: new Date().valueOf()
    }

    parsedLS[listNumber].cards.push(newTask)

    //sync state and localStorage
    this.setState({
      lists: parsedLS
    })
    localStorage.setItem('lists', JSON.stringify(parsedLS))
  
  }


render() {
  const lists = this.state.lists.map((list, index) => (
    <li key={index}>
      <List {...list} 
        onAdd={(taskText, listNumber) => this.addTaskCard(taskText, listNumber)} 
        onDragStart={(e, fromList) => this.onDragStart(e, ''$'{list.id}')}
        onDragOver={(e) => this.onDragOver(e)} 
        onDrop={(e, listNum) => {this.onDrop(e, ''$'{list.id}')}}
      />
    </li>
  ));
   
  return (
    <div>
      <ul className="lists">
        {lists}
      </ul>
    </div>
  );
  }
}
`.trim();

const App = `
.lists {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 0;
  list-style-type: none;
}

.list {
  list-style-type: none;
  background: #E0E0E0;
  padding: 8px;
}

.task-card {
  background: #ffffff;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 2px;
  word-break: break-all;
  word-wrap: break-word;
  cursor: pointer;
}

.task-card:hover {
  background-color: #f9f3f3;
}`.trim();


class Kanban extends Component {
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
              <h3>Kanban</h3>
              <div style={titles}>
                <PrismCode
                  code={getLists}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>1App.css</h3>
              <div style={titles}>
                <PrismCode
                  code={App}
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

export default (withStyles(styles)(Kanban));
