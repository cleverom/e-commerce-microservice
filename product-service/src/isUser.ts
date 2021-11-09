import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from 'express'

export async function isUser(req: Request | any, res: Response, next: NextFunction) {
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, "secret", (err: any, user: any) => {
        if (err) {
            return res.json({ message: err });
        } else {
            req.user = user;
            next();
        }
    });

};