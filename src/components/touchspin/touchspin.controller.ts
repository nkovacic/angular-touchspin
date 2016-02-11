export class TouchSpinController {
	public options: angularTouchSpin.ITouchSpinOptions;
	public val: string;

	private clickStart: number;
	private focused: boolean;
	private inputElement: angular.IAugmentedJQuery;
	private ngModelController: angular.INgModelController;
	private oldVal: string;
	private timeout: angular.IPromise<any>;
	private timer: angular.IPromise<any>;
	private touchSpinOptions: angularTouchSpin.ITouchSpinOptions;

	constructor(private $element: angular.IAugmentedJQuery, private $attrs: angular.IAttributes,
		private $interval: angular.IIntervalService, private $timeout: angular.ITimeoutService, private touchSpinConfig: angularTouchSpin.ITouchSpinConfig) {
		'ngInject';

		this.inputElement = this.$element.find('input');
		
		this.prepareNgModel();
		this.prepareOptions();
		this.initializeEvents();
	}

	startSpinUp () {
		this.checkValue();
		this.increment();

		this.clickStart = Date.now();
		this.stopSpin();

		this.$timeout(() => {
			this.timer = this.$interval(() => {
				this.increment();
			}, this.touchSpinOptions.stepInterval);
		}, this.touchSpinOptions.stepIntervalDelay);
	}
	startSpinDown() {
		this.checkValue();
		this.decrement();

		this.clickStart = Date.now();

		this.timeout = this.$timeout(() => {
			this.timer = this.$interval(() => {
				this.decrement();
			}, this.touchSpinOptions.stepInterval);
		}, this.touchSpinOptions.stepIntervalDelay);
	}
	stopSpin() {
		if (Date.now() - this.clickStart > this.touchSpinOptions.stepIntervalDelay) {
			this.$timeout.cancel(this.timeout);
			this.$interval.cancel(this.timer);
		} else {
			this.$timeout(() => {
				this.$timeout.cancel(this.timeout);
				this.$interval.cancel(this.timer);
			}, this.touchSpinOptions.stepIntervalDelay);
		}
	}
	checkValue() {
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
	focus() {
		this.focused = true;
	}

	private initializeEvents() {
		this.inputElement.on('mousewheel DOMMouseScroll', (ev: JQueryMouseEventObject) => {
			if (!this.touchSpinOptions.mousewheel) {
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
				this.val = value.toFixed(this.touchSpinOptions.decimals);
			}

			return value;
		});
	}
	private prepareOptions() {	
		this.touchSpinOptions = angular.extend({}, this.touchSpinConfig, this.options);
		
		let value: number = this.ngModelController.$modelValue || this.touchSpinOptions.initVal || this.touchSpinOptions.min;

		this.changeValue(value, true);
	}
	private changeValue (value: number, supressChangeEvent?: boolean) {
		let decimalValue = Math.pow(10, this.touchSpinOptions.decimals);

		value = Math.round(value * decimalValue) / decimalValue;

		this.val = value.toFixed(this.touchSpinOptions.decimals);
		this.ngModelController.$setViewValue(value);

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