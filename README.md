# webpack-config-parallel-builds

This repo is an example of webpack configuration to run multiple webpack instances and combine outputs together in a single `index.html` as a final step.

It allows to setup CI tasks to build separate ES5 and ES6 bundles in parallel.


## Installation

```
npm install
```

## Start dev server on `localhost:9000`

```
npm start
```

## Build (serves on `localhost:8000`)

```
npm run build
```

## Scripts


Build ES5 files (can be run in parallel)

```
npm run build:es5
```

Build ES6 files (can be run in parallel)

```
npm run build:es6
```

Create final `index.html`

```
npm run build:html 
```
