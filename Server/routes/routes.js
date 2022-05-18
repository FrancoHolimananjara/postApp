const express = require('express');
const middleware = require('../middleware/authMiddleware')
const userController = require('../controllers/userControllers');
const postController = require('../controllers/postControllers');
module.exports = routes = (function() {
    const router = express.Router();
    // USER ROUTES
    router.route('/user/add').post(userController.register)
    router.route('/user/signin').post(userController.login)
    router.route('/user/me').get(middleware,userController.UserProfile)
    // POST ROUTE
    router.route('/post/add').post(middleware,postController.add)
    router.route('/post/all').get(middleware,postController.fetchAll)
    router.route('/me/post/all').get(middleware,postController.fetchPostWithUserId)
    router.route('/me/post/delete/:id').delete(middleware,postController.DeletePostWithUserId)
    router.route('/me/post/update/:id').put(middleware,postController.UpdatePostWithUserId)
    return router;
})();