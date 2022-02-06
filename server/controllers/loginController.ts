import {UserRecord} from "../records/userRecord";

const jwt = require('jsonwebtoken');
import {Router, Request,Response, NextFunction} from 'express';

export const login = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserRecord | undefined
    try {
        console.log('Login kontroler')

        if(!user) throw new Error()
        const token = jwt.sign(
            {
                id: user.id,
                publicKey: user.publicKey,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
        );
        res.cookie('auth', token, {
            // secure: true,
            signed: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        })
            .json('Login successful');
    } catch (e) {
        next(e);
    }
};

