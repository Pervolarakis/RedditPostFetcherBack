import express, { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { requireAuth } from '../middlewares/requireAuth';
import { currentUser } from '../middlewares/currentUser';
import { RedditPostModel } from '../models/RedditPostModel';
import { redditQuery } from '../types';
import { BasicCustomError } from '../errors/BasicCustomError';
import { YouDontOwnThisError } from '../errors/YouDontOwnThisError';

const router = express.Router();

router.get('/api/v1/search-result/:id', currentUser, requireAuth, asyncHandler(async(req: Request, res: Response, next: NextFunction) => {

    const searchResultId = req.params.id;

    const searchResult:redditQuery|null = await RedditPostModel.findById(searchResultId);
    
    if(!searchResult){
        return next(new BasicCustomError('Invalid Id',400));
    }

    if (req.currentUser?.id !== searchResult.userId){
        return next(new YouDontOwnThisError('Search result'))
    }

    res.status(200).json({success: true, data: searchResult});

}))

export {router as getSearchResultsById}