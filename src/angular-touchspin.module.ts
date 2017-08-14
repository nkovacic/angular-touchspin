import { AngularES6 } from './utilities/angular-es6';
import { TouchSpinDirective } from './components/touchspin/touchspin.directive';
import { TouchEndDirective } from './components/touchend/touchend.directive';
import { TouchStartDirective } from './components/touchstart/touchstart.directive';
import { TouchSpinConfig } from './providers/touchspin.config';

export = AngularES6
	.module('nk.touchspin')
	.directive('touchSpin', TouchSpinDirective)
	.directive('nkTouchend', TouchEndDirective)
	.directive('nkTouchstart', TouchStartDirective)
	.provider('touchSpinConfig', TouchSpinConfig)
	.name;
	