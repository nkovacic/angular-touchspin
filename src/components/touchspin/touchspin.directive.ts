import { IDirective } from 'angular';
import { TouchSpinController } from './touchspin.controller';

import './touchspin.style';

export class TouchSpinDirective implements IDirective  {
	public restrict = 'EA';
    public require = '^ngModel';
    public scope = {};
    public bindToController = {
        disabled: '=?',
        max: '=?',
        min: '=?',
    	onChange: '&',
        options: '=?'
    };
    public controller = TouchSpinController;
    public controllerAs = 'vm';
    public template = require<string>('./touchspin.directive.html');
}