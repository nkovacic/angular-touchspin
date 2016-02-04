import * as angular from 'angular';
import touchspinModule from './angular-touchspin.module';

angular.element(document).ready(function () {
    angular.bootstrap(document, [touchspinModule.name]);
});