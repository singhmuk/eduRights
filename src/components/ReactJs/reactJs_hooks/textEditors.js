import React, { Component } from 'react';
import PrismCode from '../prismCode';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../styles.css'
import Sidebar from '../sidebar';


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

const code = `
class App extends Component {
  state = {
      input: '',
      output: []
    };

  handleChange = (e) => { this.setState({ input: e.target.value }) }

  appendInput = () => {
    let output = this.state.output.concat(this.state.input);
    this.setState({output})
  }
  
  removeInput = () => {
    let output = this.state.output.filter(items=>items.id !== items.id);
    this.setState({output});
  }

  render() {
    return ( 
      <>
        <div>
          <input type="text" onChange={this.handleChange} value={this.state.input}/>
          
          <button onClick={this.appendInput} disabled={!this.state.input}>Append</button>
          <button onClick={this.removeInput} disabled={this.state.output.length === 0}>Undo</button>
        </div>
        <div>   
          {this.state.output.map((values) =>  (
                 <text>{values} </text>
             ))
          }
        </div>
      </>
    );
  }
}`.trim();

const codes = `
const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;


//Posts.js
const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post.id} className='list-group-item'>
          {post.title}
        </li>
      ))}
    </ul>
  );
};


//Pagination.js
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
`.trim();


const translations = `
class App extends Component {
  state = {
      input: '',
      output: ''
    };

  handleChange = (e) => {
    let userInput = e.target.value;
    this.setState({ input: userInput });
    
    for (let names of this.props.translations.keys()) {
      if(userInput === names) {
        this.setState({ output: this.props.translations.get(userInput) });     
      }
    }
    this.state.output = '';
  }

  render() {
    return (
      <>
        <div>
          <span>input:</span>
          <input type="text" onChange={this.handleChange} value={this.state.input}/>
              
          <span>output:</span>
          <input type="text" readOnly value={this.state.output}/>
        </div>
      </>
    );
  }
}`.trim();


const indexs = `
const TRANSLATIONS = new Map([
  ['ball', 'pelota'],
  ['house', 'casa'],
  ['dog', 'perro'],
  ['dogs', 'perros'],
  ['milk', 'leche'],
  ['orange', 'naranja'],
]);

ReactDOM.render(<App translations={TRANSLATIONS} />, document.getElementById('root'));`.trim();


const sortItems = `
class Filter extends Component {
  handleChange = (e) => {
      return (e) => {
          e.preventDefault();
          const { sorter } = this.props;
          sorter(e.target.value);
      };
  }

  render() {
      const { sortedBy } = this.props;
      const nameChecked = (sortedBy === "name");
      return (
          <div>
              <input type="checkbox" checked={nameChecked} onClick={this.handleChange('name')} value="name" />
              <label>Name</label>
              <input type="checkbox" checked={!nameChecked} onClick={this.handleChange('age')} value="age" />
              <label>Email</label>
          </div>
      );
  }
}

class RecordTable extends Component {
      state={
        people:[]
      }

      handleFetch = () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
              .then(res => {
                const people = res.data;
                this.setState({ people })
              })
          }
      
      componentDidMount(){
        this.handleFetch();
      }
      
  render() {
    console.log(this.state.people)
      const { sortedBy } = this.props;
      if (sortedBy === "name") {
          this.state.people.sort(function (a, b) {
              let personA = a.name.toLowerCase();
              let personB = b.name.toLowerCase();
              return (personA < personB) ? -1 : (personA > personB) ? 1 : 0;
          });
      } else {
          this.state.people.sort(function (a, b) {
              return new Date(b.dob) - new Date(a.dob);
          });
          this.state.people.reverse();
      }

  return (
          <table>
              <tr>
                  <th>Name</th>
                  <th>Email</th>
              </tr>
              
              {this.state.people.map(person => (
                  <div key={person.id}>
                    <tr>
                      <td>{person.name}</td> ---
                      <td>{person.email}</td>
                    </tr>
                  </div>
              ))}
          </table>
      );
  }
}


class App extends Component {
  state = {
      sortedBy: "name",
  }

  sort = (filter) => {
    if (filter === "name") {
      this.setState({ sortedBy: "name" });
    } else {
      this.setState({ sortedBy: "age" });
    }
  }

  render() {
    return (
      <div>
        <center><h1>Birthday Records</h1></center>
        <Filter sorter={this.sort} sortedBy={this.state.sortedBy}></Filter>
        <RecordTable sortedBy={this.state.sortedBy}></RecordTable>
      </div>
    );
  }
}


export default App;`.trim();

class TextEditors extends Component {
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
              <h3>1. Text Editor</h3>
              <div style={titles}>
                <PrismCode
                  code={code}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Pagination </h3>
              <div style={titles}>
                <PrismCode
                  code={codes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>3. Translator.js</b>
              <div style={titles}>
                <PrismCode
                  code={translations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>index.js</b>
              <div style={titles}>
                <PrismCode
                  code={indexs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Sort items on check box</h3>
              <div style={titles}>
                <PrismCode
                  code={sortItems}
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

export default (withStyles(styles)(TextEditors));