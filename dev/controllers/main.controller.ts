export class MainController {
	public touchSpinOptions: angularTouchSpin.ITouchSpinOptions;
	public value: number;

	constructor() {
		this.touchSpinOptions = {
			decimals: 2,
			max: 100,
			min: 1,
			step: 0.1,
			postfix: '%'
		};
	}	
}