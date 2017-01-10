/*!
* angular-touchspin JavaScript Library v1.4.4
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

	module.exports = "<div class=\"input-group bootstrap-touchspin\" ng-class=\"{ 'bootstrap-touchspin-disabled': vm.disabled }\">\r\n    <span class=\"input-group-btn\" ng-if=\"!vm.touchSpinOptions.verticalButtons\">\r\n        <button ng-class=\"vm.touchSpinOptions.buttonDownClass\" ng-disabled=\"vm.disabled\" ng-mousedown=\"vm.startSpinDown()\" ng-mouseup=\"vm.stopSpin()\">\r\n            -\r\n        </button>\r\n    </span>\r\n    <span class=\"input-group-addon\" ng-if=\"vm.touchSpinOptions.prefix\" ng-bind=\"vm.touchSpinOptions.prefix\">\r\n    </span>\r\n    <input type=\"text\" ng-model=\"vm.val\" class=\"form-control\" ng-disabled=\"vm.disabled\" ng-blur=\"vm.checkValue()\" ng-focus=\"vm.focus()\" ng-keyup=\"vm.keyUp($event)\" ng-keydown=\"vm.keyDown($event)\" />\r\n    <span class=\"input-group-addon\" ng-class=\"vm.touchSpinOptions.postfixExtraClass\" ng-if=\"vm.touchSpinOptions.postfix\" ng-bind=\"vm.touchSpinOptions.postfix\">\r\n    </span>\r\n    <span class=\"input-group-btn\" ng-if=\"!vm.touchSpinOptions.verticalButtons\">\r\n        <button class=\"btn btn-default\" ng-class=\"vm.touchSpinOptions.buttonUpClass\" ng-disabled=\"vm.disabled\" ng-mousedown=\"vm.startSpinUp()\" ng-mouseup=\"vm.stopSpin()\">\r\n            +\r\n        </button>\r\n    </span>\r\n    <span class=\"input-group-btn-vertical\" ng-if=\"vm.touchSpinOptions.verticalButtons\">\r\n        <button class=\"bootstrap-touchspin-up\" ng-class=\"vm.touchSpinOptions.buttonUpClass\" ng-disabled=\"vm.disabled\" \r\n            ng-mousedown=\"vm.startSpinDown()\" ng-mouseup=\"vm.stopSpin()\" type=\"button\">\r\n            <i ng-class=\"vm.touchSpinOptions.verticalUpClass\"></i>\r\n        </button>\r\n        <button class=\"bootstrap-touchspin-down\" ng-class=\"vm.touchSpinOptions.buttonUpClass\" ng-disabled=\"vm.disabled\"\r\n            ng-mousedown=\"vm.startSpinUp()\" ng-mouseup=\"vm.stopSpin()\" type=\"button\">\r\n            <i ng-class=\"vm.touchSpinOptions.verticalDownClass\"></i>\r\n        </button>\r\n    </span>\r\n</div>\r\n";

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular_es6_1 = __webpack_require__(7);
	var touchspin_directive_1 = __webpack_require__(5);
	var touchspin_config_1 = __webpack_require__(6);
	module.exports = angular_es6_1.AngularES6.module('nk.touchspin').directive('touchSpin', touchspin_directive_1.TouchSpinDirective).provider('touchSpinConfig', touchspin_config_1.TouchSpinConfig).name;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var TouchSpinController = (function () {
	    TouchSpinController.$inject = ["$element", "$attrs", "$interval", "$timeout", "touchSpinConfig"];
	    function TouchSpinController($element, $attrs, $interval, $timeout, touchSpinConfig) {
	        'ngInject';
	        this.$element = $element;
	        this.$attrs = $attrs;
	        this.$interval = $interval;
	        this.$timeout = $timeout;
	        this.touchSpinConfig = touchSpinConfig;
	        this.inputElement = this.$element.find('input');
	        if (angular.version.major === 1 && angular.version.minor < 5) {
	            this.$onInit();
	        }
	    }
	    TouchSpinController.prototype.$onInit = function () {
	        this.prepareNgModel();
	        this.prepareOptions();
	        this.initializeEvents();
	    };
	    TouchSpinController.prototype.startSpinUp = function () {
	        var _this = this;
	        this.checkValue();
	        if (this.touchSpinOptions.verticalButtons) {
	            this.decrement();
	        } else {
	            this.increment();
	        }
	        this.clickStart = Date.now();
	        this.timeout = this.$timeout(function () {
	            _this.timer = _this.$interval(function () {
	                if (_this.touchSpinOptions.verticalButtons) {
	                    _this.decrement();
	                } else {
	                    _this.increment();
	                }
	            }, _this.touchSpinOptions.stepInterval);
	        }, this.touchSpinOptions.stepIntervalDelay);
	    };
	    TouchSpinController.prototype.startSpinDown = function () {
	        var _this = this;
	        this.checkValue();
	        if (this.touchSpinOptions.verticalButtons) {
	            this.increment();
	        } else {
	            this.decrement();
	        }
	        this.clickStart = Date.now();
	        this.stopSpin();
	        this.$timeout(function () {
	            _this.timer = _this.$interval(function () {
	                if (_this.touchSpinOptions.verticalButtons) {
	                    _this.increment();
	                } else {
	                    _this.decrement();
	                }
	            }, _this.touchSpinOptions.stepInterval);
	        }, this.touchSpinOptions.stepIntervalDelay);
	    };
	    TouchSpinController.prototype.stopSpin = function () {
	        var _this = this;
	        if (Date.now() - this.clickStart > this.touchSpinOptions.stepIntervalDelay) {
	            this.$timeout.cancel(this.timeout);
	            this.$interval.cancel(this.timer);
	        } else {
	            this.$timeout(function () {
	                _this.$timeout.cancel(_this.timeout);
	                _this.$interval.cancel(_this.timer);
	            }, this.touchSpinOptions.stepIntervalDelay);
	        }
	    };
	    TouchSpinController.prototype.checkValue = function () {
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
	    };
	    TouchSpinController.prototype.focus = function () {
	        this.focused = true;
	    };
	    TouchSpinController.prototype.initializeEvents = function () {
	        var _this = this;
	        this.inputElement.on('mousewheel DOMMouseScroll', function (ev) {
	            if (!_this.touchSpinOptions.mousewheel || !_this.focused) {
	                return;
	            }
	            var delta = !angular.isUndefined(ev.originalEvent) ? ev.originalEvent.wheelDelta || -ev.originalEvent.wheelDeltaY || -ev.originalEvent.detail : ev.wheelDelta || -ev.wheelDeltaY || -ev.detail;
	            ev.stopPropagation();
	            ev.preventDefault();
	            if (delta < 0) {
	                _this.decrement();
	            } else {
	                _this.increment();
	            }
	        });
	    };
	    TouchSpinController.prototype.prepareNgModel = function () {
	        var _this = this;
	        this.ngModelController = this.$element.controller('ngModel');
	        this.ngModelController.$formatters.push(function (value) {
	            if (angular.isNumber(value) && !_this.ngModelController.$isEmpty(value)) {
	                _this.changeValue(value, true, true);
	            }
	            return value;
	        });
	    };
	    TouchSpinController.prototype.prepareOptions = function () {
	        this.touchSpinOptions = angular.extend({}, this.touchSpinConfig, this.options);
	        var value = this.ngModelController.$modelValue || this.touchSpinOptions.min;
	        this.changeValue(value, true, true);
	    };
	    TouchSpinController.prototype.changeValue = function (value, supressNgModel, supressChangeEvent) {
	        var _this = this;
	        var decimalValue = Math.pow(10, this.touchSpinOptions.decimals);
	        value = Math.round(value * decimalValue) / decimalValue;
	        this.val = value.toFixed(this.touchSpinOptions.decimals);
	        if (!supressNgModel) {
	            this.ngModelController.$setViewValue(value);
	        }
	        if (!supressChangeEvent && this.$attrs.onChange) {
	            this.$timeout(function () {
	                _this.onChange({ value: value });
	            });
	        }
	    };
	    TouchSpinController.prototype.decrement = function () {
	        this.oldVal = this.val;
	        var value = parseFloat(this.val) - this.touchSpinOptions.step;
	        if (value < this.touchSpinOptions.min) {
	            this.changeValue(this.touchSpinOptions.min);
	            return;
	        }
	        this.changeValue(value);
	    };
	    TouchSpinController.prototype.increment = function () {
	        this.oldVal = this.val;
	        var value = parseFloat(this.val) + this.touchSpinOptions.step;
	        if (value > this.touchSpinOptions.max) {
	            this.changeValue(this.touchSpinOptions.max);
	            return;
	        }
	        this.changeValue(value);
	    };
	    TouchSpinController.prototype.keyUp = function (event) {
	        var code = event.keyCode || event.which;
	        if (code === 40 /* ArrowDown */ || code === 38 /* ArrowUp */) {
	                this.stopSpin();
	            }
	    };
	    TouchSpinController.prototype.keyDown = function (event) {
	        var code = event.keyCode || event.which;
	        if (code === 38 /* ArrowUp */) {
	                this.increment();
	                event.preventDefault();
	            } else if (code === 40 /* ArrowDown */) {
	                this.decrement();
	                event.preventDefault();
	            }
	    };
	    return TouchSpinController;
	})();
	exports.TouchSpinController = TouchSpinController;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	var touchspin_controller_1 = __webpack_require__(4);
	var TouchSpinDirective = (function () {
	    function TouchSpinDirective() {
	        this.restrict = 'EA';
	        this.require = '^ngModel';
	        this.scope = {};
	        this.bindToController = {
	            disabled: '=?',
	            onChange: '&',
	            options: '=?'
	        };
	        this.controller = touchspin_controller_1.TouchSpinController;
	        this.controllerAs = 'vm';
	        this.template = __webpack_require__(2);
	    }
	    return TouchSpinDirective;
	})();
	exports.TouchSpinDirective = TouchSpinDirective;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var TouchSpinConfig = (function () {
	    function TouchSpinConfig() {
	        this.defaultTouchSpinOptions = {
	            buttonDownClass: 'btn btn-default',
	            buttonUpClass: 'btn btn-default',
	            decimals: 0,
	            max: 100,
	            min: 0,
	            step: 1,
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
	    TouchSpinConfig.prototype.defaults = function (options) {
	        this.defaultTouchSpinOptions = angular.extend({}, this.defaultTouchSpinOptions, options);
	    };
	    TouchSpinConfig.prototype.$get = function () {
	        return this.defaultTouchSpinOptions;
	    };
	    return TouchSpinConfig;
	})();
	exports.TouchSpinConfig = TouchSpinConfig;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	var AngularES6 = (function () {
	    function AngularES6(moduleName, dependancies) {
	        dependancies = dependancies || [];
	        this.name = moduleName;
	        this.angularModule = angular.module(moduleName, dependancies);
	    }
	    AngularES6.module = function (moduleName, dependancies) {
	        dependancies = dependancies || [];
	        return new AngularES6(moduleName, dependancies);
	    };
	    AngularES6.prototype.constant = function (name, value) {
	        this.angularModule.constant(name, value);
	        return this;
	    };
	    AngularES6.prototype.config = function (configFn) {
	        this.angularModule.config(configFn);
	        return this;
	    };
	    AngularES6.prototype.controller = function (name, constructorFn) {
	        this.angularModule.controller(name, constructorFn);
	        return this;
	    };
	    AngularES6.prototype.directive = function (name, constructorFn) {
	        var normalizedConstructorFn = this.normalizeConstructor(constructorFn);
	        if (!normalizedConstructorFn.prototype.compile) {
	            // create an empty compile function if none was defined.
	            normalizedConstructorFn.prototype.compile = function () {};
	        }
	        var originalCompileFn = this.cloneFunction(normalizedConstructorFn.prototype.compile);
	        // Decorate the compile method to automatically return the link method (if it exists)
	        // and bind it to the context of the constructor (so `this` works correctly).
	        // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
	        // returns `this.link` from within the compile function.
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
	    };
	    AngularES6.prototype.factory = function (name, constructorFn) {
	        constructorFn = this.normalizeConstructor(constructorFn);
	        var factoryArray = this.createFactoryArray(constructorFn);
	        this.angularModule.factory(name, factoryArray);
	        return this;
	    };
	    AngularES6.prototype.filter = function (name, constructorFn) {
	        //filterConstructorFn = this.normalizeConstructor(filterConstructorFn);
	        var filterArray = this.createFilterArray(constructorFn);
	        this.angularModule.filter(name, filterArray);
	        return this;
	    };
	    AngularES6.prototype.service = function (name, constructorFn) {
	        this.angularModule.service(name, constructorFn);
	        return this;
	    };
	    AngularES6.prototype.provider = function (name, constructorFn) {
	        this.angularModule.provider(name, constructorFn);
	        return this;
	    };
	    AngularES6.prototype.run = function (initializationFunction) {
	        this.angularModule.run(initializationFunction);
	        return this;
	    };
	    AngularES6.prototype.normalizeConstructor = function (inputConstructorFn) {
	        var constructorFn;
	        if (angular.isArray(inputConstructorFn.constructor)) {
	            var injected = inputConstructorFn.slice(0, inputConstructorFn.length - 1);
	            constructorFn = inputConstructorFn[inputConstructorFn.length - 1];
	            constructorFn.$inject = injected;
	        } else {
	            constructorFn = inputConstructorFn;
	        }
	        return constructorFn;
	    };
	    /**
	     * Convert a constructor function into a factory function which returns a new instance of that
	     * constructor, with the correct dependencies automatically injected as arguments.
	     *
	     * In order to inject the dependencies, they must be attached to the constructor function with the
	     * `$inject` property annotation.
	     *
	     * @param constructorFn
	     * @returns {Array.<T>}
	     * @private
	     */
	    AngularES6.prototype.createFactoryArray = function (constructorFn) {
	        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
	        var args = constructorFn.$inject || [],
	            factoryArray = args.slice(); // create a copy of the array
	        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
	        // dependency, and the final item is the factory function itself.
	        factoryArray.push(function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            //return new constructorFn(...args);
	            var instance = new (constructorFn.bind.apply(constructorFn, [void 0].concat(args)))();
	            /*
	            for (var key in instance) {
	                instance[key] = instance[key];
	            }*/
	            return instance;
	        });
	        return factoryArray;
	    };
	    AngularES6.prototype.createFilterArray = function (constructorFn) {
	        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
	        var args = constructorFn.$inject || [],
	            filterArray = args.slice(); // create a copy of the array
	        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
	        // dependency, and the final item is the factory function itself.
	        filterArray.push(function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            //return new constructorFn(...args);
	            var instance = new (constructorFn.bind.apply(constructorFn, [void 0].concat(args)))();
	            return instance.filter;
	        });
	        return filterArray;
	    };
	    /**
	     * Clone a function
	     * @param original
	     * @returns {Function}
	     */
	    AngularES6.prototype.cloneFunction = function (original) {
	        return function () {
	            return original.apply(this, arguments);
	        };
	    };
	    /**
	     * Override an object's method with a new one specified by `callback`.
	     * @param object
	     * @param methodName
	     * @param callback
	     */
	    AngularES6.prototype.override = function (object, methodName, callback) {
	        object[methodName] = callback(object[methodName]);
	    };
	    return AngularES6;
	})();
	exports.AngularES6 = AngularES6;

/***/ }
/******/ ])
});
;