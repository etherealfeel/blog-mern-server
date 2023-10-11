import express from 'express';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations/validation.js';
import checkAuth from './utils/checkAuth.js';
import multer from 'multer';
import { register, login, getMe } from './controllers/UserController.js';
import { createPost, removePost, updatePost, getAll, getOne } from './controllers/PostController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose
  .connect('mongodb+srv://admin:admin@cluster0.oqurahn.mongodb.net/blog')
  .then(() => console.log('db is working'))
  .catch(() => console.log('error connecting db'));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
})

const upload = multer({ storage })

app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.post('/auth/register', registerValidation, handleValidationErrors, register);
app.post('/auth/login', loginValidation, handleValidationErrors, login);
app.get('/auth/me', checkAuth, getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, createPost);
app.delete('/posts/:id', checkAuth, removePost);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, updatePost);

app.listen(4000, (err) => {
  if (err) return console.log(err);
  console.log('server is oka');
});
