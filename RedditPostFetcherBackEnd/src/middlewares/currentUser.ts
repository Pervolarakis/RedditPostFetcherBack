import {Request, Response,  NextFunction } from "express";
import {UnauthenticatedError} from '../errors/UnauthenticatedError'
import {BasicCustomError} from '../errors/BasicCustomError'
import jwt from 'jsonwebtoken'


interface UserPayload {
    id: string;
    email: string;
    role: string
}

declare global{
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction)=>{
    
    let token: string = "";
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new BasicCustomError('invalid token',401));
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    }catch(err){
        return next(new UnauthenticatedError());
    }
    next();
}