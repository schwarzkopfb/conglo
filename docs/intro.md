---
sidebar: false
prev: /
next: ./guide/getting-started
---

# Introduction

Conglo is a toolset that provides a convenient way to compose expressive, asynchronous data transformation chains.
These _pipelines_ are based on the concept of [async iterators](https://www.codementor.io/tiagolopesferreira/asynchronous-iterators-in-javascript-jl1yg8la1). So they are most useful when dealing with collections but can come in handy in many other cases.

The library accepts both sync and async functions as _predicates_ and _selectors_ wherever it is possible. Besides that, it has first-class support for `Arrays`, `Sets`, `Maps`, `Promises` and other data types.

<<< @/examples/snippets/intro.js{4,5}

The above example fetches, combines, filters and summarizes data in just a few lines of code. Powerful, right?