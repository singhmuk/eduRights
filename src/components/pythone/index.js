import React, { Suspense, lazy } from 'react';


const PyIntro = lazy(() => import('./deeppy/pyIntro'));
const IntroPython = lazy(() => import('./deeppy/introPython'));
const PyLogic = lazy(() => import('./deeppy/pyLogic'));

const Collections = lazy(() => import('./deeppy/collections'));
const CsvPython = lazy(() => import('./deeppy/csv'));
const Json = lazy(() => import('./deeppy/json'));
const Logics = lazy(() => import('./deeppy/logic_python'));
const Mathematics = lazy(() => import('./deeppy/mathematics'));
const OopsPyton = lazy(() => import('./deeppy/oops_'));
const Regex = lazy(() => import('./deeppy/regex'));
const Tkinter = lazy(() => import('./deeppy/tkinter'));
const LogicalsPy = lazy(() => import('./deeppy/logicalspy'));
const Abstract = lazy(() => import('./deeppy/abstract'));
const Tuples = lazy(() => import('./deeppy/tuples'));
const StringPy = lazy(() => import('./deeppy/stringPy'));
const IteratorsPy = lazy(() => import('./deeppy/iteratorsPy'));
const ExceptionsPy = lazy(() => import('./deeppy/exceptionsPy'));
const Logging = lazy(() => import('./deeppy/logging'));
const Threadings = lazy(() => import('./deeppy/threadings'));
const FlaskSignUp = lazy(() => import('./deeppy/flask_signUp'));
const GetSearch = lazy(() => import('./deeppy/get_search'));
const LoadSearch = lazy(() => import('./deeppy/load_search'));
const Conroures = lazy(() => import('./deeppy/conroutes'));
const HttpsMethods = lazy(() => import('./deeppy/httpsMethods'));
const FlaskIns = lazy(() => import('./deeppy/flasksIn'));



const components = {
  PyIntro, PyLogic, IntroPython, Collections, Threadings, FlaskSignUp, GetSearch, LoadSearch, FlaskIns,
  CsvPython, Json, Logics, Mathematics, OopsPyton, Regex, Tkinter, LogicalsPy,
  Abstract, Tuples, StringPy, IteratorsPy, ExceptionsPy, Logging, Conroures, HttpsMethods
};

export { components };