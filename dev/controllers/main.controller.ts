export class MainController {
	public touchSpinOptions: angularTouchSpin.ITouchSpinOptions;
	public currency: number;
	public currency1: number;

	constructor() {
		this.currency1 = 10;
		this.touchSpinOptions = {
			decimals: 2,
			max: 100,
			min: 1,
			step: 0.1,
			prefix: '$',
			postfix: '%'
		};
	}

	onTouchSpinChange(value: number) {
		console.log(value)
	}
}