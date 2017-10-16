import { IDirective } from 'angular';

import { TouchEndController } from './touchend.controller';

export class TouchEndDirective implements IDirective {
	public restrict = 'A';
    public controller = TouchEndController;
}