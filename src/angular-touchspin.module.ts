import { AngularES6 } from './utilities/angular-es6';
import { TouchSpinDirective } from './components/touchspin/touchspin.directive';

export default AngularES6
	.module('lm.touchspin')
	.directive('touchSpin', TouchSpinDirective);
	