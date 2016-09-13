export class MainController {
	public touchSpinOptions: angular.touchspin.ITouchSpinOptions;
	public currency: number;
	public currency1: number;
	public touchSpinDisabled: boolean;

	constructor() {
		this.currency1 = 10;
		this.touchSpinDisabled = false;
		this.touchSpinOptions = {
			decimals: 2,
			max: 100,
			min: 1,
			step: 0.1,
			prefix: '$',
			//postfix: '%'
		};
	}

	onTouchSpinChange(value: number) {
		console.log(value)
	}
}