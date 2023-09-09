import express, { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { requireAuth } from '../middlewares/requireAuth';
import { currentUser } from '../middlewares/currentUser';
import { RedditPostModel } from '../models/RedditPostModel';
import { redditQuery } from '../types';

const router = express.Router();

router.get('/api/v1/queries', currentUser, requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const userQueries:redditQuery[] = await RedditPostModel.find({userId: req.currentUser!.id});

    res.status(200).json({success: true, data: userQueries});

}))

export {router as getPastQueriesByUser}