import {Router} from 'express';
import {editUserData, getAllUsers} from "../controllers/adminController";





export const adminRouter = Router()

adminRouter
    .get('/:page', getAllUsers)
    .post('/', editUserData)
    .delete('/')
