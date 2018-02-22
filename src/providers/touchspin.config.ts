import * as angular from 'angular';

import { ITouchSpinConfig, ITouchSpinConfigProvider, ITouchSpinOptions} from '../angular-touchspin';
import { StepDivisibilityType } from '../angular-touchspin.model';

export class TouchSpinConfig implements ITouchSpinConfigProvider, angular.IServiceProvider {
	private defaultTouchSpinOptions: ITouchSpinOptions;

	constructor() {
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
			forceStepDivisibility: StepDivisibilityType.round,
			stepInterval: 100,
			stepIntervalDelay: 500,
			verticalButtons: false,
			verticalDownClass: 'glyphicon glyphicon-chevron-down',
			verticalUpClass: 'glyphicon glyphicon-chevron-up'
		}
	}

	defaults(options: ITouchSpinOptions) {
		this.defaultTouchSpinOptions = angular.extend({}, this.defaultTouchSpinOptions, options);
	}
	$get(): ITouchSpinConfig {
		return this.defaultTouchSpinOptions;
	}
}