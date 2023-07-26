import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../../ReactJs/styles.css";
import Sidebar from "../sidebar";
import PrismCode from "../prismCode";

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

const slideshow = `
import "./slideshow.css";

const colors = ["green", "blue", "yellow"];
const delay = 2500;

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ), delay);

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: 'translate3d('$'{-index * 100}%, 0, 0)' }}
      >
        {colors.map((backgroundColor, index) => (
          <div className="slide" key={index} style={{ backgroundColor }}></div>
        ))}
      </div>

      <div>
        {colors.map((_, idx) => (
          <div
            className={'slideshowDot'$'{index === idx ? " active" : ""}'}
            onClick={() => { setIndex(idx) }} />
        ))}
      </div>
    </div>
  );
}`.trim();

const slideshowCss = `
.slideshow {
  margin: 0 auto;
  overflow: hidden;
  max-width: 500px;
}

.slideshowSlider {
  white-space: nowrap;
  transition: ease 1000ms;
}

.slide {
  display: inline-block;

  height: 400px;
  width: 100%;
  border-radius: 40px;
}

.slideshowDots {
  text-align: center;
}

.slideshowDot {
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #c4c4c4;
}

.slideshowDot.active {
  background-color: #6a0dad;
}`.trim();

const fitersdata = `
const data = [
  { category: "vehicle", name: "car" },
  { category: "vehicle", name: "jeep" },
  { category: "fruit", name: "apple" },
  { category: "fruit", name: "orange" },
  { category: "electronics", name: "mobile" },
  { category: "electronics", name: "laptop" },
];

const App = () => {
  const [category, setCategory] = useState("vehicle");
  const filteredNames = data
    .filter((item) => item.category === category)
    .map((item) => item.name);

  return (
    <div>
      <label>
        Select a category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="vehicle">Vehicle</option>
          <option value="fruit">Fruit</option>
          <option value="electronics">Electronics</option>
        </select>
      </label> 
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <ul>
        {filteredNames.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};
`.trim();

const progressbar = `
const App = () => {
  const [progress, setProgress] = useState(0);

  const handleClick = () => {
    if (progress < 100) {
      setProgress(progress + 10);
    }
  };

  const progressStyle = {
    width: '$'{progress}%,
    height: "20px",
    backgroundColor: "green",
  };

  return (
    <div>
      <div style={progressStyle}>{progress}%</div>
      <button onClick={handleClick}>Progress</button>
    </div>
  );
};
`.trim();

const mouseHovers = `
const App = () => {
  const [isHovering, setHovering] = useState(false);

  const handleMouseHover = () => {
    setHovering(isHovering => !isHovering);
  }

  return (
    <div>
      <div
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
      >
        Hover Me
      </div>
      {isHovering && <div>Hovering right me</div>}
    </div>
  );
}`.trim();

const MoveButton = `
const MoveButton = (props) => {
  return (
      <button onClick={props.onClick}>
          Click To Move
      </button>
  );
}

const BoxOne = () => <p>Box1</p>;

const BoxTwo = () => <p>Box2</p>;


class App extends Component {
state = { positions: 0 }

handleClick = () => {
  this.setState({ positions: (this.state.positions + 1) % 3 })
}

render () { 
const positions = this.state.positions;
  return (
      <div>
          { positions === 0 ? <MoveButton onClick={this.handleClick}/> : ''}
          <BoxOne />
          { positions === 1 ? <MoveButton onClick={this.handleClick}/> : ''}
          <BoxTwo />
          { positions === 2 ? <MoveButton onClick={this.handleClick}/> : ''}
      </div>
  );
}
}

export default App;`.trim();

const sortItems = `
const items = [1, 2, 3, 4, 5];
function App() {
  const [sortOrder, setSortOrder] = useState("ascending");

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSortOrder("descending");
    } else {
      setSortOrder("ascending");
    }
  };

  const sortItems = (a, b) => {
    if (sortOrder === "ascending") {
      return a - b;
    } else {
      return b - a;
    }
  };

  const sortedItems = [...items].sort(sortItems);

  return (
    <div>
      <label>
        <input type="checkbox" onChange={handleCheckboxChange} />
      </label>
      <ul>
        {sortedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
`.trim();

const sliderBox = `
import Image1 from "./1.jpg";
import Image2 from "./2.jpg";
import Image3 from "./logo.svg";

const images = [Image1, Image2, Image3];

const App = () => {
  const [index, setIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "prev") {
      setIndex(index === 0 ? images.length - 1 : index - 1);
    } else {
      setIndex(index === images.length - 1 ? 0 : index + 1);
    }
  };

  return (
    <div>
      <img src={images[index]} alt="" style={{ width: 400, height: 400 }} />
      <button onClick={() => handleClick("prev")}>Previous</button>
      <button onClick={() => handleClick("next")}>Next</button>
    </div>
  );
};

export default App;
`.trim();

const checkConditions = `
const App = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", checked: false },
    { id: 2, name: "Item 2", checked: true },
    { id: 3, name: "Item 3", checked: false },
    { id: 4, name: "Item 4", checked: true },
    { id: 5, name: "Item 5", checked: false },
  ]);
  const [sort, setSort] = useState("all");

  const handleCheckboxChange = (item) => {
    const newItems = items.map((i) => {
      if (i.id === item.id) {
        return { ...i, checked: !i.checked };
      }
      return i;
    });
    setItems(newItems);
  };

  const sortedItems = items.sort((a, b) => {
    if (sort === "all") {
      return a.id - b.id;
    }
    if (sort === "checked") {
      return a.checked - b.checked;
    }
    if (sort === "unchecked") {
      return b.checked - a.checked;
    }
  });

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={sort === "all"}
            onChange={() => setSort("all")}
          />
          Sort by ID
        </label>
        <label>
          <input
            type="checkbox"
            checked={sort === "checked"}
            onChange={() => setSort("checked")}
          />
          Sort by Checked
        </label>
        <label>
          <input
            type="checkbox"
            checked={sort === "unchecked"}
            onChange={() => setSort("unchecked")}
          />
          Sort by Unchecked
        </label>
      </div>
      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(item)}
              />
              {item.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
`.trim();

class TicGame extends Component {
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
              <h3>1. Filter/Dropdawn</h3>
              <div style={titles}>
                <PrismCode
                  code={fitersdata}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Slideshow</h3>
              <div style={titles}>
                <PrismCode
                  code={slideshow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>slideshow.css</b>
              <div style={titles}>
                <PrismCode
                  code={slideshowCss}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Slider on click</h3>
              <div style={titles}>
                <PrismCode
                  code={sliderBox}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>5. Progress incrase upto 100%</h3>
              <div style={titles}>
                <PrismCode
                  code={progressbar}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Mouse Hover on Card</h3>
              <div style={titles}>
                <PrismCode
                  code={mouseHovers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6.onClick move button</h3>
              <div style={titles}>
                <PrismCode
                  code={MoveButton}
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
              <br />

              <h3>4. Sort items on check box conditions</h3>
              <div style={titles}>
                <PrismCode
                  code={checkConditions}
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

export default withStyles(styles)(TicGame);
