import * as dotenv from 'dotenv';

dotenv.config({ path: '../server/.env' });
import * as express from "express";
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import './db/conneect'

import * as multer from 'multer';


import * as fs from 'fs/promises';
import * as path from "path";

const fileFilterFun = function (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback){
    const allowTypes=  'video/mp4'

    if(file.mimetype !== allowTypes){
    throw  new Error('Wrong file type')
    }

    cb(null, true)
}



const storage = multer.diskStorage({
    destination: async function (req: Request, file: Express.Multer.File, cb: any) {
        const {section} = req.params

            const pathToCourses= path.join(__dirname, './movie')
            const all = await fs.readdir(pathToCourses, {})
            console.log(all)
            const onlyDir = all.filter(el => !el.includes('.') )
        if(!onlyDir.includes(section)){
            await fs.mkdir(path.join(__dirname,'movie', section), {recursive: true} )
        }

        cb(null, `./movie/${section}`)
    },

    filename: function (req: Request, file: Express.Multer.File, cb: any) {
        const {number, fileName, section} = req.params
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, `${number}.${fileName}${ext}`)
    }
    })

export const upload = multer({
    fileFilter: fileFilterFun,
    storage: storage
})






import {loginRouter} from "./routes/loginRouter";
import {registerRouter} from "./routes/registerRouter";

import {UserRecord} from "./records/userRecord";
import {homeRouter} from "./routes/homeRouter";
import { handleError } from './handleError/handleError';
import {Request, Response} from "express";
import {passport} from "./passport/passportStrategy";
import {DiskStorageOptions} from "multer";
import {adminRouter} from "./routes/adminRouter";






(async () => {
    await UserRecord.createUserTable()
})()

const app = express()

app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:8080',
    },
));
app.use(cookieParser(process.env.COOKIE_SIGN_SECRET));
app.use(passport.initialize());
app.use(express.json());



app.post('/x', (req: Request, res: Response)=> {
    console.log(req.body);
    res.json({xxx: 'xxxx'})
})
app.use('/login' ,passport.authenticate('login',
    { session: false, failWithError: true }), loginRouter);
app.use('/register' , registerRouter)
app.use('/home',passport.authenticate('userAccess', { session: false, failWithError: true }), homeRouter)
app.use('/admin',passport.authenticate('adminAccess', { session: false, failWithError: true }), adminRouter)

app.use(handleError);

app.listen(5000, 'localhost')

