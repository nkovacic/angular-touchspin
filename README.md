# Angular Touchspin

[![Build Status](http://img.shields.io/travis/nkovacic/angular-touchspin/master.svg?style=flat-square)](https://travis-ci.org/nkovacic/angular-touchspin)
[![Code Climate](http://img.shields.io/codeclimate/github/nkovacic/angular-touchspin.svg?style=flat-square)](https://codeclimate.com/github/nkovacic/angular-touchspin)
[![Test Coverage](http://img.shields.io/codeclimate/coverage/github/nkovacic/angular-touchspin.svg?style=flat-square)](https://codeclimate.com/github/nkovacic/angular-touchspin)
[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://www.opensource.org/licenses/MIT)
[![NPM Release](https://img.shields.io/npm/v/angular-touchspin.svg?style=flat-square)](https://www.npmjs.org/package/angular-touchspin)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/angular-touchspin.svg?style=flat-square)](https://www.npmjs.org/package/angular-touchspin)

**angular-touchspin** is a port of [istvan-ujjmeszaros/bootstrap-touchspin](https://github.com/istvan-ujjmeszaros/bootstrap-touchspin). It could now show some differences with it.

The goal is to provide the same API than the original one but without jQuery and using all the angular power.

<!---
## Demo

[Demo](http://nkovacic.github.io/angular-touchspin/)
-->
## Requirements

1. `AngularJS` ≥ `1.4.x`
1. `Bootstrap` ≥ `3.x` for the default styles (Can use `bootstrap-css-only`, you must add this to your bower or include this manually)
5. NOTE: please check the requirements for earlier releases, if these are an issue.

### Where to get it

**Via Bower:**

Run `bower install angular-touchspin` from the command line.
Include script tags similar to the following:
```html
<link rel='stylesheet' href='/bower_components/angular-touchspin/dist/angular-touchspin.css'>
<script src='/bower_components/angular-touchspin/dist/angular-touchspin.min.js'></script>
```

**Via NPM:**

Run `npm install angular-touchspin` from the command line.
Include script tags similar to the following:
```html
<link rel='stylesheet' href='/node_modules/angular-touchspin/dist/angular-touchspin.css'>
<script src='/node_modules/angular-touchspin/dist/angular-touchspin.min.js'></script>
```
Install using commonjs (eg componentjs, Webpack, Browserify):
```
angular.module('myModule', [require('angular-touchspin')]);
```
For CSS support with Webpack, install the style-loader, css-loader (and postcss-loader) and configure the loader in your webpack.config.js similar to the following:
```
loaders: [
  {test: /\.css$/, loader: 'style!css!postcss'}
]
```

**Via Github**

Download the code from [https://github.com/nkovacic/angular-touchspin/releases/latest](https://github.com/nkovacic/angular-touchspin/releases/latest), unzip the files then add script tags similar to the following:
```html
<link rel='stylesheet' href='/path/to/unzipped/files/dist/angular-touchspin.min.css'>
<script src='/path/to/unzipped/files/dist/angular-touchspin.min.js'></script>
```

### Usage

3. Include `angular-touchspin.min.js`
4. Add a dependency to `angular-touchspin` in your app module, for example: ```angular.module('myModule', ['nk.touchspin'])```.
5. Create an element to hold the control and add an `ng-model="numberVariable"` attribute where `numberVariable` is the scope variable that will hold the selected number value:
```html
<div touch-spin="{min: 0, max: 100}" ng-model="numberVariable"></div>
```
OR
```html
<touch-spin ng-model="numberVariable"></touch-spin>
```
This acts similar to a regular AngularJS / form input if you give it a name attribute, allowing for form submission and AngularJS form validation.
