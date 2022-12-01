import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../ReactJs/styles.css'
import Sidebar from './sidebar';
import PrismCode from '../ReactJs/prismCode';

import Browser from '../../assets/css1.PNG';


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



const shallowOnly = `
test("shallow", () => {
  class Bar extends React.Component {
    state = {
      value: 0
    };

    componentDidMount() {
      this.setState({
        value: 1
      });
    }

    render() {
      return (
        <div>
          <div className="in-bar">{this.state.value}</div>
        </div>
      );
    }
  }

  function Foo() {
    return (
      <div>
        <Bar />
      </div>
    );
  }

  const wrapper = shallow(<Foo />);

  expect(wrapper.find(".in-bar")).toHaveLength(0);
  expect(wrapper.find(Bar)).toHaveLength(1);

  const barWithLifecycle = wrapper.find(Bar).shallow();
  expect(barWithLifecycle.find(".in-bar")).toHaveLength(1);
  expect(barWithLifecycle.find(".in-bar").text()).toBe("1");

  const barWithoutLifecycle = wrapper.find(Bar).shallow({
    disableLifecycleMethods: true
  });
  expect(barWithoutLifecycle.find(".in-bar")).toHaveLength(1);
  expect(barWithoutLifecycle.find(".in-bar").text()).toBe("0");
});

test("dive", () => {
  function Bar() {
    return (
      <div>
        <div className="in-bar" />
      </div>
    );
  }

  function Foo() {
    return (
      <div>
        <Bar />
      </div>
    );
  }

  const wrapper = shallow(<Foo />);
  expect(wrapper.find(".in-bar")).toHaveLength(0);
  expect(wrapper.find(Bar)).toHaveLength(1);
  expect(
    wrapper
      .find(Bar)
      .dive()
      .find(".in-bar")
  ).toHaveLength(1);
});
`.trim();

const fullDomOnly = `
import { mount } from "enzyme";
import PropTypes from "prop-types";

test("detach()", () => {
  function CustomComponent(props) {
    return <div>Custom Component</div>;
  }

  document.body.innerHTML = '<div id="root"></div>';
  const attachHere = document.getElementById("root");

  const wrapper = mount(<CustomComponent></CustomComponent>, {
    attachTo: attachHere
  });

  expect(document.body.innerHTML).toMatchInlineSnapshot(
    '"<div id=\\"root\\"><div>Custom Component</div></div>"'
  );

  wrapper.detach();

  expect(document.body.innerHTML).toMatchInlineSnapshot(
    '"<div id=\\"root\\"></div>"'
  );
});

test("getDOMNode()", () => {
  const wrapper = mount(<div className="foo"></div>);
  const domNode = wrapper.getDOMNode();
  expect(domNode).toHaveProperty("className");
});

test("mount() and unmount()", () => {
  const willMount = jest.fn();
  const didMount = jest.fn();
  const willUnmount = jest.fn();

  class Foo extends React.Component {
    constructor(props) {
      super(props);
      this.componentWillUnmount = willUnmount;
      this.componentWillMount = willMount;
      this.componentDidMount = didMount;
    }

    render() {
      const { id } = this.props;
      return <div className={id}>{id}</div>;
    }
  }

  Foo.propTypes = {
    id: PropTypes.string.isRequired
  };

  const wrapper = mount(<Foo id="foo" />);

  expect(willMount).toHaveBeenCalled();
  expect(didMount).toHaveBeenCalled();
  expect(willUnmount).not.toHaveBeenCalled();

  wrapper.unmount();
  expect(willMount).toHaveBeenCalledTimes(1);
  expect(didMount).toHaveBeenCalledTimes(1);
  expect(willUnmount).toHaveBeenCalledTimes(1);

  wrapper.mount();
  expect(willMount).toHaveBeenCalledTimes(2);
  expect(didMount).toHaveBeenCalledTimes(2);
  expect(willUnmount).toHaveBeenCalledTimes(1);
});

test("ref(refName)", () => {
  class Foo extends React.Component {
    render() {
      return (
        <div>
          <span ref="firstRef">First</span>
          <span ref="secondRef">Second</span>
          <span ref="thirdRef">Third</span>
        </div>
      );
    }
  }

  const wrapper = mount(<Foo />);
  expect(wrapper.ref("secondRef").innerHTML).toBe("Second");
});
`.trim();



class Enzymes3 extends Component {
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
      <h3>7-shallow-only-methods</h3>
      <div style={titles}>
      <PrismCode
        code={shallowOnly}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      
      <h3>8-full-dom-only-methods</h3>
      <div style={titles}>
      <PrismCode
        code={fullDomOnly}
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

export default (withStyles(styles)(Enzymes3));
