export class User {
  [x: string]: any;
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  role: string;
}

export class LoggedUser {
  username: string;
  password: string;
  loggedout_Time: Date;
}
