import React, { Suspense, lazy } from 'react';


const IntroJs = lazy(() => import('./deepJs/introJs'));
const Arrays = lazy(() => import('./deepJs/array'));
const ArraysApi = lazy(() => import('./deepJs/arrayApi'));
const Clousers = lazy(() => import('./deepJs/clousers'));
const FindOutput = lazy(() => import('./deepJs/findOutput'));
const JsObject = lazy(() => import('./deepJs/jsObjects'));
const Logic = lazy(() => import('./deepJs/logic'));
const Methods = lazy(() => import('./deepJs/this'));

const Oops = lazy(() => import('./deepJs/oops'));
const Prototypes = lazy(() => import('./deepJs/prototypes'));

const KeyedCollections = lazy(() => import('./deepJs/keyedCollections'));
const RegularExp = lazy(() => import('./deepJs/regular'));

const HackerRank1 = lazy(() => import('./deepJs/hackerRank'));
const HackerRank6 = lazy(() => import('./deepJs/hackerRank6'));
const McqJs = lazy(() => import('./deepJs/mcqjs'));


const components = {
  Arrays, Clousers, FindOutput, JsObject, Logic, Methods, Prototypes, IntroJs,
  Oops, ArraysApi, KeyedCollections, RegularExp, McqJs, HackerRank1,
  HackerRank6
};

export { components };