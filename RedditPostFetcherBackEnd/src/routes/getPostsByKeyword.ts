import express, { NextFunction, Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { requireAuth } from '../middlewares/requireAuth';
import { currentUser } from '../middlewares/currentUser';
import { BasicCustomError } from '../errors/BasicCustomError';
import { RedditPostModel } from '../models/RedditPostModel';
import axios from 'axios';
import { post, redditQuery } from '../types';

const router = express.Router();

router.get('/api/v1/posts', currentUser, requireAuth, asyncHandler(async (req: Request, res: Response, next: NextFunction) =>{

    interface elType {
        type: String,
        data: post
    }

    axios.get(`https://www.reddit.com/search.json?q=${req.query.keyword}&sort=new&limit=100`)
        .then(async response => {
            const fetchedData = response.data.data;
            const posts: post[] = []
            fetchedData.children.map((el: elType, index: number) => {
                const fetchedPost:post = el.data
                const post:post = {
                    selftext: fetchedPost.selftext,
                    author_fullname: fetchedPost.author_fullname,
                    title: fetchedPost.title,
                    subreddit_name_prefixed: fetchedPost.subreddit_name_prefixed,
                    downs: fetchedPost.downs,
                    thumbnail_height: fetchedPost.thumbnail_height,
                    subreddit_type: fetchedPost.subreddit_type,
                    ups: fetchedPost.ups,
                    permalink: fetchedPost.permalink,
                    thumbnail_width: fetchedPost.thumbnail_width,
                    thumbnail: fetchedPost.thumbnail,
                    id: fetchedPost.id,
                    subreddit_subscribers: fetchedPost.subreddit_subscribers,
                    created_utc: fetchedPost.created_utc,
                    num_comments: fetchedPost.num_comments
                }
                posts.push(post)
            })
            const tempPostQuery: redditQuery = {
                userId: req.currentUser!.id,
                posts: posts,
                keyword: req.query.keyword!.toString(),
                date: new Date()
            }
            const redditQuery = new RedditPostModel(tempPostQuery);
            await redditQuery.save()
            return res.status(200).json({success: true, data: tempPostQuery})
        })    
}))

export {router as getPostsRouter};