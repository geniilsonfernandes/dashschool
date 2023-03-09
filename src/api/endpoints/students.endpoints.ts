export class StudentsEndpoints {
  baseURL = "student";

  create() {
    return `${this.baseURL}/create`;
  }
  list() {
    return `${this.baseURL}/list`;
  }
  get() {
    return `${this.baseURL}/get`;
  }
}
