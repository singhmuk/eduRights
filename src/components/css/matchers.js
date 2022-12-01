import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../ReactJs/styles.css'
import Sidebar from './sidebar';
import PrismCode from '../ReactJs/prismCode';


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


const matchers = `
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test("array assignment", () => {
  const data = [1];
  data.push(2);
  expect(data).toEqual([1, 2]);
});

test("adding positive numbers is not zero", () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

test("null", () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test("zero", () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test("two plus two", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test("adding floating point numbers", () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3);
  expect(value).toBeCloseTo(0.3);
});

test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});

const shoppingList = [
  "diapers",
  "kleenex",
  "trash bags",
  "paper towels",
  "beer"
];

test("the shopping list has beer on it", () => {
  expect(shoppingList).toContain("beer");
  expect(new Set(shoppingList)).toContain("beer");
});

class ConfigError extends Error {}

function compileAndroidCode() {
  throw new ConfigError("you are using the wrong JDK");
}

test("compiling android goes as expected", () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow("you are using the wrong JDK");
  expect(compileAndroidCode).toThrow(/JDK/);
});
`.trim();

const asynchronous = `
function fetchData(callback) {
  setTimeout(() => {
    callback("peanut butter");
  }, 100);
}

function fetchDataPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("peanut butter");
    }, 100);
  });
}

function fetchDataPromiseWithErrorMessage() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("error");
    }, 100);
  });
}

function fetchDataPromiseWithError() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("error"));
    }, 100);
  });
}

// Don't do this!
// test("the data is peanut butter", () => {
//   function callback(data) {
//     expect(data).toBe("peanut butter");
//   }

//   fetchData(callback);
// });

test("the data is peanut butter", (done) => {
  function callback(data) {
    expect(data).toBe("peanut butter");
    done();
  }

  fetchData(callback);
});

test("the data is peanut butter", () => {
  return fetchDataPromise().then(data => {
    expect(data).toBe("peanut butter");
  });
});

test("the fetch fails with an error", () => {
  expect.assertions(1);
  return fetchDataPromiseWithErrorMessage().catch(e =>
    expect(e).toMatch("error")
  );
});

test("the data is peanut butter", () => {
  return expect(fetchDataPromise()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", () => {
  return expect(fetchDataPromiseWithErrorMessage()).rejects.toMatch("error");
});

test("the data is peanut butter", async () => {
  const data = await fetchDataPromise();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchDataPromiseWithErrorMessage();
  } catch (e) {
    expect(e).toMatch("error");
  }
});

test("the data is peanut butter", async () => {
  await expect(fetchDataPromise()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  await expect(fetchDataPromiseWithError()).rejects.toThrow("error");
});
`.trim();

const teardown = `
let cities = [];

function initializeCityDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities.push("Vienna");
      cities.push("San Juan");
      resolve();
    }, 100);
  });
}

function clearCityDatabase() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cities = [];
      resolve();
    }, 100);
  });
}

function isCity(name) {
  return cities.includes(name);
}

beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

test("has only 2 cities", () => {
  expect(cities.length).toBe(2);
});
`.trim();

const mocks = `
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

test("mockFunctions", () => {
  const mockCallback = jest.fn(x => 42 + x);
  forEach([0, 1], mockCallback);

  // The mock function is called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});

test("this", () => {
  const myMock = jest.fn();

  const a = new myMock();
  a.name = "a";
  const b = {};
  b.name = "b";
  const bound = myMock.bind(b);
  bound();

  console.log(myMock.mock.instances);
  // > [ <a>, <b> ]
});

test("someMockFunction", () => {
  const someMockFunction = jest.fn(() => "return value");

  someMockFunction("first arg", "second arg");

  // The function was called exactly once
  expect(someMockFunction.mock.calls.length).toBe(1);

  // The first arg of the first call to the function was 'first arg'
  expect(someMockFunction.mock.calls[0][0]).toBe("first arg");

  // The second arg of the first call to the function was 'second arg'
  expect(someMockFunction.mock.calls[0][1]).toBe("second arg");

  // The return value of the first call to the function was 'return value'
  expect(someMockFunction.mock.results[0].value).toBe("return value");

  const SomeMockConstructor = jest.fn();
  const a = new SomeMockConstructor();
  a.name = "test";
  const b = new SomeMockConstructor();

  // This function was instantiated exactly twice
  expect(SomeMockConstructor.mock.instances.length).toBe(2);

  // The object returned by the first instantiation of this function
  // had a 'name' property whose value was set to 'test'
  expect(SomeMockConstructor.mock.instances[0].name).toEqual("test");
});

test("mockReturnValueOnce", () => {
  const myMock = jest.fn();
  console.log(myMock());
  // > undefined

  myMock
    .mockReturnValue(true)
    .mockReturnValueOnce(10)
    .mockReturnValueOnce("x");

  console.log(myMock(), myMock(), myMock(), myMock());
});

test("filterTest", () => {
  const filterTestFn = jest.fn();

  // Make the mock return 'true' for the first call, and 'false' for the second call
  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

  const result = [11, 12].filter(filterTestFn);

  console.log(result);
  // > [11]
  console.log(filterTestFn.mock.calls);
  // > [ [11], [12] ]
});

test("mockImplementation", () => {
  const myMockFn = jest.fn(cb => cb(null, true));

  myMockFn((err, val) => console.log(val));
  // > true
});

test("mockImplementationOnce", () => {
  const myMockFn = jest
    .fn(() => "default")
    .mockImplementationOnce(() => "first call")
    .mockImplementationOnce(() => "second call");

  console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
  // > 'first call', 'second call', 'default', 'default'
});

test("return this", () => {
  const myObj = {
    myMethod: jest.fn().mockReturnThis()
  };

  // is the same as
  const otherObj = {
    myMethod: jest.fn(function() {
      return this;
    })
  };

  console.log(myObj.myMethod());
  console.log(otherObj.myMethod());
});

test("mockName", () => {
  const myMockFn = jest
    .fn()
    .mockReturnValue("default")
    .mockImplementation(scalar => 42 + scalar)
    .mockName("add42");

  // expect(myMockFn).toBeCalled();
});

test("custom matchers", () => {
  const mockFunc = jest.fn();

  const arg1 = "arg1";
  const arg2 = "arg2";

  mockFunc(arg1, arg2);

  // The mock function was called at least once
  expect(mockFunc).toBeCalled();

  // The mock function was called at least once with the specified args
  expect(mockFunc).toBeCalledWith(arg1, arg2);

  // The last call to the mock function was called with the specified args
  expect(mockFunc).lastCalledWith(arg1, arg2);

  // All calls and the name of the mock is written as a snapshot
  expect(mockFunc).toMatchSnapshot();
});

test("common matchers", () => {
  const mockFunc = jest.fn().mockName("a mock name");

  const arg1 = 42;
  const arg2 = "arg2";

  mockFunc(arg1, arg2);

  // The mock function was called at least once
  expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

  // The mock function was called at least once with the specified args
  expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

  // The last call to the mock function was called with the specified args
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
    arg1,
    arg2
  ]);

  // The first arg of the last call to the mock function was '42'
  // (note that there is no sugar helper for this specific of an assertion)
  expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

  // A snapshot will check that a mock was invoked the same number of times,
  // in the same order, with the same arguments. It will also assert on the name.
  expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
  expect(mockFunc.getMockName()).toBe("a mock name");
});
`.trim();

const login = `
import React from 'react';
import { render, cleanup, fireEvent, wait, getByPlaceholderText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { shallow, configure, mount, simulate } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from "react-test-renderer";
import Login from '../../App/Login';

// https://www.apollographql.com/docs/react/recipes/testing/


afterEach(cleanup);

configure({ adapter: new Adapter() });
  let wrapper = shallow(<Login />);
  
let location = {
  href: '/login',
};

describe('Render the login page',() =>{
it('shows the login page', () => {
  const asFragment = renderer.create(<Login />).toJSON();
  expect(asFragment).toMatchSnapshot();
  });
})

// it('logs in as admin', async () => {
//   let setSession = (param) => {
//     window.localStorage.setItem('graphql_session', JSON.stringify(param));
//   };
//   const { getByLabelText, getByText, getByPlaceholderText } = render(
//     <Login location={location} setSession={setSession} />
//   );
//   })
  
  // fill out the form
  it('check username', () => {
  fireEvent.change(getByPlaceholderText(/Email/i), {
    target: { name: 'username', value: 'andre@nivoda.net' },
  });
  expect(wrapper.state('username')).toEqual('andre@nivoda.net');
})

  it('check user password', () => {
  fireEvent.change(getByPlaceholderText(/Password/i), {
    target: { name: 'password', value: 'test' },
  });
  expect(wrapper.state('password')).toEqual('test');
})

/* NOTE: Test needed for error handling case where if users don't enter anything, error 
message is present on the screen.
login check with right data
*/
test('login check with right data',()=>{
  wrapper = shallow(<Login/>);
  wrapper.find('input[type="text"]').simulate('change', {target: {
    name: 'username', value: 'andre@nivoda.net'}
  });
  
  wrapper.find('input[type="password"]').simulate('change', {
    target: {name: 'password', value: 'test'}
  });
  
  wrapper.find('button').simulate('click');
  expect(wrapper.state('isLogined')).toBe(true);
  /* Also, check if the function is being called
   on submit check if loader present on the screen
  */
  })
  
//login check with wrong data
/* 
 message - username of passwrod not correct (error: this.setState({"error_msg":"not correct"}))
 user entered wrong username of password - UI-> check if error message is present on th the Ui
*/
 test('login check with wrong data',()=>{
  wrapper = shallow(<Login/>);
  wrapper.find('input[type="text"]').simulate('change', {
    target: {name: 'username', value: 'andre@nivoda123.net'}
  });
  // console.log(wrapper.debug())
  
  wrapper.find('input[type="password"]').simulate('change', {
    target: {name: 'password', value: 'test123'}
  });
  
    wrapper.find('button').simulate('click');
    expect(wrapper.state('isLogined')).toBe(false);
  })

  it('click login button', () => {
    const { getByLabelText } = render(<Login location={location} />);
  fireEvent.click(getByLabelText(/login-button/i));
  wrapper.find('button').simulate('click');
  expect(wrapper.state('isLogined')).toBe();
})
  // await wait(() => getByText(/admin/i));

  // expect(getByText(/admin/i).textContent).toMatchSnapshot();
  // let session = window.localStorage.getItem('graphql_session');
  // expect(session).toMatchSnapshot();
`.trim();


class Matchers extends Component {
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
      <h3>Matchers</h3>
      <div style={titles}>
      <PrismCode
        code={matchers}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      
      <h3>3-testing-asynchronous-code</h3>
      <div style={titles}>
      <PrismCode
        code={asynchronous}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      
      <h3>4-setup-and-teardown</h3>
      <div style={titles}>
      <PrismCode
        code={teardown}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      
      <h3>5-mock-functions</h3>
      <div style={titles}>
      <PrismCode
        code={mocks}
        language="js"
        plugins={["line-numbers"]}
      />
      </div>
      <br/>
      
      <h3>Login</h3>
      <div style={titles}>
      <PrismCode
        code={login}
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

export default (withStyles(styles)(Matchers));
