import { StudentsEndpoints } from "./students.endpoints";
import { UserEndpoints } from "./user.endpoints";

export class Endpoints {
  static user = new UserEndpoints();
  static student = new StudentsEndpoints();
}
