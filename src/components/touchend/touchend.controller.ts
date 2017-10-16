import * as angular from 'angular';

export class TouchEndController {
	private 

	constructor(private $element: ng.IAugmentedJQuery, private $attrs: angular.IAttributes, private $scope: ng.IScope) {
		'ngInject';

		if (angular.version.major === 1 && angular.version.minor < 5) {
			this.$onInit();
		}
	}

	$onInit () {
		this.initializeEvents();
	}

	private initializeEvents() {
		this.$element.on('touchend', (event) => {
            this.$scope.$apply(() => { 
                this.$scope.$eval(this.$attrs['nkTouchend'], { $event: event }); 
            });
        });
	}
}