// dependencis
import * as passportJS from 'passport';
import * as passportLocal from 'passport-local';
import * as passportJWT from 'passport-jwt';
import {compare} from 'bcrypt';
import {UserRecord} from '../records/userRecord';
import {Done} from "../types/passport.done";
import {Payload} from "../types/passport.payload";
import {Request} from "express";
import {UserRole} from "../types/role";

const LocalStrategy = passportLocal.Strategy;
// export const passport = passportJS

export const passport = passportJS

// Config JWT
const tokenExtractorFromCookie = (req: Request) => {
  console.log(req.signedCookies.auth);

  if (req.signedCookies.auth) {
    return `${req.signedCookies.auth}`;
  }
throw new Error('Verify Error')
};

const JWTStrategy = passportJWT.Strategy;
const configJWTStrategy = {
  jwtFromRequest: tokenExtractorFromCookie,
  secretOrKey: process.env.JWT_SECRET,
};

// verify
const verifyLogin = async (name: string, password: string, done: Done) => {
  try {
    console.log(name, password)
    const findUser = await UserRecord.findUserByEmail(name);

    if (!findUser) throw new Error('User dont exist');
    // if (!findUser.activate) throw new Error('Your account is not active');

    const passwordMatch = await compare(password, findUser.password);

    if (!passwordMatch) throw new Error('Wrong password');

    done(null, findUser);
  } catch (e) {
    done(e);
  }
};

const verifyUser = async (payload: Payload, done: Done) => {
  try {
    const user = await UserRecord.findUserById(payload.id);

    if (!user) throw new Error('User not found');

    const keyMatch = await compare(`${user.email}`, payload.publicKey);

    if (!keyMatch) throw new Error('Wrong public key');
    if (user.role === UserRole.unknown){
      throw new Error('Your account is not activate')
    }

    done(null, user);
  } catch (e) {
    done(e);
  }
};


const verifyAdmin = async (payload: Payload, done: Done) => {
  try {
    const user = await UserRecord.findUserById(payload.id);

    if (!user) throw new Error('User not found');

    const keyMatch = await compare(`$${user.email}`, payload.publicKey);

    if (!keyMatch) throw new Error('Wrong public key');

    if (user.role !== UserRole.admin){
      throw new Error('You not Admin')
    }

    done(null, user);
  } catch (e) {
    done(e);
  }
};

passport.use('login', new LocalStrategy({ usernameField: 'email', session: false }, verifyLogin));
passport.use('userAccess', new JWTStrategy(configJWTStrategy, verifyUser));
passport.use('adminAccess', new JWTStrategy(configJWTStrategy, verifyAdmin));


