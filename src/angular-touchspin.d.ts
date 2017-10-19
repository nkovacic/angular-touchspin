// Type definitions for Angular Touchspin v1.5.0
// Project: https://github.com/nkovacic/angular-touchspin
// Definitions by: Niko Kovačič <https://github.com/nkovacic>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference types="angular" />

import * as angular from 'angular';

export type ITouchSpinOptions = angularTouchspin.ITouchSpinOptions;
export type ITouchSpinConfig = angularTouchspin.ITouchSpinConfig;
export type ITouchSpinConfigProvider = angularTouchspin.ITouchSpinConfigProvider;

declare namespace angularTouchspin {
	interface ITouchSpinOptions {
		buttonDownClass?: string;	
		buttonDownShow?: boolean;	
		buttonDownTxt?: string;
		buttonUpClass?: string;
		buttonUpShow?: boolean;
		buttonUpTxt?: string;
		min?: number;
		max?: number;
		step?: number;
		decimals?: number;
		decimalsDelimiter?: string;
		stepInterval?: number;
		forceStepDivisibility?: string; // none | floor | round | ceil
		stepIntervalDelay?: number;
		verticalButtons?: boolean;
		verticalUpClass?: string;
		verticalDownClass?: string;
		prefix?: string;
		postfix?: string;
		prefixExtraClass?: string;
		postfixExtraClass?: string;
		mousewheel?: boolean;
	}

	interface ITouchSpinConfig extends ITouchSpinOptions { }

	interface ITouchSpinConfigProvider {
		defaults (touchSpinOptions: ITouchSpinOptions): void;
	}
}