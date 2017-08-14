export class TouchEndController {
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
		this.$element.on('touchend', (event) => {
			console.log('touchend');
			
            this.$scope.$apply(() => { 
                this.$scope.$eval(this.$attrs['nkTouchend'], { $event: event }); 
            });
        });
	}
}