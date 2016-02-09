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

	constructor(private $scope: angular.IScope, private $element: angular.IAugmentedJQuery, private $interval: angular.IIntervalService,
		private $timeout: angular.ITimeoutService, private touchSpinConfig: angularTouchSpin.ITouchSpinConfig) {
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
		let val: string;

		if (this.val !== '' && !this.val.match(/^-?(?:\d+|\d*\.\d+)$/i)) {
			this.val = this.oldVal !== '' ? parseFloat(this.oldVal).toFixed(this.touchSpinOptions.decimals) : this.touchSpinOptions.min.toFixed(this.touchSpinOptions.decimals);
			this.ngModelController.$setViewValue(val);
		}

		this.focused = false;
	}
	focus() {
		this.focused = true;
	}

	private initializeEvents() {
		this.inputElement.on('mousewheel DOMMouseScroll', (ev: MouseWheelEvent) => {
			if (!this.touchSpinOptions.mousewheel) {
				return;
			}

			let delta = ev.wheelDelta || -ev.wheelDeltaY || -ev.detail;

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
	}
	private prepareOptions() {
		this.touchSpinOptions = angular.extend({}, this.touchSpinConfig, this.options);
		this.val = (this.ngModelController.$modelValue || this.touchSpinOptions.initVal || this.touchSpinOptions.min).toFixed(this.touchSpinOptions.decimals);
	}
	private decrement () {
		this.oldVal = this.val;

		let value = parseFloat(this.val) - this.touchSpinOptions.step;

		if (value < this.touchSpinOptions.min) {
			this.val = this.touchSpinOptions.min.toFixed(this.touchSpinOptions.decimals);
			this.ngModelController.$setViewValue(value);

			return;
		}

		this.val = value.toFixed(this.touchSpinOptions.decimals);
		this.ngModelController.$setViewValue(value);
	}
	private increment () {
		this.oldVal = this.val;

		let value = parseFloat(this.val) + this.touchSpinOptions.step;

		if (value > this.touchSpinOptions.max) {
			return;
		}

		this.val = value.toFixed(this.touchSpinOptions.decimals) ;
		this.ngModelController.$setViewValue(value);
	}
}