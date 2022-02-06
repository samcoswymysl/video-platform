import {NextFunction, Request, Response} from "express";
import * as fs from 'fs/promises';
import * as path from 'path'
import {createReadStream} from 'fs'






export const getHomePage = async (req: Request, res: Response, next: NextFunction) =>  {
    try{
        const pathToCourses= path.join(__dirname, '../movie')
        const all = await fs.readdir(pathToCourses, {})
        const onlyDir = all.filter(el => !el.includes('.') )

        res.json(onlyDir)

    }catch (e) {
        next(e);
    }
}

export const getSection = async (req: Request, res: Response, next: NextFunction) => {
    const {section} = req.params
    try{
        const pathToMovie= path.join(__dirname, '../movie', section)
        const all = await fs.readdir(pathToMovie, {})
        const onlyMovie = all.filter(el => el.includes('.') )

        res.json(onlyMovie)

    } catch(e) {
        next(e)
    }
}

export const getVideo = async (req: Request, res: Response, next: NextFunction) => {
    const {section, video} = req.params
    console.log(section, video)

    try {
        const videoPath = path.join(__dirname, '../movie', section, video)
        const videoStat = await fs.stat(videoPath)
        const fileSize = videoStat.size
        const videoRange = req.headers.range; //todo nie wiem po co

        if (videoRange) {
            const parts = videoRange.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize-1;
            const chunksize = (end-start) + 1;
            const file =  createReadStream(videoPath, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            createReadStream(videoPath).pipe(res);
        }

    } catch (e) {
        next(e);
    }
}




export const sendFile = async (req: Request, res: Response, next: NextFunction) => {
const {section} = req.params

    try {
    // upload.single('film')


        console.log(req.file)


        res.json('xxx')

    }catch (e) {
   next(e)
    }

}
