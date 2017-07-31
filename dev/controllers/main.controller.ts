export class MainController {
	public touchSpinOptions: angular.touchspin.ITouchSpinOptions;
	public touchSpinVerticalOptions: angular.touchspin.ITouchSpinOptions;
	public currency: number;
	public currency1: number;
	public currency2: number;
	public touchSpinDisabled: boolean;

	constructor() {
		this.currency = 10;
		this.currency1 = 20;
		this.currency2 = 30;
		this.touchSpinDisabled = false;
		this.touchSpinOptions = {
			decimals: 2,
			max: 100,
			min: 1,
			prefix: '$',
			//postfix: '%'
		};

		this.touchSpinVerticalOptions = {
			decimals: 2,
			max: 100,
			min: 1,
			step: 0.1,
			prefix: '$',
			verticalButtons: true
		};
	}

	onTouchSpinChange(value: number) {
		console.log(value)
	}
}