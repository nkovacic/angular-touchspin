import { AngularES6 } from './utilities/angular-es6';
import { TouchSpinDirective } from './components/touchspin/touchspin.directive';
import { TouchSpinConfig } from './providers/touchspin.config';

export = AngularES6
	.module('nk.touchspin')
	.directive('touchSpin', TouchSpinDirective)
	.provider('touchSpinConfig', TouchSpinConfig)
	.name;
	