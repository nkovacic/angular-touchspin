const enum Char {
	ArrowDown = 40,
	ArrowUp = 38
} 

export class TouchSpinController {
	public disabled: boolean;
	public options: angular.touchspin.ITouchSpinOptions;
	public val: string;
	
	private clickStart: number;
	private focused: boolean;
	private inputElement: angular.IAugmentedJQuery;
	private isButtonTouching: boolean;
	private isMouseButtonDown: boolean;
	private ngModelController: angular.INgModelController;
	private oldVal: string;
	private timeout: angular.IPromise<any>;
	private timer: angular.IPromise<any>;
	private touchSpinOptions: angular.touchspin.ITouchSpinOptions;

	constructor(private $element: angular.IAugmentedJQuery, private $attrs: angular.IAttributes,
		private $interval: angular.IIntervalService, private $timeout: angular.ITimeoutService, private touchSpinConfig: angular.touchspin.ITouchSpinConfig) {
		'ngInject';

		this.inputElement = this.$element.find('input');

		if (angular.version.major === 1 && angular.version.minor < 5) {
			this.$onInit();
		}
	}

	$onInit () {
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
			// if (this.timer) {
			// 	this.$interval.cancel(this.timer);
			// }

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

		this.$timeout(() => {
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
		} else {
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
		else if (!this.val.match(/^-?(?:\d+|\d*\.\d+)$/i)) {
			if (this.oldVal !== '') {
				this.changeValue(parseFloat(this.oldVal))
			}
			else {
				this.changeValue(this.touchSpinOptions.min);
			}
		}
		else {
			let value = parseFloat(this.val);

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

		this.focused = false;
	}
	public focus() {
		this.focused = true;
	}
	public keyUp(event: KeyboardEvent) {
    	let code = event.keyCode || event.which;

        if (code === Char.ArrowDown || code === Char.ArrowUp) {
            this.stopSpin();

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
    	console.log('mouse down: ' + event);

    	this.isMouseButtonDown = true;

		if (increment) {
			this.startSpinUp();
		}
		else {
			this.startSpinDown();
		}   	
    }
    public mouseUp(event: MouseEvent) {
    	console.log('mouse up: ' + event);
		this.isMouseButtonDown = false;
		
    	this.stopSpin();
    }
    public mouseLeave(event: MouseEvent) {
    	console.log('mouse leave: ' + event);

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
		this.inputElement.on('mousewheel DOMMouseScroll', (ev: JQueryMouseEventObject) => {
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
				this.changeValue(value, true, true);
			}

			return value;
		});
	}
	private prepareOptions() {
		this.touchSpinOptions = angular.extend({}, this.touchSpinConfig, this.options);

		let value: number = this.ngModelController.$modelValue || this.touchSpinOptions.min;

		this.changeValue(value, true, true);
	}
	private changeValue (value: number, supressNgModel?: boolean, supressChangeEvent?: boolean) {
		let decimalValue = Math.pow(10, this.touchSpinOptions.decimals);

		value = Math.round(value * decimalValue) / decimalValue;

		this.val = value.toFixed(this.touchSpinOptions.decimals);

		if (!supressNgModel) {
			this.ngModelController.$setViewValue(value);
		}	

		if (!supressChangeEvent && (<any>this.$attrs).onChange) {
			this.$timeout(() => {
				(<any>this).onChange({ value: value });
			});
		}
	}
	private decrement () {
		this.oldVal = this.val;

		let value = parseFloat(this.val) - this.touchSpinOptions.step;

		if (value < this.touchSpinOptions.min) {
			this.changeValue(this.touchSpinOptions.min);

			return;
		}

		this.changeValue(value);
	}
	private increment () {
		this.oldVal = this.val;

		let value = parseFloat(this.val) + this.touchSpinOptions.step;

		if (value > this.touchSpinOptions.max) {
			this.changeValue(this.touchSpinOptions.max);

			return;
		}

		this.changeValue(value);
	}
}