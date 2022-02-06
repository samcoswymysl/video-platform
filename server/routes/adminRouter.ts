import {Router} from 'express';
import {deleteUser, editUserData, getAllUsers} from "../controllers/adminController";





export const adminRouter = Router()

adminRouter
    .get('/:page', getAllUsers)
    .post('/', editUserData)
    .delete('/', deleteUser)
