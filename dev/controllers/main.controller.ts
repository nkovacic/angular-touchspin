export class MainController {
	public touchSpinOptions: angularTouchspin.ITouchSpinOptions;
	public value: number;

	constructor() {
		this.touchSpinOptions = {
			decimals: 2,
			max: 100,
			min: 1,
			step: 1
		};
	}	
}