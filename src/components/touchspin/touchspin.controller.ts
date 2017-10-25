import * as angular from 'angular';

import { ITouchSpinOptions, ITouchSpinConfig } from '../../angular-touchspin';

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

	constructor(private $element: angular.IAugmentedJQuery, private $attrs: angular.IAttributes,
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
		this.initializeEvents();
	}
	public startSpinUp () {
		this.checkValue();

		if (this.touchSpinOptions.verticalButtons) {
			this.decrement();
		}
		else {
			this.increment();
		}	

		this.stopSpin(true);

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
		this.checkValue();

		if (this.touchSpinOptions.verticalButtons) {
			this.increment();
		}
		else {
			this.decrement();
		}

		this.clickStart = Date.now();
		this.stopSpin();

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
	public stopSpin(force?: boolean) {
		if (force || Date.now() - this.clickStart > this.touchSpinOptions.stepIntervalDelay) {
			this.$timeout.cancel(this.timeout);
			this.$interval.cancel(this.timer);
		} else if (!this.isButtonTouching && !this.isMouseButtonDown) {
			this.$timeout(() => {
				this.$timeout.cancel(this.timeout);
				this.$interval.cancel(this.timer);
			}, this.touchSpinOptions.stepIntervalDelay);
		}
	}
	public checkValue() {
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
			else {
				this.changeValue(value);
			}
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
            this.stopSpin(true);

            event.preventDefault();
        }
    }
	public keyDown(event: KeyboardEvent) {
    	let  code = event.keyCode || event.which;

        if (code === Char.ArrowUp) {
        	this.startSpinUp();

        	event.preventDefault();
        }
        else if (code === Char.ArrowDown) {
            this.startSpinDown();

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
		
    	this.stopSpin(true);
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

		this.ngModelController.$formatters.push((value) => {
			if (angular.isNumber(value) && !this.ngModelController.$isEmpty(value)) {
				this.oldVal = this.val;

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
		this.touchSpinOptions = angular.extend({}, this.touchSpinConfig, this.options);
		this.numberRegex = new RegExp(`^-?(?:\\d+|\\d*${this.escapeRegExp(this.touchSpinOptions.decimalsDelimiter)}\\d+)$`, 'i');

		let value: number = this.ngModelController.$modelValue || this.touchSpinOptions.min;

		this.changeValue(value, true, true);
	}
	private changeValue (value: number, supressNgModel?: boolean, supressChangeEvent?: boolean) {
		let decimalValue = Math.pow(10, this.touchSpinOptions.decimals);

		value = Math.round(value * decimalValue) / decimalValue;

		this.val = value.toFixed(this.touchSpinOptions.decimals);

		if (this.touchSpinOptions.decimalsDelimiter !== '.') {
			this.val = this.val.replace('.', ',');
		}

		if (!supressNgModel) {
			this.ngModelController.$setViewValue(value);
		}	

		if (!supressChangeEvent && (<any>this.$attrs).onChange) {
			this.$timeout(() => {
				(<any>this).onChange({ oldValue: this.getNumberValue(this.oldVal), value: value });
			});
		}
	}
	private decrement () {
		this.oldVal = this.val;

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
		this.oldVal = this.val;

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
}