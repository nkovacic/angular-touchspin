import * as angular from 'angular';

import { ITouchSpinOptions } from '../../src/angular-touchspin';
import { StepDivisibilityType } from '../../src/angular-touchspin.model';

export class MainController {
	public touchSpinOptions: ITouchSpinOptions;
	public touchSpinDelimiterOptions: ITouchSpinOptions;
	public touchSpinVerticalOptions: ITouchSpinOptions;
	public touchSpinMax: number;
	public touchSpinMin: number;
	public currency: number;
	public currency1: number;
	public currency2: number;
	public currency3: number;
	public touchSpinDisabled: boolean;

	constructor() {
		this.currency = 10;
		this.currency1 = 20.99;
		this.currency2 = 30.99 * 0.5;
		this.currency3 = 50.99;
		this.touchSpinDisabled = false;
		this.touchSpinMin = 1;
		this.touchSpinMax = 90;

		this.touchSpinOptions = {
			decimals: 2,
			max: 100,
			min: 0,
			prefix: '$',
			forceStepDivisibility: StepDivisibilityType.floor
			//postfix: '%'
		};

		this.touchSpinDelimiterOptions = angular.extend({}, this.touchSpinOptions, <ITouchSpinOptions>{ 
			decimalsDelimiter: ',',
			stepIntervalDelay: 3000,
			prefix: '€'
		});

		this.touchSpinVerticalOptions = {
			decimals: 2,
			max: 100,
			min: 1,
			inputReadOnly: true,
			step: 0.1,
			prefix: '$',
			postfix: '%',
			verticalButtons: true
		};
	}

	onTouchSpinChange(oldValue: number, value: number) {
		console.log('OldValue: ' + oldValue + ', newValue: ' + value + ', Model: ' + this.currency3);
	}
}