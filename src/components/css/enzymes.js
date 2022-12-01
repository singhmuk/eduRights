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


const shallow = `
import React from "react";
import { shallow } from "enzyme";

const Foo = (props) => <div>
  <button onClick={() => props.onButtonClick && props.onButtonClick()}></button>
</div>;

const MyComponent = props => (
  <div>
    <Foo />
    <Foo />
    <Foo />
    <div className="icon-star"></div>
    {props.children}
  </div>
);

describe("<MyComponent />", () => {
  it("renders three <Foo /> components", () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find(Foo)).toHaveLength(3);
    expect(wrapper).toMatchInlineSnapshot('
      <div>
        <Foo />
        <Foo />
        <Foo />
        <div
          className="icon-star"
        />
      </div>
    ');
  });

  it("renders an '.icon-star'", () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find(".icon-star")).toHaveLength(1);
  });

  it("renders children when passed in", () => {
    const wrapper = shallow(
      <MyComponent>
        <div className="unique" />
      </MyComponent>
    );
    expect(wrapper.contains(<div className="unique" />)).toEqual(true);
    expect(wrapper).toMatchInlineSnapshot('
      <div>
        <Foo />
        <Foo />
        <Foo />
        <div
          className="icon-star"
        />
        <div
          className="unique"
        />
      </div>
    ');
  });

  it("simulates click events", () => {
    const onButtonClick = jest.fn();
    const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    wrapper.find("button").simulate("click");
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
`.trim();

const shallow2 = `
import React, { Suspense, Component } from "react";
import { shallow } from "enzyme";
import PropTypes from "prop-types";

const ThemeContext = React.createContext({ theme: "light" });

class ThemeComponent extends Component {
  render() {
    return (
      <ThemeContext.Provider value={{ theme: "dark" }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

class CustomComponent extends Component {
  state = {
    authenticated: false
  };

  componentDidMount() {
    this.setState({ authenticated: true });
  }

  render() {
    return (
      <div>
        <div id="theme">
          <ThemeContext.Consumer>
            {value => String(value.theme)}
          </ThemeContext.Consumer>
        </div>
        <div id="user">{this.state.authenticated ? "User" : "Guest"}</div>
      </div>
    );
  }
}

describe("options", () => {
  test("context", () => {
    function SimpleComponent(props, context) {
      const { name } = context;
      return <div>{name}</div>;
    }

    SimpleComponent.contextTypes = {
      name: PropTypes.string
    };

    const context = { name: "foo" };
    const wrapper = shallow(<SimpleComponent />, { context });
    expect(wrapper.text()).toEqual("foo");
  });

  test("disableLifecycleMethods", () => {
    const wrapper = shallow(<CustomComponent></CustomComponent>, {
      disableLifecycleMethods: true
    });

    expect(wrapper.find("#user").text()).toBe("Guest");
  });

  test("wrappingComponent", () => {
    const wrapper = shallow(<CustomComponent></CustomComponent>, {
      wrappingComponent: ThemeComponent
    });

    expect(wrapper.getWrappingComponent().html()).toMatchInlineSnapshot(
      '"<div><div id=\\"theme\\">dark</div><div id=\\"user\\">Guest</div></div>"'
    );
  });

  test("suspenseFallback", () => {
    const LazyComponent = React.lazy(() => import("../../LazyComponent"));

    const wrapper = shallow(
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>,
      { suspenseFallback: true }
    );

    expect(wrapper).toMatchInlineSnapshot('
      <div>
        Loading...
      </div>
    ');
  });
});
`.trim();

const fullDom = `
import { mount } from "enzyme";
import React from "react";

const Foo = props => (
  <div>
    <button onClick={() => props.onButtonClick && props.onButtonClick()} />
  </div>
);

const MyComponent = props => (
  <div>
    <Foo />
    <Foo />
    <Foo />
    <div className="icon-star"></div>
    {props.children}
  </div>
);

describe("<MyComponent />", () => {
  it("renders three <Foo /> components", () => {
    const wrapper = mount(<MyComponent />);
    expect(wrapper.find(Foo)).toHaveLength(3);
  });

  it("renders an '.icon-star'", () => {
    const wrapper = mount(<MyComponent />);
    expect(wrapper.find(".icon-star")).toHaveLength(1);
  });

  it("renders children when passed in", () => {
    const wrapper = mount(
      <MyComponent>
        <div className="unique" />
      </MyComponent>
    );
    expect(wrapper.contains(<div className="unique" />)).toEqual(true);

    expect(wrapper).toMatchInlineSnapshot('
      <MyComponent>
        <div>
          <Foo>
            <div>
              <button
                onClick={[Function]}
              />
            </div>
          </Foo>
          <Foo>
            <div>
              <button
                onClick={[Function]}
              />
            </div>
          </Foo>
          <Foo>
            <div>
              <button
                onClick={[Function]}
              />
            </div>
          </Foo>
          <div
            className="icon-star"
          />
          <div
            className="unique"
          />
        </div>
      </MyComponent>
    );
  });

  it("simulates click events", () => {
    const onButtonClick = jest.fn();
    const wrapper = mount(<Foo onButtonClick={onButtonClick} />);
    wrapper.find("button").simulate("click");
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });
});
`.trim();

const fullDom2 = `
import React, { Component } from "react";
import { mount } from "enzyme";
import PropTypes from "prop-types";

const ThemeContext = React.createContext({ theme: "light" });

class ThemeComponent extends Component {
  render() {
    return (
      <ThemeContext.Provider value={{ theme: this.props.theme || "dark" }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

class CustomComponent extends Component {
  state = {
    authenticated: false
  };

  componentDidMount() {
    this.setState({ authenticated: true });
  }

  render() {
    return (
      <div>
        <div id="theme">
          <ThemeContext.Consumer>
            {value => String(value.theme)}
          </ThemeContext.Consumer>
        </div>
        <div id="user">{this.state.authenticated ? "User" : "Guest"}</div>
      </div>
    );
  }
}

describe("options", () => {
  test("context", () => {
    function SimpleComponent(props, context) {
      const { name } = context;
      return <div>{name}</div>;
    }

    SimpleComponent.contextTypes = {
      name: PropTypes.string
    };

    const context = { name: "foo" };
    const wrapper = mount(<SimpleComponent />, { context });
    expect(wrapper.text()).toEqual("foo");
  });

  test("wrappingComponent", () => {
    const wrapper = mount(<CustomComponent></CustomComponent>, {
      wrappingComponent: ThemeComponent,
      wrappingComponentProps: { theme: "custom" }
    });

    expect(wrapper.getWrappingComponent().html()).toMatchInlineSnapshot(
      '"<div><div id=\\"theme\\">custom</div><div id=\\"user\\">User</div></div>"'
    );
  });

  test("attachTo", () => {
    document.body.innerHTML = '<div id="attach-here"></div><div id="not-here"></div>';
    const attachHere = document.getElementById("attach-here");

    mount(<CustomComponent></CustomComponent>, {
      attachTo: attachHere
    });

    expect(document.body.innerHTML).toMatchInlineSnapshot(
      '"<div id=\\"attach-here\\"><div><div id=\\"theme\\">light</div><div id=\\"user\\">User</div></div></div><div id=\\"not-here\\"></div>"'
    );
  });
});
`.trim();

const statics = `
import { render } from "enzyme";
import React from "react";
import PropTypes from "prop-types";

const Foo = props => (
  <div>
    <h1>{props.title}</h1>
    <div className="foo-bar"></div>
    <div className="foo-bar"></div>
    <div className="foo-bar"></div>
  </div>
);

describe("<Foo />", () => {
  it("renders three '.foo-bar's", () => {
    const wrapper = render(<Foo />);
    expect(wrapper.find(".foo-bar")).toHaveLength(3);
  });

  it("rendered the title", () => {
    const wrapper = render(<Foo title="unique" />);
    expect(wrapper.text()).toContain("unique");
  });

  it("renders a div", () => {
    const wrapper = render(<Foo />);
    expect(wrapper.html()).toMatch(/div/);
  });

  it("can pass in context", () => {
    function SimpleComponent(props, context) {
      const { name } = context;
      return <div>{name}</div>;
    }
    SimpleComponent.contextTypes = {
      name: PropTypes.string
    };

    const context = { name: "foo" };
    const wrapper = render(<SimpleComponent />, { context });
    expect(wrapper.text()).toEqual("foo");
  });
});
`.trim();

const selectors = `
function Foo(props) {
  return (
    <div>
      <button
        id="foo-button"
        onClick={() => props.onButtonClick && props.onButtonClick()}
      />
    </div>
  );
}

function MyComponent(props) {
  return (
    <div>
      <Foo anum={3} abool={false} />
      <Foo anum="3" abool="false" />
      <Foo id="foo-id" abool={undefined} />
      <div className="icon-star"></div>
      <a href="foo">Foo</a>
      {[1, 2, 3].map(item => (
        <div key={item}>{item}</div>
      ))}
      {props.children}
    </div>
  );
}

MyComponent.displayName = "My Component";

let wrapper;

beforeEach(() => {
  wrapper = mount(<MyComponent />);
});

afterEach(() => {
  wrapper.unmount();
});

test(".icon-start", () => {
  expect(wrapper.find(".icon-star")).toHaveLength(1);
});

test("button#foo-button", () => {
  expect(wrapper.find("button#foo-button")).toHaveLength(3);
});

test("a[href=foo]", () => {
  expect(wrapper.find('a[href="foo"]')).toHaveLength(1);
});

test("a[href=foo]", () => {
  expect(wrapper.find('a[href="foo"]')).toHaveLength(1);
});

test("#foo-id *", () => {
  expect(wrapper.find('#foo-id *')).toHaveLength(2);
});

test("key doesn't work", () => {
  expect(wrapper.find('[key=1]')).toHaveLength(0);
});

test("ref doesn't work", () => {
  class SimpleComponent extends React.Component {
    render() {
      return <div ref="foo">Ref</div>;
    }
  }

  const wrapper = mount(<SimpleComponent />);
  expect(wrapper.find('[ref="foo"]')).toHaveLength(0);
});

test("Foo", () => {
  expect(wrapper.find(Foo)).toHaveLength(3);
});

test.skip("My Component", () => {
  expect(wrapper.find("My Component")).toHaveLength(1);
});

test("anum={3} abool={false}", () => {
  expect(wrapper.find("[anum=3][abool=false]")).toHaveLength(1);

  expect(
    wrapper.find({
      anum: 3,
      abool: false
    })
  ).toHaveLength(1);
});

test('anum="3" abool="false"', () => {
  expect(wrapper.find('[anum="3"][abool="false"]')).toHaveLength(1);

  expect(
    wrapper.find({
      anum: "3",
      abool: "false"
    })
  ).toHaveLength(1);
});

test('abool={undefined}', () => {
  // wont work
  // expect(
  //   wrapper.find({
  //     aundefined: undefined
  //   })
  // ).toHaveLength(1);
  expect(
    wrapper.findWhere(n => n.is(Foo) && n.props().abool === undefined)
  ).toHaveLength(1);
});
`.trim();



class Enzymes extends Component {
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
      <h3>2-shallow-rendering</h3>
      <div style={titles}>
      <PrismCode
        code={shallow}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <b>shallow-rendering</b>
      <br/>
      <div style={titles}>
      <PrismCode
        code={shallow2}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      
      <h3>3-full-dom-rendering</h3>
      <div style={titles}>
      <PrismCode
        code={fullDom}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      <br/>
      <b>full-dom-rendering</b>
      <br/>
      <div style={titles}>
      <PrismCode
        code={fullDom}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      
      <h3>4-static-rendering</h3>
      <div style={titles}>
      <PrismCode
        code={statics}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      
      <h3>5-selectors</h3>
      <div style={titles}>
      <PrismCode
        code={selectors}
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

export default (withStyles(styles)(Enzymes));
