export class TouchSpinConfig implements angular.touchspin.ITouchSpinConfigProvider, angular.IServiceProvider {
	private defaultTouchSpinOptions: angular.touchspin.ITouchSpinOptions;

	constructor() {
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
		}
	}

	defaults(options: angular.touchspin.ITouchSpinOptions) {
		this.defaultTouchSpinOptions = angular.extend({}, this.defaultTouchSpinOptions, options);
	}
	$get(): angular.touchspin.ITouchSpinConfig {
		return this.defaultTouchSpinOptions;
	}
}