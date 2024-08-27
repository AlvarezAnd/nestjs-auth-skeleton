export class SignInDto {
  username: string;
  email: string;
  password: string;
  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export class SignUpDto {
  username: string;
  email: string;
  password: string;
  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
