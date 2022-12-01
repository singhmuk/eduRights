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


const components = `
//components/AppNavbar.js
class AppNavbar extends Component {
  editItem = () => {
    this.props.editItem(this.props.children);
  }

  deleteItem = () => {
    this.props.deleteCat(this.props.children);
  }

  render() {
    const { children: cat } = this.props;
    return (
        <div>
            <p>{cat.name}</p>
            <button onClick={this.editItem}>Edit</button>
            <button onClick={this.deleteItem}>Delete</button>
        </div>
    );
  }
}


//components/itemEdit.js
import { Modal } from 'reactstrap';

class ItemsEdit extends Component {
  state= {
      modal: false,
      item: {}
    };

  componentWillMount() {
    this.setState({
      modal: this.props.modal,
      item: this.props.catEdit
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modal: nextProps.modal,
    });
  }

  toggle = () => {
    this.props.toggleModal(!this.state.modal);
  }

  save = () => {
    this.props.toggleModal(!this.state.modal);

    const { item } = this.state;
    this.props.editItem(item);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const { item } = this.state;
    const newItem = {...item};
    newItem[name] = value;

    this.setState({
        [name]: value,
        item: newItem
      });
  }

  render() {
    const { item } = this.state;
    const closeBtn = <button onClick={this.toggle}>&times;</button>;
    return (
      <div>
        <button onClick={this.toggle}>{this.props.buttonLabel}</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <h3 toggle={this.toggle} close={closeBtn}>Edit Item</h3>
            <form>
                <label for="name">Name</label>
                <input type="text" name="name" id="name" value={item.name} onChange={this.handleChange} />
            </form>
            <button onClick={this.save}>Save</button>{' '}
            <button onClick={this.toggle}>Cancel</button>
        </Modal>
      </div>
    );
  }
}


//components/ItemModal.js
import { Modal } from 'reactstrap';

class ItemModal extends React.Component {
  state = {
      modal: false,
      name: ''    
    };

  componentWillMount() {
    this.setState({
      modal: this.props.modal
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      modal: nextProps.modal
    });
  }

  toggle = () => {
    this.props.toggleModal(!this.state.modal);
  }
  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    };
    
    // Add item via addItem action
    this.props.addItem(newItem);
    
    // Close modal
    this.toggle();
  };
  
  
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
      }

  render() {
    const closeBtn = <button onClick={this.toggle}>&times;</button>;
    return (
      <div>
        <button onClick={this.toggle}>{this.props.buttonLabel}</button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <h2 toggle={this.toggle} close={closeBtn}>New Item</h2>
                <form onSubmit={this.onSubmit}>
                <input type='text' name='name' id='item'  onChange={this.onChange} />
                <button color='dark' block>Add Item</button>
                
                <button>Save</button>{' '}
                <button>Cancel</button>
            </form>
        </Modal>
      </div>
    );
  }
}


//components/shoppingList.js
import { Container, Row, Button } from 'reactstrap';

import AppNavbar from './AppNavbar';
import ItemModal from './ItemModal';
import ItemsEdit from './itemEdit';

class ShoppingList extends Component {
  state = {
        items: [],
      	catEdit: {},
      	createModal: false,
      	editModal: false
      }

  componentDidMount() {
      document.title = 'Items | Simple MERN Stack';

      axios.get('/item')
           .then(res => this.setState({
            items: res.data})
            )
            .catch(() => 
            console.log('error')
         ); 
      }

  handleCreateModal = () => {
    this.setState({
      createModal: true
    });
  }

  handleShowModal = (item) => {
    this.setState({
      catEdit: {...item},
      editModal: true
    });
	}

  handleCreateModal = (value) => {
		this.setState({
			createModal: value
		});
	}

  handleEditModal = (value) => {
    this.setState({
      editModal: value
    });
  }

  handleCreateItem = (item) => {
    const { name, color, image } = item;
    axios.post('/item', {
      name, color, image
    })
    .then(() => {
      const { items } = this.state;
      this.setState({
      items: [...items, {...item}]
    });
  })
  .catch(() => 
  console.log('error')
  );
  }

  handleEditCat = (item) => {
      const { _id, name, color, image } = item;
      axios.put(/item/'$'{_id}, {
      name, color, image
    })      
    .then(() => {
    const { items } = this.state;
    const index = this.findIndex(items, item);
      this.setState({
      items: [...items.slice(0, index), {...item}, ...items.slice(index + 1)]
    });
  })
  .catch(() => 
  console.log('error')
  );
  }

  handleDeleteItem = (item) => {
          axios.delete(/item/'$'{item._id})
          .then(() => {
            const { items } = this.state;
            const index = this.findIndex(items, item);
              this.setState({
              items: [...items.slice(0, index), ...items.slice(index + 1)]
        });
      })
      .catch(() => 
      console.log('error')
    );
  }


  findIndex(items, item) {
    let result = -1;
    items.forEach((item, index) => {
      if (item._id === item._id) {
      result = index;
      }
   });
  return result;
  }

      render() {
        const { items, catEdit, createModal, editModal } = this.state;
          return (
            <Container>
              <Button onClick={this.handleCreateModal}> New item </Button>
                  <Row>
                    { items.map((item, index) => 
                      <AppNavbar 
                        key={index} 
                        editItem={this.handleShowModal}
                        deleteCat={this.handleDeleteItem}
                      >
                        {item}
                      </AppNavbar>
                    )}
                  </Row>
                  { createModal ? 
                  <ItemModal
                    modal={createModal} 
                    toggleModal={this.handleCreateModal}
                    addItem={this.handleCreateItem}
                  /> : null }
                {
                  editModal ? 
                  <ItemsEdit
                    modal={editModal}
                    catEdit={catEdit}
                    toggleModal={this.handleEditModal}
                    editItem={this.handleEditCat}
                  />  : null }
                </Container>
            );
        }
    }
    
    
    
 //App.js
 import ShoppingList from './components/shoppingList';

class App extends Component {
    render() {
      return (
        <Router>
          <Route exact path="/" component={ShoppingList} />
        </Router>
      );
    }
  }

export default App;`.trim();


class MernReactCurd extends Component {
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
              <h3>Components</h3>
              <div style={titles}>
                <PrismCode
                  code={components}
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

export default (withStyles(styles)(MernReactCurd));
