import { AngularES6 } from '../src/utilities/angular-es6';
import { default as touchspinModule, ITouchSpinConfigProvider, ITouchSpinOptions } from '../src/angular-touchspin';

import './styles/vendor';
import 'font-awesome-webpack';

import { MainController } from './controllers/main.controller';

export default AngularES6
	.module('nk.touchspin.test', [touchspinModule])
	.controller('MainController', MainController)
	.config((touchSpinConfigProvider: ITouchSpinConfigProvider) => {
		touchSpinConfigProvider.defaults(<ITouchSpinOptions>{
			decimals: 2,
			verticalButtons: false
		});
	});