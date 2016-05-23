/*!
* angular-touchspin JavaScript Library v1.1
*
* @license MIT
*
* built with ♥ by Niko Kovačič <niko.kovacic2@gmail.com>
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["angular-touchspin"] = factory();
	else
		root["angular-touchspin"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<div class=\"input-group bootstrap-touchspin\">\r\n    <span class=\"input-group-btn\" ng-if=\"!vm.touchSpinOptions.verticalButtons\">\r\n        <button ng-class=\"vm.touchSpinOptions.buttonDownClass\" ng-mousedown=\"vm.startSpinDown()\" ng-mouseup=\"vm.stopSpin()\">\r\n            -\r\n        </button>\r\n    </span>\r\n    <span class=\"input-group-addon\" ng-if=\"vm.touchSpinOptions.prefix\" ng-bind=\"vm.touchSpinOptions.prefix\">\r\n    </span>\r\n    <input type=\"text\" ng-model=\"vm.val\" class=\"form-control\" ng-blur=\"vm.checkValue()\" ng-focus=\"vm.focus()\"/>\r\n    <span class=\"input-group-addon\" ng-class=\"vm.touchSpinOptions.postfixExtraClass\" ng-if=\"vm.touchSpinOptions.postfix\" ng-bind=\"vm.touchSpinOptions.postfix\">\r\n    </span>\r\n    <span class=\"input-group-btn\" ng-if=\"!vm.touchSpinOptions.verticalButtons\">\r\n        <button class=\"btn btn-default\" ng-class=\"vm.touchSpinOptions.buttonUpClass\" ng-mousedown=\"vm.startSpinUp()\" ng-mouseup=\"vm.stopSpin()\">\r\n            +\r\n        </button>\r\n    </span>\r\n    <span class=\"input-group-btn-vertical\" ng-if=\"vm.touchSpinOptions.verticalButtons\">\r\n        <button class=\"bootstrap-touchspin-down\" ng-class=\"vm.touchSpinOptions.buttonUpClass\" ng-mousedown=\"vm.startSpinDown()\" ng-mouseup=\"vm.stopSpin()\" type=\"button\">\r\n            <i ng-class=\"vm.touchSpinOptions.verticalUpClass\"></i>\r\n        </button>\r\n        <button class=\"bootstrap-touchspin-up\" ng-class=\"vm.touchSpinOptions.buttonUpClass\" ng-mousedown=\"vm.startSpinUp()\" ng-mouseup=\"vm.stopSpin()\" type=\"button\">\r\n            <i ng-class=\"vm.touchSpinOptions.verticalDownClass\"></i>\r\n        </button>      \r\n    </span>\r\n</div>\r\n";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular_es6_1 = __webpack_require__(7);
	var touchspin_directive_1 = __webpack_require__(5);
	var touchspin_config_1 = __webpack_require__(6);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports['default'] = angular_es6_1.AngularES6.module('nk.touchspin').directive('touchSpin', touchspin_directive_1.TouchSpinDirective).provider('touchSpinConfig', touchspin_config_1.TouchSpinConfig).name;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TouchSpinController = (function () {
	    TouchSpinController.$inject = ["$element", "$attrs", "$interval", "$timeout", "touchSpinConfig"];
	    function TouchSpinController($element, $attrs, $interval, $timeout, touchSpinConfig) {
	        'ngInject';

	        _classCallCheck(this, TouchSpinController);

	        this.$element = $element;
	        this.$attrs = $attrs;
	        this.$interval = $interval;
	        this.$timeout = $timeout;
	        this.touchSpinConfig = touchSpinConfig;
	        this.inputElement = this.$element.find('input');
	        this.prepareNgModel();
	        this.prepareOptions();
	        this.initializeEvents();
	    }

	    _createClass(TouchSpinController, [{
	        key: 'startSpinUp',
	        value: function startSpinUp() {
	            var _this = this;

	            this.checkValue();
	            this.increment();
	            this.clickStart = Date.now();
	            this.stopSpin();
	            this.$timeout(function () {
	                _this.timer = _this.$interval(function () {
	                    _this.increment();
	                }, _this.touchSpinOptions.stepInterval);
	            }, this.touchSpinOptions.stepIntervalDelay);
	        }
	    }, {
	        key: 'startSpinDown',
	        value: function startSpinDown() {
	            var _this2 = this;

	            this.checkValue();
	            this.decrement();
	            this.clickStart = Date.now();
	            this.timeout = this.$timeout(function () {
	                _this2.timer = _this2.$interval(function () {
	                    _this2.decrement();
	                }, _this2.touchSpinOptions.stepInterval);
	            }, this.touchSpinOptions.stepIntervalDelay);
	        }
	    }, {
	        key: 'stopSpin',
	        value: function stopSpin() {
	            var _this3 = this;

	            if (Date.now() - this.clickStart > this.touchSpinOptions.stepIntervalDelay) {
	                this.$timeout.cancel(this.timeout);
	                this.$interval.cancel(this.timer);
	            } else {
	                this.$timeout(function () {
	                    _this3.$timeout.cancel(_this3.timeout);
	                    _this3.$interval.cancel(_this3.timer);
	                }, this.touchSpinOptions.stepIntervalDelay);
	            }
	        }
	    }, {
	        key: 'checkValue',
	        value: function checkValue() {
	            if (this.ngModelController.$isEmpty(this.val)) {
	                this.changeValue(this.touchSpinOptions.min);
	            } else if (!this.val.match(/^-?(?:\d+|\d*\.\d+)$/i)) {
	                if (this.oldVal !== '') {
	                    this.changeValue(parseFloat(this.oldVal));
	                } else {
	                    this.changeValue(this.touchSpinOptions.min);
	                }
	            } else {
	                var value = parseFloat(this.val);
	                if (value > this.touchSpinOptions.max) {
	                    this.changeValue(this.touchSpinOptions.max);
	                } else if (value < this.touchSpinOptions.min) {
	                    this.changeValue(this.touchSpinOptions.min);
	                } else {
	                    this.changeValue(value);
	                }
	            }
	            this.focused = false;
	        }
	    }, {
	        key: 'focus',
	        value: function focus() {
	            this.focused = true;
	        }
	    }, {
	        key: 'initializeEvents',
	        value: function initializeEvents() {
	            var _this4 = this;

	            this.inputElement.on('mousewheel DOMMouseScroll', function (ev) {
	                if (!_this4.touchSpinOptions.mousewheel) {
	                    return;
	                }
	                var delta = !angular.isUndefined(ev.originalEvent) ? ev.originalEvent.wheelDelta || -ev.originalEvent.wheelDeltaY || -ev.originalEvent.detail : ev.wheelDelta || -ev.wheelDeltaY || -ev.detail;
	                ev.stopPropagation();
	                ev.preventDefault();
	                if (delta < 0) {
	                    _this4.decrement();
	                } else {
	                    _this4.increment();
	                }
	            });
	        }
	    }, {
	        key: 'prepareNgModel',
	        value: function prepareNgModel() {
	            var _this5 = this;

	            this.ngModelController = this.$element.controller('ngModel');
	            this.ngModelController.$formatters.push(function (value) {
	                if (angular.isNumber(value) && !_this5.ngModelController.$isEmpty(value)) {
	                    _this5.val = value.toFixed(_this5.touchSpinOptions.decimals);
	                }
	                return value;
	            });
	        }
	    }, {
	        key: 'prepareOptions',
	        value: function prepareOptions() {
	            this.touchSpinOptions = angular.extend({}, this.touchSpinConfig, this.options);
	            var value = this.ngModelController.$modelValue || this.touchSpinOptions.initVal || this.touchSpinOptions.min;
	            this.changeValue(value, true);
	        }
	    }, {
	        key: 'changeValue',
	        value: function changeValue(value, supressChangeEvent) {
	            var _this6 = this;

	            var decimalValue = Math.pow(10, this.touchSpinOptions.decimals);
	            value = Math.round(value * decimalValue) / decimalValue;
	            this.val = value.toFixed(this.touchSpinOptions.decimals);
	            this.ngModelController.$setViewValue(value);
	            if (!supressChangeEvent && this.$attrs.onChange) {
	                this.$timeout(function () {
	                    _this6.onChange({ value: value });
	                });
	            }
	        }
	    }, {
	        key: 'decrement',
	        value: function decrement() {
	            this.oldVal = this.val;
	            var value = parseFloat(this.val) - this.touchSpinOptions.step;
	            if (value < this.touchSpinOptions.min) {
	                this.changeValue(this.touchSpinOptions.min);
	                return;
	            }
	            this.changeValue(value);
	        }
	    }, {
	        key: 'increment',
	        value: function increment() {
	            this.oldVal = this.val;
	            var value = parseFloat(this.val) + this.touchSpinOptions.step;
	            if (value > this.touchSpinOptions.max) {
	                this.changeValue(this.touchSpinOptions.max);
	                return;
	            }
	            this.changeValue(value);
	        }
	    }]);

	    return TouchSpinController;
	})();

	exports.TouchSpinController = TouchSpinController;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	__webpack_require__(1);
	var touchspin_controller_1 = __webpack_require__(4);

	var TouchSpinDirective = function TouchSpinDirective() {
	    _classCallCheck(this, TouchSpinDirective);

	    this.restrict = 'EA';
	    this.require = '^ngModel';
	    this.scope = {};
	    this.bindToController = {
	        onChange: '&',
	        options: '=?'
	    };
	    this.controller = touchspin_controller_1.TouchSpinController;
	    this.controllerAs = 'vm';
	    this.template = __webpack_require__(2);
	};

	exports.TouchSpinDirective = TouchSpinDirective;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TouchSpinConfig = (function () {
	    function TouchSpinConfig() {
	        _classCallCheck(this, TouchSpinConfig);

	        this.defaultTouchSpinOptions = {
	            buttonDownClass: 'btn btn-default',
	            buttonUpClass: 'btn btn-default',
	            decimals: 0,
	            max: 100,
	            min: 0,
	            step: 1,
	            initVal: 0,
	            mousewheel: true,
	            prefix: '',
	            postfix: '',
	            stepInterval: 100,
	            stepIntervalDelay: 500,
	            verticalButtons: false,
	            verticalDownClass: 'glyphicon glyphicon-chevron-down',
	            verticalUpClass: 'glyphicon glyphicon-chevron-up'
	        };
	    }

	    _createClass(TouchSpinConfig, [{
	        key: 'defaults',
	        value: function defaults(options) {
	            this.defaultTouchSpinOptions = angular.extend({}, this.defaultTouchSpinOptions, options);
	        }
	    }, {
	        key: '$get',
	        value: function $get() {
	            return this.defaultTouchSpinOptions;
	        }
	    }]);

	    return TouchSpinConfig;
	})();

	exports.TouchSpinConfig = TouchSpinConfig;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var _bind = Function.prototype.bind;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AngularES6 = (function () {
	    function AngularES6(moduleName, dependancies) {
	        _classCallCheck(this, AngularES6);

	        dependancies = dependancies || [];
	        this.name = moduleName;
	        this.angularModule = angular.module(moduleName, dependancies);
	    }

	    _createClass(AngularES6, [{
	        key: "constant",
	        value: function constant(name, value) {
	            this.angularModule.constant(name, value);
	            return this;
	        }
	    }, {
	        key: "config",
	        value: function config(configFn) {
	            this.angularModule.config(configFn);
	            return this;
	        }
	    }, {
	        key: "controller",
	        value: function controller(name, constructorFn) {
	            this.angularModule.controller(name, constructorFn);
	            return this;
	        }
	    }, {
	        key: "directive",
	        value: function directive(name, constructorFn) {
	            var normalizedConstructorFn = this.normalizeConstructor(constructorFn);
	            if (!normalizedConstructorFn.prototype.compile) {
	                normalizedConstructorFn.prototype.compile = function () {};
	            }
	            var originalCompileFn = this.cloneFunction(normalizedConstructorFn.prototype.compile);
	            this.override(normalizedConstructorFn.prototype, 'compile', function () {
	                return function () {
	                    originalCompileFn.apply(this, arguments);
	                    if (normalizedConstructorFn.prototype.link) {
	                        return normalizedConstructorFn.prototype.link.bind(this);
	                    }
	                };
	            });
	            var factoryArray = this.createFactoryArray(constructorFn);
	            this.angularModule.directive(name, factoryArray);
	            return this;
	        }
	    }, {
	        key: "factory",
	        value: function factory(name, constructorFn) {
	            constructorFn = this.normalizeConstructor(constructorFn);
	            var factoryArray = this.createFactoryArray(constructorFn);
	            this.angularModule.factory(name, factoryArray);
	            return this;
	        }
	    }, {
	        key: "filter",
	        value: function filter(name, constructorFn) {
	            var filterArray = this.createFilterArray(constructorFn);
	            this.angularModule.filter(name, filterArray);
	            return this;
	        }
	    }, {
	        key: "service",
	        value: function service(name, constructorFn) {
	            this.angularModule.service(name, constructorFn);
	            return this;
	        }
	    }, {
	        key: "provider",
	        value: function provider(name, constructorFn) {
	            this.angularModule.provider(name, constructorFn);
	            return this;
	        }
	    }, {
	        key: "run",
	        value: function run(initializationFunction) {
	            this.angularModule.run(initializationFunction);
	            return this;
	        }
	    }, {
	        key: "normalizeConstructor",
	        value: function normalizeConstructor(inputConstructorFn) {
	            var constructorFn = undefined;
	            if (angular.isArray(inputConstructorFn.constructor)) {
	                var injected = inputConstructorFn.slice(0, inputConstructorFn.length - 1);
	                constructorFn = inputConstructorFn[inputConstructorFn.length - 1];
	                constructorFn.$inject = injected;
	            } else {
	                constructorFn = inputConstructorFn;
	            }
	            return constructorFn;
	        }
	    }, {
	        key: "createFactoryArray",
	        value: function createFactoryArray(constructorFn) {
	            var args = constructorFn.$inject || [],
	                factoryArray = args.slice();
	            factoryArray.push(function () {
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                    args[_key] = arguments[_key];
	                }

	                var instance = new (_bind.apply(constructorFn, [null].concat(args)))();
	                return instance;
	            });
	            return factoryArray;
	        }
	    }, {
	        key: "createFilterArray",
	        value: function createFilterArray(constructorFn) {
	            var args = constructorFn.$inject || [],
	                filterArray = args.slice();
	            filterArray.push(function () {
	                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                    args[_key2] = arguments[_key2];
	                }

	                var instance = new (_bind.apply(constructorFn, [null].concat(args)))();
	                return instance.filter;
	            });
	            return filterArray;
	        }
	    }, {
	        key: "cloneFunction",
	        value: function cloneFunction(original) {
	            return function () {
	                return original.apply(this, arguments);
	            };
	        }
	    }, {
	        key: "override",
	        value: function override(object, methodName, callback) {
	            object[methodName] = callback(object[methodName]);
	        }
	    }], [{
	        key: "module",
	        value: function module(moduleName, dependancies) {
	            dependancies = dependancies || [];
	            return new AngularES6(moduleName, dependancies);
	        }
	    }]);

	    return AngularES6;
	})();

	exports.AngularES6 = AngularES6;

/***/ }
/******/ ])
});
;