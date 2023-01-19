import { Request } from "express";

export interface NewUser {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

export interface cNewUser extends Request {
  cUser: NewUser;
}