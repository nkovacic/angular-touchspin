import './styles/vendor';
import 'font-awesome-webpack';
let touchspinModule = require<string>('../src/angular-touchspin.module');
import { MainController } from './controllers/main.controller';

export default angular
	.module('nk.touchspin.test', [touchspinModule])
	.controller('MainController', MainController)
	.config(function(touchSpinConfigProvider: angular.touchspin.ITouchSpinConfigProvider) {
		touchSpinConfigProvider.defaults(<angular.touchspin.ITouchSpinOptions>{
			decimals: 2,
			verticalButtons: false
		});
	});