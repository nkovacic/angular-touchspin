import { IDirective } from 'angular';
import { TouchStartController } from './touchstart.controller';

export class TouchStartDirective implements IDirective {
	public restrict = 'A';
    public controller = TouchStartController;
}