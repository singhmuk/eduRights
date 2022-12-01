import React, { Suspense, lazy } from 'react';


const Middleware = lazy(() => import('./deepExpress/middleware'));
const IntroExpress = lazy(() => import('./deepExpress/introExpress'));
const LoopbackCli = lazy(() => import('./deepExpress/loopbackcli'));
const ResDocs = lazy(() => import('./deepExpress/resDocs'));
const routerDocs = lazy(() => import('./deepExpress/routerDocs'));
const JQueies = lazy(() => import('./deepExpress/jqueries'));
const Backbonejs = lazy(() => import('./deepExpress/backbonejs'));
const UnderscorJs = lazy(() => import('./deepExpress/underscorejs'));


const components = {
  Middleware, IntroExpress, LoopbackCli, ResDocs, routerDocs, JQueies, Backbonejs, UnderscorJs
};

export { components };