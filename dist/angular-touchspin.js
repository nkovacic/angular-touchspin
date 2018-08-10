/*!
* angular-touchspin JavaScript Library v1.8.4
*
* @license MIT
*
* built with ♥ by Niko Kovačič <niko.kovacic2@gmail.com>
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["angular-touchspin"] = factory(require("angular"));
	else
		root["angular-touchspin"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var StepDivisibilityType;
	(function (StepDivisibilityType) {
	    StepDivisibilityType[StepDivisibilityType["none"] = 'none'] = "none";
	    StepDivisibilityType[StepDivisibilityType["ceil"] = 'ceil'] = "ceil";
	    StepDivisibilityType[StepDivisibilityType["floor"] = 'floor'] = "floor";
	    StepDivisibilityType[StepDivisibilityType["round"] = 'round'] = "round";
	})(StepDivisibilityType = exports.StepDivisibilityType || (exports.StepDivisibilityType = {}));

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "<div class=\"input-group bootstrap-touchspin\" ng-class=\"{ 'bootstrap-touchspin-disabled': vm.disabled }\">\r\n    <span class=\"input-group-btn\" ng-if=\"!vm.touchSpinOptions.verticalButtons && vm.touchSpinOptions.buttonDownShow\">\r\n        <button ng-class=\"vm.touchSpinOptions.buttonDownClass\" type=\"button\" ng-disabled=\"vm.disabled\" \r\n            ng-mousedown=\"vm.mouseDown($event, false)\" ng-mouseup=\"vm.mouseUp($event)\" ng-mouseenter=\"vm.mouseEnter($event)\" ng-mouseleave=\"vm.mouseLeave($event)\"\r\n            nk-touchstart=\"vm.buttonTouchStart($event, false)\" nk-touchend=\"vm.buttonTouchEnd($event)\">\r\n            -\r\n        </button>\r\n    </span>\r\n    <span class=\"input-group-addon\" ng-if=\"vm.touchSpinOptions.prefix\" ng-bind=\"vm.touchSpinOptions.prefix\">\r\n    </span>\r\n    <input type=\"text\" ng-model=\"vm.val\" class=\"form-control\" ng-disabled=\"vm.disabled\" ng-blur=\"vm.checkValue()\" ng-focus=\"vm.focus()\" ng-keyup=\"vm.keyUp($event)\" \r\n    ng-keydown=\"vm.keyDown($event)\" ng-readonly=\"vm.touchSpinOptions.inputReadOnly\" />\r\n    <span class=\"input-group-addon\" ng-class=\"vm.touchSpinOptions.postfixExtraClass\" ng-if=\"vm.touchSpinOptions.postfix\" ng-bind=\"vm.touchSpinOptions.postfix\">\r\n    </span>\r\n    <span class=\"input-group-btn\" ng-if=\"!vm.touchSpinOptions.verticalButtons && vm.touchSpinOptions.buttonUpShow\">\r\n        <button class=\"btn btn-default\" ng-class=\"vm.touchSpinOptions.buttonUpClass\" type=\"button\" ng-disabled=\"vm.disabled\" \r\n            ng-mousedown=\"vm.mouseDown($event, true)\" ng-mouseup=\"vm.mouseUp($event)\" ng-mouseenter=\"vm.mouseEnter($event)\" ng-mouseleave=\"vm.mouseLeave($event)\"\r\n            nk-touchstart=\"vm.buttonTouchStart($event, true)\" nk-touchend=\"vm.buttonTouchEnd($event)\">\r\n            +\r\n        </button>\r\n    </span>\r\n    <span class=\"input-group-btn-vertical\" ng-if=\"vm.touchSpinOptions.verticalButtons && (vm.touchSpinOptions.buttonDownShow || vm.touchSpinOptions.buttonUpShow)\">\r\n        <button class=\"bootstrap-touchspin-up\" ng-class=\"vm.touchSpinOptions.buttonUpClass\" type=\"button\" ng-disabled=\"vm.disabled\" ng-show=\"vm.touchSpinOptions.buttonUpShow\"\r\n            ng-mousedown=\"vm.mouseDown($event, false)\" ng-mouseup=\"vm.mouseUp($event)\" ng-mouseenter=\"vm.mouseEnter($event)\" \r\n            ng-mouseleave=\"vm.mouseLeave($event)\" nk-touchstart=\"vm.buttonTouchStart($event, false)\" nk-touchend=\"vm.buttonTouchEnd($event)\">\r\n            <i ng-class=\"vm.touchSpinOptions.verticalUpClass\"></i>\r\n        </button>\r\n        <button class=\"bootstrap-touchspin-down\" ng-class=\"vm.touchSpinOptions.buttonUpClass\" type=\"button\" ng-disabled=\"vm.disabled\" ng-show=\"vm.touchSpinOptions.buttonDownShow\"\r\n            ng-mousedown=\"vm.mouseDown($event, true)\" ng-mouseup=\"vm.mouseUp($event)\" ng-mouseenter=\"vm.mouseEnter($event)\" \r\n            ng-mouseleave=\"vm.mouseLeave($event)\" nk-touchstart=\"vm.buttonTouchStart($event, true)\" nk-touchend=\"vm.buttonTouchEnd($event)\">\r\n            <i ng-class=\"vm.touchSpinOptions.verticalDownClass\"></i>\r\n        </button>\r\n    </span>\r\n</div>\r\n";

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular_es6_1 = __webpack_require__(13);
	var touchspin_directive_1 = __webpack_require__(9);
	var touchend_directive_1 = __webpack_require__(7);
	var touchstart_directive_1 = __webpack_require__(11);
	var touchspin_config_1 = __webpack_require__(12);
	module.exports = angular_es6_1.AngularES6.module('nk.touchspin').directive('touchSpin', touchspin_directive_1.TouchSpinDirective).directive('nkTouchend', touchend_directive_1.TouchEndDirective).directive('nkTouchstart', touchstart_directive_1.TouchStartDirective).provider('touchSpinConfig', touchspin_config_1.TouchSpinConfig).name;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var angular = __webpack_require__(1);
	var TouchEndController = /** @class */(function () {
	    TouchEndController.$inject = ["$element", "$attrs", "$scope"];
	    function TouchEndController($element, $attrs, $scope) {
	        'ngInject';
	        this.$element = $element;
	        this.$attrs = $attrs;
	        this.$scope = $scope;
	        if (angular.version.major === 1 && angular.version.minor < 5) {
	            this.$onInit();
	        }
	    }
	    TouchEndController.prototype.$onInit = function () {
	        this.initializeEvents();
	    };
	    TouchEndController.prototype.initializeEvents = function () {
	        var _this = this;
	        this.$element.on('touchend', function (event) {
	            _this.$scope.$apply(function () {
	                _this.$scope.$eval(_this.$attrs['nkTouchend'], { $event: event });
	            });
	        });
	    };
	    return TouchEndController;
	})();
	exports.TouchEndController = TouchEndController;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var touchend_controller_1 = __webpack_require__(6);
	var TouchEndDirective = /** @class */(function () {
	    function TouchEndDirective() {
	        this.restrict = 'A';
	        this.controller = touchend_controller_1.TouchEndController;
	    }
	    return TouchEndDirective;
	})();
	exports.TouchEndDirective = TouchEndDirective;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var angular = __webpack_require__(1);
	var angular_touchspin_model_1 = __webpack_require__(2);
	var TouchSpinController = /** @class */(function () {
	    TouchSpinController.$inject = ["$element", "$attrs", "$scope", "$interval", "$timeout", "touchSpinConfig"];
	    function TouchSpinController($element, $attrs, $scope, $interval, $timeout, touchSpinConfig) {
	        'ngInject';
	        this.$element = $element;
	        this.$attrs = $attrs;
	        this.$scope = $scope;
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
	        this.prepareWatchers();
	        this.initializeEvents();
	    };
	    TouchSpinController.prototype.startSpinUp = function () {
	        var _this = this;
	        this.checkValue(true);
	        if (this.touchSpinOptions.verticalButtons) {
	            this.decrement();
	        } else {
	            this.increment();
	        }
	        this.stopSpin(true);
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
	        this.checkValue(true);
	        if (this.touchSpinOptions.verticalButtons) {
	            this.increment();
	        } else {
	            this.decrement();
	        }
	        this.stopSpin(true);
	        this.clickStart = Date.now();
	        this.timeout = this.$timeout(function () {
	            _this.timer = _this.$interval(function () {
	                if (_this.touchSpinOptions.verticalButtons) {
	                    _this.increment();
	                } else {
	                    _this.decrement();
	                }
	            }, _this.touchSpinOptions.stepInterval);
	        }, this.touchSpinOptions.stepIntervalDelay);
	    };
	    TouchSpinController.prototype.stopSpin = function (force) {
	        var _this = this;
	        if (force || Date.now() - this.clickStart > this.touchSpinOptions.stepIntervalDelay) {
	            this.$timeout.cancel(this.timeout);
	            this.$interval.cancel(this.timer);
	        } else if (!this.isButtonTouching && !this.isMouseButtonDown) {
	            this.$timeout(function () {
	                _this.$timeout.cancel(_this.timeout);
	                _this.$interval.cancel(_this.timer);
	            }, this.touchSpinOptions.stepIntervalDelay);
	        }
	    };
	    TouchSpinController.prototype.checkValue = function (preventSameValueChange) {
	        if (this.ngModelController.$isEmpty(this.val)) {
	            this.changeValue(this.touchSpinOptions.min);
	        } else if (this.numberRegex.test(this.val)) {
	            var value = this.getNumberValue(this.val);
	            if (value > this.touchSpinOptions.max) {
	                this.changeValue(this.touchSpinOptions.max);
	            } else if (value < this.touchSpinOptions.min) {
	                this.changeValue(this.touchSpinOptions.min);
	            } else if (!preventSameValueChange) {
	                this.changeValue(value);
	            }
	            this.overwriteOldValue();
	        } else {
	            if (this.oldVal !== '') {
	                this.changeValue(this.getNumberValue(this.oldVal));
	            } else {
	                this.changeValue(this.touchSpinOptions.min);
	            }
	        }
	        this.focused = false;
	    };
	    TouchSpinController.prototype.focus = function () {
	        this.focused = true;
	    };
	    TouchSpinController.prototype.keyUp = function (event) {
	        var code = event.keyCode || event.which;
	        if (code === 40 /* ArrowDown */ || code === 38 /* ArrowUp */) {
	                this.stopSpin(true);
	                this.isKeyDown = false;
	                event.preventDefault();
	            }
	    };
	    TouchSpinController.prototype.keyDown = function (event) {
	        var code = event.keyCode || event.which;
	        if (code === 38 /* ArrowUp */ || code === 40 /* ArrowDown */) {
	                if (!this.isKeyDown) {
	                    if (code == 38 /* ArrowUp */) {
	                            this.startSpinUp();
	                        } else {
	                        this.startSpinDown();
	                    }
	                    this.isKeyDown = true;
	                }
	                event.preventDefault();
	            }
	    };
	    TouchSpinController.prototype.mouseDown = function (event, increment) {
	        if (!this.isButtonTouching) {
	            this.isMouseButtonDown = true;
	            if (increment) {
	                this.startSpinUp();
	            } else {
	                this.startSpinDown();
	            }
	        }
	    };
	    TouchSpinController.prototype.mouseUp = function (event) {
	        this.isMouseButtonDown = false;
	        this.stopSpin(true);
	    };
	    TouchSpinController.prototype.mouseLeave = function (event) {
	        if (this.isMouseButtonDown) {
	            this.mouseUp(event);
	        }
	    };
	    TouchSpinController.prototype.buttonTouchStart = function (event, increment) {
	        this.isButtonTouching = true;
	        if (increment) {
	            this.startSpinUp();
	        } else {
	            this.startSpinDown();
	        }
	    };
	    TouchSpinController.prototype.buttonTouchEnd = function (event) {
	        this.isButtonTouching = false;
	        this.stopSpin();
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
	                _this.overwriteOldValue(value.toString());
	                _this.changeValue(value, true, true);
	            }
	            return value;
	        });
	        if (angular.isDefined(this.min)) {
	            this.ngModelController.$validators['min'] = function (modelValue, viewValue) {
	                return modelValue >= _this.min;
	            };
	        }
	        if (angular.isDefined(this.max)) {
	            this.ngModelController.$validators['max'] = function (modelValue, viewValue) {
	                return modelValue < _this.max;
	            };
	        }
	    };
	    TouchSpinController.prototype.prepareOptions = function () {
	        this.prepareTouchspinOptions();
	        this.numberRegex = new RegExp("^-?(?:\\d+|\\d*" + this.escapeRegExp(this.touchSpinOptions.decimalsDelimiter) + "\\d+)$", 'i');
	        var value = this.ngModelController.$modelValue || this.touchSpinOptions.min;
	        this.changeValue(value, true, true);
	    };
	    TouchSpinController.prototype.prepareTouchspinOptions = function () {
	        this.touchSpinOptions = angular.extend({}, this.touchSpinConfig, this.options);
	    };
	    TouchSpinController.prototype.prepareWatchers = function () {
	        var _this = this;
	        this.$scope.$watch(function () {
	            return _this.options;
	        }, function (newValue, oldValue) {
	            if (newValue && !angular.equals(newValue, oldValue)) {
	                _this.prepareTouchspinOptions();
	            }
	        });
	    };
	    TouchSpinController.prototype.changeValue = function (value, supressNgModel, supressChangeEvent) {
	        var _this = this;
	        value = this.roundAccordingToSettings(value);
	        this.val = value.toFixed(this.touchSpinOptions.decimals);
	        if (this.touchSpinOptions.decimalsDelimiter !== '.') {
	            this.val = this.val.replace('.', ',');
	        }
	        if (!supressNgModel) {
	            this.ngModelController.$setViewValue(value);
	        }
	        if (!supressChangeEvent && this.$attrs['onChange']) {
	            var oldValue_1 = this.getNumberValue(this.oldVal),
	                value_1 = this.getNumberValue(this.val);
	            if (oldValue_1 != value_1) {
	                this.$timeout(function () {
	                    _this.onChange({ oldValue: oldValue_1, value: value_1 });
	                });
	            }
	        }
	    };
	    TouchSpinController.prototype.decrement = function () {
	        this.overwriteOldValue();
	        var value = this.getNumberValue(this.val) - this.touchSpinOptions.step;
	        if (value < this.touchSpinOptions.min) {
	            this.changeValue(this.touchSpinOptions.min);
	            return;
	        }
	        this.changeValue(value);
	    };
	    TouchSpinController.prototype.escapeRegExp = function (stringToGoIntoTheRegex) {
	        return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	    };
	    TouchSpinController.prototype.increment = function () {
	        this.overwriteOldValue();
	        var value = this.getNumberValue(this.val) + this.touchSpinOptions.step;
	        if (value > this.touchSpinOptions.max) {
	            this.changeValue(this.touchSpinOptions.max);
	            return;
	        }
	        this.changeValue(value);
	    };
	    TouchSpinController.prototype.getNumberValue = function (value) {
	        if (this.touchSpinOptions.decimalsDelimiter !== '.') {
	            value = value.replace(this.touchSpinOptions.decimalsDelimiter, '.');
	        }
	        return parseFloat(value);
	    };
	    TouchSpinController.prototype.overwriteOldValue = function (value) {
	        this.oldVal = value || this.val;
	    };
	    TouchSpinController.prototype.roundAccordingToSettings = function (value) {
	        var decimalValue = Math.pow(10, this.touchSpinOptions.decimals);
	        switch (this.touchSpinOptions.forceStepDivisibility) {
	            case angular_touchspin_model_1.StepDivisibilityType.ceil:
	                value = Math.ceil(value * decimalValue) / decimalValue;
	                break;
	            case angular_touchspin_model_1.StepDivisibilityType.floor:
	                value = Math.floor(value * decimalValue) / decimalValue;
	                break;
	            case angular_touchspin_model_1.StepDivisibilityType.round:
	                value = Math.round(value * decimalValue) / decimalValue;
	                break;
	            default:
	                break;
	        }
	        return value;
	    };
	    return TouchSpinController;
	})();
	exports.TouchSpinController = TouchSpinController;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var touchspin_controller_1 = __webpack_require__(8);
	__webpack_require__(3);
	var TouchSpinDirective = /** @class */(function () {
	    function TouchSpinDirective() {
	        this.restrict = 'EA';
	        this.require = '^ngModel';
	        this.scope = {};
	        this.bindToController = {
	            disabled: '=?',
	            max: '=?',
	            min: '=?',
	            onChange: '&',
	            options: '=?'
	        };
	        this.controller = touchspin_controller_1.TouchSpinController;
	        this.controllerAs = 'vm';
	        this.template = __webpack_require__(4);
	    }
	    return TouchSpinDirective;
	})();
	exports.TouchSpinDirective = TouchSpinDirective;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var angular = __webpack_require__(1);
	var TouchStartController = /** @class */(function () {
	    TouchStartController.$inject = ["$element", "$attrs", "$scope"];
	    function TouchStartController($element, $attrs, $scope) {
	        'ngInject';
	        this.$element = $element;
	        this.$attrs = $attrs;
	        this.$scope = $scope;
	        if (angular.version.major === 1 && angular.version.minor < 5) {
	            this.$onInit();
	        }
	    }
	    TouchStartController.prototype.$onInit = function () {
	        this.initializeEvents();
	    };
	    TouchStartController.prototype.initializeEvents = function () {
	        var _this = this;
	        this.$element.on('touchstart', function (event) {
	            _this.$scope.$apply(function () {
	                _this.$scope.$eval(_this.$attrs['nkTouchstart'], { $event: event });
	            });
	        });
	    };
	    return TouchStartController;
	})();
	exports.TouchStartController = TouchStartController;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var touchstart_controller_1 = __webpack_require__(10);
	var TouchStartDirective = /** @class */(function () {
	    function TouchStartDirective() {
	        this.restrict = 'A';
	        this.controller = touchstart_controller_1.TouchStartController;
	    }
	    return TouchStartDirective;
	})();
	exports.TouchStartDirective = TouchStartDirective;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var angular = __webpack_require__(1);
	var angular_touchspin_model_1 = __webpack_require__(2);
	var TouchSpinConfig = /** @class */(function () {
	    function TouchSpinConfig() {
	        this.defaultTouchSpinOptions = {
	            buttonDownClass: 'btn btn-default',
	            buttonDownShow: true,
	            buttonUpClass: 'btn btn-default',
	            buttonUpShow: true,
	            decimals: 0,
	            decimalsDelimiter: '.',
	            max: 100,
	            min: 0,
	            inputReadOnly: false,
	            step: 1,
	            mousewheel: true,
	            prefix: '',
	            postfix: '',
	            forceStepDivisibility: angular_touchspin_model_1.StepDivisibilityType.round,
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var angular = __webpack_require__(1);
	var AngularES6 = /** @class */(function () {
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
	                args[_i] = arguments[_i];
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
	                args[_i] = arguments[_i];
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