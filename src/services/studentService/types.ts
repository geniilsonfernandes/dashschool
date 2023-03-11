export interface IStudent {
  password: string;
  name: string;
  email: string;
}

export interface IStudentResponse {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface IListStudentsPayload {
  page: number;
  take: number;
  user_id: string;
}
export interface ICreateStudentPayload {
  email: string;
  name: string;
  password: string;
  user_id: string;
}
