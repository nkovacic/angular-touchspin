export class TouchSpinConfig implements angularTouchSpin.ITouchSpinConfigProvider, angular.IServiceProvider {
	private defaultTouchSpinOptions: angularTouchSpin.ITouchSpinOptions;

	constructor() {
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
		}
	}

	defaults(options: angularTouchSpin.ITouchSpinOptions) {
		this.defaultTouchSpinOptions = angular.extend({}, this.defaultTouchSpinOptions, options);
	}
	$get(): angularTouchSpin.ITouchSpinConfig {
		return this.defaultTouchSpinOptions;
	}
}