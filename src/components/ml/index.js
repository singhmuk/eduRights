import React, { Suspense, lazy } from 'react';


const InfoML = lazy(() => import('./deepMl/infoMl'));
const Capture = lazy(() => import('./deepMl/capture'));
const JoinImages = lazy(() => import('./deepMl/joinImages'));
const K_Mean = lazy(() => import('./deepMl/k_meanClustring'));
const Pandas = lazy(() => import('./deepMl/pandas'));
const Numpys = lazy(() => import('./deepMl/numpyPy'));
const Adaboots = lazy(() => import('./deepMl/adaboost'));
const DecisionTree = lazy(() => import('./deepMl/decisiontree'));
const KnnPy = lazy(() => import('./deepMl/knn'));
const LdaPy = lazy(() => import('./deepMl/lda'));
const LeanearRegression = lazy(() => import('./deepMl/leanearRegression'));
const LogisticReg = lazy(() => import('./deepMl/logisticRegrations'));
const NaiveBrs = lazy(() => import('./deepMl/naiveBar'));
const PcaPy = lazy(() => import('./deepMl/pcaPy'));
const Perceptron = lazy(() => import('./deepMl/perceptron'));
const RandomForest = lazy(() => import('./deepMl/randomForest'));
const Rgrations = lazy(() => import('./deepMl/regrations'));
const SvmPy = lazy(() => import('./deepMl/svmPy'));
const Gradient = lazy(() => import('./deepMl/gredient_decents'));

const Libraries = lazy(() => import('./deepMl/libraries'));
const Traning = lazy(() => import('./deepMl/training'));
const LogisticRegs = lazy(() => import('./deepMl/logisticReg'));
const GreedSearch = lazy(() => import('./deepMl/greedSearch'));
const Regularizations = lazy(() => import('./deepMl/regularizations'));
const Bagging = lazy(() => import('./deepMl/bagging'));
const FeaturesEng = lazy(() => import('./deepMl/featuresEng'));
const Superwise = lazy(() => import('./deepMl/superwise'));



const components = {
  Capture, JoinImages, K_Mean, Pandas, LogisticRegs, GreedSearch, Regularizations, Bagging, FeaturesEng,
  InfoML, Adaboots, DecisionTree, KnnPy, LdaPy, LeanearRegression,
  LogisticReg, NaiveBrs, PcaPy, Perceptron, RandomForest, Rgrations, SvmPy, Traning,
  Numpys, Libraries, Gradient,
  Superwise
};

export { components };