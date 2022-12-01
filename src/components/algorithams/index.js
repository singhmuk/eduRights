import React, { Suspense, lazy } from 'react';

const IntroAlgo = lazy(() => import('./deepAlgorithams/introAlgo'));
const Graph = lazy(() => import('./deepAlgorithams/graph'));
const LinkedList = lazy(() => import('./deepAlgorithams/linkedList'));
const Queue = lazy(() => import('./deepAlgorithams/queue'));
const Stack = lazy(() => import('./deepAlgorithams/stack'));
const Sort = lazy(() => import('./deepAlgorithams/sort'));
const Search = lazy(() => import('./deepAlgorithams/searchAlgo'));
const Heap = lazy(() => import('./deepAlgorithams/heap'));
const TopTech = lazy(() => import('./deepAlgorithams/topTech'));
const DSLogic = lazy(() => import('./deepAlgorithams/stringAlgo'));
const DSLogic2 = lazy(() => import('./deepAlgorithams/arrayAlgo'));
const DSLogic3 = lazy(() => import('./deepAlgorithams/nestingArrAlgo'));
const DSLogic4 = lazy(() => import('./deepAlgorithams/numbersAlgo'));
const DSLogic5 = lazy(() => import('./deepAlgorithams/gameAlgo'));
const DSLogic6 = lazy(() => import('./deepAlgorithams/arrayStrAlgo'));
const DSLogic7 = lazy(() => import('./deepAlgorithams/arrayNumAlgo'));
const DSLogic8 = lazy(() => import('./deepAlgorithams/dslogic8'));
const Trees = lazy(() => import('./deepAlgorithams/trees'));


const components = {
  Graph, LinkedList, Queue, IntroAlgo, Stack, Sort, Search, Heap, TopTech, DSLogic, DSLogic2, 
  DSLogic3, DSLogic4, DSLogic5, DSLogic6, DSLogic7, DSLogic8, Trees
};

export { components };