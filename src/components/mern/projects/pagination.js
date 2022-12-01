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


const Search = `class SearchApi extends Component {
  state = {
    items: []
  }

search=(key)=>{
  let url="http://localhost:5000/items?q=";
  axios.get(url + key)
       .then(res => {
         const items = res.data;
         this.setState({ items })
       })
}
componentDidMount(){
  this.search()
}

render(){
  return(
    <div>
      <input type = "text" onChange = {(e) => this.search(e.target.value)} />
      {this.state.items ? 
      <div>
        {this.state.items.map((data, id) => (
          <li key={id}>{data._id} - {data.name}</li>
        ))}
      </div>  
      : ''
        }
    </div>
    )
  }
}`.trim()

const HeaderAuth = `
class ApiAuthentication extends Component {
  state = {
    items: []
  }

search=(key)=>{
  let url="http://localhost:5000/items?q=";
  const auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2I0NGI1ZjNiZTY2YTQ1MTdmM
                jk2ODciLCJyb2xlSWQiOiI1YjA2NjMzNTVmYTMwZDY4Y2VkNmRkODgiLCJlbWFpbCI6InZpa2FzaEB5b3BtYWls"

  axios.get(url, {
    "headers": { "Authorization":"bearer "+ auth ,
      "Access-Control-Allow-Headers": "*",
      "content-type": "application/json",
      "Accept": "*"
      }
    })
       .then(res => {
         const items = res.data;
         this.setState({ items })
       })
       .catch(error => {
        throw(error);
      });
}
componentDidMount(){
  this.search()
}

render(){
  return(
    <div>
      <input type = "text" onChange = {(e) => this.search(e.target.value)} />
      {this.state.items ? 
      <div>
        {this.state.items.map((data, id) => (
          <li key={id}>{data._id} - {data.name}</li>
        ))}
      </div>  
      : ''
        }
    </div>
    )
  }
}`.trim()

const SortApi = `
const Row = ({id, title, priority, type, complete}) => (
  <div className="row">
    <div>{id}</div>
    <div>{title}</div>
    <div>{priority}</div>
    <div>{type}</div>    
    <div>{complete}</div>    
  </div>
);



class SortCompo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    
    this.compareBy.bind(this);
    this.sortBy.bind(this);
  }
  
  search=(key)=>{
    let url="http://localhost:5000/items";
    axios.get(url)
         .then(res => {
           const items = res.data;
           this.setState({ items })
         })
  }
  componentDidMount(){
    this.search()
  }
  
  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy(key) {
    let arrayCopy = [...this.state.items];
    arrayCopy.sort(this.compareBy(key));
    this.setState({data: arrayCopy});
  }
    
  render() {
    const rows =  this.state.items.map((data, id) => (
      <li key={id}>{data._id} - {data.name}</li>
    ))

    return (
      <div className="table">
        <div className="header">
          <div onClick={() => this.sortBy('id')} >ID</div>
          <div onClick={() => this.sortBy('title')}>Title</div>
          <div onClick={() => this.sortBy('priority')}>Priority</div>
          <div onClick={() => this.sortBy('type')}>Issue Type</div>
          <div onClick={() => this.sortBy('complete')}>% Complete</div>
        </div>
        <div className="body">
          {rows}
        </div>
      </div>
    );
  }
}
`.trim()

const SortStatic = `const Row = ({id, title, priority, type, complete}) => (
  <div className="row">
    <div>{id}</div>
    <div>{title}</div>
    <div>{priority}</div>
    <div>{type}</div>    
    <div>{complete}</div>    
  </div>
);


class SortDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id: 403, title: 'Task 403', priority: 'High', type: 'Improvement', complete: 100}, 
        {id: 532, title: 'Task 532', priority: 'Medium', type: 'Improvement', complete: 30}, 
        {id: 240, title: 'Task 240', priority: 'High', type: 'Story', complete: 66},
      ],
    };
    
    this.compareBy.bind(this);
    this.sortBy.bind(this);
  }
  
  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy(key) {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    this.setState({data: arrayCopy});
  }
    
  render() {
    const rows = this.state.data.map( (rowData) => <Row {...rowData} />);

    return (
      <div className="table">
        <div className="header">
          <div onClick={() => this.sortBy('id')} >ID</div>
          <div onClick={() => this.sortBy('title')}>Title</div>
          <div onClick={() => this.sortBy('priority')}>Priority</div>
          <div onClick={() => this.sortBy('type')}>Issue Type</div>
          <div onClick={() => this.sortBy('complete')}>% Complete</div>
        </div>
        <div className="body">
          {rows}
        </div>
      </div>
    );
  }
}`.trim()

const Post = `const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post._id} className='list-group-item'>
          {post._id} - {post.name}
        </li>
      ))}
    </ul>
  );
};`.trim()

const Paginations = `const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
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

export default Pagination;`.trim()

const MainComp = `
const MainComp = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/items');
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
`.trim()


class Pagination extends Component {
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
              <b>Search API</b>
              <br />
              Search.js
              <div style={titles}>
                <PrismCode
                  code={Search}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Token Authorization</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={HeaderAuth}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Sort Api</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={SortApi}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Sort Static</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={SortStatic}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Pagination</b>
              <br />
              post.js<br />
              <div style={titles}>
                <PrismCode
                  code={Post}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              Pagination.js<br />
              <div style={titles}>
                <PrismCode
                  code={Paginations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              MainComp.js<br />
              <div style={titles}>
                <PrismCode
                  code={MainComp}
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

export default (withStyles(styles)(Pagination));
