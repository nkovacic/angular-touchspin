import * as angular from 'angular';
import mainModule from './main.module';

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainModule.name]);
});