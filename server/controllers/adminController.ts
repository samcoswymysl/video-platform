import {NextFunction, Request, Response} from "express";
import {UserRecord} from "../records/userRecord";
import {hash} from "bcrypt";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const {page} = req.params;
    try {
        const pageNum = Number(page)
        if(!page || Number.isNaN(page)){
           throw new Error('Wrong format page')
        }
        const allUsers =await UserRecord.findAllUsers(pageNum)
        res.json(allUsers)

    } catch (e) {
        next(e);
    }
}

export const editUserData = async (req: Request, res: Response, next: NextFunction)=> {
    const userData: UserRecord = req.body.userData;

    try{
        if(!userData)  throw new Error('You must send user data')

        if(!userData.id) throw new Error('You must send user id')
        const user = await UserRecord.findUserById(userData.id)

        if(!user) throw new Error('Wrong user id')

        if(userData.password) {
            user.password = await hash(userData.password, 10)
        }
        if(userData.email){
            user.email = userData.email
        }
        if(userData.role){
            user.role = userData.role
        }

        await user.updateUserData()

        res.json(`${user.email} has ben updated`)

    } catch (e) {
        next(e);
    }



}
