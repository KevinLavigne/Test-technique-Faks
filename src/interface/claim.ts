import pharmacy from './pharmacy';
import lab from './lab';

export default interface claim {
	id: number;
	pharmacy: pharmacy;
	lab: lab;
}