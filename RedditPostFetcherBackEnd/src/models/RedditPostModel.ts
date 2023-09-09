import mongoose from 'mongoose';

const redditPostSchema = new mongoose.Schema({
    userId: String,
    date: Date,
    posts: [{ 
        selftext: String,
        author_fullname: String,
        title: String,
        subreddit_name_prefixed: String,
        downs: Number,
        thumbnail_height: Number,
        subreddit_type: String,
        ups: Number,
        permalink: String,
        thumbnail_width: Number,
        thumbnail: String,
        id: String,
        subreddit_subscribers: String,
        created_utc: Number,
        num_comments: Number
    }],
  });
  
  const RedditPostModel = mongoose.model('RedditPost', redditPostSchema);

  export {RedditPostModel}