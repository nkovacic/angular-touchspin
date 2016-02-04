// Type definitions for Angular Locker v2.0.3
// Project: https://github.com/tymondesigns/angular-locker
// Definitions by: Niko Kovačič <https://github.com/nkovacic>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

//// <reference path="../angularjs/angular.d.ts" />


declare module "angular-touchspin" {
    let _: string;
    export = _;
}

declare module angularTouchspin {
	interface ITouchSpinOptions {
		min?: number;
		max?: number;
		step?: number;
		decimals?: number;
		stepInterval?: number;
		forceStepDivisibility?: string; // none | floor | round | ceil
		stepIntervalDelay?: number;
		verticalButtons?: boolean;
		verticalUpClass?: string;
		verticalDownClass?: string;
		initVal?: number;
		prefix?: string;
		postfix?: string;
		prefixExtraClass?: string;
		postfixExtraClass?: string;
		mousewheel?: boolean;
		buttonDownClass?: string;
		buttonUpClass?: string;
		buttonDownTxt?: string;
		buttonUpTxt?: string;
	}
}