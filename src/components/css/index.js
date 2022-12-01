import React, { Suspense, lazy } from 'react';

const DevTools = lazy(() => import('./devtools'));
const CssBasics = lazy(() => import('./cssbasics'));
const Sass = lazy(() => import('./sass'));
const Html1 = lazy(() => import('./html_1'));
const ReatAPIS = lazy(() => import('./restApi'));
const Jest = lazy(() => import('./jest'));
const Matchers = lazy(() => import('./matchers'));
const Enzymes = lazy(() => import('./enzymes'));
const Enzymes2 = lazy(() => import('./enzyme2'));
const Enzymes3 = lazy(() => import('./enzyme3'));



const components = {
  CssBasics, Sass, ReatAPIS, Jest, Enzymes, Matchers, Enzymes2, Enzymes3, DevTools, Html1,
};

export { components };