export interface IStudent {
  id: string;
  name: string;
  email: string;
  user_id: string;
  created_at: Date;
}

export interface IListStudentsPayload {
  page: number;
  take: number;
  user_id: string;
  filter?: string;
  mode: "list" | "pages";
}

export interface IStudentResponse {
  items: IStudent[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
}

export interface ICreateStudentPayload {
  email: string;
  name: string;
  password: string;
  user_id: string;
  filter?: string;
}
