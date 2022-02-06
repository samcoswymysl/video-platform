import {UserRole} from "./role";

export interface User {
    id: string | undefined;
    publicKey: string;
    password: string
    email:string
    role: UserRole
}
