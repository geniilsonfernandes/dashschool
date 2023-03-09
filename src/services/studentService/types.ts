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
