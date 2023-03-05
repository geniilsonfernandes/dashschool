export class UserEndpoints {
  baseURL = "user";

  create() {
    return `${this.baseURL}/create`;
  }
}
