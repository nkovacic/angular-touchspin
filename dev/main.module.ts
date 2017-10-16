import { AngularES6 } from '../src/utilities/angular-es6';
import { ITouchSpinConfigProvider, ITouchSpinOptions } from '../src/angular-touchspin';

import './styles/vendor';
import 'font-awesome-webpack';

let touchspinModule = require<string>('../src/angular-touchspin.module');

import { MainController } from './controllers/main.controller';

export default AngularES6
	.module('nk.touchspin.test', [touchspinModule])
	.controller('MainController', MainController)
	.config(function(touchSpinConfigProvider: ITouchSpinConfigProvider) {
		touchSpinConfigProvider.defaults(<ITouchSpinOptions>{
			decimals: 2,
			verticalButtons: false
		});
	});