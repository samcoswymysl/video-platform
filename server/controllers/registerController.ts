import {hash} from 'bcrypt';
import {NextFunction, Request, Response} from "express";
import {UserRecord} from '../records/userRecord';
import {UserRole} from "../types/role";


export const register = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password }:{name: string, email: string, password: string} = req.body;
  const passwordRegExp = '(\\D*\\d){2,}';
  const emailRegExp = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  try {
    if (!email || !password) throw new Error('You must get name, email and password');
    if (!emailRegExp.test(email)) throw new Error('Invalid email');
    if (password.length < 7) throw new Error('Password is too short');
    if (!password.match(passwordRegExp)) throw new Error('Password mus include 2 numbers');

    const hashPass = await hash(password, 10);
    const publicKey = await hash(`${email}`, 10);

    const newUser = new UserRecord({
      id: undefined,
      email,
      password: hashPass,
      role: UserRole.unknown,
      publicKey
    });

 await newUser.saveNewUser();
    res.json('Register successfully');
  } catch (e) {
    next(e);
  }
};


