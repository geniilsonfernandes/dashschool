export class StudentsEndpoints {
  baseURL = "student";

  create() {
    return `${this.baseURL}/create`;
  }
  list() {
    return `${this.baseURL}/list`;
  }
  get(id: string) {
    return `${this.baseURL}/${id}`;
  }
  update(id: string) {
    return `${this.baseURL}/${id}`;
  }
}
