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

const dropSelect = `
class App extends Component {
  state = {
      mockData: [],
      name: ""
    };

  handleSubmitCourse = (e) => {
    alert("Your selected value is: " + this.state.name);
    e.preventDefault();
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleChangeCourse = e => {
    this.setState({ name: e.target.value });
  };

  getUnique(arr, comp) {
    const unique = arr
      //store the comparison values in array
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])

      .map(e => arr[e]);

    return unique;
  }
  
componentDidMount(){
  let url="https://jsonplaceholder.typicode.com/users/?q=";
    axios.get(url)
     .then(res => {
        const mockData= res.data
        this.setState({ mockData: mockData })
    })
  }


  render() {
    const uniqueCouse = this.getUnique(this.state.mockData, "username");

    const mockData = this.state.mockData;
    const name = this.state.name;

    const filterDropdown = mockData.filter(function(result) {
      return result.username === name;
    });

    return (
      <div>
        <form onSubmit={this.handleSubmitCourse}>
            <select value={name} onChange={this.handleChangeCourse}>
              {uniqueCouse.map(name => (
                <option key={name.id} value={name.username}>
                  {name.username}
                </option>
              ))}
            </select>
            
          <div>
            {filterDropdown.map(name => (
              <div key={name.id}>{name.name}</div>
            ))}
          </div>
        </form>
      </div>
    );
  }
}`.trim();

const checkFilter = `
//App.js

import FilterableProductTable from './FilterableProductTable'

const App =() =>{
//   const [PRODUCTS, setData ] = useState([]);
  
//   useEffect(() => {
//     loadData();
//  }, [])
 
//  const loadData = async () => {
//    await fetch("https://jsonplaceholder.typicode.com/posts")
//          .then(res => res.json())
//          .then(receivedData => setData(receivedData));
//  }
//  console.log('ssss',PRODUCTS)
  
  const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];
  return (
    <div>
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}


//FilterableProductTable.js
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

class FilterableProductTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        filterText: '',
        inStockOnly: false
      };
    }
  
    handleFilterTextChange = (filterText)=> {
      this.setState({
        filterText: filterText
      });
    }
    
    handleInStockChange = (inStockOnly) => {
      this.setState({
        inStockOnly: inStockOnly
      })
    }
  
    render() {
      return (
        <>
          <SearchBar
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            onFilterTextChange={this.handleFilterTextChange}
            onInStockChange={this.handleInStockChange}
          />
          <ProductTable
            products={this.props.products}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
          />
        </>
      );
    }
  }
  
  
  //SearchBar.js
  const SearchBar =(props)=> {
    const  handleFilterTextChange =(e)=> {
        props.onFilterTextChange(e.target.value);
      }
      
      const handleInStockChange=(e) => {
        props.onInStockChange(e.target.checked);
      }
      
        return (
          <form>
            <input
              type="text"
              placeholder="Search..."
              value={props.filterText}
              onChange={handleFilterTextChange}
            />
            <p>
              <input
                type="checkbox"
                checked={props.inStockOnly}
                onChange={handleInStockChange}
              />
              {' '}
              Only show products in stock
            </p>
          </form>
        );
    }
    
    
//ProductTable.js
const ProductCategoryRow =(props)=> {
  const category = props.category;
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

const ProductRow = (props)=>{
  const product = props.product;
  const name = product.stocked ?
    product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

const ProductTable = (props)=> {
      const filterText = props.filterText;
      const inStockOnly = props.inStockOnly;
  
      const rows = [];
      let lastCategory = null;
  
      props.products.forEach((product) => {
        if ((product.name).toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
          return;
        }
        if (inStockOnly && !product.stocked) {
          return;
        }
        if (product.category !== lastCategory) {
          rows.push(
            <ProductCategoryRow
              category={product.category}
              key={product.category} />
          );
        }
        rows.push(
          <ProductRow
            product={product}
            key={product.name}
          />
        );
        lastCategory = product.category;
      });
  
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
  }`.trim();

const countAdd = `
class App extends Component{
  state={ mockData:[] }
  
componentDidMount(){
  let url="https://jsonplaceholder.typicode.com/users";
    axios.get(url)
     .then(res => {
        const mockData= res.data
        this.setState({ mockData })
    })
}

render() {
  return ( 
   <div>
      {this.state.mockData.map((value) => (
          <Previews data={value}/> 
      ))}
    </div>
  );
}
}

  // Previews.js
  class Previews extends Component {
    state = { count: 0 };
    
    handleCount = () => {
      this.setState({ count: this.state.count + 1 })
    }

    render() {
      return (
       <div>
         {this.state.count}
         <button onClick={this.handleCount}>btn</button>
            
            <div>{this.props.data.name}</div>
         </div>
       );
     }
   }`.trim();


class DropdownSelect extends Component {
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
              <h3>1. Dropdown filter data on the basis of select key</h3>
              <div style={titles}>
                <PrismCode
                  code={dropSelect}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Check Filter</h3>
              <div style={titles}>
                <PrismCode
                  code={checkFilter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>3. Update single card count onClick</b>
              <div style={titles}>
                <PrismCode
                  code={countAdd}
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

export default (withStyles(styles)(DropdownSelect));