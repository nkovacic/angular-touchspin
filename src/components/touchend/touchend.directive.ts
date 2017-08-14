import { TouchEndController } from './touchend.controller';

export class TouchEndDirective implements ng.IDirective {
	public restrict = 'A';
    public controller = TouchEndController;
}