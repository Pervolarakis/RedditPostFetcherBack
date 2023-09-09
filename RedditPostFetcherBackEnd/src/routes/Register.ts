import express, {Request, Response, NextFunction} from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validateRequestSchema } from '../middlewares/validateRequestSchema';
import { BasicCustomError } from '../errors/BasicCustomError';
import { User } from '../models/UserModel';
import { signUpSchema } from './requestSchemas/signUpSchema';

const router = express.Router();

router.post('/api/v1/users/auth/register', signUpSchema, validateRequestSchema, asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    
    const {email, password, firstName, lastName} = req.body;
    
    const existingUser = await User.findOne({email: email});

    if(existingUser){
        return next(new BasicCustomError('User already exists with this email address', 400));
    }

    const user = new User({email, password, firstName, lastName});
    await user.save()

    const token = user.getSignedJwtToken()

    res.status(201).json({success: true, token: token});
    
}))

export {router as signUpRouter}

