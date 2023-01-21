export default interface user {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	kind: string;
	pharmacy_id: number | null;
	lab_id: number | null;
	created_at: string;
	updated_at: string;
}