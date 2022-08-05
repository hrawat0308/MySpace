const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const postsController = require('../controllers/posts-controllers');
const jwt = require('jsonwebtoken');

router.get('/:userId/post', postsController.getPostByUserId);

router.get('/posts', postsController.getAllPosts);

router.use((req, res, next)=>{
    if(req.method === 'OPTIONS'){
        return next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new Error("Authentication Failed");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {userId : decodedToken.userId}
        next();
    }
    catch(err){
        const error = new Error("Authentication Failed!!");
        error.code = 401;
        return next(error);
    }
     
});


router.post('/:userId/add-post',
    [
        body('title').trim().not().isEmpty(),
        body('content').trim(),
        body('description').trim().not().isEmpty(),
        body('postDate').trim().not().isEmpty(),
        body('user').trim().not().isEmpty(),
    ], 
    postsController.createPost);

router.delete('/:postId/delete-post', postsController.deletePost);

router.patch('/:postId/edit-post', postsController.updatePost);


module.exports = router;