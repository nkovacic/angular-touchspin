import * as angular from 'angular';

import { ITouchSpinOptions, ITouchSpinConfig } from '../../angular-touchspin';
import { StepDivisibilityType } from '../../angular-touchspin.model';

const enum Char {
	ArrowDown = 40,
	ArrowUp = 38
}

export class TouchSpinController {
	public disabled: boolean;
	public max: number;
	public min: number;
	public options: ITouchSpinOptions;
	public val: string;

	private clickStart: number;
	private focused: boolean;
	private inputElement: angular.IAugmentedJQuery;
	private isButtonTouching: boolean;
	private isMouseButtonDown: boolean;
	private numberRegex: RegExp;
	private ngModelController: angular.INgModelController;
	private oldVal: string;
	private timeout: angular.IPromise<any>;
	private timer: angular.IPromise<any>;
	private touchSpinOptions: ITouchSpinOptions;

	constructor(private $element: angular.IAugmentedJQuery, private $attrs: angular.IAttributes, private $scope: ng.IScope,
		private $interval: angular.IIntervalService, private $timeout: angular.ITimeoutService, private touchSpinConfig: ITouchSpinConfig) {
		'ngInject';

		this.inputElement = this.$element.find('input');

		if (angular.version.major === 1 && angular.version.minor < 5) {
			this.$onInit();
		}
	}

	public $onInit () {
		this.prepareNgModel();
		this.prepareOptions();
		this.prepareWatchers();
		this.initializeEvents();
	}
	public startSpinUp () {
		this.stopSpin();

		this.checkValue(true);

		if (this.touchSpinOptions.verticalButtons) {
			this.decrement();
		}
		else {
			this.increment();
		}

		this.clickStart = Date.now();

		this.timeout = this.$timeout(() => {
			this.timer = this.$interval(() => {
				if (this.touchSpinOptions.verticalButtons) {
					this.decrement();
				}
				else {
					this.increment();
				}
			}, this.touchSpinOptions.stepInterval);
		}, this.touchSpinOptions.stepIntervalDelay);
	}
	public startSpinDown() {
		this.stopSpin();

		this.checkValue(true);

		if (this.touchSpinOptions.verticalButtons) {
			this.increment();
		}
		else {
			this.decrement();
		}

		this.clickStart = Date.now();

		this.timeout = this.$timeout(() => {
			this.timer = this.$interval(() => {
				if (this.touchSpinOptions.verticalButtons) {
					this.increment();
				}
				else {
					this.decrement();
				}
			}, this.touchSpinOptions.stepInterval);
		}, this.touchSpinOptions.stepIntervalDelay);
	}
	public stopSpin() {
		this.$timeout.cancel(this.timeout);
		this.$interval.cancel(this.timer);
	}
	public checkValue(preventSameValueChange?: boolean) {
		if (this.ngModelController.$isEmpty(this.val)) {
			this.changeValue(this.touchSpinOptions.min);
		}
		else if (this.numberRegex.test(this.val)) {
			let value = this.getNumberValue(this.val);

			if (value > this.touchSpinOptions.max) {
				this.changeValue(this.touchSpinOptions.max);
			}
			else if (value < this.touchSpinOptions.min) {
				this.changeValue(this.touchSpinOptions.min);
			}
			else if (!preventSameValueChange) {
				this.changeValue(value);
			}

			this.overwriteOldValue();
		}
		else {
			if (this.oldVal !== '') {
				this.changeValue(this.getNumberValue(this.oldVal))
			}
			else {
				this.changeValue(this.touchSpinOptions.min);
			}
		}

		this.focused = false;
	}
	public focus() {
		this.focused = true;
	}
	public keyUp(event: KeyboardEvent) {
    	let code = event.keyCode || event.which;

        if (code === Char.ArrowDown || code === Char.ArrowUp) {
			this.stopSpin();
			this.isKeyDown = false;
			event.preventDefault();
        }
    }
	public keyDown(event: KeyboardEvent) {
    	let code = event.keyCode || event.which;
		let isCodeUp = code === 38 /* ArrowUp */;
        let isCodeDown = code === 40 /* ArrowDown */;
        if (isCodeUp || isCodeDown) {
            if (!this.isKeyDown) {
                if (isCodeUp) {
                    this.startSpinUp();
                } else if (isCodeDown) {
                    this.startSpinDown();
                }
                this.isKeyDown = true;
            }
            event.preventDefault();
        }
    }
    public mouseDown(event: MouseEvent, increment: boolean) {
    	this.isMouseButtonDown = true;

		if (increment) {
			this.startSpinUp();
		}
		else {
			this.startSpinDown();
		}
    }
    public mouseUp(event: MouseEvent) {
		this.isMouseButtonDown = false;

    	this.stopSpin();
    }
    public mouseLeave(event: MouseEvent) {
    	if (this.isMouseButtonDown) {
    		this.mouseUp(event);
    	}
    }
    public buttonTouchStart(event: TouchEvent, increment: boolean) {
    	this.isButtonTouching = true;

    	if (increment) {
			this.startSpinUp();
		}
		else {
			this.startSpinDown();
		}
    }
    public buttonTouchEnd(event: TouchEvent) {
    	this.isButtonTouching = false;

    	this.stopSpin();
    }

	private initializeEvents() {
		this.inputElement.on(<any>'mousewheel DOMMouseScroll', (ev: JQueryMouseEventObject) => {
			if (!this.touchSpinOptions.mousewheel || !this.focused) {
				return;
			}

			let delta = !angular.isUndefined(ev.originalEvent) ? (<MouseWheelEvent>ev.originalEvent).wheelDelta || -(<MouseWheelEvent>ev.originalEvent).wheelDeltaY
				|| -(<MouseWheelEvent>ev.originalEvent).detail : (<any>ev).wheelDelta || -(<any>ev).wheelDeltaY || -(<any>ev).detail

			ev.stopPropagation();
			ev.preventDefault();

			if (delta < 0) {
				this.decrement();
			}
			else {
				this.increment();
			}
		});
	}
	private prepareNgModel() {
		this.ngModelController = this.$element.controller('ngModel');

		this.ngModelController.$formatters.push((value: number) => {
			if (angular.isNumber(value) && !this.ngModelController.$isEmpty(value)) {
				this.overwriteOldValue(value.toString());

				this.changeValue(value, true, true);
			}

			return value;
		});

		if (angular.isDefined(this.min)) {
			this.ngModelController.$validators['min'] = (modelValue: number, viewValue: number) => {
				return modelValue >= this.min;
			}
		}

		if (angular.isDefined(this.max)) {
			this.ngModelController.$validators['max'] = (modelValue: number, viewValue: number) => {
				return modelValue < this.max;
			}
		}
	}
	private prepareOptions() {
		this.prepareTouchspinOptions();
		this.numberRegex = new RegExp(`^-?(?:\\d+|\\d*${this.escapeRegExp(this.touchSpinOptions.decimalsDelimiter)}\\d+)$`, 'i');

		let value: number = this.ngModelController.$modelValue || this.touchSpinOptions.min;

		this.changeValue(value, true, true);
	}
	private prepareTouchspinOptions () {
		this.touchSpinOptions = angular.extend({}, this.touchSpinConfig, this.options);
	}
	private prepareWatchers() {
		this.$scope.$watch(() => this.options, (newValue: ITouchSpinOptions, oldValue: ITouchSpinOptions) => {
			if (newValue && !angular.equals(newValue, oldValue)) {
				this.prepareTouchspinOptions();
			}
		});
	}
	private changeValue (value: number, supressNgModel?: boolean, supressChangeEvent?: boolean) {
		value = this.roundAccordingToSettings(value);

		this.val = value.toFixed(this.touchSpinOptions.decimals);

		if (this.touchSpinOptions.decimalsDelimiter !== '.') {
			this.val = this.val.replace('.', ',');
		}

		if (!supressNgModel) {
			this.ngModelController.$setViewValue(value);
		}



		if (!supressChangeEvent && this.$attrs['onChange']) {
			let oldValue = this.getNumberValue(this.oldVal),
				value = this.getNumberValue(this.val);

			if (oldValue != value) {
				this.$timeout(() => {
					(<any>this).onChange({ oldValue: oldValue, value: value });
				});
			}
		}
	}
	private decrement () {
		this.overwriteOldValue();

		let value = this.getNumberValue(this.val) - this.touchSpinOptions.step;

		if (value < this.touchSpinOptions.min) {
			this.changeValue(this.touchSpinOptions.min);

			return;
		}

		this.changeValue(value);
	}
	private escapeRegExp(stringToGoIntoTheRegex) {
	    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}

	private increment () {
		this.overwriteOldValue();

		let value = this.getNumberValue(this.val) + this.touchSpinOptions.step;

		if (value > this.touchSpinOptions.max) {
			this.changeValue(this.touchSpinOptions.max);

			return;
		}

		this.changeValue(value);
	}
	private getNumberValue(value: string) {
		if (this.touchSpinOptions.decimalsDelimiter !== '.') {
			value = value.replace(this.touchSpinOptions.decimalsDelimiter, '.');
		}

		return parseFloat(value);
	}
	private overwriteOldValue(value?: string) {
		this.oldVal = value || this.val;
	}
	private roundAccordingToSettings(value: number) {
		let decimalValue = Math.pow(10, this.touchSpinOptions.decimals);

		switch (this.touchSpinOptions.forceStepDivisibility) {
			case StepDivisibilityType.ceil:
				value = Math.ceil(value * decimalValue) / decimalValue;
				break;
			case StepDivisibilityType.floor:
				value = Math.floor(value * decimalValue) / decimalValue;
				break;
			case StepDivisibilityType.round:
				value = Math.round(value * decimalValue) / decimalValue;
				break;
			default:
				break;
		}

		return  value;
	}
}
