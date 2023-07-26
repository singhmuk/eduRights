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

const randoms = `
const App = () => {
  const [step, setStep] = useState(10);

  const handleRandom = () => {
    setStep(Math.floor(Math.random() * 10) + 1);
  };

  return (
    <div>
      <p>{step}</p>
      <button onClick={handleRandom}>Generate</button>
    </div>
  );
};
`.trim();

const numberLib = ``.trim();

const numberFor = ``.trim();

const converts = `
const App = () => {
  const [binary, setBinary] = useState("");
  const [decimal, setDecimal] = useState("");

  const convertBinaryToDecimal = () => {
    let decimalNumber = parseInt(binary, 2);
    setDecimal(decimalNumber);
  };

  return (
    <div>
      <h2>Binary to Decimal Converter</h2>
      <input
        value={binary}
        onChange={(e) => setBinary(e.target.value)}
        placeholder="Enter a binary number"
      />
      <button onClick={convertBinaryToDecimal}>Convert</button>
      {decimal && <p>Decimal Number: {decimal}</p>}
    </div>
  );
};
`.trim();

const pureComp = `
const App = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation
    let errors = {};

    if (!form.name.trim()) {
      errors.name = "Name is required";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid email address";
    }

    if (!form.password.trim()) {
      errors.password = "Password is required";
    } else if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (form.confirmPassword !== form.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
}`.trim();

class NumberForm extends Component {
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
              <h3>1. Random Number</h3>
              <div style={titles}>
                <PrismCode
                  code={randoms}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>2. Number format</h3>
              <div style={titles}>
                <PrismCode
                  code={numberLib}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. Number format without lib</h3>
              <div style={titles}>
                <PrismCode
                  code={numberFor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>4. Convert Binary to Decimal</h3>
              <div style={titles}>
                <PrismCode
                  code={converts}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Form Validation</h3>
              <div style={titles}>
                <PrismCode
                  code={pureComp}
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

export default withStyles(styles)(NumberForm);
