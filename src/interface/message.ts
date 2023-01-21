import user from "./user";

export default interface message {
  id: number;
  content: string;
  file_url: string | null;
  claim_id: number;
  user: user
}