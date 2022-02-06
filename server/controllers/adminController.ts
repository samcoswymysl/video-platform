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

        if(!allUsers) throw  new Error('Not found any users')
        const users = allUsers.map(user => {
                return {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                }
            }
        )

        res.json(users)

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
            user.publicKey = await hash(user.email, 10)
        }
        if(userData.role){
            if(userData.role < 0 || userData.role > 2) throw new Error('Wrong User Data role')

            user.role = userData.role
        }

        await user.updateUserData()

        res.json(`${user.email} has ben updated`)

    } catch (e) {
        next(e);
    }
}


export const deleteUser = async (req: Request, res: Response, next: NextFunction)=> {
    const {userId}: {userId: string} = req.body


    try {
        if(!userId) throw new Error('You must set user id')

        const user = await UserRecord.findUserById(userId)
        if(!user) throw new Error('User dont exist')

        await user.deleteUser()
        res.json(`User ${user.email} has bean deleted`)
    } catch (e) {
      next(e)
    }


}
