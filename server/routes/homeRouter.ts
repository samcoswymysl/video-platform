import {Router} from 'express';
import {getHomePage, getSection, getVideo, sendFile} from "../controllers/homeController";
import { upload } from '../server';




export const homeRouter = Router()

homeRouter
    .get('/', getHomePage)
    .get('/section/:section', getSection)
    .get('/video/:section/:video', getVideo)
    .post('/:section/:number/:fileName',upload.single('film'),  sendFile)
