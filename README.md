# konigsberg

[![Build Status](https://travis-ci.org/jledentu/konigsberg.svg?branch=master)](https://travis-ci.org/jledentu/konigsberg) [![Coverage Status](https://coveralls.io/repos/github/jledentu/konigsberg/badge.svg?branch=master)](https://coveralls.io/github/jledentu/konigsberg?branch=master)

A browser/Node.js library for manipulating graphs and executing graph theory algorithms.

## Features

* **Directed** and **undirected** graphs
* Customizable data on nodes and edges
* Simple search algorithms (Depth First Search and Breadth First Search at the moment)
* Unit tested

## Installation

Install Konigsberg with npm:

```
npm install konigsberg
```

Or Bower:

```
bower install konigsberg
```

## Usage

In Node.js / Webpack / Browserify:

```js
var konigsberg = require('konigsberg');
var g = new konigsberg.DirectedGraph();
```

In the browser:

```html
<script src="konigsberg.js"></script>
<script>
    var g = new konigsberg.DirectedGraph();
    g.addNode('A');
    g.addNode('B');
    g.addEdge('A', 'B');
    console.log(g.hasEdge('A', 'B')); // true
</script>
```
