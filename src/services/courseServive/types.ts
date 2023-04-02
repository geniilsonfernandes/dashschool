export interface ICreateCoursePayload {
  name: string;
  description: string;
  duration: number;
  students: string[];
  user_id: string;
}
export interface ICreateCourseResponse {
  created_at: Date;
  description: string;
  duration: number;
  id: string;
  name: string;
}

export interface IListCoursesPayload {
  user_id: string;
  page: number;
  take: number;
  filter?: string;
}

export interface IListCoursesResponse {
  id: string;
  name: string;
  description: string;
  duration: number;
  created_at: string;
  user_id: string;
  Courses_Students: CoursesStudent[];
}

interface CoursesStudent {
  id: string;
  created_at: string;
  student_id: string;
  courses_id: string;
  Students: Students;
}

interface Students {
  id: string;
  email: string;
  name: string;
  password: string;
  created_at: string;
  user_id: string;
}

export interface IUpdateCoursePayload {
  id: string;
  data: {
    name: string;
    description: string;
    duration: number;
    students: {
      delete: string[];
      create: string[];
    };
  };
}
