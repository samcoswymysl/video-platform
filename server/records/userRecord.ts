import { v4 as uuid } from 'uuid';
import { pool } from '../db/conneect';
import {User} from "../types/user";
import {UserRole} from "../types/role";

export class UserRecord {
    id?: string
    publicKey: string
    password: string
    email: string
    role: UserRole


    constructor({id, publicKey, password, email, role}: User) {
        this.id  = id || uuid() ;
        this.publicKey = publicKey;
        this.password = password;
        this.email = email;
        this.role = role;

        this.validate()
    }

    private validate() {
        if (!this.email) throw new Error('Email cant be empty');
        if (!this.password) throw new Error('Password cant be empty');
        if (!this.publicKey) throw new Error('Public Key cant be empty');
    }

    static async createUserTable() {
        await pool.execute('CREATE TABLE IF NOT EXISTS `users`(`id` VARCHAR(36)  PRIMARY KEY NOT NULL,  `email` VARCHAR(150) UNIQUE NOT NULL, `password` VARCHAR(60) NOT NULL,  `publicKey` VARCHAR(60) NOT NULL,  `role` TINYINT(1) UNSIGNED NOT NULL DEFAULT :userRole)', {
            userRole: UserRole.unknown
        });
    }

    static async findUserById(id: string) {

        const [[user]]= await pool.execute('SELECT  * FROM  `users` WHERE  `id` = :id', {
            id,
        }) as unknown as User[][]
        return user ? new UserRecord(user) : null;
    }

    static async findUserByEmail(email: string) {
        const [[user]] = await pool.execute('SELECT * FROM  `users` WHERE  `email` = :email', {
            email,
        }) as unknown as User[][]
        return user ? new UserRecord(user) : null;
    }


    static async findAllUsers(page: number) {
        const [users] = await pool.execute('SELECT  * FROM  `users`LIMIT  25 OFFSET :offset', {
            offset: (page - 1) * 25,
        }) as unknown as User[];

        if (Array.isArray(users)) {
            return users.length > 0 ? users.map((user) => new UserRecord(user)) : null;
        }
    }
    async saveNewUser() {
        const newUser = await pool.execute('INSERT INTO  `users` (`id`,  `email`, `password`, `publicKey`) VALUES(:id, :email, :password, :publicKey)', {
            id: this.id,
            publicKey: this.publicKey,
            email: this.email,
            password: this.password,
        });
        return this.id;
    }
    async updateUserData() {
        const result = await pool.execute('UPDATE `users` SET   `email` = :email, `password` = :password ,`publicKey` = :publicKey , `role`:role WHERE  `id`= :id', {
            email: this.email,
            password: this.password,
            publicKey: this.publicKey,
            id: this.id,
            role: this.role
        });
    }

    async deleteUser(id: string){
        if(id){
            await pool.execute('DELETE FROM `users` WHERE id=:id', {
                id: this.id
            })
        }
    }
}
