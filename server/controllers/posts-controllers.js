const { validationResult } = require('express-validator');
const Post = require('../models/posts-model');
const User = require('../models/users-model');

const getPostByUserId = async(req, res, next)=>{
    if(req.userData.userId !== req.params.userId){
        const error = new Error("You are not allowed to access tasks of other user");
        error.code = 401;
        return next(error);
    }
    const userId = req.params.userId;
    let identifiedUser;
    try{
        identifiedUser = await User.findById(userId);
     }
     catch(err){
         const error = new Error("No user found!!");
         error.code = 500;
         return next(error);
    }

    if(!identifiedUser){
        const error = new Error("User with this User Id not found in Database");
        error.code = 500;
        return next(error);
    }
    
    let usersPost;
    try{
        usersPost = await Post.find({ user : userId });
    }
    catch(err){
        const error = new Error("Error fetching the task by this user!!");
        error.code = 500;
        return next(error);
    }

    if(!usersPost){
        const error = new Error("Add Some Posts");
        error.code = 404;
        return next(error);
    }

    res.json({ usersPost });
}

const getAllPosts = async(req, res, next)=>{
    let usersPost;
    try{
        usersPost = await Post.find();
    }
    catch(err){
        const error = new Error("Error fetching the task by this user!!");
        error.code = 500;
        return next(error);
    }
    res.json({ usersPost });
}


const createPost = async (req, res, next)=>{
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        const error = new Error("Invalid Inputs passed, Please check your data!!");
        error.code = 422;
        return next(error);
    }
    let identifiedUser;
    const user = req.params.userId;

    if(req.userData.userId !== req.params.userId){
        const error = new Error("You are not allowed to add tasks for other users");
        error.code = 401;
        return next(error);
    }

    let {title, content, description, postDate, author} = req.body;
    try{
       identifiedUser = await User.findById(user);
    }
    catch(err){
        const error = new Error("Error finding user");
        error.code = 500;
        return next(error);
    }

    if(!identifiedUser){
        const error = new Error("User with this User Id not found in Database");
        error.code = 500;
        return next(error);
    }
    
    const createdPost = new Post({
        title,
        content,
        description,
        postDate,
        user,
        author,
    });

    try{
        await createdPost.save();
    }
    catch(err){
        const error = new Error("Adding Task to Database Failed!! Please try again");
        error.code = 500;
        return next(error);
    }

    res.status(201).json(createdPost);
}



const deletePost = async (req, res, next)=>{
    const postId = req.params.postId;
    let identifiedPost;
    try{
        identifiedPost = await Post.findById(postId);
    }
     catch(err){
         const error = new Error("Error Fetching Post!!");
         error.code = 500;
         return next(error);
    }

    if(!identifiedPost){
        const error = new Error("No Post Found!!");
        error.code = 500;
        return next(error);
    }


    if(req.userData.userId !== identifiedPost.user.valueOf()){
        const error = new Error("You are not allowed to delete tasks of other user");
        error.code = 401;
        return next(error);
    }

    try{
        await Post.deleteOne({_id : postId});
    }
    catch(err){
        const error = new Error("Error Deleting Post from Database");
        error.code = 500;
        return next(error);
    }
    res.status(200).json({ message : "deleted Post"});
}


const updatePost = async(req, res, next) => {
    const postId = req.params.postId;
    let identifiedPost;
    try{
        identifiedPost = await Post.findById(postId);
    }
     catch(err){
         const error = new Error("Error Fetching Post!!");
         error.code = 500;
         return next(error);
    }

    if(!identifiedPost){
        const error = new Error("No Post Found!!");
        error.code = 500;
        return next(error);
    }

    if(req.userData.userId !== identifiedPost.user.valueOf()){
        const error = new Error("You are not allowed to delete tasks of other user");
        error.code = 401;
        return next(error);
    }

    let {title, content, description, postDate} = req.body;
    try{
        await Post.updateOne({_id : postId},{
            title,
            description,
            content,
            postDate,
        },
        );
    }
    catch(err){
        const error = new Error("Error Deleting Post from Database");
        error.code = 500;
        return next(error);
    }
    res.status(200).json({message : "Updated Post"});
}
 
exports.getPostByUserId = getPostByUserId;
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.getAllPosts = getAllPosts;
exports.updatePost = updatePost;