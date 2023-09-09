import express, { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validateRequestSchema } from '../middlewares/validateRequestSchema';
import { BasicCustomError } from '../errors/BasicCustomError';
import { User } from '../models/UserModel';
import { loginSchema } from './requestSchemas/loginSchema';

const router = express.Router();

router.post('/api/v1/users/auth/login', loginSchema, validateRequestSchema, asyncHandler( async (req: Request, res: Response, next: NextFunction)=>{
    
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(!user){
        return next(new BasicCustomError('Invalid credentials',400))
    }

    const comparison = await user.matchPasswords(password);

    if(!comparison){
        return next(new BasicCustomError('Invalid credentials',400))
    }

    const token = user.getSignedJwtToken()

    res.status(200).json({success: true, token: token});

}))

export {router as signInRouter}