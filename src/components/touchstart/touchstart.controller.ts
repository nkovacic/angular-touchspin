export class TouchStartController {
	private 

	constructor(private $element: ng.IAugmentedJQuery, private $attrs: ng.IAttributes, private $scope: ng.IScope) {
		'ngInject';

		if (angular.version.major === 1 && angular.version.minor < 5) {
			this.$onInit();
		}
	}

	$onInit () {
		this.initializeEvents();
	}

	private initializeEvents() {
		this.$element.on('touchstart', (event) => {
			console.log('touchstart');

            this.$scope.$apply(() => { 
                this.$scope.$eval(this.$attrs['nkTouchstart'], { $event: event }); 
            });
        });
	}
}