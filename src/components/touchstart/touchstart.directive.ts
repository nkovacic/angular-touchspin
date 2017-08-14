import { TouchStartController } from './touchstart.controller';

export class TouchStartDirective implements ng.IDirective {
	public restrict = 'A';
    public controller = TouchStartController;
}