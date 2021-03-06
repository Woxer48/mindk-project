const router = require('express').Router();
const upload = require('../services/multer');
const postsService = require('../services/store/posts.service');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const authMiddleware = require('../middlewares/authMiddleware');
const path = require('path');

module.exports = router;

router.get('/', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await postsService.getAllPosts());
}));

router.get('/:id/comments', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await postsService.getPostComments(req.params.id));
}));

router.get('/:id/likes', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await postsService.getPostLikes(req.params.id));
}));

router.get('/:id', asyncErrorHandler(async (req, res) => {
  res.status(200).json(await postsService.getPostById(req.params.id));
}));

router.get('/:id/image', asyncErrorHandler(async (req, res) => {
  const postImage = await postsService.getPostImage(req.params.id);
  res.status(200).sendFile(`${postImage[0].image}`, {root: path.dirname('')});
}));

router.post('/', authMiddleware, upload.single('image'), asyncErrorHandler(async (req, res) => {
  if (req.hasOwnProperty('file')) req.body.image = req.file.path;
  await postsService.createNewPost(req.body);
  res.status(200).send('New post has been successfully created');
}));

router.put('/:id', authMiddleware, upload.single('image'), asyncErrorHandler(async (req, res) => {
  if (req.hasOwnProperty('file')) req.body.image = req.file.path;
  await postsService.updatePostById(req.params.id, req.body);
  res.status(200).send('Post was successfully updated');
}));

router.delete('/:id', authMiddleware, asyncErrorHandler(async (req, res) => {
  await postsService.deletePostById(req.params.id);
  res.status(200).send('Post was successfully deleted');
}));