import './styles/vendor.scss';
import 'font-awesome-webpack';
import touchspinModule from '../src/angular-touchspin.module';
import { MainController } from './controllers/main.controller';

export default angular
	.module('lm.main', [touchspinModule.name])
	.controller('MainController', MainController);