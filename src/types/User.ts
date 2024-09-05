import { Role } from "./Role";

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  age: number;
};

export type LoggedUser = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
  role: Role;
};
