import React, { Component } from "react";
import PrismCode from "../prismCode";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../styles.css";
import Sidebar from "../sidebar";

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

const code = `
const App = () => {
  const [input, setInput] = useState("");
  const [output, setOuput] = useState([]);

  const appendInput = () => {
    setOuput(output.concat(input));
  };

  const removeInput = () => {
    setOuput(output.filter((items) => items.id !== items.id));
  };

  return (
    <>
      <div>
        <input type="text" onChange={(e) => setInput(e.target.value)} value={input} />

        <button onClick={appendInput} disabled={!input}>Append</button>
        <button onClick={removeInput} disabled={output.length === 0}>Undo</button>
      </div>
      <div>
        {output.map((values) => (
          <text>{values} </text>
        ))}
      </div>
    </>
  );
};
`.trim();

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

class TextEditors extends Component {
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
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TextEditors);
