import {NextFunction, Request, Response} from "express";
import { UserRecord } from "../records/userRecord";

export type Done = (er: null | unknown, user?:UserRecord) => void;
