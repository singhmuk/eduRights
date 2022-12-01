import React, { Suspense, lazy } from 'react';

const IntroAngular = lazy(() => import('./deepAngularjs/introAngular'));
const Datatypests = lazy(() => import('./angular 12/datatypests'));
const TypeScript2 = lazy(() => import('./angular 12/typeScript_2'));
const TypeScript4 = lazy(() => import('./angular 12/typeScript_4'));
const AngularCompile = lazy(() => import('./deepAngularjs/angCompiler'));
const NeyralNetwork = lazy(() => import('./deepAngularjs/neural'));
const ActivationFuns = lazy(() => import('./deepAngularjs/activationFunctions'));
const Loss = lazy(() => import('./deepAngularjs/loss'));
const GradientNeural = lazy(() => import('./deepAngularjs/gradientNeural'));
const Stochastic = lazy(() => import('./deepAngularjs/stochastic'));
const Tensorboards = lazy(() => import('./deepAngularjs/tensors'));
const Benchmarking = lazy(() => import('./deepAngularjs/benchmarking'));
const Customer = lazy(() => import('./deepAngularjs/customer'));
const RegularizationDeep = lazy(() => import('./deepAngularjs/regularizationDeep'));
const Imbalanced = lazy(() => import('./deepAngularjs/imbalanced'));
const Imbalanced2 = lazy(() => import('./deepAngularjs/imbalanced2'));
const Convolutionals = lazy(() => import('./deepAngularjs/convolutionals'));
const dataAugmentation = lazy(() => import('./deepAngularjs/data_augmentation'));
const Transfer = lazy(() => import('./deepAngularjs/transfer'));
const WordEmbedding = lazy(() => import('./deepAngularjs/word_embedding'));
const TensorFlows = lazy(() => import('./deepAngularjs/tensorflow'));


const components = {
  IntroAngular, AngularCompile, Datatypests, NeyralNetwork, ActivationFuns,
  Loss, GradientNeural, Stochastic, TypeScript2, TypeScript4, Tensorboards, Benchmarking, Customer,
  RegularizationDeep, Imbalanced, Imbalanced2, Convolutionals, dataAugmentation, Transfer,
  WordEmbedding, TensorFlows
};

export { components };