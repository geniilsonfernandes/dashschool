export interface ICreateCoursePayload {
  name: string;
  description: string;
  duration: number;
  students: string[];
}
export interface ICreateCourseResponse {
  created_at: Date;
  description: string;
  duration: number;
  id: string;
  name: string;
}
